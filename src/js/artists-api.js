import axios from 'axios';
import { refs } from './refs.js';
import {
  createArtists,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton
} from './render-function.js';

axios.defaults.baseURL = 'https://sound-wave.b.goit.study/api';

let allArtists = [];
let page = 1;
const limit = 8;
let totalPages = 0;

export async function getArtists(currentPage = 1) {
  const params = { limit: 8, page: currentPage };
  const endPoint = `/artists`;

  try {
      const res = await axios.get(endPoint, { params });
      console.log(res.data)
    return res.data;
  } catch (error) {
    console.error('Помилка при завантаженні артистів:', error.message);
    throw error;
  }
}

showLoader();
getArtists(page).then(data => {
    allArtists = data.artists;
    totalPages = Math.ceil(data.totalArtists / limit);
    createArtists(data.artists);
    hideLoader();

  if (page >= totalPages) {
    hideLoadMoreButton();
  } else {
    showLoadMoreButton();
  }
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
        
        if (!newArtists.length) {
            alert("We're sorry, there are no more artists to load.");
            hideLoader();
            hideLoadMoreButton();
            return;
        }

        allArtists = [...allArtists, ...newArtists];
        createArtists(newArtists);
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

document.addEventListener('click', e => {
  if (e.target.classList.contains('learn-more-artist-btn')) {
    const artistCard = e.target.closest('.artist');
    const artistId = artistCard?.id;
    console.log(artistId);
    // тут треба викликати модалку
  }
});


