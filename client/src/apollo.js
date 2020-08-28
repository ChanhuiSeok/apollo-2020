import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  resolvers: {
    Movie: {
      isLiked: () => false // Local State
    },
    Mutation: {
      likeMovie: (_, { id}, {cache}) => { //function, 서버에 있는
        // graphql resolver와 같이 동작한다.
        cache.writeData({
          id: `Movie:${id}`,
          data: {
            isLiked: true,
          }
        });
      }
    }
  }
});

export default client;