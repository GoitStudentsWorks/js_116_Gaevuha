
import { refs } from './refs.js';
import {
  handlerModal,
  handlerCloseModalClick,
  handlerBackdropClick,
} from './handlers.js';

refs.artistsList.addEventListener('click', handlerModal);
refs.closeModalBtn.addEventListener('click', handlerCloseModalClick);
refs.backdropModalElem.addEventListener('click', handlerBackdropClick);

function handleEscKey(e) {
  if (e.key === 'Escape') {
    hideModal();
  }
}

export function showModal() {
  refs.backdropModalElem.classList.add('is-open');
  document.body.classList.add('modal-open');
  window.addEventListener('keydown', handleEscKey);
}

export function hideModal() {
  refs.backdropModalElem.classList.remove('is-open');
  document.body.classList.remove('modal-open');
  window.removeEventListener('keydown', handleEscKey);
}
