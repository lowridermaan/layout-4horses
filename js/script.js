const MEMBERS = [
  {
    name: 'Хозе-Рауль Капабланка',
    rank: 'Чемпион мира по шахматам',
    ref: '#',
  },
  {
    name: 'Эммануил Ласкер',
    rank: 'Чемпион мира по шахматам',
    ref: '#',
  },
  {
    name: 'Александр Алехин',
    rank: 'Чемпион мира по шахматам',
    ref: '#',
  },
  {
    name: 'Арон Нимцович',
    rank: 'Чемпион мира по шахматам',
    ref: '#',
  },
  {
    name: 'Рихард Рети',
    rank: 'Чемпион мира по шахматам',
    ref: '#',
  },
  {
    name: 'Остап Бендер',
    rank: 'Чемпион мира по шахматам',
    ref: '#',
  },
];
const btnsMarckup = `
  <button class="slide-btn--prev slide-btn">
    <svg
      width="12"
      height="20"
      viewBox="0 0 12 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        d="M10.5382 18.4615L2.07666 9.99995L10.5382 1.53841"
        stroke="white"
        stroke-width="2"
        stroke-linecap="square"
      />
    </svg>
  </button>
  <span class="slider__slide-count"></span>
  <button class="slide-btn--next slide-btn">
    <svg
      width="12"
      height="20"
      viewBox="0 0 12 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        d="M1.4618 1.53839L9.92334 9.99993L1.4618 18.4615"
        stroke="white"
        stroke-width="2"
        stroke-linecap="square"
      />
    </svg>
  </button>
`;

const carouselItemsMarkup = `
<li class="future__item item-1 item-active" data-id="0" >
  <span class="item__number">1</span>
  <p class="item__descr descr">
    Строительство железнодорожной магистрали Москва-Васюки
  </p>
</li>
<li class="future__item item-2" data-id="1">
  <span class="item__number">2</span>
  <p class="item__descr descr">
    Открытие фешенебельной гостиницы «Проходная пешка» и других
    небоскрёбов
  </p>
</li>
<li class="future__item item-3" data-id="2">
  <span class="item__number">3</span>
  <p class="item__descr descr">
    Поднятие сельского хозяйства в радиусе на тысячу километров:
    производство овощей, фруктов, икры, шоколадных конфет
  </p>
</li>
<li class="future__item item-4" data-id="3">
  <span class="item__number">4</span>
  <p class="item__descr descr">Строительство дворца для турнира</p>
</li>
<li class="future__item item-5" data-id="4">
  <span class="item__number">5</span>
  <p class="item__descr descr">
    Размещение гаражей для гостевого автотранспорта
  </p>
</li>
<li class="future__item item-6" data-id="5">
  <span class="item__number">6</span>
  <p class="item__descr descr">
    Постройка сверхмощной радиостанции для передачи всему миру
    сенсационных результатов
  </p>
</li>
<li class="future__item item-7" data-id="6">
  <span class="item__number">7</span>
  <p class="item__descr descr">
    Создание аэропорта «Большие Васюки» с регулярным отправлением
    почтовых самолётов и дирижаблей во все концы света, включая
    Лос-Анжелос и Мельбурн
  </p>
</li>
`;

const carouselBtns = `
<button class="carousel-btn slide-btn" data-dir="prev">
  <svg
    width="12"
    height="20"
    viewBox="0 0 12 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <path
      d="M10.5382 18.4615L2.07666 9.99995L10.5382 1.53841"
      stroke="white"
      stroke-width="2"
      stroke-linecap="square"
    />
  </svg>
</button>
<button class="carousel-btn slide-btn" data-dir="next">
  <svg
    width="12"
    height="20"
    viewBox="0 0 12 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <path
      d="M1.4618 1.53839L9.92334 9.99993L1.4618 18.4615"
      stroke="white"
      stroke-width="2"
      stroke-linecap="square"
    />
  </svg>
</button>
            `;

const carouselContainer = document.querySelector('.fututre__carousel');
const futureCarouselContainer = document.querySelector('.future__list');
let interval = 0; // для setInterval в слайдере

// marquee
function marquee(selector, speed) {
  const textMarkup = `
<p class="scroll-line__text">
          Дело помощи утопающим — дело рук самих утопающих! &bull; Шахматы
          двигают вперед не только культуру, но и экономику! &bull;
          Лёд тронулся, господа присяжные заседатели! &bull;
</p>`;

  const parentSelectors = document.querySelectorAll(selector);
  parentSelectors.forEach((parentSelector) => {
    parentSelector.insertAdjacentHTML('beforeend', textMarkup);

    const clone = parentSelector.innerHTML;
    const firstElement = parentSelector.children[0];
    let i = 0;

    parentSelector.insertAdjacentHTML('beforeend', clone);

    setInterval(function () {
      firstElement.style.marginLeft = `-${i}px`;
      if (i > firstElement.clientWidth) {
        i = 0;
      }
      i = i + speed;
    }, 0);
  });
}

// slider
function createSlides(itemPerSlide, sliderContainer) {
  if (!itemPerSlide || !sliderContainer) return;
  sliderContainer.innerHTML = '';

  let items = [];

  let membersItemMarkup = MEMBERS.map((member) => {
    return `
      <div class="slide-item">
        <img
          class="slide__image"
          src="./img/member.png"
          alt="image-of-member"
        />
        <h3 class="slide__title">${member.name}</h3>
        <p class="slide__descr">${member.rank}</p>
        <a href="${member.ref}" class="btn-link slide-item-btn">Подробнее</a>
      </div>
    `;
  });

  let index = membersItemMarkup.length;

  while (index !== itemPerSlide) {
    items.push(membersItemMarkup.splice(0, itemPerSlide));
    index -= itemPerSlide;
  }
  items.push(membersItemMarkup);

  const slideMarkup = items
    .map((item) => {
      return `
      <li class="slide">
          ${item.join('')}
      </li>
    `;
    })
    .join('');

  sliderContainer.insertAdjacentHTML('beforeend', slideMarkup);
}

function slider(slideItems = 1, numOfItems, loop = true) {
  if (loop) {
    clearInterval(interval);

    interval = setInterval(() => {
      handleNext();
    }, 4000);
  }

  const sliderContainer = document.querySelector('.slides-container');
  const count = document.querySelector('.slider__slide-count');
  sliderContainer.scrollLeft = 0;
  createSlides(slideItems, sliderContainer);

  let slideCount = slideItems;
  count.textContent = `${slideCount}/${numOfItems}`;

  const prevButton = document.querySelector('.slide-btn--prev');
  const nextButton = document.querySelector('.slide-btn--next');

  const handleNext = () => {
    const slideWidth = sliderContainer.clientWidth;
    sliderContainer.scrollLeft += slideWidth;

    if (slideCount === numOfItems) {
      sliderContainer.scrollLeft = 0;
      slideCount = slideItems;
      count.textContent = `${slideCount}/${numOfItems}`;
      return;
    }

    slideCount += slideItems;
    count.textContent = `${slideCount}/${numOfItems}`;
  };

  const handlePrev = () => {
    const slideWidth = sliderContainer.clientWidth;
    sliderContainer.scrollLeft -= slideWidth;
    if (slideCount === slideItems) {
      sliderContainer.scrollLeft = slideWidth * slideItems;
      slideCount = numOfItems;
      count.textContent = `${slideCount}/${numOfItems}`;
      return;
    }
    slideCount -= slideItems;
    count.textContent = `${slideCount}/${numOfItems}`;
  };

  nextButton.addEventListener('click', () => {
    handleNext();
  });

  prevButton.addEventListener('click', () => {
    handlePrev();
  });
}

function insertBtns(visible) {
  const upBtns = document.querySelector('.slide-btns-up');
  const downBtns = document.querySelector('.slide-btns-down');
  upBtns.innerHTML = '';
  downBtns.innerHTML = '';

  if (visible === 'up') upBtns.insertAdjacentHTML('beforeend', btnsMarckup);
  if (visible === 'down') downBtns.insertAdjacentHTML('beforeend', btnsMarckup);
}

let intevalId;

class FutureCarousel {
  container = null;
  billetsContainer = null;
  index = 0;
  nav = [];
  items = [];

  constructor(container) {
    this.container = container;
    this.bulletsContainer = document.querySelector('.slide-bullets');
    this.items = document.querySelectorAll('.future__item');
    this.nav = document.querySelectorAll('.carousel-btn');
    this.bulletsContainer.innerHTML = '';

    this.items.forEach((item, i) => {
      const bullet = document.createElement('div');
      bullet.className = 'slide-bullets__bullet';
      item.classList.remove('item-active');
      if (i === 0) {
        item.classList.add('item-active');
        bullet.classList.add('bullet--active');
      }
      bullet.addEventListener('click', () => {
        this.index = i;
        this.updateContent();
      });
      this.bulletsContainer.appendChild(bullet);
    });

    this.nav.forEach((navItem) =>
      navItem.addEventListener('click', this.move.bind(this))
    );
  }

  updateContent() {
    this.items.forEach((item) => {
      item.classList.remove('item-active');
    });
    this.items[this.index].classList.add('item-active');

    document
      .querySelectorAll('.slide-bullets__bullet')
      .forEach((bullet) => bullet.classList.remove('bullet--active'));
    document
      .querySelectorAll('.slide-bullets__bullet')
      [this.index].classList.add('bullet--active');
  }

  nextDir() {
    this.index++;
    this.updateContent();
  }

  prevDir() {
    this.index--;
    this.updateContent();
  }

  move(e) {
    const currentBtn = e.target.closest('.carousel-btn');
    const [opositeBtn] = [...this.nav].filter(
      (btn) => btn.dataset.dir !== currentBtn.dataset.dir
    );

    if (this.index < this.items.length - 1 || this.index !== 0) {
      currentBtn.removeAttribute('disabled');
    }

    if (currentBtn.dataset.dir === 'next') {
      this.nextDir(currentBtn);
      if (this.index === this.items.length - 1) {
        currentBtn.setAttribute('disabled', 'true');
      } else {
        opositeBtn.removeAttribute('disabled');
      }
    }
    if (currentBtn.dataset.dir === 'prev') {
      this.prevDir(currentBtn);
      if (this.index === 0) {
        currentBtn.setAttribute('disabled', 'true');
      } else {
        opositeBtn.removeAttribute('disabled');
      }
    }
  }
}

window.addEventListener('load', () => {
  marquee('.scroll-line', 0.2);
  insertBtns('up');

  carouselContainer.innerHTML = '';
  carouselContainer.insertAdjacentHTML('beforeend', carouselItemsMarkup);
  // при загрузке страницы
  if (window.matchMedia('(min-width: 1366px)').matches) {
    slider(3, MEMBERS.length);
  } else if (window.matchMedia('(min-width: 945px)').matches) {
    carouselContainer.innerHTML = '';
    carouselContainer.insertAdjacentHTML('beforeend', carouselItemsMarkup);
    new FutureCarousel(carouselContainer);
    slider(2, MEMBERS.length);
    insertBtns('down');
  } else if (window.matchMedia('(max-width: 375px)').matches) {
    slider(1, MEMBERS.length);
    carouselContainer.innerHTML = '';
    carouselContainer.insertAdjacentHTML('beforeend', carouselItemsMarkup);
    new FutureCarousel(carouselContainer);
    insertBtns('down');
  }

  let resizeTimer;
  // при изменении размера
  window.addEventListener('resize', () => {
    const width = document.body.clientWidth;
    if (width < 380) return;
    if (width <= 1200) {
      insertBtns('down');
    } else {
      insertBtns('up');
    }

    clearTimeout(resizeTimer);
    if (window.matchMedia('(min-width: 1365px)').matches) {
      carouselContainer.innerHTML = '';
      carouselContainer.insertAdjacentHTML('beforeend', carouselItemsMarkup);
    } else if (window.matchMedia('(max-width: 1365px)').matches) {
      resizeTimer = setTimeout(() => {
        carouselContainer.innerHTML = '';
        carouselContainer.insertAdjacentHTML('beforeend', carouselItemsMarkup);
        new FutureCarousel(carouselContainer);
      }, 250);
    }

    if (window.matchMedia('(min-width: 1366px)').matches) {
      slider(3, MEMBERS.length);
    } else if (window.matchMedia('(min-width: 945px)').matches) {
      slider(2, MEMBERS.length);
    } else if (window.matchMedia('(min-width: 375px)').matches) {
      slider(1, MEMBERS.length);
    }
  });
});
