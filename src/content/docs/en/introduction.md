---
title: Introduction
---

LOTUS can load any WASM file as a script, as long as it exports necessary function which
the simulator will call. If you are using the [lotus-script crate](https://crates.io/crates/lotus-script)
all of this is already handled for you.

If you want to see some debugging information about the currently running vehicle script, press `F4`
and tick `script-debug`.

Development scripts are loaded from `%APPDATA/Roaming/LOTUS-Simulator/overrides/{USER_ID}/{SUB_ID}/*.wasm`.
These take precedence over any scripts in containers and scripts that we deliver. This means that you
can provide your own scripts for any object, including ones not owned by you.

## Contribution

If you want to contribute to any of the Rust crates, take a look at our [GitHub repositories](https://github.com/orgs/Oriolus-Software/repositories).
Everything scripting related (except the implementation in the simulator) are open-source.

In case you want to create your own language bindings for language of your choice, please [message me on Discord](https://discordapp.com/users/343436495698264075).
