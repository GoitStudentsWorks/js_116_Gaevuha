import { refs } from './refs.js';

export function createArtists(artists) {
  const markup = artists
    .map(artist => {
      const genresMarkup = artist.genres
        .map(genre => `<li class="artist-genre">${genre}</li>`)
        .join('');

      const imageSrc = artist.strArtistThumb || '/img/placeholder-image-mini.jpg';
      
      return `
        <li class="artist" id="${artist._id}">
          <img class="artist-image" src="${imageSrc}" alt="${artist.strArtist}" />
          <ul class="artist-genres">${genresMarkup}</ul>
          <h2 class="artist-name">${artist.strArtist}</h2>
          <p class="artist-description">
            ${artist.strBiographyEN ? artist.strBiographyEN.slice(0, 64) + '...' : 'No description available'}
          </p>
          <button class="learn-more-artist-btn">
            Learn More
            <svg class="learn-more-icon" width="8" height="15">
              <use href="/img/sprite.svg#learn-more"></use>
            </svg>
          </button>
        </li>
      `;
    })
    .join('');

  refs.artistsList.insertAdjacentHTML('beforeend', markup);
}

export function showLoader() {
  const loadMoreButton = document.querySelector('.loader');
  loadMoreButton.style.display = 'block';
}

export function hideLoader() {
  const loadMoreButton = document.querySelector('.loader');
  loadMoreButton.style.display = 'none';
}
export function showLoadMoreButton() {
  const buttonLoadMore = document.querySelector('.load-more-btn');
  buttonLoadMore.style.display = 'block';
}
export function hideLoadMoreButton() {
  const buttonLoadMore = document.querySelector('.load-more-btn');
  buttonLoadMore.style.display = 'none';
}