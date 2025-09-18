---
title: Configuration
---

# Configuration - scripts.toml

In your project root, create a `scripts.toml` file. A `scripts.toml` looks like this:

```toml
[[script]]
user_id = 123
sub_id = 456
# Available options are `cargo` for Rust and `tinygo` for Go
toolchain = "cargo"
# Optional (defaults to the current directory), mostly useful for having multiple scripts in the same project root
directory = "my-subfolder"
```

If you have multiple scripts you want to deploy or just want to deploy the same script to multiple content ids, just have multiple `[[script]]` blocks.
