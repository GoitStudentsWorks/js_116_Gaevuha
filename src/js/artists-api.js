import axios from 'axios';
axios.defaults.baseURL = 'https://sound-wave.b.goit.study/api';

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

export async function getArtistById(artistId) {
  const endPoint = `/artists/${artistId}`;
  try {
    const res = await axios.get(endPoint);
    console.log(res.data);
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

export async function getFeedback(page = 1) {
  const dataFeedback = [];
  const endPoint = '/feedbacks';
  const limit = 25;
  const params = { limit, page };

  try {
    // Перший фідбек
    const resFirst = await axios.get(endPoint, { params });
    const resFirstArray = resFirst.data.data;
    const firstFeedback = resFirstArray[0];
    dataFeedback.push(firstFeedback);

    const total = resFirst.data.total;
    const maxPage = Math.ceil(total / limit);

    // Рандомний фідбек
    let randomPage;
    do {
      randomPage = Math.floor(Math.random() * maxPage) + 1;
    } while (randomPage === 1 || randomPage === maxPage);

    const resThird = await axios.get(endPoint, {
      params: { limit, page: randomPage }
    });
    const resThirdArray = resThird.data.data;
    const randomFeedback =
      resThirdArray[Math.floor(Math.random() * resThirdArray.length)];
    dataFeedback.push(randomFeedback);

    // Останній фідбек
    const resSecond = await axios.get(endPoint, {
      params: { limit, page: maxPage }
    });
    const resSecondArray = resSecond.data.data;
    const lastFeedback = resSecondArray.at(-1);
    dataFeedback.push(lastFeedback);

    console.log(dataFeedback)
    return dataFeedback;

  } catch (error) {
    console.error('Помилка при отриманні відгуків:', error.message);
    throw error;
  }
}