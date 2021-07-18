import { useReducer, useEffect } from 'react';

function showsReducer(prevState, action) {
  switch (action.type) {
    case 'ADD':
      return [...prevState, action.showId];

    case 'REMOVE':
      return prevState.filter(showId => {
        return showId !== action.showId;
      });

    default:
      return prevState;
  }
}

function usePersistedReducer(reducer, initialState, key) {
  // Whenever we need to compute initial state we should third agument in useReducer and whatever the third argument returns will
  // be set as the initialState regardless of what the secobd argument is.
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const persisted = localStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}

export function useShows(key = 'shows') {
  return usePersistedReducer(showsReducer, [], key);
}
