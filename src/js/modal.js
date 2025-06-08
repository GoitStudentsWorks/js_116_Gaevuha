import refs from './refs.js';
import { getArtists, getArtistsAlbumsId, getArtistById } from './artists-api.js';
import { createdModal } from './render-function.js';

const artistId = '65ada5b8af9f6d155db4806b';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const artistData = await getArtistById(artistId); 
    const response = await getArtists();

    const artistsList = response.artists || [];
    const artistWithGenres = artistsList.find(artist => artist._id === artistId);
    const genres = artistWithGenres?.genres || [];

    const { albumsList = [] } = await getArtistsAlbumsId(artistId);

    const fullArtistData = { ...artistData, genres, albumsList };
    createdModal(fullArtistData);

  } catch (error) {
    console.error('Помилка при завантаженні артиста або альбомів:', error.message);
  }
});