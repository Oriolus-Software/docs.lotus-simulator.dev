---
title: Async-Konzept und Shared<>
---

Abgesehen vom klassischen Script-Konzept, bei dem structs definiert, in der `init()`-Funktion erstellt werden und im jeweiligen `tick()` individuell angelegte Funktionen ausgeführt werden, wird von Lotus auch das radikal andere Async/Await-Konzept unterstützt.

Dieses Konzept erfordert zwar eine gewisse Umgewöhnung gegenüber der klassischen Script-Programmierung, hat aber unter Anderem folgende Vorteile:

- Es werden keinerlei globale Variablen im klassischen Sinne benötigt, welche in der herkömmlichen Programmierung benötigt werden oder alternative komplizierte Ersatzkonstruktionen benötigen, bei denen man häufig mit den strengen Rust-Zugriffsregeln in Konflikt kommt.

- Die einzelnen Elemente werden bei der Initialisierung erstellt und dabei sofort zusammengestöpselt.

- Verzögerte oder zeitlich in Stufen (mit Pausen) ablaufende Vorgänge lassen sich wesentlich eleganter lösen.

## Einstiegsbeispiel

Am Besten gehen wir direkt rein mit einem Beispiel: Angenommen, ich habe eine Taste und wenn ich die drücke, dann geht der Leuchtmelder "Fernlicht" an. Dann sieht das Ganze so aus:

```rust
impl Script for TestScript {
    fn init(&mut self) {
        let button_lightcheck =  std_button(
            ButtonProperties::builder()
                .input_event("Lightcheck")
                .animation_var("A_CP_TS_LightCheck")
                .sound_on("Snd_CP_A_BtnDn")
                .sound_off("Snd_CP_A_BtnUp")
                .build(),
        );

        let button_lightcheck_float = button_lightcheck.to_float();

        button_lightcheck_float.var_writer("A_LM_FlashLight");

    }

    fn tick(&mut self) {
        lotus_rt::tick();
    }
}
```

Hier ist nun folgendes passiert:

Der Aufbau der einzelnen Module erfolgt mittels Funktionen, die aus dem `init()` heraus aufgerufen werden.

`std_button()` erstellt einen Button und verwendet dafür die `ButtonProperties`. Hierbei handelt es sich um einen einfachen `struct`, der aber in diesem Fall mit einem sogenannten Builder ausgestattet ist.

Man könnte also auch statt dem `builder()...` auch einfach schreiben `ButtonProperties{input_event: ... }`

Der Builder hat aber den Vorteil, dass das Script keine Probleme macht, wenn im Rahmen eines Updates die `ButtonProperties` mit weiteren Feldern ausgestattet werden. Auch die Behandlung von Options und Strings ist deutlich einfacher. Wichtig: Dies hat nichts mit dem Async-Konzept zu tun.

Die Rückgabe, also der Typ von `button_lightcheck` ist ein sogenannter `Shared<>` (in diesem Fall ein `Shared<bool>`). Die Shareds fungieren beim Async-Konzept als Speicher für die Zustände der Systeme. In diesen Shared wird der Zustand des Tasters übertragen.

Die nächste Zeile erstellt `button_lightcheck_float`, einen `Shared<f32>`, auf welches die Werte 0.0 oder 1.0 geschrieben werden, je nach Zustand von `button_lightcheck`.

In der dritten Zeile wird mit `var_writer()` der Wert von `button_lightcheck_float` in eine Variable geschrieben.

Das sieht alles recht umständlich aus, aber es lässt sich elegant reduzieren:

```rust
    std_button(
        ButtonProperties::builder()
            .input_event("Lightcheck")
            .animation_var("A_CP_TS_LightCheck")
            .sound_on("Snd_CP_A_BtnDn")
            .sound_off("Snd_CP_A_BtnUp")
            .build(),
        )
        .button_lightcheck
        .to_float()
        .var_writer("A_LM_FlashLight");

```

Man beachte: Dieses Stück Code erstellt zum einen die Shareds, als auch konfiguriert es den technischen Ablauf, mehr wird nicht benötigt.

Bis hierhin ist die Sache natürlich noch sehr simpel.

## Es wird umfangreicher

Jetzt wollen wir einen Schalter fürs Fernlicht einbauen, zusätzlich gibt es einen Light-Test-Taster und man kann über einen Shared, der die Spannung darstellen soll, die Helligkeit der Kontrollleuchte justieren:

```rust
    let voltage_r = Shared::<f32>::new(1.0);

    let button_lightcheck =  std_button(
        ButtonProperties::builder()
            .input_event("Lightcheck")
            .animation_var("A_CP_TS_LightCheck")
            .sound_on("Snd_CP_A_BtnDn")
            .sound_off("Snd_CP_A_BtnUp")
            .build(),
    );

    switch(
            SwitchProperties::builder()
                .toggle_event("FlashLightToggle")
                .animation_var("A_CP_SW_FlashLight")
                .sound_switch("Snd_CP_A_Switch")
                .build(),
        )
        .or(&lm_check)
        .to_float()
        .multiply(&voltage_r)
        .var_writer("A_LM_FlashLight");

```

Hier wird das Signal vom Switch genommen, dann wird die ODER-Operation zusammen mit einem anderen Shared, nämlich dem vom Lichttest, durchgeführt, dann in einen f32 zwischen 0.0 und 1.0 umgewandelt, mit der Spannung multipliziert und schließlich in eine Variable geschrieben.

Alternativ könnte man natürlich ebenso wie folgt schreiben:

```rust
    ...

    let flashlight_switch = switch(
            SwitchProperties::builder()
                .toggle_event("FlashLightToggle")
                .animation_var("A_CP_SW_FlashLight")
                .sound_switch("Snd_CP_A_Switch")
                .build(),
        );

    flashlight_switch.or(&lm_check)
        .to_float()
        .multiply(&voltage_r)
        .var_writer("A_LM_FlashLight");

```

So kann man beispielsweise den Schalterzustand separat abgreifen und an anderer Stelle weiter verwenden.

## Shareds

Shareds sind ein elementares Bauteil im Async-Konzept:

1. Normalerweise bleiben sie die ganze Lebenszeit des Scripts existent

2. Sie halten eine Variable, sie sind dabei generisch, man kann also neben den Standardtypen wie i32, f32 usw. auch jeden beliebigen, ggf. selbst definierten Typ verwenden, solange dieser Default und Clone implementiert.

3. Sie können beliebig geklont werden, trotzdem lesen und speichern beide Klone immernoch über denselben Speicherbereich.

4. Es wird verfolgt, wann sie geschrieben werden: Ein Großteil der Funktionen, gerade der einfachen wie `to_float()`, `or` usw., werden daher nur dann aktiv, wenn sich der Input-Shared verändert! Es handelt sich also nicht um Verbindungen, die ständig im Simstep abgearbeitet werden!

Durch das strenge Zugriffsmanagement von Rust ist es sehr aufwändig bis unmöglich, `mut`-Variablen pauschal durch alle möglichen Funktionen und Strukturen durchzureichen. Globale Variablen dagegen sind sehr unflexibel.

Am Beispiel mit den Türen (stark gekürzt!) wird das mit Shareds dagegen z.B. so gehandhabt (wir sind wieder im Init-Block):

```rust
...
// wird von woanders gesteuert, Herkunft blenden wir einfach mal aus
let tuer_target = Shared::<bool>::new(false);

let tuer_target_enum = tuer_target
    .process(|v| if v* { ElectricSlidingPlugDoorPairTarget::Open }
        else { ElectricSlidingPlugDoorPairTarget::Close } )

let door_1 = tuer_target_enum
    .clone()
    .electric_sliding_plug_door_pair(
        ElectricSlidingPlugDoorPairProperties::builder()
        ...
        .build(),
    );

let door_2 = tuer_target_enum
    .electric_sliding_plug_door_pair(
        ElectricSlidingPlugDoorPairProperties::builder()
        ...
        .build(),
    );

```

Zunächst ist hier noch eine sehr wichtige Funktion versteckt, nämlich `process()`. Dieser übergibt man eine Closure (also eine spezielle Art von Funktion). Die Funktion gibt einem den aktuellen Inhalt des Shareds, mit dem man nun machen kann, was man möchte. Anschließend wird der neue Wert wieder in einen Ziel-Shared geschrieben, in diesem Fall in den `tuer_target_enum`, welcher vom Typ `Shared<ElectricSlidingPlugDoorPairTarget>` ist. Ein häufiger Anwendungsfall ist wie in diesem Beispiel das freie Konvertieren beliebiger Datentypen, man kann aber natürlich auch beliebige andere Dinge tun.

Da wir `tuer_target_enum` an zwei Stellen verwenden wollen, müssen wir es für die erste TÜr klonen. Dies stellt aber, wie gesagt, kein Problem dar, wir haben es letztlich trotzdem mit demselben Speicherbereich zu tun, so dass eine Veränderung von `tuer_target` dazu führt, dass beide Türen geöffnet oder geschlossen werden.
