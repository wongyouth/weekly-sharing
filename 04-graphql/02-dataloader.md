## Dataloader
#### A solution for N+1 queries problem

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

#### SQL log


```
[debug] QUERY OK source="channels" db=11.8ms queue=0.6ms idle=1329.9ms
SELECT c0."id", c0."name", c0."inserted_at", c0."updated_at" FROM "channels" AS c0 []
[debug] QUERY OK source="posts" db=1.0ms queue=1.0ms idle=1353.3ms
SELECT p0."id", p0."name", p0."content", p0."channel_id", p0."inserted_at", p0."updated_at" FROM "posts" AS p0 WHERE (p0."channel_id" = $1) [1]
[debug] QUERY OK source="posts" db=2.0ms idle=1355.9ms
SELECT p0."id", p0."name", p0."content", p0."channel_id", p0."inserted_at", p0."updated_at" FROM "posts" AS p0 WHERE (p0."channel_id" = $1) [2]
[debug] QUERY OK source="posts" db=4.3ms idle=1358.3ms
SELECT p0."id", p0."name", p0."content", p0."channel_id", p0."inserted_at", p0."updated_at" FROM "posts" AS p0 WHERE (p0."channel_id" = $1) [3]

```


---

### log after using dataloader

```
[debug] QUERY OK source="channels" db=1.4ms idle=1650.4ms
SELECT c0."id", c0."name", c0."inserted_at", c0."updated_at" FROM "channels" AS c0 []
[debug] QUERY OK source="posts" db=1.2ms idle=1652.4ms
SELECT p0."id", p0."name", p0."content", p0."channel_id", p0."inserted_at", p0."updated_at", p0."channel_id" FROM "posts" AS p0 WHERE (p0."channel_id" = ANY($1)) ORDER BY p0."channel_id" [[5, 4, 3, 2, 1]]
```

---


### Dataloader


- facebook dataloader https://github.com/facebook/dataloader

---

### JS Demo


---

### Dataloader in Elixir

- dataloader for elixir <https://hexdocs.pm/dataloader>


---

### Example Code

```elixir
source = Dataloader.Ecto.new(MyApp.Repo)

# setup the loader
loader = Dataloader.new |> Dataloader.add_source(:db, source)

# load some things
loader =
  loader
  |> Dataloader.load(:db, Organization, 1)
  |> Dataloader.load_many(:db, Organization, [4, 9])

# actually retrieve them
loader = Dataloader.run(loader)

# Now we can get whatever values out we want
organizations = Dataloader.get_many(loader, :db, Organization, [1,4])
```

---

### Dataloader with Absinthe


- absinthe helpers for dataloader <https://hexdocs.pm/absinthe/Absinthe.Resolution.Helpers.html>

---

### References

- facebook dataloader https://github.com/facebook/dataloader
- dataloader for elixir <https://hexdocs.pm/dataloader/Dataloader.html>
- absinthe helpers for dataloader <https://hexdocs.pm/absinthe/Absinthe.Resolution.Helpers.html>
- blog https://www.erlang-solutions.com/blog/optimizing-graphql-with-dataloader/

---

## The END
