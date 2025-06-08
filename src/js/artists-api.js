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

showLoader();
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

document.addEventListener('click', e => {
  if (e.target.classList.contains('learn-more-artist-btn')) {
    const artistId = e.target.dataset.artistId;
    console.log(artistId);
    // виклик модалки
  }
});




