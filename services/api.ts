export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_TMDB_PUBLIC_API_KEY,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {

// Determine the endpoint based on whether a search query is provided. If a query exists, use the search endpoint; otherwise, use the discover endpoint to fetch popular movies.
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: TMDB_CONFIG.headers,
  });

  console.log("The url that is called 👉", endpoint)

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  const data = await response.json();
  // console.log("Data retuned 👉", data.results)
  return data.results;
};

//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjFkODAzMzU4NTg3NDgzNDBhMDIzY2I2YjgzNzFkOSIsIm5iZiI6MTY3MDI3MjAwNC44MjYsInN1YiI6IjYzOGU1NDA0MWY5OGQxMDA4NDcxZmZhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i85kN84WW6POKjzG3ECxPZgFuYfjvgOZ9hmwSIjwo0g'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));
