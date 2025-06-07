import axios from 'axios';
axios.defaults.baseURL = 'https://sound-wave.b.goit.study/api';

export async function getArtists(currentPage = 1) {
  const params = { limit: 8, page: currentPage };
  const endPoint = `/artists`;

  try {
    const res = await axios.get(endPoint, { params });
    return res.data;
  } catch (error) {
    console.error('Помилка при завантаженні артистів:', error.message);
    throw error;
  }
}

export async function getArtistById(artistId) {
  const endPoint = `/artists/${artistId}`;
  try {
    const res = await axios.get(endPoint);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error('Помилка при отриманні артиста:', error.message);
    throw error;
  }
}

export async function getArtistsAlbumsId(artistId) {
  const endPoint = `/artists/${artistId}/albums`;
  try {
    const res = await axios.get(endPoint);
    return res.data;
  } catch (error) {
    console.error('Помилка при отриманні альбомів артиста:', error.message);
    throw error;
  }
}
