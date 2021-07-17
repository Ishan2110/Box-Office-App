import React from 'react';
import { StyledShowCard } from './ShowCard.styled';
// import { Link } from 'react-router-dom';

const ShowCard = ({ url, image, name, summary }) => {
  const summaryAsText = summary
    ? `${summary.split(' ').slice(0, 10).join(' ').replace(/<.+?>/g, '')}...`
    : 'No description';

  return (
    <StyledShowCard>
      <div className="img-wrapper">
        <img src={image} alt="show" />
      </div>

      <h1>{name}</h1>

      <p>{summaryAsText}</p>

      <div className="btns">
        {/* <Link to={`/show/${id}`}>Read more</Link> */}
        <a href={url}>Read more</a>
        <button type="button">Star me</button>
      </div>
    </StyledShowCard>
  );
};

export default ShowCard;
