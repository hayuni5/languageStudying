/* 

localStorage의 value는 문자열만 가능하다는 것을 기억하자.


1) input태그에 내용을 입력한다.
2) Enter를 치면
  ① 화면 전환없이, 입력한 내용이 삭제 버튼과 함께 화면에 출력된다. 
  ② 해당 내용이 localStorage에 설정한 키의 값으로 저장된다.
    이 때, 목록이라 여러 개 만들 수 있으므로 그냥 배열 하나를 값으로 정해두고(ul태그) 그 안에 객체를 추가(span의 내용&li의 id)하는 식으로 로직을 짠다.  

3) 목록 삭제기능을 하고 싶당
  삭제버튼을 눌렀을 때 어떤 함수가 실행될 건데, ##입력시에 1. 화면에 띄우고 2. localStorage에 새로 저장## 했던 것과 반대로 한다.
  ① localStorage에서 해당 항목을 지우고
  ② 지워진 그 상태를 저장하고
  ③ html문서(화면)에서 지운다.
  
==========내일 190821 하자===========

*/

const toDoForm = document.querySelector(".toDoForm"), //form태그의 클래스
  toDoInput = toDoForm.querySelector("input"), //input태그 DOM
  toDoList = document.querySelector(".toDoList"), //ul태그의 클래스
  TODOS_LS = "toDos"; //localStorage의 키명을 변수로 박아벌임

let toDos = []; //할일 목록 전체를 하나의 배열로 여겨봅시당

function deleteToDo() {
  const btn = event.target;
  const liTargeted = btn.parentNode;
  toDoList.removeChild(liTargeted);
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(liTargeted.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //배열을 통째로 하나로 저장함! 이 toDos배열의 원소들은 또 각각 toDoObj꼴의 객체여
}

function paintToDo(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const newId = toDos.length + 1;
  delBtn.innerText = "X";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li); //ul태그 dom에 하위 태그로 li 생성스
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos(); //localStorage에 (갱신되는) 배열 toDos저장하기.
}

function handleSubmit(event) {
  // 새로 목록을 작성할 때 호출됨
  event.preventDefault();
  const currValue = toDoInput.value;
  paintToDo(currValue);
  toDoInput.value = "";
}

function loadToDos() {
  //localStorage에 있는 item의 값을 가져오기 위한 함수
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos); //localStorage의 value는 json 문자열이므로 자바스크립트 객체로 바꾸려면 json.parse()해서 변환해주기
    parsedToDos.forEach(function(
      toDo /* 할일 목록 하나에 대하여-loadToDo()에서 정의했던 그 toDoObj 하나임 */
    ) {
      console.log("this is" + JSON.stringify(toDo)); //전달 받아온 toDo는 JSON.parse를 통해 변환된 자바스크립트value(포장됨)이므로 콘솔에 띄워 내용을 보여주기 위해 json.stringify()를 썼음
      /* load했으면 자바스크립트value를 다시 화면에 출력시켜야겠조? paintToDo()가 그 기능을 합니다*/
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos(); //아주 처음엔 아무것도 없으므로 호출했으나 else문에 바디가 없으므로 실행되지 않는 것처럼 보임
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
