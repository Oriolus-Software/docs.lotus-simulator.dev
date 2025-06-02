---
title: Input
---

Player input is bound to actions, an action is more or less just a string identifier. With this identifier you
can retrieve the current state of the action like `None`, `JustPressed`, `Pressed`, `JustReleased`. You can also
get the `cockpit_index` if the action was triggered in a specific cockpit.

Input actions will are bound to specific keys. If you define custom input actions, you have to provide a default
key binding, the user can change that, but this nothing you have to worry about. The only thing you need to remember
is the identifier of the action you want to monitor.

## Retrieve current action state

```rust
let state = action::state("Throttle");
if state.kind.is_just_pressed() {
  log::info!("Throttle has just been pressed");
}
```

## Mouse input

```rust
let delta = mouse_delta();
log::info!("Horizontal: {} Vertical: {}", delta.x, delta.y);
```

## Register custom actions

To register custom actions, you implement the `actions` method of the `Script` trait
which returns a `Vec` of the actions you want to register. You can use the `ActionsBuilder`
to make this process easier.

```rust
impl Script for MyScript {
  fn actions() -> Vec<RegisterAction> {
    ActionsBuilder::new()
      .push("my-custom-action", KeyCode::KeyM)
      .push("my-other-action", KeyCode::KeyA)
      .build()
  }
}
```
