import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';

const Home = () => {
  const [input, setInput] = useState('');

  const onInputChange = event => {
    setInput(event.target.value);
  };

  const onSearch = () => {
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
      .then(resp => {
        return resp.json();
      })
      .then(event => console.log(event));
  };

  const onKeyDown = e => {
    if (e.keyCode === 13) {
      fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
        .then(resp => {
          return resp.json();
        })
        .then(event => console.log(event));
    }
  };

  return (
    <>
      <MainPageLayout>
        <input
          type="text"
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          value={input}
        />
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </MainPageLayout>
    </>
  );
};

export default Home;
