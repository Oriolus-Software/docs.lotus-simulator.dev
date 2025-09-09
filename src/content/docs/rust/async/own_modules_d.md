---
title: Eigene Bausteine erstellen
---

Selbstverständlich ist es auch möglich, Funktionen zu bauen, die als eigene Bausteine arbeiten. Hierfür gibt es mehrere Möglichkeiten, die auch kombiniert werden können.

## Process

Das ist sicherlich die einfachste Variante, ein individuelles Verhalten zu bauen: Unter Verwendung des Bausteins `process`. Dieses Element ist generisch, das heißt es kann an jeden beliebigen Baustein oder jedes beliebige Shared angehängt werden. Man übergibt ihm dann eine normale Funktion oder eine Closure (eine spezielle Art von Funktion, die direkt "vor Ort" erstellt wird), die dann entsprechend ausgeführt wird, wenn ein neuer Eingangswert kommt:

```rust
    let a = std_button(…).process(|f| if f {3} else {5});
```

In diesem Beispiel wird, sobald der Button gedrückt oder losgelassen wird, die Funktion in der Klammer durchgeführt und der Wert im Shared a gespeichert. Dementsprechend nimmt a den Wert 3 an, wenn die Taste gedrückt wird, und 5, wenn sie losgelassen wird.

## Aus bestehenden Shareds und Bausteinen

Natürlich kann man auch eigene Bausteine als eigene Funktionen definieren. Meine Beispiele sind nicht generisch und keine Methoden, damit es nicht zu kompliziert wird. Aber dahingehend kann man sich natürlich ebenfalls austoben!

```rust
fn neue_funktion(a: Shared<bool>, b: Shared<bool>) -> Shared<float>{
    a.invert().or(&b).to_float()
}
```

Sobald sich a oder b verändern, wird a invertiert und mit b ODER-operiert, anschließend in einen `f32` umgewandelt.

## Mit on_refresh oder on_actually_change

```rust

fn weitere_funktion(a: Shared<f32>, b: f32) -> Shared<f32>{
    let output = Shared::<f32>::default();

    a.on_refresh(move |v| output.set(*v + b));

    output
}

```

Wir bewegen uns nun in Gefilde, in denen zunehmend das Ownership-Management von Rust interessant wird, aber diese Pandora-Büchse wollen wir an dieser Stelle mal geschlossen lassen, daher nur zusammengefasst:

Zunächst wird ein neues Shared definiert, welches am Ende der Funktion als Return übergeben wird. Die Funktion, die `a.on_refresh` übergeben wird, wird immer dann aufgerufen, wenn in `a` an anderer Stelle geschrieben wird (egal, ob der Wert mit dem alten Wert identisch ist, oder nicht). In dieser Funktion (in diesem Fall Closure) wird der Wert, den `a` zu jenem Zeitpunkt hat, als `v` übergeben. Der Wert wird genommen, mit dem zweiten Funktionsparameter `b` addiert und in das Output-Shared geschrieben. Wenn `a` nicht beschrieben wird, wird auch der Output nicht geschrieben.

Ein etwas anderes Verhalten zeigt `on_actually_change`:

```rust

fn noch_eine_funktion(a: Shared<f32>, b: f32) -> Shared<f32>{
    let output = Shared::<f32>::default();

    a.on_actually_change(move |v| output.set(*v + b));

    output
}

```

Hier wird die Closure nur dann aufgerufen, wenn sich der Wert von `a` auch wirklich **verändert** hat! Das ist vor allem dann interessant,
wenn zu erwarten ist dass `a` ständig geschrieben wird (z.B. bei exponentieller Näherung).

## Mit eigener Loop

Und schließlich gibt es noch die ganz "rohe" Variante – mit einem eigenen Loop. Wie dieser genau arbeitet, hängt dann natürlich
vom Anwendungsfall ab: Es können Loops sein, die in jedem Berechnungsschritt durchlaufen werden, oder welche, die auf verschiedene
Dinge warten, sei es das Setzen eines Shareds oder einem Tastendruck – oder einfach dem Ablauf eines Zeitintervalls. Als einfaches Beispiel
sei hier `exponential_approach` gezeigt:

```rust
pub fn exponential_approach(&self, exponent: f32) -> Shared<f32> {
    let state = Shared::<f32>::default();

    {
        let state = state.clone();
        let target = self.clone();

        spawn(async move {
            loop {
                state.set(exponential_approach(state.get(), exponent, target.get()));
                wait::next_tick().await;
            }
        });
    }

    state
}
```

Zunächst wird ein Output erstellt (`state`) und ein Klon erstellt, da das "Original" am Ende als Rückgabewert übergeben wird. Auch von `self` wird ein Klon erstellt. Die Klone benötigt man, da diese per `move` an die asynchrone Funktion übergeben werden.

Der Aufruf von `spawn` ruft die "innere" Funktion auf (in diesem Fall eine Closure); das Besondere ist aber, dass diese Funktion _asynchron_ zu laufen beginnt, d.h. die äußere Funktion wartet nicht auf die innere Funktion, sondern läuft unmittelbar weiter. Das bedeutet auch, dass die innere Funktion beliebig lange laufen kann, ohne dass das restliche Script oder gar Programm einfriert.

Genau diese Eigenschaft nutzen wir hier aus: Die asynchron gestartete Funktion ist hier nämlich eine Endlosschleife, in der der Wert von `state`genommen wird, durch die mathematische Funktion `exponential_approach` geleitet wird, und schließlich in das `target` geschrieben wird. Anschließend _muss_ irgendein wait:: aufgerufen werden, andernfalls würde die Schleife nämlich dann _doch_ alles aufhalten. In diesem
Fall wird einfach das nächste Tick abgewartet.

Abschließend sei noch erwähnt, dass asynchron aufgerufene Funktionen natürlich _nicht_ endlos laufen müssen. Wenn man Mikroprozessoren aller Art simulieren möchte, könnte man z.B. eine Einstiegsfunktion asynchron aufrufen, die dann wiederum irgendeinen Bildschirm rendert, dann zwei
Sekunden wartet (z.B.mit `wait::seconds(1.0).await()`), dann einen anderen Bildschirm zeigt und dann auf eine User-Eingabe wartet. Sobald diese erfolgt, könnten wiederum nach einer Verzögerung verschiedene asynchrone Funktionen aufgerufen werden – je nach Eingabe – und die Funktion enden. Da dies alles asynchron stattfindet, wird zu keinem Zeitpunkt irgendein anderer Simulator-/Script-Ablauf gestört.

## Und was ist mit der Thread-Safety???

Hier braucht man sich keine Sorgen machen: Auch wenn _scheinbar_ mehrere Funktionen gleichzeitig laufen, so kann man sich sicher sein, dass
innerhalb (!) eines Scripts keine verschiedenen Stücke Code tatsächlich gleichzeitig laufen. Technisch läuft ein bestimmtes Script stets auf einem einzigen Thread, die verschiedenen zueinander asynchronen Funktionen laufen hintereinander ab. In welcher Reihenfolge diese abgearbeitet werden, lässt sich jedoch nicht vorhersagen!
