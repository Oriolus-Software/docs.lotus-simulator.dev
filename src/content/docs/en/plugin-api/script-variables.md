---
title: PUT /scripts/{id}/variables
---

    PUT http://localhost:3000/scripts/4294967358/variables

```json
{
  "my_i64": {
    "type": "i64",
    "value": 123
  },
  "my_float": {
    "type": "f64",
    "value": 123.456
  },
  "my_bool": {
    "type": "f64",
    "value": 123.456
  },
  "my_string": {
    "type": "string",
    "value": "Hello world!"
  },
  "my_content_id": {
    "type": "contentId",
    "value": {
      "user_id": 123,
      "sub_id": 456
    }
  }
}
```
