import consts from './../data/consts.js';

class MovieItem extends HTMLElement {

  set movie(movie) {
    this._movie = movie;
    this.render();
  }

  render() {
    const data = this._movie;
    const id = data.id;
    const title = data.title;
    const urlImage = consts.ENDPOINT_URL_IMG_200;
    const releaseDate = data.release_date;
    const releaseYear = releaseDate.split("-")[0];
    const defaultNoPosterPath = 'https://i.imgur.com/RLmLlR8.jpg';
    const poster = (data.poster_path == null) ? defaultNoPosterPath : urlImage + data.poster_path;

    this.classList.add('col-xl-2', 'col-lg-4', 'col-md-4', 'col-sm-6', 'col-6', 'mb-4');
    this.setAttribute('data-id', id);
    this.innerHTML = `
      <div class="card card-movie-item mx-auto shadow" style="width: 10rem;" title="${releaseYear} - ${title}">
        <img src="${poster}" class="card-img-top img-poster" height="240px" alt="Oops..Image Errors">
        <div class="card-body p-0 px-2">
          <span class="movie-year d-block text-center font-weight-normal">${releaseYear}</span> 
          <h5 class="card-title card-movie-h5 h6 my-1 py-1 mb-0"> 
            <span class="movie-title text-center d-block">
              ${title}
            </span>
          </h5>
        </div>
      </div>
    `;
  }
}

customElements.define("movie-item", MovieItem);
