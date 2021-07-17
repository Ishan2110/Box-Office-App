import React from 'react';
import ShowCard from './ShowCard';
import IMAGE_NOT_FOUND from '../../images/not-found.png';
import { FlexGrid } from '../styled';

const ShowGrid = ({ data }) => {
  //   console.log(data);   // in place of item we could have also used ({show}) and then key would be show.id only in line 8
  return (
    <FlexGrid>
      {data.map(item => (
        <ShowCard
          key={item.show.id}
          url={item.show.url}
          name={item.show.name}
          image={item.show.image ? item.show.image.medium : IMAGE_NOT_FOUND}
          summary={item.show.summary}
        />
      ))}
    </FlexGrid>
  );
};

export default ShowGrid;
