---
title: Logging
---

Logging related macros can be found in the `log` module. You have access to different log levels
like `info`, `warning`, `error`, etc. These take [formatting strings](https://doc.rust-lang.org/std/fmt/).

To see your logs, open the `Script debug` window.

```rust
let answer = 42;
log::info!("The ultimate answer is {answer}");

let hello = "world";
log::warning!("{hello} is {} characters long", hello.len());
```
