import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  resolvers: {
    Movie: {
      isLiked: () => false // Local State
    },
    Mutation: {
      toggleLikeMovie: (_, { id, isLiked}, {cache}) => { //function, 서버에 있는
        // graphql resolver와 같이 동작한다.
        cache.writeData({
          id: `Movie:${id}`,
          data: {
            isLiked: !isLiked,
          }
        });
      }
    }
  }
});

export default client;