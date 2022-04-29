# GraphQL

---

# What is GraphQL

----

> GraphQL is an open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data. GraphQL was developed internally by Facebook in 2012 before being publicly released in 2015.

https://en.wikipedia.org/wiki/GraphQL

Notes: What is GraphQ

----

> GraphQL is a language for querying data. Unlike most query languages (such as SQL), you don’t use GraphQL to query a particular type of data store (such as a MySQL database). Instead, you use GraphQL to query data from any number of different sources.

https://www.apollographql.com/docs/resources/faq/#what-is-graphql

---

# layer in the stack

![layer](./architecture.png)

----

![Interface](./endpoint.png)

---

# GraphQL vs RESTFUl

----

## Restful API

```
GET /parents/:id
GET /students/:id
POST /parents
POST /students
```

----

## GraphQL API

```
type Query {
  parent(id: ID!): Parent
  student(id: ID!): Student
}

type Mutation {
  addParent(input: AddParentInput): Parent
  addStudent(input: AddStudentInput): Student
}

type Parent { ... }
type Student { ... }
input AddParentInput { ... }
input AddStudentInput { ... }
```

----

![](./queries.png)

---

# Key features of GraphQL

----
<!-- .slide: data-auto-animate -->

## Performance 1

<p class="fragment fade-up">
Prevents over-fetching
</p>
<p class="fragment fade-up">
In traditional approaches like REST, you often end up over-fetching — asking for more data than you need.
</p>
----
<!-- .slide: data-auto-animate -->

## Performance 1

Prevents over-fetching

With GraphQL, you can ask for exactly what you need. The benefit is reduced bandwidth, which may be especially important on mobile and low-energy devices.


----
<!-- .slide: data-auto-animate -->
## Performance 1

Prevents over-fetching

```
Query {
  myStudents {
    name
  }
}
```

----
<!-- .slide: data-auto-animate -->
## Performance 1

Prevents over-fetching

```
Query {
  myStudents {
    name
    mobilePhone
    uncompletedItemsCount
  }
}
```

Note:
mobilePhone need another DB query
uncompletedItemsCount is a time cost sync process

----
<!-- .slide: data-auto-animate -->

## Performance 2

<p class="fragment fade-up">
Prevents under-fetching (multiple round-trips)
</p>

----
<!-- .slide: data-auto-animate -->
## Performance 2
Prevents under-fetching (multiple round-trips)

The other end of the fetching problem in REST is not getting all the data you need in a single round-trip.

----
<!-- .slide: data-auto-animate -->
## Performance 2
Prevents under-fetching (multiple round-trips)

Consider fetching your friends list in a social media app and needing to batch individual queries to get each friend’s profile picture.

----
<!-- .slide: data-auto-animate -->
## Performance 2
Prevents under-fetching (multiple round-trips)

GraphQL helps solve this problem.

----
<!-- .slide: data-auto-animate -->
## Performance 2
Prevents under-fetching (multiple round-trips)

```
query {
  myStudents {
    name
  }
}
```

----
<!-- .slide: data-auto-animate -->
## Performance 2
Prevents under-fetching (multiple round-trips)

```
query {
  myStudents {
    name
    checklistItems {
      id
      completed
      titleText
    }
  }
}
```


---

## Architecture

----
<!-- .slide: data-auto-animate -->

- Decouples the client from the server

UI developers don’t need to wait for backend teams to build an API first.

----
<!-- .slide: data-auto-animate -->

- Decouples the client from the server

A GraphQL schema acts as a contract for front-end app devs to start building (by mocking out the API calls) and leaves backend teams to deliver on the contract by building the underlying services that serves the graph.

----

- Single source of truth

UI developers only need to know about to a single endpoint to access the entirety of the data behind a company’s graph.

----
<!-- .slide: data-auto-animate -->

- Scalable with Federation

GraphQL fits nicely into a microservice architecture using an approach called Federation.

----
<!-- .slide: data-auto-animate -->

- Scalable with Federation

Federation enables backend teams to maintain their own sub-graphs and compose them into a single graph for an entire organization.

----
<!-- .slide: data-auto-animate -->

- Scalable with Federation

![](./federation.png)

----
<!-- .slide: data-auto-animate -->

- Introspection

This key feature lets you ask the GraphQL system what types of queries it supports.


----
<!-- .slide: data-auto-animate -->

- Introspection


Introspection provides the framework for all kinds of great tooling.
There exist tools to auto-generate API docs and TypeScript types for your resolvers and queries.

----
<!-- .slide: data-auto-animate -->

- Introspection

Generate swift code from schema

https://www.apollographql.com/docs/ios/tutorial/tutorial-obtain-schema

----
<!-- .slide: data-auto-animate -->

- Introspection

Typescript codegen

https://www.apollographql.com/blog/tooling/apollo-codegen/typescript-graphql-code-generator-generate-graphql-types/

---
<!-- .slide: data-auto-animate -->

## Developer experience

----
<!-- .slide: data-auto-animate -->
## Developer experience

- Hierarchical & declarative

GraphQL data is inherently graphical and declarative. This makes your queries easier to understand and your data easier to work with. By nesting, we can ask for related data, keeping queries cohesive, and spending zero time stitching together multiple responses like we sometimes have to do with REST.

----
<!-- .slide: data-auto-animate -->
## Developer experience

- Strongly typed (stable API)

GraphQL is strongly typed. This means a more stable API with fewer bugs in development and introduces the possibility of more intelligent tooling.

----
<!-- .slide: data-auto-animate -->
## Developer experience

- GraphQL versioning

GraphQL favors the notion of a single, incrementally developed graph. You can give deprecation hints when you add, remove, and change fields on your existing graph. Compare this to the coarse-grained approach to versioning in a REST context with version numbers across an entire API.


---

# GraphQL in Client


----

![](./twitter_mobile.png)

https://marmelab.com/blog/2017/09/07/dive-into-graphql-part-iv-building-a-graphql-client-with-reactjs.html

----

```
query homePageQuery {
    currentUser: User {
        id
        username
        full_name
        avatar_url
    }
    tweets: Tweets(limit:10) {
      ...
    }
}
```
----

```
query homePageQuery {
    ...
    tweets: Tweets(limit:10) {
        id
        body
        date
        author: Author {
          ...
        }
        stats: Stats {
          ...
        }
    }
}
```
----

```
query homePageQuery {
    ...
    tweets: Tweets(limit:10) {
        ...
        author: Author {
            id
            username
            avatar_url
        }
        stats: Stats {
          ...
        }
    }
}
```

----

```
query homePageQuery {
    ...
    tweets: Tweets(limit:10) {
        ...
        author: Author {
            ...
        }
        stats: Stats {
            views
            likes
            responses
        }
    }
}
```

---

# GraphQL in OpenApply

---

## new added gems

![gems](./gems.png)

----

![doc](./doc.png)

https://faria.devel-01.openapply.cn/graphiql

----

## Generators

![](./generators.png)

----

### generate graphql object

```
bin/rails g graphql:object parent
```

----

Fields from DB

![](./parent-type.png)


----

## Custom fields

Fields not in DB

![](./custom-fields.png)

---

## relation between objects

----

![](./family-in-app.png)

----

![](./family.png)


----

### extras: parent

parent is the upper layer student object

![](./custom-fields.png)

----

![](./role-name.png)

----

```

Query myStudents {
  name
  parents {
    roleName
    name
  }
}

```

----

![](./student-query.png)

---

### global id

----

![](./global-id-in-spec.png)

----

![](./student-type.png)

----

![](./load-student.png)

---

### Enum

![](./gender-enum.png)

----

![](./gender-in-doc.png)

----

![](./locale-enum.png)

only allow 0-9, a-z, A-Z, and underscore for enum

Note:
can only use alpha letters:
_0-9a-zA-Z


---

## Interface

![](./checklist-item-type.png)

----

![](./checklist-item-in-doc.png)

----

![](./checklist-item-open-day-type.png)

----

![](./checklist-item-questionnair-type.png)

----

```
{
  myStudents {
    checklistItems {
      __typename
      id
      ... on ChecklistItemOpenDay {
        event {
          eventTimeDetail
          eventTitle
          eventHostName
        }
      ... on ChecklistItemQuestionnaire {
        exportPdfUrl
        resendEmailUrl
      }
```

----
![](./checklist-item-open-day.png)

---

### Connections

----

![](./messages.png)

----

![](./relay-connections.png)

https://relay.dev/graphql/connections.htm

----

![](./messages-connections.png)

----

## an issue about connection

----

![](./connections-issue-not-stable.png)

----

![](./connections-issue-not-stable-2.png)

----

graphql-ruby has stable connections in pro version


----

![](./graphql-ruby-connections.png)

----

## find a opensource replcement

https://github.com/bibendi/graphql-connections

----


![](./stable-connections-repo.png)

----

#### id-based Stable connections

![](./stable-connections-in-code.png)

---


### direct upload file


----

Steps:

- create an attachment record in OA
- upload file to AWS directly from client

----

![](./create-attachment.png)

----

![](./create-attachment-in-code.png)

----

![](./create-attachment-response.png)

----
<!-- .slide: data-auto-animate -->

#### Problems

Resized versions of avatar need to be generated at OA servers.

----
<!-- .slide: data-auto-animate -->

#### Problems

Resized versions of avatar need to be generated at OA servers.

Solution:

Use the old RESTful way to upload avatar files

---

# Error Handlering

----

# action types

When an error occurs

- go to login page
- show an error toast at the same page

----

## Unauthorized Error

Client should redirect to Login page in case of

- token wrong
- token expired
- password updated
- login in another phone


----

## Other kind of Errors

Client should stay in the same page and show a toast for the error.

---

# Testing

----

A GraphQL spec structure

- set query
- set variables
- post graphql request
- test the result

----

![](./test-messages.png)

----

GraphQL Macros

----

![](./graphql-macros.png)

----

## RSpec Matcher

----


![](./graphql-matcher.png)

----

- expect not to get an error

```
post_graphql
expect(response).to not_have_graphql_error
```

- expect to get an error

```
post_graphql
expect(response).to have_graphql_error "Invalid Token"
```

---

# Challenges & considerations

----

- client side cache
- rate limit
- server size caching
- logging
- integrates with APM

----

When GraphQL was first released, major topic areas like caching, query complexity, and security were major concerns in the community.

----

Over the years as GraphQL and the larger community around it matured, we’ve identified common solutions and best practices to the majority of these problem areas.


---

# The End
