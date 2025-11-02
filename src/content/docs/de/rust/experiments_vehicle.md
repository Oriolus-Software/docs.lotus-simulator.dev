---
title: Experimente mit dem GT6N
---

## Einleitung

Dieser Artikel dient der grundlegenden Einführung in das Programmieren von Scripts. Erfahrungen mit dem alten Pascal-Script in der klassischen LOTUS-Version sind dabei sehr hilfreich! Außerdem ist es ebenso wichtig, sich für diesen Artikel wenigstens grundlegend mit Rust auseinander gesetzt zu haben.

Als Beispiel nehmen wir direkt den GT6N:

Da man in LOTUS NG auch fremden Objekten eigene Scripts zuweisen kann, haben wir somit ein fertiges Fahrzeug als Spielwiese, bereits ausgestattet mit Sounds, Animationen, Lichtern, Tastatur-/Maus-Events und natürlich konfiguriert mit Drehgestellen und Achsen. Ob Du nun einfach eine Lampe leuchten lassen willst, oder das Fahrzeug direkt in Bewegung setzen möchtest, Du kannst auf diese Weise erstmal jede Menge Dinge ausprobieren!

## Los geht's! - Erstellen des Projektes

Zunächst installierst Du Dir eine Entwicklungsumgebung (z.B. VSCode), dann Rust, das Target und schließlich lotus-sc, siehe hierzu den Quickstart.

### Projekt automatisiert erstellen lassen

Nun geht es daran, das Projekt zu erstellen:

Suche im Windows Datei-Explorer den Ordner, worin das neue Projekt erstellt werden soll, klicke dort mit Rechts drauf und wähle "In Terminal öffnen". Tippe im Terminal-Fenster die folgende Zeile ein und bestätige mit Enter:

`lotus-sc create -n experiment_1 -l rust`

(Falls ein Updatevorgang passiert und dann nicht das passiert, was im Folgenden beschrieben ist, dann ggf. noch mal dasselbe Kommando ausführen)

Es erscheint der Hinweis:

```
Enter a destination for the script
> experiment_1
```

Bestätige mit Enter, es erscheint `Select additional crates`. Du kannst mit den Pfeiltasten zwischen den beiden Crates wechseln. Bei "lotus-extra" setzt Du mit der Leertaste einen Haken. Wenn alles korrekt eingestellt ist, bestätigst Du nochmal mit Enter.

Das Projekt wird nun angelegt und irgendwann blinkt wieder der Cursor. Das Kommando-Fenster kann nun geschlossen werden.

Wenn es geklappt hat, findest Du nun einen neuen Ordner mit dem Namen `experiment_1` (das ist der Projektordner) mit ein paar Dateien und Ordnern.

Wenn irgendwas schief gegangen sein sollte, kann der Ordner ggf. einfach gelöscht werden.

### Der erste Blick ins neue Script

Starte die Programmierentwicklung und wähle dort als Ordner `experiment_1` aus.

Werfen wir einen Blick in die Dateien und Ordner:

- der Ordner `.git` sowie die Datei `.gitignore` können komplett ignoriert werden. Git ist ein Tool, mit dem du den Verlauf deiner Programmierarbeit speichern, alte Versionen wiederherstellen und gemeinsam mit anderen am gleichen Code arbeiten kannst. Dies soll hier aber noch kein Thema sein. Informiere Dich aber definitiv mal, es ist sehr nützlich und sehr interessant.

- `src` ist der oberste Ordner der Sourcecode-Dateien. Alle Sourcecode-Dateien liegen hier bzw. in dessen Unterordnern. Momentan gibt es nur die `lib.rs`, das ist für alle Scripts die "Hauptdatei".

- `target` ist für Dich erstmal uninteressant, da die Scripts bei unserer Art des Kompilierens automatisch an ihren Zielort kopiert werden.

- `scripts.toml` ist die Konfigurationsdatei, in der insbesondere festgelegt wird, für welche(s) Objekt(e) das Script kompiliert werden soll.

- `Cargo.toml` dient der Rust-seitigen Konfiguration des Projektes: Welche externen Bibliotheken in welcher Version sollen verwendet werden, mit welchen Optionen soll kompiliert werden usw..

- `Cargo.lock` wird automatisch erstellt. Wenn sie mal aus Versehen oder mit Absicht gelöscht wird, ist das egal.

### Das erste Mal kompilieren

Hierzu werfen wir erst noch einen Blick in die `scripts.toml`. Dort setzen wir als User-Id 1000 ein (Base-Content) und als Sub-Id 31997818 ein (GT6N):

```toml
[[script]]
user_id = 1000
sub_id = 31997818
toolchain = "cargo"
```

Welcher Content welche Id hat, lässt sich mit dem Content-Explorer ermitteln.

Schließlich speichern wir die Datei.

**_Jedes Kompilieren erfordert ein vorheriges Speichern der Dateien!_**

Wir können zunächst das Kompilieren testen, das erfolgt mit dem Kommando:

`cargo c`

Das Testen ist nicht nötig, aber es ist schneller als das Kompilieren selbst. Wenn man also noch nicht kompilieren möchte (oder schon weiß, dass es nicht möglich ist), kann man es so erstmal checken.

Er wird vermutlich einen Fehler finden: Zeile 4 endet eventuell fälschlicherweise mit einem Semikolon, das muss einfach gelöscht werden.

Kompiliert (nach dem Speichern der Datei!) wird das Script schlicht mit dem Kommando:

`lotus-sc deploy`

Das erste Mal oder wenn sich andere Bibliotheken ("Crates") aktualisiert oder hinzugefügt werden oder sonstige tiefgreifenden Änderungen erfolgt sind, dauert der Kompilierungsvorgang eine Weile. Hat sich jedoch nur wenig geändert, wird er wesentlich schneller ablaufen.

Das erfolgreiche Abschließen des Kompilierungsvorgangs wird mit einem `Finished 'dev' profile [unoptimized + debuginfo] target(s) in ##.##s` bestätigt.

### Wo ist nun das fertig kompilierte Script?

Unserer Quellcode kann liegen, wo wir wollen, so wie auch die Dateien, die wir mit dem ContentTool produzieren.

Interessanter ist das Ziel der fertig kompilierten Scripts:

Navigiere hierzu in das Verzeichnis `C:\Users\{Username}\AppData\Roaming\LOTUS-Simulator\`, dort findest Du unter Anderem den Ordner `scripts`, darin wiederum die Ordner `builtint` (für Basecontent-Scripts), `secondary` (interne Zusatzscripts) und `user`. Sobald das Script kompiliert ist, wirst Du hier einen Ordner für die User-ID (1000) und darin wiederum eine Ordner für die Sub-ID (31997818) finden, darin wiederum dann die Datei `script.wasm`.

Das ist wichtig, da Du ja bestimmt auch wieder das originale Script vom GT6N nutzen möchtest – in desem Fall benennst Du diese Datei einfach um oder löschst sie, sodass LOTUS die Datei nicht mehr findet und auf das originale Standard-Script aus dem `builtin`-Verzeichnis zurückgreift.

### Hat das Kompilieren geklappt?

Nun einfach LOTUS starten, den GT6N laden – und...?

Das Script ist leer, es sollte also überhaupt nichts funktionieren, alle Animationen neutral sein und alle Leuchtmelder müssten leuchten (das ist deren "Standardlage").

Das Script ist allerdings nicht _ganz_ leer; es wird einmalig "Hello, world!" in den Log eingetragen, den schauen wir uns noch eben an:

Drücke F4, klicke auf `script-debug`, drücke erneut F4 (um das erste Fenster wieder zu schließen) und wähle im neuen Fenster oben `GT6N (UID: 1000 SID: 31997818)` aus.

Unten befindet sich der Log, da sollte der berühmte Gruß dementsprechend als INFO-Meldung gelistet sein.

Dann stimmt alles! :-)

Werfen wir noch einen weiteren Blick auf das Debug-Fenster: Abgesehen von ein paar statistischen Daten finden wir dort die Liste der Public-Vars: Momentan gibt es lediglich eine Handvoll für diverse Standard-Informationen, sonst keine.

Und jetzt NICHT den Simulator schließen! Warum nicht? Nun, LOTUS verfügt ja über Hot-Reload, d.h. sobald das Script geändert, insbesondere neu kompiliert wird (sofern es schon eins gab), wird das Script im Simulator sofort neu geladen!

(Natürlich _darf_ der Simulator auch zwischendurch geschlossen werden, aber es ist eben nicht nötig.)

## Erste Experimente

In den allermeisten Fällen kommuniziert das Script mit Fahrzeugmodell, Sound, usw. über die Public-Vars (die von "früher), also die öffentlichen Variablen. Über diese sind die Animationen, Sounds usw. konfiguriert und steuerbar. Das gilt auch für Leuchtmelder. Wenn man ein Script für ein Objekt bauen möchte, benötigt man die exakten Bezeichnungen für die Public-Vars. Im Falle des GT6N liegen sie vor, weil das Pascal-Script des GT6N öffentlich vorliegt. Aber auch über das Script-Test-Fenster im klassischen LOTUS lassen sich die Variablen des Fahrzeuges anzeigen, mit dem man gerade fährt.

### Grundsätzlicher Aufbau eines Scripts

Werfen wir nun einen Blick in die lib.rs:

```rust
use lotus_script::prelude::*;

#[derive(Default)]
pub struct MyScript {}

script!(MyScript);

impl Script for MyScript {
    fn init(&mut self) {
        log::info!("Hello, world!");
    }

    fn tick(&mut self) {}
}
```

Was sehen wir hier? Zunächst ein `use` für das Einbinden von `lotus_script`. Dann die Definition unseres Scripts: Hinter `pub struct` folgt das Struct, was unsere Variablen hält, `script!` ist ein Macro, welches ein bisschen Zauberei macht, die hier und für bestimmt sehr lange Zeit komplett unwichtig ist.

Schließlich gibt es den `impl`-Block, der die entsprechenden Standard-Funktionsaufrufe enthält. Das sind erstmal nur `init` und `tick`. Ersterer wird einmal nach dem Laden des Fahrzeuges ausgeführt, zweiterer bei jedem Durchlauf der Simulation.

### Experiment vs. echtes Fahrzeug-Script

Was wir hier und jetzt machen werden, ist lediglich das Herumexperimentieren mit konkreten Funktionen, Variablen usw., wir werden noch nicht komplex und somit noch nicht "realitätsnah". Es sei somit betont, dass ein gutes Script nicht einfach nur eine lange Liste von Befehlen in einer Rust-Datei ist, sondern eine Struktur mit individuellen Structs, Enums und natürlich Funktionen in sinnvoll unterteilen Dateien und einer sinnvollen Struktur, mit der all das verbunden wird. Dafür gibt es aber auch vorgefertigte Bibliotheken, die z.B. auch sich ständig wiederholende Objekte wie Schalter usw. enthalten.

Andererseits sind Szenerieobjekt-Scripts wiederum oft so einfach, dass sie wiederum sehr an die hier erzeugten Scripts erinnern.

### Leuchtmelder

Alle Leuchtmelder leuchten – wir müssen also einen ausschalten! Da dies nur einmal beim Start nötig ist, erfolgt der Eintrag in der `init()`-Funktion. Den "Hello, world!"-Eintrag ändern wir auf "Reload....", dahinter fügen wir den Funktionsaufruf ein, der den Wert einer Variable setzt:

`set_var("A_LM_DoorsClosed", 0.0);`

Hierdurch wird die Variable mit dem Namen "A_LM_DoorsClosed" auf den Wert 0 gesetzt. **Zu beachten** sind aber zwei Dinge:

- Einerseits muss die Variable im Gegensatz zum Pascal-Script zuvor _nicht_ existieren! Man kann als Namen alles mögliche eintragen, es wird nie zu einer Fehlermeldung kommen!

- Aus der Art des angegeben Wertes wird ermittelt, welchen Typs die Variable sein wird! Es erfolgt keine weitere Typenkontrolle. Und hierbei ist nicht zu vergessen, dass in Rust Float-Variablen _immer_ einen Dezimalpunkt haben müssen, im Zweifelsfall ein ".0".

Wenn Du dann wieder kompilieren möchtest, kannst Du statt der manuellen Eingabe in der Konsole auch direkt einmal Pfeil-hoch drücken.

Wenn Du nun in den Simulator wechselst, wirst Du direkt sehen, dass die grüne Türen-geschlossen-Leuchte aus ist, sowie im Debug-Fenster nun `A_LM_DoorsClosed    | 0` steht.

Du kannst ja mal ausprobieren, ob Du die Lampe auch schwach leuchten lassen kannst... oder super hell, um mal die Grafikeffekte der neuen Engine auszuprobieren!

### Leuchtmelder soll blinken

Wir wollen nun das erste Mal etwas Dynamisches schaffen, wir brauchen nun also `tick()`.

Unser Leuchtmelder soll blinken. Hierfür brauchen wir einen Status (bool) und einen Timer (f32). LOTUS soll sich die Werte Frame-übergreifend merken. Aus diesem Grund müssen sie in den `MyScript`-Struct eingebaut werden:

```rust
pub struct MyScript {
    status: bool,
    timer: f32,
}
```

In `tick()` lassen wir den timer um die jeweilige Frame-Dauer abfallen, bis er 0.0 erreicht. Ist dies der Fall, wird er auf 1.0 gesetzt, wird der aktuelle Wert von state invertiert und anschließend der passende Wert geschrieben. Zu beachten für Rust-Anfänger ist die ungewöhnliche Verwendung von `if` im letzten Part.

```rust
    fn tick(&mut self) {
        self.timer -= delta();

        if self.timer < 0.0 {
            self.timer = 1.0;

            self.status = !self.status;

            set_var("A_LM_DoorsClosed", if self.status { 1.0 } else { 0.0 });
        }
    }
```

Er wird nun meckern, dass er `delta()` nicht kennt. Hier hilft Quickfix: Nutze `Import 'lotus-script::time::delta'`. Das `uses` wird entsprechend angepasst.

Wie wird man nun wohl dafür sorgen, dass das Blinken schneller oder langsamer abläuft? Wie könnte man asymmetrisches Blinken (lange an, kurz aus) realisieren? Oder zwischen "hell" und "schwach" wechseln?

### Klicken dazu!

Da der GT6N ja bereits über Sounds verfügt, können wir hier direkt ein Blinker-Relay-Sound mit anschließen. Hierbei ist folgendes zu beachten: In LOTUS Classic hat man zur direkten Steuerung von Sound eine Integer-Variable genutzt. Das ist jetzt anders: Man setzt die Variable mit dem selben Namen als bool-Typ auf `true`, um den Sound zu starten. LOTUS-NG-seitig wird die Variable nach der Verarbeitung direkt wieder gelöscht. Wenn man dann `false` setzt, wird der Sound gestoppt.

## Ein bisschen fahren

Ok, wenn man schon mal ein Fahrzeug hat, dann wollen wir es fahren lassen!

Erstmal ganz einfach: Wir geben auf die erste Achse konstant ein gewisses Drehmoment.

### Achse holen

Hierzu "holen" wir uns zuerst die erste Achse. Wir beginnen in `tick()` mit der folgenden Zeile:

```rust
let axle = Axle::get(0, 0);
```

Zunächst wird er wieder behaupten, dass er "Axle" nicht kennt. Mittels Quickfix (`lotus_script::vehicle::Axle`) kann das wieder sehr schnell behoben werden.

`Let` sorgt dafür, dass eine neue, lokale Variable erstellt wird. `Axle::get(0,0)` holt die vorderste Achse im vordersten Drehgestell und weist sie `axle` zu. Welchen Typ die neue Variable haben soll, ermittelt Rust aus dem Kontext. Die Entwicklungsumgebung wird anzeigen, dass es sich gemäß dem aktuellen Kontext jedoch um den Typ "Result<Axle, VehicleError>" handelt.

Dies bedeutet, dass `Axle::get(0,0)` nicht _direkt_ eine Achse liefert, sondern dass man sie erst "entpacken" muss. Wie das genau läuft, dass möge man der Rust-Dokumentation entnehmen, Stichworte sind der `Result<>`- und bei der Gelegenheit auch gleich der `Option<>`-Typ. Jedenfalls geht es hierbei darum, dass die Anfrage ja nicht unbedingt erfolgreich sein muss, mann kann ja auch illegale Drehgestell- und Achs-Indizes angeben.

Wir sind uns aber sicher, dass das Ergebnis gültig ist, und brauchen daher nur noch ein Unwrap zu ergänzen. Dann erhalten wir endlich _direkt_ unsere Achse – oder das Script stürzt ab. Aber das sollte hier ja, wie gesagt, nicht passieren:

```rust
let axle = Axle::get(0, 0).unwrap();
```

### Beschleunigen

Nun erhalten wir also die erste Achse und können damit nette Sachen machen! Zum Beispiel Drehmoment auf die Achse geben:

```rust
axle.set_traction_force_newton(20_000.0);
```

### Tacho

Da fragt man sich natürlich sofort, wie schnell fährt der Zug denn? Nun, der Tacho greift auf die Variable `v_Axle_mps_0_1_abs` zu, welche mit dem Absolutwert der Geschwindigkeit der zweiten Achse am ersten Drehgestell beschrieben werden soll. Wir müssen also nur die Geschwindigkeit der besagten Achse abgreifen, den Absolutwert ermitteln, und dann in die besagte Variable schreiben.

Um die Geschwindigkeit einer Achse zu ermitteln, brauchen wir nicht einmal `axle`, sie steht uns direkt als Publc Var zur Verfügung. Die Variable wird mit `get_var()` gelesen, das `f32::` davor ist nötig, damit klar ist, welcher Variablentyp gelesen werden soll. So sieht unser Tick aktuell aus:

```rust
    fn tick(&mut self) {
        let axle = Axle::get(0, 0).unwrap();

        axle.set_traction_force_newton(20000.0);

        let speed = f32::get_var("v_Axle_mps_0_1");

        set_var("v_Axle_mps_0_1_abs", speed.abs());
    }
```

Nach dem Einbau wirst Du nicht nur den Tacho ausschlagen sehen, sondern sogar Fahrsound hören, weil der nämlich auch direkt an die Variable gekoppelt ist.

### Abregelung

Momentan beschleunigt der Zug unendlich. Das ist zwar völliger Quatsch, aber entspricht natürlich trotzdem dem Script. Daher wollen wir eine Abregelung bei 60km/h einbauen. Wir brauchen den Wert in Metern/Sekunde, den erhalten wir durch Division durch 3,6.

Der Fortgeschrittene ist vielleicht längst drauf gekommen – eigentlich ist es eine simple if-Bedigung; ein bisschen was muss umgestellt werden, daher hier direkt noch mal die gesamte Funktion:

```rust
    fn tick(&mut self) {
        let axle = Axle::get(0, 0).unwrap();

        let speed = f32::get_var("v_Axle_mps_0_1");

        set_var("v_Axle_mps_0_1_abs", speed.abs());

        if speed < 16.67 {
            axle.set_traction_force_newton(20000.0);
        } else {
            axle.set_traction_force_newton(0.0);
        }
    }
```

Jetzt können wir natürlich noch weiter gehen und einen "Schalter" definieren, der unter einer gewissen Geschwindigkeit auf "Fahren" schaltet und über einer gewissen Geschwindigkeit auf "Bremsen".

Hierzu definieren wir (oberhalb des `impl`-Blocks) einen sogenannten Enum. Wieder mal sehr grob erklärt (siehe Rust-Doku!): Hier definiert man verschiedene Zustände, die eine Variable annehmen kann. In unserem Fall ist das "Fahren" und "Bremsen":

```rust
#[derive(Default)]
enum Traktionsmodus {
    #[default]
    Fahren,
    Bremsen,
}
```

(Diese Default-Beschriftungen definieren den Standardwert. Dies ist nötig, damit der Typ im Script-Struct verwendet werden kann.)

Wir müssen natürlich auch noch den Schalter selbst (also die Variable) definieren:

```rust
pub struct MyScript {
    traktionsmodus: Traktionsmodus,
}
```

Nachdem `axle` und `speed` ermittelt wurden und `v_Axle_mps_0_1_abs` gesetzt wurde, geht es nun anders weiter:

Zuerst prüfen wir mit einer if-Bedingung, ob wir schneller als 60 km/h (16,67m/s), dann schalten wir auf "Bremsen", oder langsamer als 10 km/h (2,78m/s), dann schalten wir auf "Fahren". Im zweiten Teil führen wir ein sogenanntes Match aus, d.h. wir lassen ihn prüfen, welchen Wert der Schalter hat, und können entsprechend reagieren. Und je nachdem setzen wir Antriebs- und Bremskräfte (ich hab die Werte mal etwas angehoben):

```rust
    fn tick(&mut self) {
        let axle = Axle::get(0, 0).unwrap();

        let speed = f32::get_var("v_Axle_mps_0_1");

        set_var("v_Axle_mps_0_1_abs", speed.abs());

        if speed > 16.67 {
            self.traktionsmodus = Traktionsmodus::Bremsen;
        } else if speed < 2.78 {
            self.traktionsmodus = Traktionsmodus::Fahren;
        }

        match self.traktionsmodus {
            Traktionsmodus::Fahren => {
                axle.set_traction_force_newton(100_000.0);
                axle.set_brake_force_newton(0.0);
            }
            Traktionsmodus::Bremsen => {
                axle.set_traction_force_newton(0.0);
                axle.set_brake_force_newton(500_000.0);
            }
        }
    }
```

### Achse in jedem Frame holen?

Der Einfachheit halber holen wir uns aktuell mit jedem Frame die Achse neu, das ist allerdings reichlich ineffizient. Später, in "richtigen" Fahrzeug-Scripts, sollte dies nicht mehr so gemacht werden! Da sollte man sich dann einmal am Anfang die Achse holen, in eine Variable schreiben und fortan direkt daraus nutzen.
