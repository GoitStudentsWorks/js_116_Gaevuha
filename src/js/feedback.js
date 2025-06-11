import {getFeedback} from './artists-api'
import {renderFeedback} from './render-function'
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import starFull from '../img/star_full.png';
import starEmpty from '../img/star_empty.png';


export function initStars() {
  const stars = document.querySelectorAll('.rating');
  stars.forEach(star => {
    const rating = parseFloat(star.dataset.rating) || 0;
    const rounded = Math.round(rating);
    const emptyCount = 5 - rounded;
    let markup = '';
    for (let i = 0; i < rounded; i++) {
      markup += `<i class="star-custom" style="background-image: url('${starFull}');"></i>`;
    }
    for (let i = 0; i < emptyCount; i++) {
      markup += `<i class="star-custom" style="background-image: url('${starEmpty}');"></i>`;
    }
    star.innerHTML = markup;
  });
}

export function initSwiper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      type: 'custom',
      renderCustom: function(swiper, current, total) {
        console.log(`current= ${current}`);
        console.log(`total = ${total}`)
        if (current === 1) {
          return `
            <span class="swiper-pagination-bullet active" data-index="0"></span>
            <span class="swiper-pagination-bullet" data-index="${Math.floor(total/2)}"></span>
            <span class="swiper-pagination-bullet" data-index="${total-1}"></span>
          `;
        }
        if (current === total) {
          return `
            <span class="swiper-pagination-bullet" data-index="0"></span>
            <span class="swiper-pagination-bullet" data-index="${Math.floor(total/2)}"></span>
            <span class="swiper-pagination-bullet active" data-index="${total}"></span>
          `;
        }
        return `
          <span class="swiper-pagination-bullet" data-index="0"></span>
          <span class="swiper-pagination-bullet active" data-index="${Math.floor(total/2)}"></span>
          <span class="swiper-pagination-bullet" data-index="${total-1}"></span>
        `;
      }
    },
    mousewheel: true,
    keyboard: true,
    on: {
      init() {
        this.pagination.render();
        this.pagination.update();
      },
      slideChange() {
        this.pagination.render();
        this.pagination.update();
      }
    }
  });

  document.querySelector(".swiper-pagination").addEventListener("click", (e) => {
    const bullet = e.target.closest(".swiper-pagination-bullet");
    console.log(bullet)
    if (bullet) {
      swiper.slideTo(parseInt(bullet.dataset.index));
    }
  });
}

async function initFeedback() {
  try {
    const feedbackData = await getFeedback();
    renderFeedback(feedbackData);
    initStars(); // Ваша функция для звезд рейтинга
    initSwiper();
  } catch (error) {
    console.error("Error initializing feedback:", error);
  }
}


initFeedback();


