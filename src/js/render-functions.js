import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox;

export function renderGallery(images) {
	const gallery = document.querySelector('.gallery');
	const markup = images
.map(image => {
  return `<a href="${image.largeImageURL}" class="photo-card">
            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
            <div class="info">
              <p><strong>Likes:</strong> ${image.likes}</p>
              <p><strong>Views:</strong> ${image.views}</p>
              <p><strong>Comments:</strong> ${image.comments}</p>
              <p><strong>Downloads:</strong> ${image.downloads}</p>
            </div>
          </a>`;
})
.join('');

	gallery.innerHTML = markup;

	if (lightbox) {
    lightbox.refresh(); 
} else {
    lightbox = new SimpleLightbox('.gallery a', {
			captionsData: 'alt', 
			captionDelay: 150,   
			animationSpeed: 200, 
			closeText: '×',      
			navText: ['<', '>'],
    });
}
}