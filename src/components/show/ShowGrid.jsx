import React from 'react';
import ShowCard from './ShowCard';
import IMAGE_NOT_FOUND from '../../images/not-found.png';
import { FlexGrid } from '../styled';
import { useShows } from '../../misc/Custom-hooks';

const ShowGrid = ({ data }) => {
  //   console.log(data);   // in place of item we could have also used ({show}) and then key would be show.id only in line 15

  // eslint-disable-next-line no-unused-vars
  const [starredShows, dispatchStarred] = useShows();
  return (
    <FlexGrid>
      {data.map(item => {
        const isStarred = starredShows.includes(item.show.id);
        const onStarClick = () => {
          if (isStarred) {
            dispatchStarred({ type: 'REMOVE', showId: item.show.id });
          } else {
            dispatchStarred({ type: 'ADD', showId: item.show.id });
          }
        };
        return (
          <ShowCard
            key={item.show.id}
            id={item.show.id}
            name={item.show.name}
            image={item.show.image ? item.show.image.medium : IMAGE_NOT_FOUND}
            summary={item.show.summary}
            onStarClick={onStarClick}
            isStarred={isStarred}
          />
        );
      })}
    </FlexGrid>
  );
};

export default ShowGrid;
