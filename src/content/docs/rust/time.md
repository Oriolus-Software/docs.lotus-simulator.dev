---
title: Time
---

To get the time elapsed between the last tick and the current tick, you can call either `delta` or
`delta_f64`. If you don't know if you need 64-bit precision or not, you most likely won't need it
and are safe to just use `delta`.

```rust
let elapsed = delta();
let elapsed_64 = delta_f64();
```

If you need to know which tick your script is currently on, for example for caching,
you can call `ticks_alive`. This will give you a number that increases after every tick.
