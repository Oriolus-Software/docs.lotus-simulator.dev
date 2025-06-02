---
title: script.toml
---

## Example

```toml
[deploy]
# Optional: The package in the cargo workspace that should be deployed.
package = "my-package"
# Required: The user id of the target to attach the script to.
user-id = 1234
# Required: The sub id of the target to attach the script to.
sub-id = 5678
```

## Future

In the future this file will change to properly support workspaces and allow for a single script
to be deployed for multiple objects.
