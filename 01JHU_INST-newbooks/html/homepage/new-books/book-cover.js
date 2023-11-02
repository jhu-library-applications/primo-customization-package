class BookCover extends HTMLElement {
    constructor() {
	super();
    }

    imageExists(url) {
	return new Promise(resolve => {
	    const img = new Image();
	    img.addEventListener('load', () => {
		// OpenLibrary will return a 1x1 pixel image if the cover is not available
		if (img.width === 1) {
		    resolve(false);
		} else {
		    resolve(true);
		}
	    });
	    img.addEventListener('error', (err) => {
		resolve(false);
	    });
	    img.src = url;
	});
    }

    async connectedCallback() {
	const shadow = this.attachShadow({ mode: "open" });
	
	const isbn = this.getAttribute("isbn");
	const title = this.getAttribute("data-title");
	const mmsId = this.getAttribute("data-mmsid");
	
	const wrapper = document.createElement("figure");
	const figCaption = document.createElement("figcaption");
	const img = document.createElement("img");
	
	const url =  `https://catalyst.library.jhu.edu/discovery/fulldisplay?docid=alma${mmsId}&vid=01JHU_INST:JHU`;
	const imgLink = document.createElement("a");
	
	imgLink.setAttribute('target', '_blank');
	imgLink.setAttribute("href", url)
	imgLink.appendChild(img);
	wrapper.appendChild(imgLink);
	wrapper.appendChild(figCaption);

	const style = document.createElement("link");
	style.setAttribute('rel', 'stylesheet');
	style.setAttribute('href', 'book-cover.css');
	
	
	const exlThumbnailURL = `https://proxy-na.hosted.exlibrisgroup.com/exl_rewrite/syndetics.com/index.php?client=primo&isbn=${isbn}/LC.jpg`;
	const thumbnailURL = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
	const imageExists = await this.imageExists(thumbnailURL);
	const exlImageExists = await this.imageExists(exlThumbnailURL);
	
	if (imageExists) {
	    img.src = thumbnailURL;
	    shadow.append(style);
	    shadow.append(wrapper);
	} else {

	    if (exlImageExists) {
	    img.src = exlThumbnailURL
	    shadow.append(style);
		shadow.append(wrapper);
	    } else {
		this.remove();
	    }
	}
    }
}

customElements.define("book-cover", BookCover);
