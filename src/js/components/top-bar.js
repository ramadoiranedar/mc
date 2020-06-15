class TopBar extends HTMLElement {
  
  connectedCallback() {
    this.render();    
  };
  
  render() {
    this.classList.add('navbar', 'navbar-expand-lg', 'navbar-light', 'bg-light', 'shadow', 'sticky-top');

    this.innerHTML = `
      <a class="navbar-brand" href="">MC</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMain" aria-controls="navbarMain" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarMain">
        <div class="navbar-nav ml-auto">
          <a class="nav-item nav-link nav-item-category active" data-category-movie="popular" href="#">Popular</a>
          <a class="nav-item nav-link nav-item-category" data-category-movie="top_rated" href="#">Top Rated</a>
          <a class="nav-item nav-link nav-item-category" data-category-movie="now_playing" href="#">Now Playing</a>
          <div class="nav-item input-group" id="search-group">
            <input type="search" class="form-control" id="search-in" placeholder="Search movie.." aria-label="Search movie.." aria-describedby="search-btn">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" id="search-btn">Search</button>
            </div>
          </div>
        </div>
      </div>
    `;
  };
}

customElements.define("top-bar", TopBar);
