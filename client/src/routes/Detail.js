import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import styled from "styled-components";

const GET_MOVIE = gql`
  query getMovie($id:Int!){ # 이 부분은 for Apollo(변수 type 검사)
    movie(id: $id){ # 여기서부터는 실제 graphQL 서버에서 사용하는 쿼리
      title
      medium_cover_image
      language
      rating
      description_intro
    }
    suggestions(id: $id){
      id
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width:50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
  width: 50%;
`;

const Poster = styled.div`
  background-image: url(${props => props.bg});
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-size: cover;
  background-position: center center;
`;


export default () => {
  const { id } = useParams();

  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id }
  });
  
  return (
    <Container>
      <Column>
        <Title>{loading? "Loading..." : data.movie.title}</Title>
          <Subtitle>{data?.movie?.language} · {data?.movie?.rating}</Subtitle>
          <Description>{data?.movie?.description_intro}</Description>
      </Column>
      <Poster bg={data?.movie?.medium_cover_image}>
      </Poster>
    </Container>
  );
}