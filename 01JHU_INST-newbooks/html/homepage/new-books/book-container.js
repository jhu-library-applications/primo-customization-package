class BookContainer extends HTMLElement {
    async connectedCallback() {
      const container = document.createElement("div");
      container.className = "container";
      this.appendChild(container);
  
      const response = await fetch("https://jhu-library-applications.github.io/new-books/data/output.json");
      const books = await response.json();
      const titles = books["Title (Normalized)"].map((title, index) => {
        const isbn = books["ISBN (Normalized)"][index].split(';')[0].trim();
        const mmsId = books["MMS Id"][index];
        
        return { title, isbn, mmsId };
      });
  
      titles.sort(() => 0.5 - Math.random()).slice(0,50).forEach(({ title, isbn, mmsId }) => {
        const bookCover = document.createElement("book-cover");
        
        bookCover.setAttribute("data-title", title);
        bookCover.setAttribute("isbn", isbn);
        bookCover.setAttribute("data-mmsId", mmsId);
        bookCover.classList.add("book-cover-animation");
        container.appendChild(bookCover);
      });
    }
  }
  
  customElements.define("book-container", BookContainer);
  
