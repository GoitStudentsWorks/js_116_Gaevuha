import { refs } from './refs.js';
import { allArtists } from './artists-api.js';
import spritePath from './sprite.js';
import placeholderImageMini from '../img/placeholder-image-mini.jpg';


const iconId = 'icon-youtube';
const iconLeanMoreId = 'learn-more'

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

      const imageSrc = artist.strArtistThumb || `${placeholderImageMini}`;

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
                <use href="${spritePath}#${iconLeanMoreId}"></use>
              </svg>
            </button>
             <span class="loader section-artists-loader" style="display: none;"></span>
          </div>
        </li>
      `;
    })
    .join('');

  refs.artistsList.innerHTML = markup;
}

export function showLoader(loader) {
  loader.style.display = 'block';
}

export function hideLoader(loader) {
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

// MODAL

export async function createdModal(data) {
  const {
    _id,
    strArtist,
    strArtistThumb,
    intFormedYear,
    intDiedYear,
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
          <span class="track__name track__font">${strTrack}</span>
          <span class="track__time track__font">${durationMin}:${durationSec}</span>
          <span class="track__link track__font">
            ${movie ? `<a class="track__link__youtube" href="${safeUrl}" target="_blank" aria-label="YouTube link" rel="noopener noreferrer">
              <svg class="icon-youtube" width="24" height="24">
                <use href="${spritePath}#${iconId}"></use>
              </svg>
            </a>` : ''}
          </span>
        </li>
      `;
    }).join('');

    return `
      <li class="album-list-item">
        <h4 class="album__name">${strAlbum} (${intYearReleased})</h4>
        <div class="track__row__name">
        <span class="track__name track__font__title">Track</span>
        <span class="track__time track__font__title">Time</span>
        <span class="track__link track__font__title">Link</span>
        </div>
        <ul class="album__track-list">${tracksMarkup}</ul>
      </li>
    `;
  }).join('');

  const markup = `
    <li class="artist__item" data-id="${_id}">
    <h3 class="artist__name">${strArtist}</h3>
    <div class="artist__box">
    <div class="artist__image__modal artist__box__item">
        <img class="artist__image" src="${strArtistThumb}" alt="${strArtist}" width="272">
    </div>
  <div class="artist__box__item">
    <ul class="artist__info">
  <li class="artist__info-item">
    <h4 class="artist__subtitle__info">Years active</h4>
    <p class="artist__info-value">${intFormedYear && intDiedYear
      ? `${intFormedYear} – ${intDiedYear}`
      : intFormedYear
        ? `${intFormedYear} – present`
        : 'information missing'
    }</p>
  </li>
  <li class="artist__info-item">
    <h4 class="artist__subtitle__info">Sex</h4>
    <p class="artist__info-value">${strGender}</p>
  </li>
  <li class="artist__info-item">
    <h4 class="artist__subtitle__info">Members</h4>
    <p class="artist__info-value">${intMembers}</p>
  </li>
  <li class="artist__info-item">
    <h4 class="artist__subtitle__info">Country</h4>
    <p class="artist__info-value">${strCountry}</p>
  </li>
</ul>
<div class="artist__biography">
      <h4 class="artist__subtitle__info">Biography</h4>
        <p class="artist__biography-value">${strBiographyEN}</p>
</div>
      <ul class="artists__genres-list">${genresMarkup}</ul>
  </div>
</div>
      <h3 class="title__albums-modal">Albums</h3>
      <ul class="modal__album-list">${albumMarkup}</ul>
    </li>
  `;

  console.log('this is a foto artist:', data);
  refs.modalAlbumList.innerHTML = markup;
}

// FEEDBACK
export function renderFeedback(feedbackData) {
  const wrapperElem = document.querySelector('.swiper-wrapper');
  const markup = feedbackData.map(({ name, rating, descr }) => `
    <div class="swiper-slide">
      <div class="rating" data-rating="${rating}"></div>
      <p class="feedback-descr">"${descr}"</p>
      <p class="feedback-name">${name}</p>
    </div>
  `).join('');
  wrapperElem.innerHTML = markup;
}
