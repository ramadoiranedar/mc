import './movie-item.js';

class MovieList extends HTMLElement {

  set movies(data) {
    this._movies = data.results;
    this._category = data.category;
    this._keyword = data.keyword;
    this.render();
  }

  render() {
    this.classList.add('row', 'py-4');
    this.innerHTML = "";
    let title = "";
    
    if (this._category != "SEARCH") {
      title = this._category;
    } else {
      title = this._keyword;
    }

    this.innerHTML += `
      <div class="col-12 mb-4 border-bottom">
        <h1 class="h4 movie-category text-center">${title}</h1>
      </div>
    `;

    this._movies.forEach(movie => {
      const elementMovieItem = document.createElement("movie-item");
      elementMovieItem.movie = movie;
      this.appendChild(elementMovieItem);
    });
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

customElements.define("movie-list", MovieList);
