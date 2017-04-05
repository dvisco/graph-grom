import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress } from 'graphql-server-express';

const myGraphQLSchema = `
type User {
  id: Int! # the ! means that every User object _must_ have an id
  username: String
  roles: [Role] # the list of Roles for this user
  profile: Profile
}

type Profile {
  id: Int!
  firstName: String
  lastName: String
  photoUrl: String
  user: User
  swipes: [Swipe]
}

type Role {
  id: Int!
  authority: String
  user: User
}

type Swipe {
  id: Int!
  direction: String
  swiper: Profile
  swipee: Profile
}

# the schema allows the following query:
type Query {
  users: [User]
}

# this schema allows the following mutation:

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: Query
}
`;// ... define or import your schema here!
const PORT = 3000;
var app = express();

const resolveFunctions = {
  Query: {
    posts() {
      return posts;
    },
  },
  Mutation: {
    upvotePost(_, { postId }) {
      const post = find(posts, { id: postId });
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      return post;
    },
  },
  Author: {
    posts(author) {
      return filter(posts, { authorId: author.id });
    },
  },
  Post: {
    author(post) {
      return find(authors, { id: post.authorId });
    },
  },
};



// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema: myGraphQLSchema,
    context: {
        Users: new Entries(),
        Profiles: new Comments(),
    },
}));

app.listen(PORT);
