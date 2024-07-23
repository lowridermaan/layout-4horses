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
function createSlides(itemPerSlide = 3, sliderContainer) {
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
      console.log(item);
      return `
      <li class="slide">
          ${item.join('')}
      </li>
    `;
    })
    .join('');

  sliderContainer.insertAdjacentHTML('beforeend', slideMarkup);
}

function slider(slideItems, numOfItems) {
  const sliderContainer = document.querySelector('.slides-container');
  const initialCounter = [slideItems, numOfItems];
  const count = document.querySelector('.slider__slide-count');
  count.textContent = `${initialCounter[0]}/${initialCounter[1]}`;

  createSlides(slideItems, sliderContainer);
  const prevButton = document.querySelector('.slide-btn--prev');
  const nextButton = document.querySelector('.slide-btn--next');

  const handleNext = () => {
    const slideWidth = sliderContainer.clientWidth;
    sliderContainer.scrollLeft += slideWidth;

    if (initialCounter[0] === initialCounter[1]) {
      sliderContainer.scrollLeft = 0;
      initialCounter[0] = slideItems;
      count.textContent = `${initialCounter[0]}/${initialCounter[1]}`;
      return;
    }

    initialCounter[0] += slideItems;
    count.textContent = `${initialCounter[0]}/${initialCounter[1]}`;
  };

  const handlePrev = () => {
    const slideWidth = sliderContainer.clientWidth;
    sliderContainer.scrollLeft -= slideWidth;
    if (initialCounter[0] === slideItems) {
      sliderContainer.scrollLeft = slideWidth * slideItems;
      initialCounter[0] = numOfItems;
      count.textContent = `${initialCounter[0]}/${initialCounter[1]}`;
      return;
    }
    initialCounter[0] -= slideItems;
    count.textContent = `${initialCounter[0]}/${initialCounter[1]}`;
  };

  nextButton.addEventListener('click', handleNext);

  prevButton.addEventListener('click', handlePrev);

  setInterval(() => {
    handleNext();
  }, 4000);
}

window.addEventListener('load', () => {
  marquee('.scroll-line', 0.2);

  slider(3, MEMBERS.length);

  window.addEventListener('resize', () => {
    let width = document.documentElement.clientWidth;
    if (width < 1366) {
      console.log('1365');
    }
  });
});
