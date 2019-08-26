//하고픈 거 : 클릭된 요소(인덱스 이용)에 클래스를 추가하고 싶다

const a = document.getElementsByTagName("a");

console.log(a);

function handleActiveClass() {
  a[3].classList.toggle("active");
  console.log(a[3]);
}

function focused() {
  a[3].addEventListener("click", handleActiveClass);
}

function init() {
  focused();
}

init();
