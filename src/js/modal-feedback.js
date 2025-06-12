

const btnOpenFeedbackModalElem = document.querySelector('[data-modal-feedback-open]');
const btnCloseFeedbackModalElem = document.querySelector('[data-modal-feedback-close]');
const modalFeedbackElem = document.querySelector('.modal-feedback');
const modalOverlayFeedback = document.querySelector('.modal-overley-feedback');
const formFeedbackElem = document.querySelector('.modal-feedback-form');


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
    alert(errors.join('\n'));
    return;
  }

  sendFeedback({
    name: nameInputFeedback,
    descr: commentInputFeedback,  // <-- тут правильне ім'я поля
    rating: ratingInputFeedback
  });
});


function checkForm(nameInputFeedback, commentInputFeedback, rating) {
  const errors = [];

  if (nameInputFeedback.length < 3 || nameInputFeedback.length > 16) {
    errors.push("Enter 3...16 characters");
  }

  if (!rating) {
    errors.push("Будь ласка, виберіть рейтинг.");
  }

  if (commentInputFeedback.length < 10 || commentInputFeedback.length > 512) {
    errors.push("Коментар не може перевищувати 512 символів.");
  }

  return errors;
}

async function sendFeedback(data) {
  try {
    const response = await fetch('https://sound-wave.b.goit.study/api/feedbacks', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert("Дякуємо за відгук!");
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