---
title: Bausteine
---

## Allgemeine Bausteine

```rust
my_shared.forward(&other_shared);
```

Sobald in `my_shared` ein Wert geschrieben wird, wird dieser in `other_shared` geschrieben.

```rust
my_shared.forward_on_change(&other_shared);
```

Sobald in `my_shared` ein _neuer, anderer_ Wert geschrieben wird, wird dieser in `other_shared` geschrieben. Wird jedoch derselbe Wert noch einmal in `my_shared` geschrieben, dann passiert nichts.

```rust
let new_shared = my_shared.process(|v| {...});
```

Immer, wenn in `my_shared` geschrieben wird, wird die Closure (oder Funktion) aufgerufen. Darin kann man definieren, was mit dem Wert passieren soll, bevor dieser im Anschluss in `new_shared` geschrieben wird.

Wichtig ist, dass sich hierbei auch der Typ ändern darf: `my_shared` könnte z.B. ein `struct` sein, `new_shared` ein `i32`. Mit diesem Baustein lassen sich also auch Konverter bauen.

```rust
let new_shared = my_shared.process_with_init(|v| {...}, init_value);
```

Funktioniert so wie `process()`, aber mit der Möglichkeit, mittels `init_value` den Anfangswert von new_shared festzulegen.

```rust
my_shared.finally_do(|v| {...});
```

Funktioniert ebenfalls so ähnlich wie `process()`, hat aber kein Rückgabewert: Lediglich die Funktion oder Closure wird ausgeführt.

```rust
let new_shared = Shared<T>::new_shared_by_closure(|| {...})
```

Gewissermaßen das Gegenstück: Die Closure/Funktion wird in jedem Tick ausgeführt und sobald sich der Rückgabewert ändert, wird dieser in `new_shared` geschrieben.

## Einfache Operationen

Für die folgenden Bausteine gilt, dass sie in das Output-Shared immer dann schreiben, wenn in mindestens einen seiner Input-Shared geschrieben wird.

### Boolischer Output

**_ and_vec/or_vec umbenennen weil nicht nur vec? _**

```rust
let new_shared = shared_a.equal_shared(&shared_b);

let new_shared = shared_a.not_equal_shared(&shared_b);
```

Prüfung zweier Shareds auf Gleichheit oder Ungleichheit. Input können alle Typen sein, die `PartialEq` implementieren.

```rust
let new_shared = my_shared.equal_value(my_value);

let new_shared = my_shared.not_equal_value(my_value);
```

Prüfung eines Shareds auf Gleichheit oder Ungleichheit mit einem festen Wert (dieser kann zwar aus einer Variable stammen, wird aber beim Erstellen des Bausteins festgeschrieben).

```rust
let new_shared = my_shared.invert();
```

Invertiert den boolischen Wert von `my_shared`, aus True wird False, aus False wird True.

```rust
let new_shared = shared_a.and(&shared_b);
let new_shared = shared_a.or(&shared_b);
```

AND- und OR-Operatoren.

```rust
let new_shared = shared_a.greater_than_shared(&shared_b);
let new_shared = shared_a.greater_than_or_equal_shared(&shared_b);
let new_shared = shared_a.less_than_shared(&shared_b);
let new_shared = shared_a.less_than_or_equal_shared(&shared_b);

let new_shared = my_shared.greater_than_value(my_value);
let new_shared = my_shared.greater_than_or_equal_value(my_value);
let new_shared = my_shared.less_than_value(my_value);
let new_shared = my_shared.less_than_or_equal_value(my_value);
```

Vergleichsoperationen zwischen zwei Shareds bzw. einem Shared und einem festen Wert. Als Input wird aktuell nur `f32` akzeptiert.

### f64/f32

```rust
let new_shared = my_shared.f32_to_f64;

let new_shared = my_shared.f64_to_f32;
```

Konvertieren der Shared-Werte zwischen den Typen `f32` und `f64`.

### f32 als Output

```rust
let new_shared = my_shared.invert();
```

Kehrt das Vorzeichen von `my_shared` um.

```rust
let new_shared = shared_a.add_shared(&shared_b);
let new_shared = shared_a.subtract_shared(&shared_b);
let new_shared = shared_a.multiply_shared(&shared_b);
let new_shared = shared_a.divide_shared(&shared_b);

let new_shared = my_shared.add_value(my_value);
let new_shared = my_shared.subtracted_from_value(my_value);
let new_shared = my_shared.multiply_value(my_value);
let new_shared = my_shared.devides_value(my_value);
```

Addition, Subtraktrion, Multiplikation und Divison zwischen zwei Shareds oder einem Shared und einem festen Wert.

Achtung! Im Falle von `subtracted_from_value` und `devides_value` ist die Reihenfolge zu beachten: Vorne bzw. auf dem Bruchstrich steht jeweils der feste Wert, das Shared steht rechts bzw. unter dem Bruchstrich!

(Hintergrund hierfür ist die Problematik, dass hier bekanntlich die Reihenfolge der Operanden beachten muss. Die Variante Shared minus Wert lässt sich aber sehr leicht mittels einer Addition und dem Setzen eines Minuszeichens vor den Wert realisieren, entscheidend ist vielmehr der Fall "Wert minus Shared", da man hier alternativ, bei Verwendung einer Addition, eine Shared-Invertierung vornehmen müsste, welche entsprechend aufwändig ist.)
