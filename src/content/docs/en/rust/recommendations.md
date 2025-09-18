---
title: Recommendations
---

## Faster iteration times

LOTUS-Simulator already supports hot-reloading of scripts. This means you do not need to restart the simulator to see changes in your script.
Anyhow, sometimes you do want to restart the simulator and load in the same map with the same vehicle at the same entry point. To do this
you can add the `--quickstart` option. This will load the last map and vehicle at the entry point you used.

## Smaller and faster wasm

The smaller the wasm file the faster it will load and the footprint will be smaller as well. To get really small wasm files without
sacrificing the standard library and getting the most performance, add the following to your `Cargo.toml`:

```toml
[profile.release]
opt-level = 3
lto = true
debug = false
panic = "abort"
strip = true
codegen-units = 1
```

This setup is nice for release builds, but for development this will make your build times longer and you have pretty much no debugging
capabilities. So for development builds you can use the following:

```toml
[profile.dev]
opt-level = 1
```

Feel free to experiment if you want another balance between build times, wasm size and debugging capabilities.

Choose between the profiles by using the `--profile` option in `lotus-sc`.

```bash
lotus-sc --profile dev
# or
lotus-sc --profile release
```

## Stack size

Rust build to WASM by default uses a 1MiB stack. This is great for most applications, but much more
than needed for a script in LOTUS. To change the stack size you can put the following into your
`.cargo/config.toml`.

```toml
[target.wasm32-unknown-unknown]
rustflags = [
  "-C", "link-args=-z stack-size=65536",
]
```
