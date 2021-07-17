import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGET } from '../misc/Config';

const Show = () => {
  const { id } = useParams();

  const [show, setShow] = useState(null);
  const [isloading, Setisloading] = useState(true);
  const [error, Seterror] = useState(null);

  useEffect(() => {
    // for useEffect cleanup,so that we dont get error when we change page and data is being loaded on DOM.
    let isMounted = true;

    apiGET(`shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          setShow(results);
          Setisloading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          Seterror(err.message);
          Setisloading(false);
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
