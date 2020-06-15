import consts from './../data/consts.js';

class MovieDetail extends HTMLElement {

  set movie(movie) {
    this._movie = movie;
    this.render();
  }

  render() {
    const data = this._movie;

    const urlImage = consts.ENDPOINT_URL_IMG_500;
    const defaultNoBackdropPath = 'https://i.imgur.com/ujqOFoV.jpg';
    const defaultNoPosterPath = 'https://i.imgur.com/RLmLlR8.jpg';
    const backdrop = (data.backdrop_path == null) ? defaultNoBackdropPath : urlImage + data.backdrop_path;
    const poster = (data.poster_path == null) ? defaultNoPosterPath : urlImage + data.poster_path;

    const title = data.original_title;

    const releaseDate = data.release_date;
    const releaseDateSplited = releaseDate.split("-");
    const releaseDateYear = releaseDateSplited[0];

    const voteAverage = data.vote_average;
    const splitedVoteAverage = voteAverage.toString().split('.')[0] + voteAverage.toString().split('.')[1];
    const userScore = splitedVoteAverage;

    const duration = data.runtime;
    const status = data.status;

    const releaseDateDay = releaseDateSplited[2];
    const releaseDateMonth = releaseDateSplited[1];

    const budget = (data.budget == 0) ? '-' : getFormatUSD(data.budget);

    const productionCountries = data.production_countries;
    const productionCountry = getListDataInline(productionCountries);

    const spokenLanguages = data.spoken_languages;
    const spokenLanguage = getListDataInline(spokenLanguages);

    const genres = data.genres;
    const genre = getListDataInline(genres);

    const revenue = (data.revenue == 0) ? '-' : getFormatUSD(data.revenue);

    const tagline = (data.tagline == "") ? '-' : data.tagline;

    const overview = (data.overview == "") ? '-' : data.overview;

    this.innerHTML = `
      <img src="${backdrop}" class="img-fluid rounded-lg d-block mb-4 img-backdrop" alt="Oops..Image Errors">
      <div class="row justify-content-between">
        <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
          <img src="${poster}" class="img-fluid rounded-lg d-block img-poster-detail" alt="Oops..Image Errors">
        </div>
        <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 mb-2">
          <h2 class="h4">${title}</h2>
          <span class="d-block lead">${releaseDateYear}</span>
          <small class="d-block">User score: ${userScore}%</small>
          <hr>
          <div class="row justify-content-between mt-4">
            <div class="col-6 mb-4">
              <div class="mb-2">
                <span class="h6 d-block">Duration</span>
                <span class="h6 d-block text-muted">${duration} Mins</span>
              </div>
              <div class="mb-2">
                <span class="h6 d-block">Status</span>
                <span class="h6 d-block text-muted">${status}</span>
              </div>
              <div class="mb-2">
                <span class="h6 d-block">Release Date</span>
                <span class="h6 d-block text-muted">${releaseDateDay}-${releaseDateMonth}-${releaseDateYear}</span>
              </div>
              <div class="mb-2">
                <span class="h6 d-block">Budget</span>
                <span class="h6 d-block text-muted">${budget}</span>
              </div>
            </div>
            <div class="col-6 mb-4">
              <div class="mb-2">
                <span class="h6 d-block">Production Countries</span>
                <span class="h6 d-block text-muted">${productionCountry}</span>
              </div>
              <div class="mb-2">
                <span class="h6 d-block">Spoken Languages</span>
                <span class="h6 d-block text-muted">${spokenLanguage}</span>
              </div>
              <div class="mb-2">
                <span class="h6 d-block">Genres</span>
                <span class="h6 d-block text-muted">${genre}</span>
              </div>
              <div class="mb-2">
                <span class="h6 d-block">Revenue</span>
                <span class="h6 d-block text-muted">${revenue}</span>
              </div>
            </div>
            <div class="col-12">
              <div class="mb-4">
                <span class="h6 d-block">TAGLINE</span>
                <span class="h6 d-block text-muted">${tagline}</span>
              </div>
            </div>
            <div class="col-12">
              <div class="mb-2">
                <span class="h6 d-block">OVERVIEW</span>
                <span class="h6 d-block text-muted">${overview}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  
    function getFormatUSD(num) {
        var p = num.toFixed(2).split(".");
        return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
            return  num=="-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
        }, "") + "." + p[1];
    }

    function getListDataInline(items) {
      let buffer = "";
      let position = 0;
      items.forEach((pc) => {
        position++;
        buffer += pc.name;
  
        if (position < items.length) {
          buffer += ', ';
        }
      });
      return buffer;
    }
  }

  renderError(message) {
    this.innerHTML = `
      .placeholder {
        font-weight: lighter;
        color: rgba(0,0,0,0.5);
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    `;
    this.innerHTML += `<h2 class="placeholder bg-warning">${message}</h2>`;
  }
}

customElements.define("movie-detail", MovieDetail);
