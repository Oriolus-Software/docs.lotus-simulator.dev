---
title: POST /scripts/{id}/messages
---

    POST http://localhost:3000/scripts/4294967358/messages

```json
{
  "meta": {
    "namespace": "required",
    "identifier": "required",
    "bus": "optional"
  },
  "value": "The value of the message, can be anything (string, number, object, array etc.)"
}
```
