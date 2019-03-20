//adaptive menu
var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});

//add work
var worksMain = document.querySelector('.works__more');
var worksToggle = document.querySelector('.works__button');

if (worksToggle) {
  worksToggle.addEventListener('click', function () {
    if (worksMain.classList.contains('works__list--less')) {
      worksMain.classList.remove('works__list--less');
      worksMain.classList.add('works__item--more');
      this.textContent = 'less work';
    } else {
      worksMain.classList.add('works__list--less');
      worksMain.classList.remove('works__list--more');
      this.textContent = 'load more work';
    }
  });
}

// slider testimonials
$(document).ready(function () {
  $(".testimonials__list").owlCarousel({
    nav: false,
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    navText: ["", ""]
  });
});

//slider projects
$(document).ready(function () {
  $(".project-single__list").owlCarousel({
    nav: true,
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navText: ["", ""]
  });
});


//modal
var link = document.querySelector('.contact__button--modal');
var popup = document.querySelector('.contact__modal');
var close = popup.querySelector('.form__button--close');

link.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.add('contact__modal--show');
});

close.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.remove('contact__modal--show');
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popup.classList.contains('contact__modal--show')) {
      popup.classList.remove('contact__modal--show');
    }
  }
});
