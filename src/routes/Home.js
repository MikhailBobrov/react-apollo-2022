import { gql, useQuery } from "@apollo/client";
import { Movie } from "../components/Movie";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Header = styled.header`
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  height: 45vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Subtitle = styled.h3`
  font-size: 35px;
`;

const Loading = styled.div`
  font-size: 18px;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 10px;
`;

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 60%;
  position: relative;
  top: -50px;
`;

const GET_MOVIES = gql`
  query Movies {
    movies {
      id
      medium_cover_image
      isLiked @client
    }
  }
`;

export const Home = () => {
  const { loading, data } = useQuery(GET_MOVIES);
  return (
    <Container>
      <Header>
        <Title>Apollo 2021</Title>
        <Subtitle>База фильмов на React, Apollo, GraphQL</Subtitle>
      </Header>
      {loading && <Loading>Загрузка...</Loading>}
      {!loading && data?.movies && (
        <Movies>
          {data.movies.map((m) => (
            <Movie
              key={m.id}
              id={m.id}
              bg={m.medium_cover_image}
              isLiked={m.isLiked}
            />
          ))}
        </Movies>
      )}
    </Container>
  );
};