class FooterText extends HTMLElement {

  constructor() {
    super();
    this.shadowDOM = this.attachShadow({mode: "open"});
  }
  
  connectedCallback() {
    this.render();    
  };
  
  render() {
    this.shadowDOM.innerHTML = `
      <style>
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
        small {
          display: block;
          text-align: center
        }
      </style>
    `;
    this.shadowDOM.innerHTML += `
      <small class="d-block text-center">&copy; Copyrights 2020.</small>
      <small class="d-block text-center">"Submission Dicoding Belajar Fundamental Front-End Web Development"</small>
    `;
  };
}

customElements.define("footer-text", FooterText);
