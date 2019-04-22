'use strict';

function validateSlideNumNotCycled(num, min, max, btn, disabled) {
  num = num < min ? min : num;
  num = num > max ? max : num;

  return num;
}

function validateSlideNumCycled(num, min, max) {
      num = num < min ? max : num;
      num = num > max ? min : num;
      return num;
    }

var keyCodesToCarouselBtns = {
  '37': 'btn-prev',
  '39': 'btn-next'
};

var carousel = document.querySelector('.carousel__section');
var carouselImgsBox = document.querySelector('.carousel__imgs');//carousel.firstElementChild; //!!!!
var classDisabled = 'carousel__btn--disabled'; // !!!!
var carouselControllers = document.querySelectorAll('.carousel__btn');
var carouselTogglers = document.querySelectorAll('*[id^="carousel-toggler"]');
var carouselTogglersArray = Array.prototype.slice.call(carouselTogglers);

var slideNum = 0;
var newSlideNum = 0;
var initLeft = 0;
var transformStep = carousel.offsetWidth - 4;
var disabledBtn = document.querySelector('.' + classDisabled);

var carouselControllersToOpertors = {
  'btn-prev': -1,
  'btn-next': 1
};



var slideNum = 0;
var newSlideNum = 0;
var initLeft = 0;
var transformStep = carousel.offsetWidth - 4;
var disabledBtn = document.querySelector('.' + classDisabled);

var carouselControllersToOpertors = {
  'btn-prev': -1,
  'btn-next': 1
};

function carouselBtnClickHandler (btn) {
  carouselTogglers[slideNum].checked = false;
  newSlideNum = validateSlideNumCycled(
    slideNum + carouselControllersToOpertors[btn.id],
    0,
    carouselImgsBox.children.length - 1
  );
    
  carouselTogglers[newSlideNum].checked = true;
  // togglers[newSlideNum].focus();

  if ((slideNum === carouselImgsBox.children.length - 1) && (newSlideNum === 0) ||
    (slideNum === 0) && (newSlideNum === carouselImgsBox.children.length - 1)) {
    carouselImgsBox.style.transition = '1.8s';
  } else {
    carouselImgsBox.style.transition = '0.2s'
  }
      
  initLeft = initLeft - transformStep * (newSlideNum - slideNum);
  carouselImgsBox.style.left = initLeft + 'px';
  slideNum = newSlideNum;
  // togglers[slideNum].checked = true;
}

function carouselTogglerClickHandler (toggler) {
  //carouselTogglers[slideNum].checked = false;//??????
  newSlideNum = carouselTogglersArray.indexOf(toggler);  
  //carouselTogglers[newSlideNum].checked = true;

  carouselImgsBox.style.transition = 0.4 * Math.abs(newSlideNum - slideNum) + 's';    
  initLeft = initLeft - transformStep * (newSlideNum - slideNum);
  carouselImgsBox.style.left = initLeft + 'px';
  slideNum = newSlideNum;
}

function carouselKeyPressHandler(evt) {
  var activeBtn = document.querySelector('#' + keyCodesToCarouselBtns[evt.keyCode]);
  if (activeBtn) {
    activeBtn.focus();
    carouselBtnClickHandler(activeBtn);
  }
}

/*setInterval(function() {
  carouselControllers.forEach(function (btn) {
    
    carouselBtnClickHandler(btn);
 
});
}, 400);*/

carouselControllers.forEach(function (btn) {
  btn.addEventListener('click', function (evt) {
    carouselBtnClickHandler(evt.target);
  });
});


carouselTogglers.forEach(function (btn) {
  btn.addEventListener('click', function (evt) {
    //evt.preventDefault();
    carouselTogglerClickHandler(evt.target);
  });
});

var carouselArea = document.querySelector('.carousel');
carouselArea.addEventListener('keydown', carouselKeyPressHandler);

       
   
