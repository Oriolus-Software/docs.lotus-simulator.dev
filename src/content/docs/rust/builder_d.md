---
title: Builder
---

Die Builder werden hier primär deshalb beschrieben, damit die Beispiele und der Code des Async-Baukastens leichter zu verstehen ist, für andere Techniken sind sie aktuell nur untergeordnet relevant. Auch wenn deren Verwendung auf den ersten Blick aufwendiger wirkt, so sind sie durchaus sehr praktisch, wenn es darum geht, externe `structs` zu nutzen.

Angenommen, wir haben folgenden Struct und folgende Funktion:

```rust
#[derive(Builder)]
struct PropertiesABC {
  param_a: f32,
  param_b: i16,
  param_c: i32,
}

fn init_function(a: PropertiesABC){
    …
}
```

Dann kann man natürlich erstmal eine Variable vom Typ `PropertiesABC` erstellen, oder man erstellt diese direkt inline. Dann sieht der zugehörige Funktionsaufruf so aus:

```rust
init_function( PropertiesABC{param_a: 1.0, param_b: 42, param_c: 411});
```

Da nun aber der Struct auch mit dem Builder-Derive ausgestattet ist, funktioniert auch dieser Aufruf:

```rust
init_function(
    PropertiesABC::builder()
        .param_a(1.0)
        .param_b(42)
        .param_c(411)
        .build(),
)
```

So weit, so kompliziert… ;-)

Jetzt wird es aber interessant: Wenn die Felder `param_b` und `param_c` Options sind, dann kann man sie einfach weglassen:

```rust
#[derive(Builder)]
struct PropertiesABC {
  param_a: f32,
  param_b: Option<i16>,
  param_c: Option<i32>,
}

// Klassischer Aufruf:
init_function( PropertiesABC{param_a: 1.0, param_b: None, param_c: None});

// Aufruf mit Builder
init_function(
    PropertiesABC::builder()
        .param_a(1.0)
        .build(),
)
```

Das ist schon mal besonders praktisch bei Structs mit vielen optionalen Feldern.

Auch der Umgang mit Strings und Vektoren wird damit eleganter, weil entsprechende Konvertierungen komplett weggelassen werden können:

```rust
#[derive(Builder)]
struct PropertiesABC {
    #[builder(into)]
    param_a: String,
}

// Klassischer Aufruf - an den String muss noch 'to_string()'
// angehängt werden ==> schlechtere Lesbarkeit
init_function( PropertiesABC{param_a: "foo".to_string());

// Aufruf mit Builder
init_function(
    PropertiesABC::builder()
        .param_a("foo")
        .build(),
)
```

Und das Beste: Wenn der Lieferant der Bibliothek nachträglich ein viertes Feld hinzufügt, dann muss Dein Code in keiner Weise angepasst werden (sofern das Feld ein `Option<>` ist oder `default` implementiert):

```rust
#[derive(Builder)]
struct PropertiesABC {
  param_a: f32,
  param_b: Option<i16>,
  param_c: Option<i32>,
  new_param: Option<f64>
}

// Klassischer Aufruf: FEHLERHAFT, new_param fehlt!
init_function( PropertiesABC{param_a: 1.0, param_b: None, param_c: None});

// Aufruf mit Builder: Weiterhin korrekt
init_function(
    PropertiesABC::builder()
        .param_a(1.0)
        .build(),
)
```
