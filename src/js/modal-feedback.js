import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const btnOpenFeedbackModalElem = document.querySelector('[data-modal-feedback-open]');
const btnCloseFeedbackModalElem = document.querySelector('[data-modal-feedback-close]');
const modalFeedbackElem = document.querySelector('.modal-feedback');
const modalOverlayFeedback = document.querySelector('.modal-overley-feedback');
const formFeedbackElem = document.querySelector('.modal-feedback-form');
const nameInput = formFeedbackElem.querySelector('[name="user-name"]');
const commentInput = formFeedbackElem.querySelector('[name="user-comment"]');



btnOpenFeedbackModalElem.addEventListener('click', (event) =>{
    openModalFeedback();
});

btnCloseFeedbackModalElem.addEventListener('click', (event) =>{
    closeModalFeedback();
})

function openModalFeedback() {
  modalOverlayFeedback.classList.add('is-open');
  document.documentElement.style.overflow = 'hidden';
}

function closeModalFeedback() {
  modalOverlayFeedback.classList.remove('is-open');
  document.documentElement.style.overflow = '';
}

modalOverlayFeedback.addEventListener('click', (event) => {
  if (event.target === modalOverlayFeedback) {
    closeModalFeedback();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modalOverlayFeedback.classList.contains('is-open')) {
    closeModalFeedback();
  }
});

formFeedbackElem.addEventListener('submit', (event) => {
  event.preventDefault();

  const nameInputFeedback = event.target.elements["user-name"].value.trim();
  const commentInputFeedback = event.target.elements["user-comment"].value.trim();
  const ratingInputFeedback = Number(event.target.elements["rating"].value);

  const errors = checkForm(nameInputFeedback, commentInputFeedback, ratingInputFeedback);
  if (errors.length > 0) {
    return;
  }

  sendFeedback({
    name: nameInputFeedback,
    descr: commentInputFeedback,
    rating: ratingInputFeedback
  });
});


function checkForm(nameInputFeedback, commentInputFeedback, rating) {
  const errors = [];

  formFeedbackElem.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

  if (nameInputFeedback.length < 3 || nameInputFeedback.length > 16) {
    const nameInput = document.querySelector('[name="user-name"]');
    nameInput.classList.add('error');

    iziToast.show({
      class: 'custom-toast',
      title: '',
      message: `The name must consist of 3...16 characters!`,
      backgroundColor: '#000000',
      messageColor: '#FFFFFF',
      titleColor: '#FFFFFF',
      maxWidth: '30%',
      position: 'center',
      timeout: 5000,
      progressBar: true,
      close: true,
      transitionIn: 'fadeInUp',
      transitionOut: 'fadeOut',
    });

    errors.push("Error");
  }

  if (!rating) {
    errors.push("Please select a rating.");
    iziToast.show({
      class: 'custom-toast',
      title: '',
      message: 'Choose a rating!',
      backgroundColor: '#000000',
      messageColor: '#FFFFFF',
      titleColor: '#FFFFFF',
      maxWidth: '30%',
      position: 'center',
      timeout: 5000,
      progressBar: true,
      close: true,
      transitionIn: 'fadeInUp',
      transitionOut: 'fadeOut',
    });
  }

  if (commentInputFeedback.length < 10 || commentInputFeedback.length > 512) {
    const commentTextarea = document.querySelector('[name="user-comment"]');
    commentTextarea.classList.add('error');

    iziToast.show({
      class: 'custom-toast',
      title: '',
      message: 'The comment must consist of 10...512 characters!',
      backgroundColor: '#000000',
      messageColor: '#FFFFFF',
      titleColor: '#FFFFFF',
      maxWidth: '30%',
      position: 'center',
      timeout: 5000,
      progressBar: true,
      close: true,
      transitionIn: 'fadeInUp',
      transitionOut: 'fadeOut',
    });

    errors.push("Error");
  }

  return errors;
}

nameInput.addEventListener('input', () => {
  if (nameInput.value.trim().length >= 3 && nameInput.value.trim().length <= 16) {
    nameInput.classList.remove('error');
  }
});

commentInput.addEventListener('input', () => {
  if (commentInput.value.trim().length >= 10 && commentInput.value.trim().length <= 512) {
    commentInput.classList.remove('error');
  }
});

async function sendFeedback(data) {
  try {
    const response = await fetch('https://sound-wave.b.goit.study/api/feedbacks', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });

    if (response.ok) {
iziToast.show({
    class: 'custom-toast',
    title: '',
    message: 'Thanks for the feedback!',
    backgroundColor: '#000000',
    messageColor: '#FFFFFF',
    titleColor: '#FFFFFF',
    maxWidth: '30%',
    position: 'center', // по центру
    timeout: 5000,
    progressBar: true,
    close: true,
    transitionIn: 'fadeInUp',
    transitionOut: 'fadeOut',
});
      formFeedbackElem.reset();
      closeModalFeedback();
    } else {
      alert("Помилка сервера: " + response.status);
    }
  } catch (error) {
    console.error('Network error:', error);
    alert("Помилка з'єднання");
  }
}


