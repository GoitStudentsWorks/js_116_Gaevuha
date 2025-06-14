import{a as d,S as J,i as k}from"./assets/vendor-BT6NWGSC.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const A of document.querySelectorAll('link[rel="modulepreload"]'))a(A);new MutationObserver(A=>{for(const r of A)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(A){const r={};return A.integrity&&(r.integrity=A.integrity),A.referrerPolicy&&(r.referrerPolicy=A.referrerPolicy),A.crossOrigin==="use-credentials"?r.credentials="include":A.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(A){if(A.ep)return;A.ep=!0;const r=s(A);fetch(A.href,r)}})();const o={artistsList:document.querySelector(".artists"),loadMoreBtn:document.querySelector(".load-more-btn"),learnMoreArtistBtns:document.querySelectorAll(".learn-more-artist-btn"),artists:document.querySelector(".list-artists"),modalAlbumList:document.querySelector(".modal-list__album"),backdropModalElem:document.querySelector(".backdrop"),closeModalBtn:document.querySelector(".close-btn-modal")},I="/js_116_Gaevuha/assets/sprite-mcy0BEy_.svg",z="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNEBCAgICAkICQoKCQ0ODA4NExEQEBETHBQWFBYUHCsbHxsbHxsrJi4lIyUuJkQ1Ly81RE5CPkJOX1VVX3dxd5yc0f/CABEIASwB6AMBIgACEQEDEQH/xAAtAAEBAQEBAQEBAAAAAAAAAAAABQQDBgIBBwEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEAMQAAAA/vkL8+AAAAAAAAAAAAAAAAAAAAAAAAAAAAB9/A9EgD4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA59I5qTBTTBTTBTTBT1QtZWAAAAAAAAAAAAAAAAAAAAAAAAAjWYxnAOhzryKZwx6cw05tJYAAAAAAAAAAAAAAAAAAAAAAAAAjWYxnOxoofX6QudrEZfi/EOenNpLAAAAAAAAAAAAAAAAAAAAAAAAAEazGONqLrKiWKiWKnHCMejh3LAAAAAAAAAAAAAAAAAAAAAAAAAE6iPPvQDz70A8+9APPvQDz9HeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN2H0kkwgAAAAAAAAAAAAAAAAAAAAAAAAAAAG4+Vgf/8QALhAAAgECAwcEAQQDAAAAAAAAAQIDAAQRFFIQEjE0QVBREyEicSAwMoGQYqGx/9oACAEBAAE/AL29EA9OP9//ACnlkkOLuSe9JJIhxViKsb71vg/s4/3Ujl5GY9T3yNzHIjjof69pZUiGLGs9Hoas8mhqzyaGrPJoas8mhqzyaGrPJoas8mhqz0ehqjlSQYqe53bEzsPHt+lZsRMB0IPc7rmJPyitYlUbyhj1xq7gWMqy8D022nML9Hud1zEn4PDJGAWXAHZFeR7gEmIIq5n9YgAfEbbTmF+j3O65iTbaQbx9Rh7DhUiLIpVuBqWNo3KnYY3VQxUgHgdtpzC/R7ndcxJsghMrgdOpoAAAAYAbJ4RKn+Q4Vb2rM2Mi4KKdFdSrD2NSxNE5U/wdlpzC/R7ndcxJSqWYKOJqGJYkCj+T+U8IlTDr0NEFSQeIq05hfo9zuuYkpGKMGHEVnpNK1npNK1npNK1npNK1npNK1npNK1npdK0zFmLHiTVpzC/R7ndwMW9RRj5FbreDW63g1ut4NbreDW63g1ut4NbreDW63g1utpNWkDKfUYYeB/ZnfWzQyk4fFvcHvlnAZZQxHwU4mmVWBVgCDV5bxwudwnDvVnbRzN88aVVQbqgACv/EABQRAQAAAAAAAAAAAAAAAAAAAJD/2gAIAQIBAT8AE3//xAAUEQEAAAAAAAAAAAAAAAAAAACQ/9oACAEDAQE/ABN//9k=",R="icon-youtube",G="learn-more";function Z(e,t){if(!e)return"No description available";const s=e.indexOf(".");return s!==-1&&s<=t?e.slice(0,s+1).trim():e.length<=t?e.trim():e.slice(0,t).trim()+"..."}function X(){const e=window.innerWidth;return e<768?60:e<1024?160:147}function B(){const e=X();o.artistsList.innerHTML="";const t=p.map(s=>{const a=(s.genres||[]).map(n=>`<li class="artist-genre">${n}</li>`).join(""),A=s.strArtistThumb||`${z}`,r=Z(s.strBiographyEN,e);return`
        <li class="artist-card" id="${s._id}">
          <div class="artist-image-wrapper">
            <img
              class="artist-image"
              src="${A}"
              alt="Фото виконавця ${s.strArtist}"
              loading="lazy"
            />
          </div>

          <div class="artist-content">
            <ul class="artist-genres">
              ${a}
            </ul>
            <h3 class="artist-name">${s.strArtist}</h3>
            <p class="artist-description">${r}</p>

            <button class="learn-more-artist-btn" data-artist-id="${s._id}">
              Learn More
              <svg class="learn-more-icon" width="8" height="15" aria-hidden="true">
                <use href="${I}#${G}"></use>
              </svg>
            </button>
             <span class="loader section-artists-loader" style="display: none;"></span>
          </div>
        </li>
      `}).join("");o.artistsList.insertAdjacentHTML("beforeend",t)}function q(e){e.style.display="block"}function E(e){e.style.display="none"}function Q(){const e=document.querySelector(".load-more-btn");e.style.display="block"}function _(){const e=document.querySelector(".load-more-btn");e.style.display="none"}async function ee(e){const{_id:t,strArtist:s,strArtistThumb:a,intFormedYear:A,intDiedYear:r,intMembers:n,strCountry:i,strGender:h,strBiographyEN:u,genres:O=[],albumsList:$=[]}=e,D=O.map(L=>`<li class="artist__genre-item">${L}</li>`).join(""),N=$.map(({strAlbum:L,intYearReleased:U,tracks:P=[]})=>{const V=P.map(({strTrack:W,intDuration:C,movie:l})=>{const Y=Math.floor(C/6e4),K=String(Math.floor(C%6e4/1e3)).padStart(2,"0"),j=l!=null&&l.startsWith("http")?l:l?`https://${l}`:"";return`
        <li class="track__row">
          <span class="track__name track__font">${W}</span>
          <span class="track__time track__font">${Y}:${K}</span>
          <span class="track__link track__font">
            ${l?`<a class="track__link__youtube" href="${j}" target="_blank" aria-label="YouTube link" rel="noopener noreferrer">
              <svg class="icon-youtube" width="24" height="24">
                <use href="${I}#${R}"></use>
              </svg>
            </a>`:""}
          </span>
        </li>
      `}).join("");return`
      <li class="album-list-item">
        <h4 class="album__name">${L} (${U})</h4>
        <div class="track__row__name">
        <span class="track__name track__font__title">Track</span>
        <span class="track__time track__font__title">Time</span>
        <span class="track__link track__font__title">Link</span>
        </div>
        <ul class="album__track-list">${V}</ul>
      </li>
    `}).join(""),H=`
    <li class="artist__item" data-id="${t}">
    <h3 class="artist__name">${s}</h3>
    <div class="artist__box">
    <div class="artist__image__modal artist__box__item">
        <img class="artist__image" src="${a}" alt="${s}" width="272">
    </div>
  <div class="artist__box__item">
    <ul class="artist__info">
  <li class="artist__info-item">
    <h4 class="artist__subtitle__info">Years active</h4>
    <p class="artist__info-value">${A&&r?`${A} – ${r}`:A?`${A} – present`:"information missing"}</p>
  </li>
  <li class="artist__info-item">
    <h4 class="artist__subtitle__info">Sex</h4>
    <p class="artist__info-value">${h}</p>
  </li>
  <li class="artist__info-item">
    <h4 class="artist__subtitle__info">Members</h4>
    <p class="artist__info-value">${n}</p>
  </li>
  <li class="artist__info-item">
    <h4 class="artist__subtitle__info">Country</h4>
    <p class="artist__info-value">${i}</p>
  </li>
</ul>
<div class="artist__biography">
      <h4 class="artist__subtitle__info">Biography</h4>
        <p class="artist__biography-value">${u}</p>
</div>
      <ul class="artists__genres-list">${D}</ul>
  </div>
</div>
      <h3 class="title__albums-modal">Albums</h3>
      <ul class="modal__album-list">${N}</ul>
    </li>
  `;o.modalAlbumList.innerHTML=H}function te(e){const t=document.querySelector(".swiper-wrapper"),s=e.map(({name:a,rating:A,descr:r})=>`
    <div class="swiper-slide">
      <div class="rating" data-rating="${A}"></div>
      <p class="feedback-descr">"${r}"</p>
      <p class="feedback-name">${a}</p>
    </div>
  `).join("");t.innerHTML=s}d.defaults.baseURL="https://sound-wave.b.goit.study/api";let p=[],m=1;const se=8;let F=0,S,w;const c=document.querySelector(".section-artists-loader");window.addEventListener("resize",()=>{clearTimeout(S),S=setTimeout(()=>{B()},300)});async function T(e=1){const t={limit:8,page:e},s="/artists";try{return(await d.get(s,{params:t})).data}catch(a){throw console.error("Помилка при завантаженні артистів:",a.message),a}}q(c);T(m).then(e=>{p=e.artists,F=Math.ceil(e.totalArtists/se),B(),E(c),m>=F?_():Q(),w=p.map(({genres:t,_id:s})=>({genres:t,_id:s}))}).catch(e=>{console.error("Error during initial loading of artists:",e.message),E(c)});async function Ae(){o.loadMoreBtn.disabled=!0,_(),q(c),m+=1;try{const t=(await T(m)).artists;if(w=[...w,...t.map(({genres:s,_id:a})=>({genres:s,_id:a}))],!t.length){alert("We're sorry, there are no more artists to load."),E(c),_();return}p=[...p,...t],B(),m>=F?_():Q()}catch(e){console.error("Error loading new artists:",e.message)}finally{E(c),o.loadMoreBtn.disabled=!1}}o.loadMoreBtn.addEventListener("click",Ae);async function ae(e){const t=`/artists/${e}`;try{return(await d.get(t)).data}catch(s){throw console.error("Помилка при отриманні артиста:",s.message),s}}async function re(e){const t=`/artists/${e}/albums`;try{return(await d.get(t)).data}catch(s){throw console.error("Помилка при отриманні альбомів артиста:",s.message),s}}async function ne(e=1){const t=[],s="/feedbacks",A={limit:25,page:e};try{const r=await d.get(s,{params:A});t.push(...r.data.data);const n=r.data.total,i=Math.ceil(n/25),h=n-25*(i-1),u=await d.get(s,{params:{limit:25,page:i}});return t.push(...u.data.data),t}catch(r){throw console.error("Помилка при отриманні відгуків:",r.message),r}}async function oe(e){if(e.target.tagName!=="BUTTON")return;const t=e.target.dataset.artistId,s=e.target,a=e.target.nextElementSibling;de(s,a);try{const A=await ae(t),r=w.find(({_id:u})=>u===t),n=(r==null?void 0:r.genres)||[],{albumsList:i=[]}=await re(t),h={...A,genres:n,albumsList:i};ee(h),ce(),ue(s,a)}catch(A){console.error("Помилка при завантаженні артиста або альбомів:",A.message)}}function ie(){M()}function le(e){e.target===e.currentTarget&&M()}o.artistsList.addEventListener("click",oe);o.closeModalBtn.addEventListener("click",ie);o.backdropModalElem.addEventListener("click",le);function x(e){e.key==="Escape"&&M()}function ce(){o.backdropModalElem.classList.add("is-open"),document.body.classList.add("modal-open"),window.addEventListener("keydown",x)}function M(){o.backdropModalElem.classList.remove("is-open"),document.body.classList.remove("modal-open"),window.removeEventListener("keydown",x)}function de(e,t){e.style.display="none",t.style.margin="0",t.style.display="block",t.style.height="27px"}function ue(e,t){e.style.display="",t.style.display="none"}const me="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAATCAYAAACQjC21AAAABHNCSVQICAgIfAhkiAAAASRJREFUOI2NkzFygzAURHeFT5JrpEC4y2XscWGGLtB57IIhF8g1UkWiyDlyEvRTJDhIYElbMqv3V6sPkKF6P7T1fmhzvEXK0OheC/gOQD8/vfDr+8PG/CoFnFi85iTLAja614To+wdBEh4FbqVLdclYOkdlNlOIqy72ZDeBje61U0oDgAjL/0mLq25IQA9IyqicsztHZSB3SIzhJwkHCvTEolQgumxKaghlJBDvK1dzrwoALvZklbgq7CVHAtrlI61e+Vy9mdSDLGE3c6i8pKGJlDE3XSHTqv/krxfTvG5R4HIXU9ryrq+c2d8jrwdsdL+GEd3VHPloC8IzHnDVCdFdP48t8LtaN3OoQnB4ZhdOFNCSMs6gUH/7Zuv90IqwLNzkpf4B4QeBWWwk9AEAAAAASUVORK5CYII=",pe="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAATCAYAAACQjC21AAAABHNCSVQICAgIfAhkiAAAALBJREFUOI2tk9sVwyAMQ+UsFjpZyWSEydQf2gaDwSnVX7B84+MH4BDJSDJ6vB5Y4FdT6OZgPtfLKlLVkSRXgUkDf+5lr7qLgpUnJfg27JeYmVR0qu8M4JTlvqifbACOPwIzgGm/vAoVukB7U50pjYZkrYoJ0/m9S8k3etb033N6IwUPcO+8WWq8oh/Ie3spIhWjqtCY1lGSHmivw8r5BKOaYuwB1CY0Hg1MQ1PrrSp8AbFIZxE4LYnOAAAAAElFTkSuQmCC";function ge(){document.querySelectorAll(".rating").forEach(t=>{const s=parseFloat(t.dataset.rating)||0,a=Math.round(s),A=5-a;let r="";for(let n=0;n<a;n++)r+=`<i class="star-custom" style="background-image: url('${me}');"></i>`;for(let n=0;n<A;n++)r+=`<i class="star-custom" style="background-image: url('${pe}');"></i>`;t.innerHTML=r})}function fe(){const e=new J(".swiper",{slidesPerView:1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",clickable:!0,type:"custom",renderCustom:function(t,s,a){return s===1?`
            <span class="swiper-pagination-bullet active" data-index="0"></span>
            <span class="swiper-pagination-bullet" data-index="${Math.floor(a/2)}"></span>
            <span class="swiper-pagination-bullet" data-index="${a-1}"></span>
          `:s===a?`
            <span class="swiper-pagination-bullet" data-index="0"></span>
            <span class="swiper-pagination-bullet" data-index="${Math.floor(a/2)}"></span>
            <span class="swiper-pagination-bullet active" data-index="${a}"></span>
          `:`
          <span class="swiper-pagination-bullet" data-index="0"></span>
          <span class="swiper-pagination-bullet active" data-index="${Math.floor(a/2)}"></span>
          <span class="swiper-pagination-bullet" data-index="${a-1}"></span>
        `}},mousewheel:!0,keyboard:!0,on:{init(){this.pagination.render(),this.pagination.update()},slideChange(){this.pagination.render(),this.pagination.update()}}});document.querySelector(".swiper-pagination").addEventListener("click",t=>{const s=t.target.closest(".swiper-pagination-bullet");console.log(s),s&&e.slideTo(parseInt(s.dataset.index))})}async function he(){try{const e=await ne();te(e),ge(),fe()}catch(e){console.error("Error initializing feedback:",e)}}he();document.addEventListener("DOMContentLoaded",()=>{const e={openBtn:document.querySelector("[data-menu-open]"),closeBtn:document.querySelector("[data-menu-close]"),menu:document.querySelector("[data-menu]"),links:document.querySelectorAll(".menu-list .link-menu"),header:document.querySelector(".header")},t={scrollBehavior:"smooth",scrollDelay:300},s=A=>{e.menu.classList.toggle("is-open",A),document.body.style.overflow=A?"hidden":"",document.documentElement.style.scrollBehavior=A?"auto":t.scrollBehavior},a=A=>{const r=document.querySelector(A);if(!r)return;const n=e.header.offsetHeight,i=r.getBoundingClientRect().top+window.scrollY-n;window.scrollTo({top:i,behavior:t.scrollBehavior})};e.openBtn.addEventListener("click",()=>s(!0)),e.closeBtn.addEventListener("click",()=>s(!1)),e.menu.addEventListener("click",A=>{!A.target.closest("[data-menu-close]")&&!A.target.closest(".link-menu")&&!A.target.closest(".link-logo")&&s(!1)}),e.links.forEach(A=>{A.addEventListener("click",r=>{const n=A.getAttribute("href");if(!n.startsWith("#"))return;r.preventDefault(),e.menu.classList.contains("is-open")?(s(!1),setTimeout(()=>a(n),t.scrollDelay)):a(n)})}),window.addEventListener("resize",()=>{window.innerWidth>=768&&e.menu.classList.contains("is-open")&&s(!1)})});const be=document.querySelector("[data-modal-feedback-open]"),ye=document.querySelector("[data-modal-feedback-close]");document.querySelector(".modal-feedback");const g=document.querySelector(".modal-overley-feedback"),f=document.querySelector(".modal-feedback-form"),b=f.querySelector('[name="user-name"]'),y=f.querySelector('[name="user-comment"]');be.addEventListener("click",e=>{ke()});ye.addEventListener("click",e=>{v()});function ke(){g.classList.add("is-open"),document.documentElement.style.overflow="hidden"}function v(){g.classList.remove("is-open"),document.documentElement.style.overflow=""}g.addEventListener("click",e=>{e.target===g&&v()});document.addEventListener("keydown",e=>{e.key==="Escape"&&g.classList.contains("is-open")&&v()});f.addEventListener("submit",e=>{e.preventDefault();const t=e.target.elements["user-name"].value.trim(),s=e.target.elements["user-comment"].value.trim(),a=Number(e.target.elements.rating.value);_e(t,s,a).length>0||Ee({name:t,descr:s,rating:a})});function _e(e,t,s){const a=[];return f.querySelectorAll(".error").forEach(A=>A.classList.remove("error")),(e.length<3||e.length>16)&&(document.querySelector('[name="user-name"]').classList.add("error"),k.show({class:"custom-toast",title:"",message:"The name must consist of 3...16 characters!",backgroundColor:"#000000",messageColor:"#FFFFFF",titleColor:"#FFFFFF",maxWidth:"30%",position:"center",timeout:5e3,progressBar:!0,close:!0,transitionIn:"fadeInUp",transitionOut:"fadeOut"}),a.push("Error")),s||(a.push("Please select a rating."),k.show({class:"custom-toast",title:"",message:"Choose a rating!",backgroundColor:"#000000",messageColor:"#FFFFFF",titleColor:"#FFFFFF",maxWidth:"30%",position:"center",timeout:5e3,progressBar:!0,close:!0,transitionIn:"fadeInUp",transitionOut:"fadeOut"})),(t.length<10||t.length>512)&&(document.querySelector('[name="user-comment"]').classList.add("error"),k.show({class:"custom-toast",title:"",message:"The comment must consist of 10...512 characters!",backgroundColor:"#000000",messageColor:"#FFFFFF",titleColor:"#FFFFFF",maxWidth:"30%",position:"center",timeout:5e3,progressBar:!0,close:!0,transitionIn:"fadeInUp",transitionOut:"fadeOut"}),a.push("Error")),a}b.addEventListener("input",()=>{b.value.trim().length>=3&&b.value.trim().length<=16&&b.classList.remove("error")});y.addEventListener("input",()=>{y.value.trim().length>=10&&y.value.trim().length<=512&&y.classList.remove("error")});async function Ee(e){try{const t=await fetch("https://sound-wave.b.goit.study/api/feedbacks",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});t.ok?(k.show({class:"custom-toast",title:"",message:"Thanks for the feedback!",backgroundColor:"#000000",messageColor:"#FFFFFF",titleColor:"#FFFFFF",maxWidth:"30%",position:"center",timeout:5e3,progressBar:!0,close:!0,transitionIn:"fadeInUp",transitionOut:"fadeOut"}),f.reset(),v()):alert("Помилка сервера: "+t.status)}catch(t){console.error("Network error:",t),alert("Помилка з'єднання")}}
//# sourceMappingURL=index.js.map
