---
title: Messages
---

For general semantics of how messages are send and handled, see the [messages reference](/en/reference/messages/).

## Define custom message types

If you want to define your own message type cause the built-in ones don't fit your needs, you can do that
by creating a `struct` which can be serialized, deserialized and implements the `MessageType` trait.

```rust
#[derive(Serialize, Deserialize)]
pub struct MyMessage {
  a_field: u32,
}

message_type!(MyMessage, "my-namespace", "my-message");
// or if you want to also define a bus this message uses
message_type!(MyMessage, "my-namespace", "my-message", "my-bus");
```

## Sending messages

To send message, call the `send_message` function and pass it a reference to the message you want to send
and a list of targets to send to.

```rust
// Send to a "single" target
send_message(&MyMessage { a_field: 42 }, MessageTarget::broadcast_all());
// Send to multiple targets
send_message(&MyMessage { a_field: 42 }, &[MessageTarget::Parent, MessageTarget::MySelf]);
```

## Receiving and handling messages

To receive messages you implement the `Script::on_message` method on your script.
This method will be called for every message your script receives.

This message by itself is not that helpful, since it can be everything. To handle a specific message type,
you can call the `Message::handle` method and pass it a closure or function with your handler. If the received message
is not of the specified type, nothing will happen. This way you can easily handle all messages you are interested in
and ignore the rest without any special handling on your side.

```rust
impl Script for MyScript {
  fn on_message(&mut self, msg: Message) {
    msg.handle(|my_message: MyMessage| {
      log::info!("Received my_message with a_field={}", my_message.a_field);
      Ok(())
    }).unwrap();
  }
}
```
