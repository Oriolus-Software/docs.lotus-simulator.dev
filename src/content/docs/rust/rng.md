---
title: RNG
---

Random numbers can be generated with the `gen_f64` and `gen_u64` functions. By default the seed for your
script will always be the same. This means that if you generate 10 random numbers at the start of your
script, these will always be the same 10 numbers no matter how often or when your script gets loaded.

If you need more randomness, you can seed the RNG by either using `seed` and pass in your own seed
or call `random_seed` to seed it with a random number.

```rust
// between 0.0 and 1.0
let random = gen_f64();

// between 10 and 100 (exclusive)
let random = gen_u64(10..100);

// between 10 and 100 (inclusive)
let random = gen_u64(10..=100);
```
