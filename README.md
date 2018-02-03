# ts-factory
A way to build factories for TypeScript objects

[![Travis CI](https://img.shields.io/travis/nertzy/ts-factory/master.svg)](https://travis-ci.org/nertzy/ts-factory)
[![npm](https://img.shields.io/npm/v/ts-factory.svg)](https://www.npmjs.com/package/ts-factory)
[![GitHub license](https://img.shields.io/github/license/nertzy/ts-factory.svg)](https://github.com/nertzy/ts-factory/blob/master/LICENSE)

## Installation
```
$ npm install ts-factory
```

```
$ yarn add ts-factory
```

## buildFactory
```typescript
buildFactory<T extends object>(defaultObject: T): (overrides?: Partial<T>) => T
```
`buildFactory` takes a type parameter and a default object of that type. It returns a function that takes an optional partial object of field overrides.

### Example
Consider the following types:

```typescript
interface Author {
  id?: number;
  name: string;
  email: string;
}

interface Comment {
  id?: number;
  author: Author;
  text: string;
}

interface BlogPost {
  id?: number;
  author: Author;
  title: string;
  body: string;
  comments: Comment[];
}
```

We can make a factory for Author by calling `buildFactory` with a default object. Note that optional fields may be omitted.

```typescript
import { buildFactory } from "ts-factory";

export const buildAuthor = buildFactory<Author>({
  name: "Grant Hutchins",
  email: "granthutchins@example.com"
});
```

We can now use the `buildAuthor()` function to construct Author instances.

```typescript
buildAuthor();
// returns {
//   name: "Grant Hutchins",
//   email: "granthutchins@example.com"
// }

buildAuthor({});
// returns {
//   name: "Grant Hutchins",
//   email: "granthutchins@example.com"
// }

buildAuthor({name: "Mr. Hutchins"});
// returns {
//   name: "Mr. Hutchins",
//   email: "granthutchins@example.com"
// }

buildAuthor({id: 1});
// returns {
//   id: 1,
//   name: "Grant Hutchins",
//   email: "granthutchins@example.com"
// }
```

We can now use `buildAuthor` to make it easier to build a factory for Comment.

```typescript
import { buildFactory } from "ts-factory";

export const buildComment = buildFactory<Comment>({
  author: buildAuthor(),
  text: "myText"
});
```

Now we can easily build a Comment, knowing that its Author will also be valid.

```typescript
buildComment();
// returns {
//   author: {
//     name: "Grant Hutchins",
//     email: "granthutchins@example.com"
//   },
//   text: "myText"
// }

buildComment({});
// returns {
//   author: {
//     name: "Grant Hutchins",
//     email: "granthutchins@example.com"
//   },
//   text: "myText"
// }

buildComment({id: 1});
// returns {
//   id: 1,
//   author: {
//     name: "Grant Hutchins",
//     email: "granthutchins@example.com"
//   },
//   text: "myText"
// }

const anotherAuthor = buildAuthor({
  id: 2,
  name: "Another Author",
  email: "another_author@example.com",
});

buildComment({author: anotherAuthor});
// returns {
//   author: {
//     id: 2,
//     name: "Another Author",
//     email: "another_author@example.com"
//   },
//   text: "myText"
// }

```

We can use `buildComment` to make it easier to build the default array of comments in `buildBlogPost`.

```typescript
export const buildBlogPost = buildFactory<BlogPost>({
  author: buildAuthor(),
  title: "myTitle",
  body: "myBody",
  comments: [buildComment()]
});
```

Now you can confidently build a BlogPost with as much or as little data as you want.

```typescript
buildBlogPost();
// returns {
//   author: {
//     name: "Grant Hutchins",
//     email: "granthutchins@example.com"
//   },
//   title: "myTitle",
//   body: "myBody",
//   comments: [
//     {
//       author: {
//         name: "Grant Hutchins",
//         email: "granthutchins@example.com",
//         text: "myText"
//       }
//     }
//   ]
// }

buildBlogPost({
  id: 3, 
  comments: []
});
// returns {
//   id: 3,
//   author: {
//     name: "Grant Hutchins",
//     email: "granthutchins@example.com"
//   },
//   title: "myTitle",
//   body: "myBody",
//   comments: []
// }

buildBlogPost({
  id: 3, 
  author: buildAuthor({id: 4}),
  comments: [
    buildComment({
      id: 5,
      author: buildAuthor({
        id: 6
      })
    }), 
    buildComment({
      author: buildAuthor({
        id: 7
      })
    }), 
  ]
});
// returns {
//   id: 3,
//   author: {
//     id: 4,
//     name: "Grant Hutchins",
//     email: "granthutchins@example.com"
//   },
//   title: "myTitle",
//   body: "myBody",
//   comments: [
//     {
//       id: 5,
//       author: {
//         id: 6,
//         name: "Grant Hutchins",
//         email: "granthutchins@example.com",
//       },
//       text: "myText"
//     },
//     {
//       author: {
//         id: 7,
//         name: "Grant Hutchins",
//         email: "granthutchins@example.com",
//       },
//       text: "myText"
//     }
//   ]
// }
```

## FAQs

Isn't this just currying one argument to Object.assign / lodash.assign?

> Yes. 

Why can't I just do that myself?

> You can.

Then what's the point?

> The parameterized type argument helps guide you to get the types of the default objects and the overrides correct. It's not much, but it does help a small bit. 

OK, how does it help?

> One example: if you add a required field to an interface that is heavily used throughout your test suite, you can just go in and add a value for this new field to its factory's default object and now all of your tests that use the factory will compile.