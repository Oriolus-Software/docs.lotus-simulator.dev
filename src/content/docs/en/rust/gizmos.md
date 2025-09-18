---
title: Gizmos
---

Gizmos are great for debugging things in 3D space. So if you need to visualize anything in 3D space
you can use the gizmo API. Gizmos are drawn relative to the center of the object the script is attached to.

```rust
// red wire cube in the center of the object extending 0.5 units in all directions
Gizmo::wire_cube(Vec3::ZERO, (0.5, 0.5, 0.5), Color::RED).draw();

// wire sphere with a radius of 0.5
Gizmo::wire_sphere(Vec3::ZERO, 0.5, Color:RED).draw();

Gizmo::arrow(start, end, color).draw();
```
