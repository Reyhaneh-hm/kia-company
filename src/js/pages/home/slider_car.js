import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const datas = [
    {
        year: "2025",
        model: "Sportage",
        image: "/images/submenu/1.png",
        startingPrice: "28,990",
        horsepower: "187",
        mpg: "23-30"
    },
    {
        year: "2025",
        model: "Sorento",
        image: "/images/submenu/2.png",
        startingPrice: "32,190",
        horsepower: "281",
        mpg: "23-25"
    },
    {
        year: "2026",
        model: "Sorento",
        image: "/images/submenu/3.png",
        startingPrice: "32,190",
        horsepower: "281",
        mpg: "23-25"
    },
    {
        year: "2026",
        model: "Telluride",
        image: "/images/submenu/4.png",
        startingPrice: "36,690",
        horsepower: "291",
        mpg: "20-26"
    },
    {
        year: "2026",
        model: "Sportage",
        image: "/images/submenu/5.png",
        startingPrice: "28,990",
        horsepower: "187",
        mpg: "23-30"
    },
    {
        year: "2025",
        model: "Telluride",
        image: "/images/submenu/6.png",
        startingPrice: "36,690",
        horsepower: "291",
        mpg: "20-26"
    }
];

const wrapper = document.getElementById('swiper-wrapper');
datas.forEach((d, idx) => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.setAttribute('data-index', idx);

    slide.innerHTML = `
    <div class="slide-card">
      <img src="${d.image}" alt="${d.model}">
    </div>
  `;
    wrapper.appendChild(slide);
});

const swiper = new Swiper('.mySwiper', {
    modules: [Navigation],
    slidesPerView: 3,
    centeredSlides: true,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    spaceBetween: 20,
    slideToClickedSlide: true,
    speed: 600,
    breakpoints: {
        // 1441: { slidesPerView: 2,spaceBetween: 100},
        // 768: { slidesPerView: 2 },
        // 425: { slidesPerView: 1 }
    }
});

function updateInfo(activeRealIndex) {
    const data = datas[activeRealIndex];
    if (!data) return;

    document.getElementById('info-year').textContent = data.year;
    document.getElementById('info-model').textContent = data.model;
    document.getElementById('info-price').textContent = data.startingPrice;
    document.getElementById('info-hp').textContent = data.horsepower;
    document.getElementById('info-mpg').textContent = data.mpg;
}

updateInfo(swiper.realIndex);

swiper.on('slideChange', () => {
    updateInfo(swiper.realIndex);
});




const brandNames = document.querySelectorAll('.list_brands .name_brand');

brandNames.forEach(item => {
    item.addEventListener('click', () => {
        brandNames.forEach(el => el.classList.remove('active'));
        item.classList.add('active');
    });
});