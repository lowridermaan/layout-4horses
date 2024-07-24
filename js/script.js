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
  clearInterval(interval);

  interval = setInterval(() => {
    handleNext();
  }, 4000);

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

window.addEventListener('load', () => {
  marquee('.scroll-line', 0.2);

  if (window.matchMedia('(min-width: 1366px)').matches) {
    slider(3, MEMBERS.length);
  } else if (window.matchMedia('(min-width: 945px)').matches) {
    slider(2, MEMBERS.length);
  } else if (window.matchMedia('(min-width: 375px)').matches) {
    slider(1, MEMBERS.length);
  }

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 1366px)').matches) {
      slider(3, MEMBERS.length);
    } else if (window.matchMedia('(min-width: 945px)').matches) {
      slider(2, MEMBERS.length);
    } else if (window.matchMedia('(min-width: 375px)').matches) {
      slider(1, MEMBERS.length);
    }
  });
});
