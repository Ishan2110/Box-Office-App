const API_BASE_URL = 'https://api.tvmaze.com';

export async function apiGET(queryString) {
  const response = await fetch(`${API_BASE_URL}${queryString}`).then(resp => {
    return resp.json();
  });

  // throw new Error('Oops');

  return response;
}
