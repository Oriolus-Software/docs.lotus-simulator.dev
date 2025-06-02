---
title: Messages
---

To communicate with other scripts you can send messages. A message can be anything, a simple boolean or even complex
data structures. When you send a message, it will not be delivered immediately. When all scripts finished their `tick`
messages will be delivered before `late_tick` gets called. This means as long as you don't send messages in `late_tick`
they will be handled in the same tick they were sent. If sent in `late_tick` they will be effectively delivered
in the next tick.

All of this is necessary to properly execute all scripts in parallel.
