import {getFeedback} from './artists-api'
import {renderFeedback} from './render-function'
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

export function initStars() {
  const stars = document.querySelectorAll('.rating');
  stars.forEach(star => {
    const rating = parseFloat(star.dataset.rating) || 0;
    const rounded = Math.round(rating);
    const emptyCount = 5 - rounded;
    let markup = '';
    for (let i = 0; i < rounded; i++) {
      markup += `<i class="star-custom" style="background-image: url('/img/star_full.png');"></i>`;
    }
    for (let i = 0; i < emptyCount; i++) {
      markup += `<i class="star-custom" style="background-image: url('/img/star_empty.png');"></i>`;
    }
    star.innerHTML = markup;
  });
}

function initSwiper(){
    var swiper = new Swiper(".swiper", {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      mousewheel: true,
      keyboard: true,
    });
}

async function initFeedback() {
  const feedbackData = await getFeedback();
  renderFeedback(feedbackData);
  initSwiper();
  initStars();
}

initFeedback()

