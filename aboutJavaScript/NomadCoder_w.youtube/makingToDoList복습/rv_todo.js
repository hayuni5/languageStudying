/* /* 
1) input태그에 입력한 내용으로
목록을 만들어 화면에 띄우고

2) 그 자료를 localStorage에 저장시킨다.
  이 때 목록을 통째로 하나로 취급하여..
  ul을 하나의 배열객체 취급하고,
  li들을 배열 원소 객체 취급하자.
  localStorage의 item으로 key값은 ul 통째로, value는 각 li객체가 표현되어있다..
  localStorage의 value는 문자열만 가능하다는 것을 기억하자.

3) 목록에서 삭제하여 화면에서 지우고
지워진 자료를 localStorage에 다시 반영시킨다.



*/

const toDoForm = document.querySelector(".toDoForm"), //form태그의 클래스
  toDoInput = toDoForm.querySelector("input"), //input태그 DOM
  toDoList = document.querySelector(".toDoList"), //ul태그의 클래스
  TODOS_LS = "toDos"; //localStorage의 키명을 변수로 박아벌임

function deleteToDo() {}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerText = "X";
  delBtn.addEventListener("click", deleteToDo);
  const span = document.createElement("span");
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  toDoList.appendChild(li);
}

/* function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS); //
  if (loadedToDos !== null) {
  }
} */

function handleSubmit(event) {
  event.preventDefault();
  const currValue = toDoInput.value;
  paintToDo(currValue);
  toDoInput.value = "";
}

function init() {
  // loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
