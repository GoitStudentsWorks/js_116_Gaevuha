import { refs } from './refs.js';
import { allArtists } from './artists-api.js';


function truncateText(text, limit) {
  if (!text) return 'No description available';

  const firstPeriodIndex = text.indexOf('.');

  if (firstPeriodIndex !== -1 && firstPeriodIndex <= limit) {
    return text.slice(0, firstPeriodIndex + 1).trim();
  }

  if (text.length <= limit) {
    return text.trim();
  }

  return text.slice(0, limit).trim() + '...';
}


function getLimitByWidth() {
  const screenWidth = window.innerWidth;

  if (screenWidth < 768) {
    return 60;      
  } else if (screenWidth < 1024) {
    return 160;      
  } else {
    return 147;     
  }
}

export function renderArtists() {
  const limit = getLimitByWidth();

  const markup = allArtists
    .map(artist => {
      const genresMarkup = (artist.genres || [])
        .map(genre => `<li class="artist-genre">${genre}</li>`)
        .join('');

      const imageSrc = artist.strArtistThumb || '/img/placeholder-image-mini.jpg';

      const description = truncateText(artist.strBiographyEN, limit);

      return `
        <li class="artist-card" id="${artist._id}">
          <div class="artist-image-wrapper">
            <img
              class="artist-image"
              src="${imageSrc}"
              alt="Фото виконавця ${artist.strArtist}"
              loading="lazy"
            />
          </div>

          <div class="artist-content">
            <ul class="artist-genres">
              ${genresMarkup}
            </ul>
            <h3 class="artist-name">${artist.strArtist}</h3>
            <p class="artist-description">${description}</p>

            <button class="learn-more-artist-btn" data-artist-id="${artist._id}">
              Learn More
              <svg class="learn-more-icon" width="8" height="15" aria-hidden="true">
                <use href="/img/sprite.svg#learn-more"></use>
              </svg>
            </button>
          </div>
        </li>
      `;
    })
    .join('');

  refs.artistsList.innerHTML = markup;
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