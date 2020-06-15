import './../components/top-bar.js';
import './../components/movie-list.js';
import './../components/movie-detail.js';
import './../components/footer-text.js';

import consts from './../data/consts.js';
import dataMovie from './../data/movie.js';

const main = () => {
  const elementArticle = document.querySelector("article");
  const elementNavItemCategories = document.querySelectorAll(".nav-item-category");
  const elementMovieList = document.querySelector("movie-list");
  const elementInputSearchMovie = document.getElementById("search-in");
  const elementButtonSearchMovie = document.getElementById("search-btn");
  let elementMovieItems = "";
  let elementMovieDetail = "";
  
  elementButtonSearchMovie.addEventListener('click', (e) => {
    console.log(elementInputSearchMovie.value);
    if (elementInputSearchMovie.value != "") {
      loadMovie(consts.ENDPOINT_GET_SEARCH_MOVIE, "SEARCH", elementInputSearchMovie.value);
    }
  });

  function loadMovie(endpoint, category, keyword) {
    dataMovie.getMovie(endpoint, keyword)
    .then((results) => {
      updateUiMovieList(results, category, keyword);
      setUiLoading('none'); // hide loading
    })
    .catch((msg) => {
      updateUiMovieListError(msg);
      setUiLoading('none'); // hide loading
    });
  };

  function loadDetailMovie(id) {
    dataMovie.getDetailMovie(id)
    .then((result) => {
      updateUiDetailMovie(result);
      setUiLoading('none'); // hide loading
    })
    .catch((msg) => {
      updateUiDetailMovieError(msg);
      setUiLoading('none'); // hide loading
    });
  };

  function setUiLoading(display) {
    document.getElementById('loader').style.display = display;
  }

  function updateUiDetailMovie(result) {
    elementMovieDetail.movie = result;
  }

  function updateUiDetailMovieError(msg) {
    elementMovieDetail.renderError(msg);
  }

  function updateUiMovieList(results, category, keyword) {

    elementArticle.innerHTML = "";

    elementArticle.appendChild(elementMovieList);
    
    const data = {
      results: results,
      category: category,
      keyword: keyword
    }
    elementMovieList.movies = data;

    elementMovieItems = document.querySelectorAll("movie-item");
    onMovieItemClicked(elementMovieItems);
  }

  function updateUiMovieListError (msg) {
    elementMovieList.renderError(msg);
  }

  function onMovieItemClicked(elementMovieItems) {
    elementMovieItems.forEach(el => {
      el.addEventListener('click', (ev) => {

        elementNavItemCategories.forEach(el => {
          el.classList.remove('active');
        });

        elementArticle.innerHTML = "";

        const id = parseInt(el.getAttribute('data-id'));

        elementMovieDetail = document.createElement("movie-detail"); 

        elementArticle.appendChild(elementMovieDetail);

        loadDetailMovie(id);
      });
    });
  }

  // load movie first time
  loadMovie(consts.ENDPOINT_GET_MOVIE_POPULAR, "Popular", null);

  // event click nav item category
  elementNavItemCategories.forEach(el => {
    el.addEventListener('click', (ev) => {
      const category = el.getAttribute('data-category-movie');
      const elementNavItemCategory = document.querySelector('.nav-item-category.active');

      if (elementNavItemCategory !== null) {
        elementNavItemCategory.classList.remove('active');
        ev.target.classList.add('active');        
      }

      if (category == "popular") {
        loadMovie(consts.ENDPOINT_GET_MOVIE_POPULAR, "Popular", null);
      } else if (category == "top_rated") {
        loadMovie(consts.ENDPOINT_GET_MOVIE_TOP_RATED, "Top Rated", null);
      } else if (category == "now_playing") {
        loadMovie(consts.ENDPOINT_GET_MOVIE_NOW_PLAYING, "Now Playing", null);
      }

      ev.preventDefault();
    });
  });
};

export default main;