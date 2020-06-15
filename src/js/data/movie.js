import consts from './consts.js';

class Movie {

  static getMovie(endpoint, keyword = null) {
    const baseUrl = consts.BASE_URL_API;
    const apiKey = consts.API_KEY;
    let endpointTarget = ""; 
    let fetchEndpoint = "";
    
    if (keyword == null) {
      if (endpoint == consts.ENDPOINT_GET_MOVIE_POPULAR) {
        endpointTarget = consts.ENDPOINT_GET_MOVIE_POPULAR;
      } else if (endpoint == consts.ENDPOINT_GET_MOVIE_TOP_RATED) {
        endpointTarget = consts.ENDPOINT_GET_MOVIE_TOP_RATED;
      } else if (endpoint == consts.ENDPOINT_GET_MOVIE_NOW_PLAYING) {
        endpointTarget = consts.ENDPOINT_GET_MOVIE_NOW_PLAYING;
      }
      fetchEndpoint =`${baseUrl}${endpointTarget}?api_key=${apiKey}`;
    } else {
      endpointTarget = consts.ENDPOINT_GET_SEARCH_MOVIE + "?query=" + keyword;
      fetchEndpoint =`${baseUrl}${endpointTarget}&api_key=${apiKey}`;
    }

    setUiLoading('block'); // show loading

    return fetch(fetchEndpoint)
      .then(response => {
        return response.json();
      })
      .then(response => {

        if(response) {
          return Promise.resolve(response.results);
        } else {
          return Promise.reject("Something Went Wrong");
        }
      })
      .catch(error => {
        console.log(error);
      });

    function setUiLoading(display) {
      document.getElementById('loader').style.display = display;
    }
  }

  static getDetailMovie(id) {
    const baseUrl = consts.BASE_URL_API;
    const apiKey = consts.API_KEY;
    let endpoint = consts.ENDPOINT_GET_MOVIE_BY_ID; 

    setUiLoading('block'); // show loading

    return fetch(`${baseUrl}${endpoint}${id}?api_key=${apiKey}`)
    .then(response => {
      return response.json();
    })
    .then(response => {

      if(response) {
        return Promise.resolve(response);
      } else {
        return Promise.reject("Something Went Wrong");
      }
    })
    .catch(error => {
      console.log(error);
    });

    function setUiLoading(display) {
      document.getElementById('loader').style.display = display;
    }
  }

}

export default Movie;