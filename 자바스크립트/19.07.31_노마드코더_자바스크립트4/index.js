const title = document.querySelector("#title");

// const BASE_COLOR = "rgb(131, 149, 167)";
// const OTHER_COLOR = "#130f40";

const CLICKED_CLASS = "clicked";

 /* function handleClick() {
    console.log(title.style.color)
} */
/*  function handleClick() {
  console.log(title.style.color);
} */
/* function handleClick2() {
    const currentColor = title.style.color;
    if(currentColor === BASE_COLOR) {
        title.style.color = OTHER_COLOR;
    } else {
        title.style.color = BASE_COLOR;
    }
} */
/* function init() {
    title.style.color = BASE_COLOR;
    // title.addEventListener("click", handleClick2);
    title.addEventListener("mouseenter", handleClick2);
} */
// init();
//클릭할 때마다 두가지 색이 번갈아가며 바뀌도록 함.
/* 
init에서 handleClick2가 쓰이니까 init 정의 이전에 handleClick2를 정의해줘야함
(왜냐하면 자바스크립트 코드는 인터프리터 방식이라 위에서 아래로 한줄씩 읽히기 때문)
*/


//인터넷 연결 유무에 반응하는 모습을 볼 수 있음!!
//online과 offline이벤트 - 객체는 이벤트
/* function handleOffline() {
    console.log("lala");
}

function handleOnline() {
    console.log("you are online");
}

window.addEventListener("offline", handleOffline);
window.addEventListener("online", handleOnline); */



/* 
목표 : html은 html 안에서만, css는 css 안에서만, javascript로 로직을 처리
*/

function handleClick3() {
   /* const hasClass = title.classList.contains(CLICKED_CLASS);
   
   if (hasClass) {
       title.classList.remove(CLICKED_CLASS); //=>SETTING A VALUE
   } else {
       
       title.classList.add(CLICKED_CLASS);
   } */

   title.classList.toggle(CLICKED_CLASS);
   //handleClick3() 내의 주석처리된 코드의 기능을 classList.toggle()이 한방에 해결해줌
    //    => 클래스 존재시 제거하고 false 반환, 존재하지 않을 시 true 반환
}

function init() {
    title.addEventListener("click", handleClick3);
}

init();