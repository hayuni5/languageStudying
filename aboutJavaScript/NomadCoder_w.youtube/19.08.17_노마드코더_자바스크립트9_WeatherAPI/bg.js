const body = document.querySelector("body"),
  text = document.querySelector(".memoing"),
  textHere = text.querySelector(".textHere"),
  whatYouWrote = document.querySelector(".whatYouWrote"),
  reloadPage = document.querySelector(".reloading");

const IMG_NUMS = 3;

function handleImgLoad() {
  console.log("finished loading img");
}

function paintImage(imgNum) {
  const image = new Image();
  image.src = `/imgs/bgp${imgNum + 1}.jpg`;
  image.classList.add("bgP");
  body.prepend(image);
  //   image.addEventListener("loadend", handleImgLoad);
}

function genRandom() {
  const num = Math.floor(Math.random() * IMG_NUMS);
  return num;
  /* Math객체를 배웁니다.
        
    */
}

function paintText(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerText = text;
  whatYouWrote.appendChild(li);
  li.appendChild(span);
}

function handleSubmit(event) {
  event.preventDefault();
  const content = textHere.value;
  paintText(content);
  textHere.value = "";
}

function reloadThisPage() {
  history.go(0);
}

function init() {
  const randomNum = genRandom();
  paintImage(randomNum);
  text.addEventListener("submit", handleSubmit);
  reloadPage.addEventListener("click", reloadThisPage);
}

init();
