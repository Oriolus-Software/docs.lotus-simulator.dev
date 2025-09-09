---
title: Asynchrones Konzept und Async-Baukasten
---

## Einleitung

Der Hauptteil dieser Dokumentation erklärt den Umgang mit dem RT-Extra-Baukasten. Einen ganz kleinen Einblick in die dahinter liegende Technik gebe ich am Ende dieses Artikels.

## Gesamt-Aufbau

Bisher haben wir uns nur darum gekümmert, Bausteine innerhalb von Funktionen zu "verkabeln".
Üblicherweise möchte man die verschiedenen Bausteine auf verschiedene Dateien/Module aufteilen, statt dass eine einzelne Funktion
das gesamte Fahrzeugscript zusammenbaut.

Daher möchte ich hier kurz anreißen, wie ich meine Fahrzeugscripts aufbaue, weil ich es so einfach, aber auch schön
und übersichtlich finde.

### Ein bestimmtes Modul

Nehmen wir als Beispiel das Cockpit-Modul. Hier verhält es sich so, dass die meisten Taster und Leuchtmelder von extern gelesen/geschrieben werden müssen. Ausnahme ist z.B. der Lichttest, der muss von außen nicht abgefragt werden. Dementsprechend wird ein passendes struct angelegt:

```rust
pub struct Cockpit {
    light: Shared<bool>,
    doors: Shared<bool>,
    …
}
```

Für's Erstellen und Verkabeln der Bausteine verwenden wir einfach die Funktion `default()` der Default-Implementierung, die automatisch
aufgerufen wird. Für das Erstellen der Bausteine, die nach außen hin les-/schreibbar sein sollen, gibt es dann zwei verschiedene Varianten, die auch gemischt angewendet werden können:

Entweder lässt man den Baustein per `let` einer lokalen Variable zuweisen und überträgt diese dann (siehe im Beispiel `light`), oder man erstellt den Baustein direkt im struct (siehe im Beispiel `doors`). Der Lightcheck-Button wird dagegen nur lokal gespeichert.

```rust
impl Default for Cockpit {
    fn default() -> Self {
        let light_check = std_button(…);

        let light = std_button(…);

        Self{
            // da der Name der lokalen Variable mit dem des Structs
            // identisch ist, geht auch die vereinfachte Version "light,":
            light: light,

            doors: std_button(…),
        }
    }
}
```

Als nächstes brauchen wir ein Parent-Modul welches die verschiedenen Modulen verbindet, der Name könnte z.B. system_interface lauten. Hierbei übernimmt es auch die Rolle des technischen
Transfers: Der Richtungwender, Sollwertgeber und Türschalter liefern ja erstmal nur rohe Werte, wohingegen die Traktion und die
Türsteuerungen konkret aufbereitete Werte benötigen. Die Zusammenführung und Verarbeitung übernimmt nun dieses Modul. Gleichzeitig definiert es auch das Struct mit den jeweiligen Untermodulen.

Letzteres sieht dann z.B. so aus:

```rust
#[derive(Clone)]
pub struct Systems {
    pub cockpit: Cockpit,
    pub power: Power,
    pub traction: Traction,
    pub brakes: Brakes,
    pub flaps_and_co: FlapsAndCo,
    …
}
```

Um die einzelnen Module zu erstellen, aber auch untereinander zu verkabeln, wird wieder ein Default implementiert. Die Verkabelungen kann man schön in einzelne Unterfunktionen aufteilen, die man wiederum als Methoden von `Systems` definiert:

```rust
impl Default for Systems {
    fn default() -> Self {
        let interface = Self {
            cockpit: CockpitState::default(),
            power: Power::default(),
            traction: Traction::default(),
            brakes: Brakes::default(),
            flaps_and_co: FlapsAndCo::default(),
            …
        };

        interface.general_stuff();

        interface.power_stuff();

        …

        interface
    }
}

impl Systems {
    fn general_stuff(&self) {
        Shared::<f32>::var_reader("v_Axle_mps_0_0").var_writer("v_Axle_mps_0_0_abs");

        Shared::<f32>::var_reader("v_Axle_mps_0_1")
            .var_writer("Tacho_Speed_MPS")
            .forward(&self.cockpit.tacho);

        self.cockpit
            .fahrtwender_state
            .not_equal_const(FahrtwenderState::Neutral)
            .forward(&self.fahrtwender_on);

        self.cockpit
            .token_fahrtwender
            .equal_const(Some(TokenFahrtwender::Hinten))
            .forward(&self.flaps_and_co.fahrtwender_set_back);
    }

    fn interface.power_stuff(&self) {
        …
    }

    …
}

```

Schließlich muss nur noch `Systems` als Feld des Scripts hinzugefügt werden und das Script-Struct mit der Default-Derive ausgestattet sein:

```rust
#[derive(Default)]
pub struct ScriptV6e {
    systems: Systems;
}
```

Das Default-Derive sorgt dann automatisch dafür, dass `systems` mit dessen Default-Implementierung initialisiert wird, worüber wiederum die einzelnen Untermodule initialisiert und verkabelt werden.

## Weitere nette Vereinfachungen

### Ähnliche Bausteine

Ein klassisches Beispiel sind Dashboards mit vielen baugleichen Tastern. Da bestimmte Parameter beim Zusammenbau im Falle dieses Dashboards
immer gleich sind, kann man hierfür eine eigene Funktion anlegen, die dann einerseits nur die variierenden Parameter (Animation und Event) benötigt und andererseits selbst ohne Builder aufgerufen werden kann, ohne dass man die Vorteile desselben verliert:

```rust
  fn default() -> Self {
    fn gt6n_button(input_event: &str, animation_var: &str) -> Shared<bool>{
        std_button(
            ButtonProperties::builder()
                .input_event(InputEvent::new(input_event, 0))
                .animation_var(animation_var)
                .sound_on("Snd_CP_A_BtnDn")
                .sound_off("Snd_CP_A_BtnUp")
                .build(),
        )
    }

    …
    light = gt6n_button("Light_Toggle", "switch_light_pos");
    heater = gt6n_button("Heater_OnOff", "switch_heater_pos");
    …
  }
```
