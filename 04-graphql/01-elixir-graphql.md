### A Simple GraphQL

1. Request a channel list with posts in each channel

**Request**
```
{
  channels {
    id
    name
    posts {
      id
      name
      content
    }
  }
}
```

---

**Response**
```

{
  "data": {
    "channels": [
      {
        "id": "1",
        "name": "channel 1",
        "posts": [
          {
            "content": "content 1",
            "id": "1",
            "name": "title 1"
          },
          {
            "content": "content 2",
            "id": "2",
            "name": "title 2"
          }
		]
	  }
	]
  }
}

```

---

### Define a schema

```
  query do
    @desc "Get all channels"
    field :channels, list_of(:channel) do
      resolve(&Resolvers.Posts.list_channels/3)
    end
  end
```

---

### Define channel object

```
  object :channel do
    field :id, non_null(:id)
    field :name, non_null(:string)

    field :posts, list_of(:post) do
      resolve(fn channel, _args, _res ->
        posts =
          Ecto.assoc(channel, :posts)
          |> Repo.all()

        {:ok, posts}
      end)
    end
  end
```

---

### Add a resolver

```
defmodule GuoziWeb.Resolvers.Posts do
  def list_channels(_parent, _args, _resolution) do
    {:ok, Guozi.Posts.list_channels()}
  end
end

defmodule Guozi.Posts do
  def list_channels do
    Repo.all(Channel)
  end
end
```


---

### Problem: N + 1 Queries

```
[debug] QUERY OK source="channels" db=11.8ms queue=0.6ms idle=1329.9ms
SELECT c0."id", c0."name", c0."inserted_at", c0."updated_at" FROM "channels" AS c0 []
[debug] QUERY OK source="posts" db=1.0ms queue=1.0ms idle=1353.3ms
SELECT p0."id", p0."name", p0."content", p0."channel_id", p0."inserted_at", p0."updated_at" FROM "posts" AS p0 WHERE (p0."channel_id" = $1) [1]
[debug] QUERY OK source="posts" db=2.0ms idle=1355.9ms
SELECT p0."id", p0."name", p0."content", p0."channel_id", p0."inserted_at", p0."updated_at" FROM "posts" AS p0 WHERE (p0."channel_id" = $1) [2]
[debug] QUERY OK source="posts" db=4.3ms idle=1358.3ms
SELECT p0."id", p0."name", p0."content", p0."channel_id", p0."inserted_at", p0."updated_at" FROM "posts" AS p0 WHERE (p0."channel_id" = $1) [3]
[debug] QUERY OK source="posts" db=2.7ms queue=0.1ms idle=1363.9ms
SELECT p0."id", p0."name", p0."content", p0."channel_id", p0."inserted_at", p0."updated_at" FROM "posts" AS p0 WHERE (p0."channel_id" = $1) [4]
[debug] QUERY OK source="posts" db=2.7ms idle=1367.5ms
SELECT p0."id", p0."name", p0."content", p0."channel_id", p0."inserted_at", p0."updated_at" FROM "posts" AS p0 WHERE (p0."channel_id" = $1) [5]

```

---

### References

- graphql <https://graphql.org/>
- ansinthe <https://hexdocs.pm/absinthe>
