import { useReducer, useEffect, useState } from 'react';
import { apiGET } from './Config';

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

// what this function basically does is return results corresponding to Local Stoagage which holds the starred items by the user.
// updates the state with the help of useReducer
export function useShows(key = 'shows') {
  return usePersistedReducer(showsReducer, [], key);
}

// This is used so that lazy evaluation happens and state is only initialised once at the start and isnt rerendered again and again
// without the data changing
export function useLastQuery(key = 'lastQuery') {
  const [input, setInput] = useState(() => {
    const persisted = sessionStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : '';
  });

  const setPersistedInput = newState => {
    setInput(newState);
    sessionStorage.setItem(key, JSON.stringify(newState));
  };

  return [input, setPersistedInput];
}

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { isloading: false, error: null, show: action.show };

    case 'FETCH_FAILED':
      return { ...prevState, isloading: true, error: action.error };

    default:
      return prevState;
  }
};

export function useShow(showId) {
  const [state, dispatch] = useReducer(reducer, {
    show: null,
    isloading: true,
    error: null,
  });

  useEffect(() => {
    // for useEffect cleanup,so that we dont get error when we change page and data is being loaded on DOM.
    let isMounted = true;

    apiGET(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', show: results });
        }
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', error: err.message });
        }
      });

    // useEffect Cleanup
    return () => {
      isMounted = false;
    };
  }, [showId]);

  return state;
}
