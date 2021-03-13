### nested input parameters

```
  input_object :post_input do
    field :name, non_null(:string)
    field :content, non_null(:string)
    field :channel_id, non_null(:id)
  end
```

---
### Update schema

```
    @desc "Create a post"
    field :create_post, type: :post do
      arg(:post, :post_input)

      resolve(&Resolvers.Posts.create_post/3)
    end
```

---
### Absinthe middleware

```
  # Add below code in schema file
  
  def middleware(middlewares, _field, %{identifier: :mutation}) do
    middlewares ++ [GuoziWeb.Middlewares.HandleChangesetErrors]
  end

  def middleware(middlewares, _, _) do
    middlewares
  end
```

https://hexdocs.pm/absinthe/middleware-and-plugins.html#content

---

### Update resolver file

```
  def create_post(_parent, %{post: post}, _) do
    post
    |> Posts.create_post()
  end
```

---

###

