---
title: Textures
---

You can create textures, draw on them, draw them onto other textures and apply them to objects
in the world.

```rust
// width: 800, height: 600
let texture = Texture::create((800, 600))
```

See the code docs for [Texture](https://docs.rs/lotus-script/latest/lotus_script/graphics/textures/struct.Texture.html) for
possible draw commands.

## Bitmap fonts

You can load LOTUS bitmap fonts to draw them onto a texture. To draw a bitmap font onto a texture you first
need to have it loaded. See [asset preloading](/en/rust/asset-preloading/) if you need more control over the
load process.

### Bitmap font metadata

If you need metadata about the font, for example for getting the length of provided text, you need to load
it first.

```rust
// try_load will return None as long as the font is not loaded. Just trying to load it
// will enqueue it to be loaded. After it's loaded it will return Some
if let Some(font) = BitmapFont::try_load(ContentId { user_id: 1000, sub_id: 1000 }) {
  let props = font.properties();
  let hello_len = font.text_len("hello", 1);
}
```

### Drawing with a font

To draw with a font, you don't need to load it manually, you can just use the `Texture::draw_text` method
with a content id.

```rust
let texture = Texture::create((800, 600));
let font_id = ContentId { user_id: 1000, sub_id: 1000 };
let top_left = (0, 0);
let letter_spacing = 5;
let full_color = None;

texture.draw_text(
  font_id,
  "hello",
  top_left,
  letter_spacing,
  full_color,
  AlphaMode::Opaque
);
```

## Technical details

Everything you draw on textures happens asynchronously, all `Texture::draw_*` methods
just enqueue whatever you want to draw and the engine will process these in the background.
This means that changes to textures may not be visible in the same frame. If you want
to see your changes immediately you can call `Texture::flush`, which tries to apply all changes.
Since for example a font may not be loaded that you want to draw, this may not actually
draw everything. The `Texture::flush` method will return `true` if everything has been drawn
and `false` otherwise. This also applies to reading pixels via `Texture::read_pixel`.
