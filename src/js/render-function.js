import { refs } from './refs.js';
import { allArtists } from './artists-api.js';

const spritePath = 'assets/sprite.svg';
const iconId = 'icon-youtube';
const iconLearnId = 'learn-more';


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
                <use href="${spritePath}#${iconLearnId}"></use>
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
  const loader = document.querySelector('.loader');
  loader.style.display = 'block';
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'none';
}
export function showLoadMoreButton() {
  const buttonLoadMore = document.querySelector('.load-more-btn');
  buttonLoadMore.style.display = 'block';
}
export function hideLoadMoreButton() {
  const buttonLoadMore = document.querySelector('.load-more-btn');
  buttonLoadMore.style.display = 'none';
}

export async function createdModal(data) {
  const {
    _id,
    strArtist,
    strArtistThumb,
    intFormedYear,
    intMembers,
    strCountry,
    strGender,
    strBiographyEN,
    genres = [],
    albumsList = []
  } = data;

  const genresMarkup = genres.map(
    genre => `<li class="artist__genre-item">${genre}</li>`
  ).join('');
console.log('genres:', genres);
  const albumMarkup = albumsList.map(({ strAlbum, intYearReleased, tracks = [] }) => {
    const tracksMarkup = tracks.map(({ strTrack, intDuration, movie }) => {
      const durationMin = Math.floor(intDuration / 60000);
      const durationSec = String(Math.floor((intDuration % 60000) / 1000)).padStart(2, '0');
      const safeUrl = movie?.startsWith('http') ? movie : movie ? `https://${movie}` : '';

      return `
        <li class="track__row">
          <span class="track__title">${strTrack}</span>
          <span class="track__time">${durationMin}:${durationSec}</span>
          <span class="track__link">
            ${movie ? `<a href="${safeUrl}" target="_blank" aria-label="YouTube link">
              <svg class="icon-youtube">
                <use href="${spritePath}#${iconId}"></use>
              </svg>
            </a>` : ''}
          </span>
        </li>
      `;
    }).join('');

    return `
      <li class="artist__genre-item">
        <p class="album__name">${strAlbum} (${intYearReleased})</p>
        <span>Track</span><span>Time</span><span>Link</span>
        <ul class="album__track-list">${tracksMarkup}</ul>
      </li>
    `;
  }).join('');

  const markup = `
    <li class="artists__item" data-id="${_id}">
      <p class="artists__name">${strArtist}</p>
      <div class="wrap-artists__image" style="background-image: url('${strArtistThumb}');"></div>
      <div class="artist__info">
        <p class="year">Years active <span class="artist__info-value">${intFormedYear}–present</span></p>
        <p class="gender">Sex <span class="artist__info-value">${strGender}</span></p>
        <p class="members">Members <span class="artist__info-value">${intMembers}</span></p>
        <p class="country">Country <span class="artist__info-value">${strCountry}</span></p>
        <p class="title__biography">Biography</p>
        <p class="artists__biography">${strBiographyEN}</p>
      </div>
      <ul class="artists__genres-list">${genresMarkup}</ul>
      <p class="title__albums-modal">Albums</p>
      <ul class="modal__album-list">${albumMarkup}</ul>
    </li>
  `;

  refs.modalAlbumList.innerHTML = markup;
}

export function renderFeedback(feedbackData) {
  const wrapperElem = document.querySelector('.swiper-wrapper');

  const markup = feedbackData.map(({ name, rating, descr }) => `
    <div class="swiper-slide">
        <p class="feedback-stars">${rating} (тут будуть зірочки :) )</p>
        <p class="feedback-descr">"${descr}"</p>
        <p class="feedback-name">${name}</p>
    </div>
  `).join('');

  wrapperElem.innerHTML = markup;
  console.log(wrapperElem);
}
