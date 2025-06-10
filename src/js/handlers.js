import { refs } from './refs.js';
import { getArtists, getArtistsAlbumsId, getArtistById } from './artists-api.js';
import { createdModal, hideLoader, showLoader } from './render-function.js';
import { showModal, hideModal } from './modal.js';

export async function handlerModal(e) {
  if (e.target.tagName !== 'BUTTON') return;

  showLoader();
  const artistId = e.target.dataset.artistId;

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

export function handlerCloseModalClick() {
  hideModal();
}

export function handlerBackdropClick(e) {
  if (e.target === e.currentTarget) {
    hideModal();
  }
}
