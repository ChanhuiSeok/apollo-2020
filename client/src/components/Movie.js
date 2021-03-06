import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const LIKE_MOVIE = gql`
  mutation toggleLikeMovie($id: Int!, $isLiked: Boolean!){
    toggleLikeMovie(id: $id, isLiked: $isLiked) @client
  }
`;
// @client 표시를 함으로써 프론트엔드에 있는 것을 찾는다. 아니면 백엔드에 정의된 것을
// 찾을 것이다.

const Container = styled.div`
  height: 400px;
  border-radius: 7px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 7px;.
  background-color: transparent;
`;

const Poster = styled.div`
  background-image: url(${props => props.bg});
  height: 100%;
  width: 100%;
  border-radius: 7px;
  background-size: cover;
  background-position: center center;
`;

export default ({ id, bg, isLiked }) => {
  const [toggleMovie] = useMutation(LIKE_MOVIE, {
    variables: { id: parseInt(id), isLiked
    }
  });
  return (
  <Container>
    <Link to={`/${id}`}>
      <Poster bg={bg} />
    </Link>
      <button onClick={toggleMovie}>
        {isLiked ? "Unlike" : "Like"}
      </button>
  </Container>
  );
};