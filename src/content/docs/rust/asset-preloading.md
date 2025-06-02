---
title: Asset preloading
---

If you know that you will need a specific asset like a bitmap font later in your script,
you can improve the latency of accessing/using it by preloading the asset. This way
it will be loaded before it is actually used. Keep in mind that preloaded assets
will not be unloaded until the script gets deallocated, even if they are not used
anywhere.

```rust
preload(ContentId { user_id: 1000, sub_id: 1000 });
```
