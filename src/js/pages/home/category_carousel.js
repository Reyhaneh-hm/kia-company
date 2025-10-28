import $ from 'jquery';
window.$ = window.jQuery = $;
import 'slick-carousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



$(document).ready(function () {
    $('#slide_cards').slick({
        autoplay: false,
        autoplaySpeed: 3000,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '60px',
        arrows: true,
        dots: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    centerPadding: '40px',
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '20px',
                },
            },
        ],
    });
});

