/* eslint-disable no-underscore-dangle */
// This is basically the show page which will show the data when Read More is clicked
import React from 'react';
import { useParams } from 'react-router-dom';
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import ShowMainData from '../components/show/ShowMainData';
import { useShow } from '../misc/Custom-hooks';
import { InfoBlock, ShowPageWrapper } from './Show.Styled';

const Show = () => {
  const { id } = useParams(); // Gets the dynamic id when the page changes which can be processed further for
  // updates regarding read more and other things

  const { show, isloading, error } = useShow(id);

  if (isloading) {
    return <div>Data is being loaded</div>;
  }

  if (error) {
    return <div>Error occured : {error}</div>;
  }

  return (
    <ShowPageWrapper>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />

      <InfoBlock>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </InfoBlock>

      <InfoBlock>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </InfoBlock>

      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Show;