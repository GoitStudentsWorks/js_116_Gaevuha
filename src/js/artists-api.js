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

const loaderElement = document.querySelector('.section-artists-loader');


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


showLoader(loaderElement);
getArtists(page).then(data => {
  allArtists = data.artists;
  totalPages = Math.ceil(data.totalArtists / limit);
  renderArtists();
  hideLoader(loaderElement);

  if (page >= totalPages) {
    hideLoadMoreButton();
  } else {
    showLoadMoreButton();
  }
  dataAllGenre = allArtists.map(({ genres, _id }) => ({ genres, _id }));
})
  .catch(error => {
    console.error('Error during initial loading of artists:', error.message);
    hideLoader(loaderElement);
  });

async function handleLoadMoreClick() {
  refs.loadMoreBtn.disabled = true;
  hideLoadMoreButton();
  showLoader(loaderElement);
  page += 1;

  try {
    const data = await getArtists(page);
    const newArtists = data.artists;

    dataAllGenre = [
      ...dataAllGenre,
      ...newArtists.map(({ genres, _id }) => ({ genres, _id }))
    ];

    if (!newArtists.length) {
      alert("We're sorry, there are no more artists to load.");
      hideLoader(loaderElement);
      hideLoadMoreButton();
      return;
    }

    allArtists = [...allArtists, ...newArtists];
    renderArtists();

    if (page >= totalPages) {
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    console.error('Error loading new artists:', error.message);
  } finally {
    hideLoader(loaderElement);
    refs.loadMoreBtn.disabled = false;
  }
}

refs.loadMoreBtn.addEventListener('click', handleLoadMoreClick);

// MODAL API

export async function getArtistById(artistId) {
  const endPoint = `/artists/${artistId}`;
  try {
    const res = await axios.get(endPoint);
    // console.log(res.data);
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
    // перша сторінка з лімітом 25
    const resFirst = await axios.get(endPoint, { params });
    dataFeedback.push(...resFirst.data.data);

    const total = resFirst.data.total;
    const maxPage = Math.ceil(total / limit);

    //остання сторінка
    const lastlimit = total - (limit*(maxPage-1)) 
    const reslast = await axios.get(endPoint, { params: {limit: limit, page:maxPage} });
    dataFeedback.push(...reslast.data.data);
        return dataFeedback;

  } catch (error) {
    console.error('Помилка при отриманні відгуків:', error.message);
    throw error;
  }
}