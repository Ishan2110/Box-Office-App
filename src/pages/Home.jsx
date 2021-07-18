import React, { useState } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGET } from '../misc/Config';
import { useLastQuery } from '../misc/Custom-hooks';

const Home = () => {
  const [input, setInput] = useLastQuery(); // for search bar
  const [results, setResults] = useState(null); // for resuts array from API
  const [SearchOption, setSearchOption] = useState('shows'); // for searchoption of shows or actors

  const isShowsSearch = SearchOption === 'shows';

  const onInputChange = event => {
    setInput(event.target.value);
  };

  const onSearch = () => {
    apiGET(`/search/${SearchOption}?q=${input}`).then(result => {
      setResults(result);
    });
  };

  const onKeyDown = e => {
    if (e.keyCode === 13) {
      onSearch();
    }
  };

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No Results</div>;
    }
    if (results && results.length > 0) {
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    }

    return null;
  };

  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };

  //   console.log(SearchOption);

  return (
    <MainPageLayout>
      <input
        type="text"
        placeholder="Search for something"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />

      <div>
        <label htmlFor="shows-search">
          Shows
          <input
            id="shows-search"
            type="radio"
            value="shows"
            checked={isShowsSearch}
            onChange={onRadioChange}
          />
        </label>
        <label htmlFor="actors-search">
          Actors
          <input
            id="actors-search"
            type="radio"
            value="people"
            checked={!isShowsSearch}
            onChange={onRadioChange}
          />
        </label>
      </div>

      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
