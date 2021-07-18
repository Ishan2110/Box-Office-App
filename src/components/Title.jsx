import React, { memo } from 'react';
import { TitleWrapper } from './Title.Styled';

const Title = ({ title, subtitle }) => {
  return (
    <TitleWrapper>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </TitleWrapper>
  );
};

export default memo(Title);

// We used memo so that title does not get re-rendered again and again.
// Memo works by comparing the prev props to the current or next and then re-rendering if the props changed.
