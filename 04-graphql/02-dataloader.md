
---

### Dataloader


```
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

### References

- facebook databloader https://github.com/facebook/dataloader
- dataloader <https://hexdocs.pm/dataloader/Dataloader.html>
- absinthe helpers for dataloader <https://hexdocs.pm/absinthe/Absinthe.Resolution.Helpers.html>
- blog https://www.erlang-solutions.com/blog/optimizing-graphql-with-dataloader/
