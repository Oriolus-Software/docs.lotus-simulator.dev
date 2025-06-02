---
title: lotus-sc
---

lotus-sc is a small tool to aid you in developing scripts. It will automatically build your script and
put it into the correct directory to be loaded by the LOTUS-Simulator.

## Installation

```bash
cargo install --locked lotus-sc
```

## Usage

Assuming you already have a `script.toml` setup.

```bash
lotus-sc deploy
```

This will automatically build your script and put it into the correct directory for LOTUS to load it.

## Release builds

Before publishing your script, you should create and test a release build. This is much smaller, faster
and efficient than the default debug builds. If you want to optimize it, look at our
[recommendations](/getting-started/recommendations/).

```bash
lotus-sc deploy --profile release
```
