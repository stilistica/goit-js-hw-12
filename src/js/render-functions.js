import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

export function renderGallery(cards) {
  return cards
    .map(card => {
      let {
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = card;
      return `
      <a href="${largeImageURL}" class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p><strong>Likes:</strong> ${likes}</p>
          <p><strong>Views:</strong> ${views}</p>
          <p><strong>Comments:</strong> ${comments}</p>
          <p><strong>Downloads:</strong> ${downloads}</p>
        </div>
      </a>
    `;
    })
    .join('');
}

export function initializeLightbox() {
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

// варіант 2
// function imageTemplate(card) {
//   let {largeImageURL, webformatURL, tags, likes, views, comments, downloads} = card;
//   return `
//   <a href="${largeImageURL}" class="photo-card">
//     <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//     <div class="info">
//       <p><strong>Likes:</strong> ${likes}</p>
//       <p><strong>Views:</strong> ${views}</p>
//       <p><strong>Comments:</strong> ${comments}</p>
//       <p><strong>Downloads:</strong> ${downloads}</p>
//     </div>
//   </a>
//   `;
// }
// export function renderGallery(cards) {
//   return cards.map(imageTemplate).join('')
// }
