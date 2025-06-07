import refs from './refs';


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
                <use href="/img/sprite.svg#icon-youtube"></use>
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
        <p class="feedback-stars">${rating}</p>
        <p class="feedback-descr">"${descr}"</p>
        <p class="feedback-name">${name}</p>
    </div>
  `).join('');

  wrapperElem.innerHTML = markup;
  console.log(wrapperElem);
}
