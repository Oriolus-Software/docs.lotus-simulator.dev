---
title: Variables
---

With variables you can influence for example animations and sounds. When you try to get a variable which is not set,
the variable will be initialized with its default value (for example 0 for numerical types).

## Get

```rust
// explicitly type the get_var function
let my_int = i32::get_var("myVariableName");
// explicitly type the binding
let my_int: i32 = get_var("myVariableName");

// in case the variable type can be inferred
let my_int = get_var("myVariableName");
```

## Set

```rust
set_var("myVariableName", 42);
```
