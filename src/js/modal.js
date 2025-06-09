import { refs } from './refs.js';
import { getArtists, getArtistsAlbumsId, getArtistById } from './artists-api.js';
import { createdModal, hideLoader, showLoader } from './render-function.js';

// const artistId = '65ada5b8af9f6d155db4806b';

refs.artistsList.addEventListener('click', handlerModal);
refs.closeModalBtn.addEventListener('click', handlerCloseModalClick);


async function handlerModal(e) {
  if (e.target.tagName !== 'BUTTON') return;

  showLoader();
  const artistId = e.target.dataset.artistId

  try {
    const artistData = await getArtistById(artistId);
    const response = await getArtists();

    const artistsList = response.artists || [];
    const artistWithGenres = artistsList.find(artist => artist._id === artistId);
    const genres = artistWithGenres?.genres || [];

    const { albumsList = [] } = await getArtistsAlbumsId(artistId);

    const fullArtistData = { ...artistData, genres, albumsList };
    createdModal(fullArtistData);
    hideLoader();
    showModal();

  } catch (error) {
    console.error('Помилка при завантаженні артиста або альбомів:', error.message);
  }

}

function handlerCloseModalClick(e) {
  hideModal()
}




function showModal() {
  refs.backdropModalElem.classList.add('is-open');
  document.body.classList.add('modal-open');
}

function hideModal() {
  refs.backdropModalElem.classList.remove('is-open');
  document.body.classList.remove('modal-open')
}