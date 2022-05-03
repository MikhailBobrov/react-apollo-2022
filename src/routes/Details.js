import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
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
`;

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      description_intro
      medium_cover_image
      rating
      language
      isLiked @client
    }
    suggestions(id: $id) {
      title
      medium_cover_image
    }
  }
`;

export const Details = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: {
      id: id,
    },
  });
  return (
    <div>
      <Container>
        <Column>
          <Title>
            {loading
              ? "Loading"
              : `${data?.movie?.title} ${data?.movie?.isLiked ? "👍🏻" : "😢"}`}
          </Title>
          <Subtitle>
            {data?.movie?.language} · {data?.movie?.rating}
          </Subtitle>
          <Description>{data?.movie?.description_intro}</Description>
        </Column>
        <Poster bg={data?.movie?.medium_cover_image}></Poster>
        <div>
          <p>Рекоммендации</p>
          {data?.suggestions?.map((prefer) => (
            <div>
              <h2>
                {prefer.title}
                <Poster bg={prefer?.medium_cover_image}></Poster>
              </h2>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};
