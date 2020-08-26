import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import {gql} from "apollo-boost";

const GET_MOVIE = gql`
  query getMovie($id:Int!){ # 이 부분은 for Apollo(변수 type 검사)
    movie(id: $id){ # 여기서부터는 실제 graphQL 서버에서 사용하는 쿼리
      id
      title
      medium_cover_image
      description_intro
    }
  }
`;

export default () => {
  const { id } = useParams();

  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id }
  });
  
  if(loading){
    return "loading"
  }
  if (data && data.movie){
    return data.movie.title;
  }
  return "Detail";
}