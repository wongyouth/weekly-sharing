### Create a channel

```
mutation {
  create_channel(name: "Wechat") {
  	id
  }
}
```

---

### Return result

```
{
  "data": {
    "createChannel": {
      "id": "24"
    }
  }
}
```

---

### Error handling

```
{
  "data": {
    "createChannel": null
  },
  "errors": [
    {
      "locations": [
        {
          "column": 3,
          "line": 2
        }
      ],
      "message": "name has already been taken",
      "path": [
        "createChannel"
      ]
    }
  ]
}
```

https://www.apollographql.com/docs/apollo-server/data/errors/

---

### Complex input parameter

```

```

---

###

```
```

---