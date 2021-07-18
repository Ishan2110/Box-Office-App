import React, { useState, useCallback } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import CustomRadio from '../components/CustomRadio';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGET } from '../misc/Config';
import { useLastQuery } from '../misc/Custom-hooks';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './Home.Styled';

// The below func isn't a part of home component and won't be rendered again till results is passed as argument.
const renderResults = results => {
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

const Home = () => {
  const [input, setInput] = useLastQuery(); // for search bar
  const [results, setResults] = useState(null); // for resuts array from API
  const [SearchOption, setSearchOption] = useState('shows'); // for searchoption of shows or actors

  const isShowsSearch = SearchOption === 'shows';

  const onInputChange = useCallback(
    event => {
      setInput(event.target.value);
    },
    [setInput]
  );

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

  // We have used useCallback as Custom Radio in line 76 below passes OnRadioChange as props to CustomRadio
  // but we can't use memo in CustomRadio as it's a function which is an object and memo doesn't work for objects.
  const onRadioChange = useCallback(ev => {
    setSearchOption(ev.target.value);
  }, []);

  //   console.log(SearchOption);

  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        placeholder="Search for something"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />

      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="shows-search"
            value="shows"
            checked={isShowsSearch}
            onChange={onRadioChange}
          />
        </div>

        <div>
          <CustomRadio
            label="Actors"
            id="actors-search"
            value="people"
            checked={!isShowsSearch}
            onChange={onRadioChange}
          />
        </div>
      </RadioInputsWrapper>

      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>
      {renderResults(results)}
    </MainPageLayout>
  );
};

export default Home;
