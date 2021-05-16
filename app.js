let firstCamera = document.querySelector('.first__camera-icon');
let secondCamera = document.querySelector('.second__camera-icon');
let block = document.querySelector('.dark__bg');
let movements = 0;
let attempts = 3;
let right = 0;

/*firstCamera.addEventListener("drop", function( event ) {

    event.preventDefault();

    if ( event.target.className == "dropzone" ) {
        event.target.style.opacity = 1;
        dragged.parentNode.removeChild( dragged );
        event.target.appendChild( dragged );
    }
}, false);*/

var dragged;

/* events fired on the draggable target */
document.addEventListener("drag", function(event) {

}, false);

document.addEventListener("dragstart", function(event) {
  // store a ref. on the dragged elem
  dragged = event.target;
  // make it half transparent
  event.target.style.opacity = .5;
}, false);

document.addEventListener("dragend", function(event) {
  // reset the transparency
  event.target.style.opacity = "";
}, false);

/* events fired on the drop targets */
document.addEventListener("dragover", function(event) {
  // prevent default to allow drop
  event.preventDefault();
}, false);

document.addEventListener("dragenter", function(event) {
  // highlight potential drop target when the draggable element enters it
  if (event.target.classList.contains("dropzone")) {
    let img = document.createElement('img');
    img.src = 'images/firstCamera.png';
    event.target = img;
    event.target.style.opacity = 1;
  }

}, false);

document.addEventListener("dragleave", function(event) {
  // reset background of potential drop target when the draggable element leaves it
  if (event.target.classList.contains("dropzone")) {
    event.target.style.background = "";
  }

}, false);

document.addEventListener("drop", function(event) {
  // prevent default action (open as link for some elements)
  event.preventDefault();
  movements++;
  // move dragged elem to the selected drop target
  if (event.target.classList.contains("dropzone")) {
    event.target.style.background = "";
    if(dragged.classList.contains('first__camera-icon')){
      if(event.target.classList.contains('three')){
        right++;
      }

        dragged.parentNode.removeChild( dragged );
        let img = document.createElement('img');
        img.src = 'images/firstCamera.png';
        img.classList.add('newCamera');
        event.target.appendChild( img );
    }
    else{
        dragged.parentNode.removeChild( dragged );
        let img = document.createElement('img');
        img.src = 'images/secondCamera.png';
        event.target.appendChild( img );
        if(event.target.classList.contains('two')){
          img.style.transform = "translateX(-50%)";
          right++;

        }
        else if(event.target.classList.contains('four')){
            img.style.transform = 'translateY(-45%) translateX(-20%) rotate(270deg)';
        }
        else if(event.target.classList.contains('five')){
            img.style.transform = 'translateY(-50%) translateX(-75%) rotate(90deg)';
        }
    }
  }
  if(movements == 2){
    if(right == 2){
      let block = document.querySelector('.dark__bg');
      block.querySelector('.level__description').innerHTML = `
      <div class="win">
      <h2 class="winner__heading">Молодец!</h2>
      <p class="winner__text">
      Камеры фиксируют движение и разрешают следить за детьми или питомцами 24 часа 7 дней в неделю. Важные моменты жизни легко фиксируются в виде «Клипов», а для общения с предусмотрена функция push-to-talk.
      </p>
      </div>

      <button class="next" onclick="changeText()">Вперед</button>
      `
      document.querySelector('.next').style.zIndex = 10;
      block.style.visibility = 'visible';
      block.style.opacity = 1;
    }
    else{
      let block = document.querySelector('.dark__bg');
      block.querySelector('.level__description').innerHTML = `
      <div class="win">
      <h2 class="winner__heading">Game Over</h2>
      <p class="winner__text">
      Неправильное расположение камер
      Попробуй еще раз :( 
      </p>
      </div>

      <button class="next" onclick="anotherTime()">Заново</button>
      `
      document.querySelector('.next').style.zIndex = 10;
      block.style.visibility = 'visible';
      block.style.opacity = 1;
    }
  }
}, false);

function hideBlock(){
  block.style.visibility = 'hidden';
  block.style.opacity = 0;
  block.querySelector('.level__description').innerHTML = '';
}

function changeText(){
  document.querySelector('.next').setAttribute('disabled', 'true');
  document.querySelector('.winner__heading').innerHTML = `Наблюдение`;
  document.querySelector('.winner__text').innerHTML = `
  «Видеонаблюдение» помогает следить за домочадцами, недвижимостью, нанятыми сотрудниками. При возникновении подозрительных ситуаций система предупредит SMS, пересылаемой на телефон.
  `;
  let close = document.createElement('button');
  close.classList.add('close');
  close.innerHTML = `Выход`;
  block.querySelector('.level__description').appendChild(close);
  close.addEventListener('click', () => {
    block.style.visibility = 'hidden';
  block.style.opacity = 0;
  });
}

function anotherTime(){
  
  if(attempts == 0){
    document.querySelector('.winner__text').innerHTML = `Ваши попытки закончились, обновите страницу.`;
    let close = document.createElement('button');
    close.classList.add('close');
    close.innerHTML = `Выход`;
    block.querySelector('.level__description').appendChild(close);
    close.addEventListener('click', () => {
      document.querySelector('.next').disable = true;
    block.style.visibility = 'hidden';
    block.style.opacity = 0;
  });
}
else{
attempts -= 1;
document.querySelector('.attempts__count').innerHTML = `${attempts}`;
hideBlock();
}
}
