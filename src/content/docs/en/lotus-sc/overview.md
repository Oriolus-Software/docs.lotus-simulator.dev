---
title: Overview
---

`lotus-sc` is a CLI tool that helps you develop scripts for LOTUS. It takes care of invoking the compiler with the correct toolchain and copying your script into a directory where the LOTUS-Simulator will pick it up. It supports hot-reloading so you do not need to restart the simulator.

## Installation

You can download the installer from [here](http://nexus.lotus-simulator.dev/assets/lotus-sc-installer/lotus-sc-installer.exe).

From there on `lotus-sc` will automatically update itself, so you don't need to keep it up-to-date yourself.

## Usage

For up-to-date usage information please use `lotus-sc --help` for a general overview and for specific help you can use `lotus-sc <subcommand> --help` (replace `<subcommand>` with the command you want help for).

### Script compilation and deployment

    lotus-sc deploy
    lotus-sc deploy --release

### Automatic compilation and deployment when source files change

    lotus-sc watch

Please note: for file watching to be useful you need to be in a git repository and have a `.gitignore` setup. lotus-sc will use this information to only trigger recompiles if actually needed.
