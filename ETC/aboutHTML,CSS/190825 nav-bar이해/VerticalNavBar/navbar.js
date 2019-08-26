/* 목표 : 클릭한 곳만 active 클래스를 추가하고, 해당 선택자의 css를 먹이기*/
const a = document.querySelector(".menu");
console.log(a);

function toggleActiveClass() {
  a.classList.toggle("active");
}

function init() {
  a.addEventListener("click", toggleActiveClass);
}

init();
