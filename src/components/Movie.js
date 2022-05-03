import { Link } from "react-router-dom";
import styled from "styled-components";
import { gql, useMutation, useQuery } from "@apollo/client";

const LIKE_MOVIE = gql`
  mutation toggleLikeMovie($id: Int!, $isLiked: Boolean!) {
    toggleLikeMovie(id: $id, isLiked: $isLiked) @client
  }
`;

const Container = styled.div`
  height: 380px;
  width: 100%;
  border-radius: 7px;
  overflow: hidden;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;
const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
`;

export const Movie = ({ id, bg, isLiked }) => {
  const [toggleLikeMovie] = useMutation(LIKE_MOVIE, {
    variables: {
      id: parseInt(id),
      isLiked: isLiked,
    },
  });
  return (
    <div style={{ width: "100" }}>
      <Container>
        <Link to={`/${id}`}>
          <Poster bg={bg} />
        </Link>
      </Container>
      <button onClick={toggleLikeMovie}>
        {isLiked ? "Не нравится" : "Нравится"}
      </button>
    </div>
  );
};
