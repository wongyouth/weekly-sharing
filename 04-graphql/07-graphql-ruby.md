# Rails & GraphQL

Step by Step to create a simple example

---

## Step 1. New Rails Repo

```
rails new graphql-ruby-example
cd graphql-ruby-example
git init .
git a .
git commit -m 'Init Commit'
```

---


## Step 2. Add GraphqQL Gem

add the line to the end of Gemfile

```
gem 'graphql'
```

run command to download the data

```
bundle install
```

---


## Step 3. Generate GraphQL skeleton

```
rails g graphql:install
```

A new gem is added in Gemfile

```
gem 'graphiql-rails', group: :development
```

rerun command to install

```
bundle install
```

---

## Step 4. Scaffold for Post

run

```
rails g scaffold Post title truncated_preview content:text
```

---

### Step 5. Scaffold for Commnet

run

```
rails g scaffold Comment post:references content:text
```

---

### Step 6. prepare database

edit `db/seed.rb` file

```
Post.create([
  { title: 'Post 1', truncated_preview: 'great...', content: 'GraphQL is great'},
  { title: 'Post 2', truncated_preview: 'wonderful...', content: 'GraphQL is wonderful'},
])

Comment.create([
  { post_id: 1, content: 'Post 1 Comment'},
  { post_id: 2, content: 'Post 2 Comment'},
])
```
----

Populate database

```
rake db:migrate
```

----

Start server to check list

```
rails server
```

---

### Step 7. Generate object types

run

```
rails g graphql:object Post 'comments:[Comment]'
rails g graphql:object Comment post:Post
```

----

```
module Types
  class PostType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: true
    field :truncated_preview, String, null: true
    field :content, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :comments, [Types::CommentType], null: false
  end
end
````

----

````
module Types
  class CommentType < Types::BaseObject
    field :id, ID, null: false
    field :post_id, Integer, null: false
    field :content, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :post, [Types::PostType], null: false
  end
end
````

---


### Step 8. A simple query example

add `post` and `posts` query to get data

----

query single post

```
    field :post, PostType, null: false do
      argument :id, ID, required: true
    end

    def post(id: )
      Post.find id
    end
```

----

query multiple posts

```
    field :posts, [PostType], null: false do
      argument :ids, [ID], required: false
    end

    def posts(ids: [])
      posts = Post.all
      posts = posts.where(id: ids) if ids.present?
      posts
    end
```

---


### fix a bug

Respect `ids` parameter, return nothing if `ids` is blank

----

### Diff of [ID], [ID]!, [ID!], [ID!]!

- [ID] not required
- [ID]! param is required
- [ID!] item should not be null
- [ID!]! item should not be null, and is required

----

```
    def posts(ids: nil)
      posts = Post.all
      posts = posts.where(id: ids) unless ids.nil?
      posts
    end
```

---


### Toughts

- pagination
- composition
- authentication
- data loader
- testing
- security

---


### THE END
