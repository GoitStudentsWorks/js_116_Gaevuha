import axios from 'axios';
import { refs } from './refs.js';
import {
  renderArtists,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton
} from './render-function.js';

axios.defaults.baseURL = 'https://sound-wave.b.goit.study/api';

export let allArtists = [];
let page = 1;
const limit = 8;
let totalPages = 0;
let resizeTimeout;
export let dataAllGenre;

window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    renderArtists();
  }, 300);
});

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

// showLoader();
getArtists(page).then(data => {
  allArtists = data.artists;
  totalPages = Math.ceil(data.totalArtists / limit);
  renderArtists();
  hideLoader();

  if (page >= totalPages) {
    hideLoadMoreButton();
  } else {
    showLoadMoreButton();
  }
  dataAllGenre = allArtists.map(({ genres, _id }) => ({ genres, _id }));
})
  .catch(error => {
    console.error('Error during initial loading of artists:', error.message);
    hideLoader();
  });;

async function handleLoadMoreClick() {
  showLoader();
  page += 1;

  try {
    const data = await getArtists(page);
    const newArtists = data.artists;
    dataAllGenre = [...dataAllGenre, ...newArtists.map(({ genres, _id }) => ({ genres, _id }))];
    console.log('наступні запуск', dataAllGenre);

    if (!newArtists.length) {
      alert("We're sorry, there are no more artists to load.");
      hideLoader();
      hideLoadMoreButton();
      return;
    }

    allArtists = [...allArtists, ...newArtists];
    renderArtists();
    hideLoader();

    if (page >= totalPages) {
      hideLoadMoreButton();
    }
  } catch (error) {
    console.error('Error loading new artists:', error.message)
    hideLoader();
  }
}

refs.loadMoreBtn.addEventListener('click', handleLoadMoreClick);

// document.addEventListener('click', e => {
//   if (e.target.classList.contains('learn-more-artist-btn')) {
//     const artistId = e.target.dataset.artistId;
//     console.log(artistId);
//     // виклик модалки.
//   }
// });

// MODAL API

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

export async function getArtistsGenre() { }

// FEEDBACK API

export async function getFeedback(page = 1) {
  const dataFeedback = [];
  const endPoint = '/feedbacks';
  const limit = 25;
  const params = { limit, page };

  try {
    // Перший фідбек
    const resFirst = await axios.get(endPoint, { params });
    const resFirstArray = resFirst.data.data;
    const firstFeedback = resFirstArray[0];
    dataFeedback.push(firstFeedback);

    const total = resFirst.data.total;
    const maxPage = Math.ceil(total / limit);

    // Рандомний фідбек
    let randomPage;
    do {
      randomPage = Math.floor(Math.random() * maxPage) + 1;
    } while (randomPage === 1 || randomPage === maxPage);

    const resThird = await axios.get(endPoint, {
      params: { limit, page: randomPage }
    });
    const resThirdArray = resThird.data.data;
    const randomFeedback =
      resThirdArray[Math.floor(Math.random() * resThirdArray.length)];
    dataFeedback.push(randomFeedback);

    // Останній фідбек
    const resSecond = await axios.get(endPoint, {
      params: { limit, page: maxPage }
    });
    const resSecondArray = resSecond.data.data;
    const lastFeedback = resSecondArray.at(-1);
    dataFeedback.push(lastFeedback);
    return dataFeedback;

  } catch (error) {
    console.error('Помилка при отриманні відгуків:', error.message);
    throw error;
  }
}