import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { apiGET } from '../misc/Config';

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

const initialState = {
  show: null,
  isloading: true,
  error: null,
};

const Show = () => {
  const { id } = useParams();

  const [{ show, isloading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    // for useEffect cleanup,so that we dont get error when we change page and data is being loaded on DOM.
    let isMounted = true;

    apiGET(`shows/${id}?embed[]=seasons&embed[]=cast`)
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

    return () => {
      isMounted = false;
    };
  }, [id]);

  console.log('show', show);

  if (isloading) {
    return <div>Data is being loaded</div>;
  }

  if (error) {
    return <div>Error occured : {error}</div>;
  }

  return <div>This is show page</div>;
};

export default Show;
