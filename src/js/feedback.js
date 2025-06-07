import {getFeedback} from './artists-api'
import {renderFeedback} from './render-function'
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

function initSwiper(){
    var swiper = new Swiper(".swiper", {
      cssMode: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
      },
      mousewheel: true,
      keyboard: true,
    });
}


async function initFeedback() {
    const feedbackData = await getFeedback();
    renderFeedback(feedbackData.data);
    initSwiper()
}



initFeedback()

