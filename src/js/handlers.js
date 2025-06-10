import { refs } from './refs.js';
import { getArtistsAlbumsId, getArtistById, dataAllGenre } from './artists-api.js';
import { createdModal, hideLoader, showLoader } from './render-function.js';
import { showModal, hideModal } from './modal.js';

// MODAL
export async function handlerModal(e) {
  if (e.target.tagName !== 'BUTTON') return;

  const artistId = e.target.dataset.artistId;

  try {
    const artistData = await getArtistById(artistId);
    const artistWithGenres = dataAllGenre.find(({ _id }) => _id === artistId);
    const genres = artistWithGenres?.genres || [];

    const { albumsList = [] } = await getArtistsAlbumsId(artistId);

    const fullArtistData = { ...artistData, genres, albumsList };
    createdModal(fullArtistData);
    // hideLoader();
    showModal();
  } catch (error) {
    console.error('Помилка при завантаженні артиста або альбомів:', error.message);
  }
}

export function handlerCloseModalClick() {
  hideModal();
}

export function handlerBackdropClick(e) {
  if (e.target === e.currentTarget) {
    hideModal();
  }
}
