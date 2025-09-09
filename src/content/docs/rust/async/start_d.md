---
title: Einstieg und Motivation
---

## Einleitung

Vielen ist bereits die traditionelle Simulations-Script-Programmierung vertraut: Man baut sich zunächst per `default()` oder
`init()` eine Struktur von Variablen auf und lässt dann `tick()` pro Frame diverse Methoden und Untermethoden aufrufen, mit denen dann die einzelnen Simulationsschritte durchlaufen werden.

Wenn man Rust für die Scriptprogrammierung nutzt, kann man aber auch einen anderen Ansatz wählen, der auf dem Prinzip der zueinander asynchron laufenden Funktionen basiert.

Hierauf basierend haben wir insbesondere für die Fahrzeug-Scripts ein umfangreiches Baukastensystem entwickelt. Es erfordert zwar einiges Umdenken, aber es hat diverse Vorteile und es lohnt sich ein Blick darauf! Insbesondere weil es sich auch um die herkömmliche Programmierung ergänzen lässt, falls dies notwendig ist.

Als Einstieg hier einmal die Gegenüberstellung eines "traditionellen" Scripts und einem Async-Baukasten-Scripts:

### Aufgabe

Die Public-Variable `pubvar_1` soll gelesen werden, dann sollen ein paar Berechnungen durchgeführt werden und das Ergebnis in `pubvar_2` gespeichert werden. Die Berechnung soll aber nur durchgeführt werden, wenn sich der Wert der eingelesenen Variable geändert hat. Außerdem soll vom restlichen Script der Wert eines Zwischenergebnis (`interessant`) abgerufen werden können.

### Klassische Variante:

`lib.rs:`

```rust
...

script!(Testscript);

pub struct Beispielscript {
    obj: Beispielobjekt,
}

impl Default for Beispielscript {
    fn default() -> Self {
        Self {
            obj: Beispielobjekt::new(4),
        }
    }
}

impl Script for Beispielscript {
    fn tick(&mut self) {
        self.obj.tick();

        let interessant = obj.get_interessant();
        log::info!("interessant = {}", interessant);
    }
}
...
```

`beispielobjekt.rs:`

```rust
...

pub struct Beispielobjekt {
    interessant: i32,
    feld2: i32,
    feld3: i32,
}

impl Beispielobjekt {
    pub fn new(init: i32) -> Self {
        Self {
            interessant: 5,
            feld2: 24,
            feld3: init,
        }
    }

    pub fn tick(&mut self) {
        let old_feld2 = self.feld2;

        self.feld2 = var_get("pubvar_1");

        if old_feld2 != self.feld2 {
            self.interessant = self.feld2 + 3;
            let a = self.feld2 * self.feld3;
            var_set("pubvar_2", a);
        }
    }

    pub fn get_interessant(&self) -> i32 {
        self.interessant
    }
}
```

### Variante mit Async-Baukasten:

`lib.rs:`

```rust
...

script!(Testscript);

pub struct Beispielscript {
    obj_interessant: Shared<i32>,
}

impl Default for Beispielscript {
    fn default() -> Self {
        Self{
            obj_interessant: beispielobjekt(4),
        }
    }
}

impl Script for Beispielscript {
    fn tick(&mut self) {
        // folgende Zeile muss nur einmal
        // im ganzen Tick aufgerufen werden!
        lotus_rt::tick();

        //-----------------

        let inter = self.obj_interessant.get();
        log::info!("interessant = {}", inter);
    }
}
...
```

`beispielobjekt.rs:`

```rust
...

fn beispielobjekt(init: i32) -> Shared<i32> {
    let interessant = Shared<i32>::default();

    let feld2 = Shared::<i32>::var_reader("pubvar_1");

    feld2.add_to(3).forward(&interessant);
    feld2.multiply_by(init).var_writer("pubvar_2");

    interessant
}
```

Die ersten drei Vorteile zeigen sich schon bei einem ersten Blick:

- Wesentlich kürzer
- Vermeidung unnötiger Status-Variablen (hier: feld2 taucht nur lokal auf, feld3 wird gar nicht benötigt, init kann direkt verwendet werden)
- Viele der sich ständig wiederholende Implementierungen fallen komplett weg - hier bspw. die so oft vorkommende Prüfung auf Variablenveränderung.

## Und nu?

Falls Dein Interesse geweckt ist, dann geht's mit den nächsten Artikeln weiter. Sie bauen in der Reihenfolge im Menü aufeinander auf, was aber natürlich niemanden davon abhalten soll, auch ein bisschen "durcheinander" zu lesen, im Gegenteil. :-)
