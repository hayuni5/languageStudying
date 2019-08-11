// view in browser -> 브라우저창 띄우기 단축키 Ctrl + F1


const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");


const TODOS_LS = 'toDos';

function paintToDo(text){ //handleSubmit이 호출한 함수
    const li = document.createElement("li"); 
    const delBtn = document.createElement("button"); //
    delBtn.innerText="X";                           //이렇게 한 세트
    const span = document.createElement("span");
    span.innerText = text; //매개변수 값이 span 태그의 내부 문자열로...
    li.appendChild(span);
    li.appendChild(delBtn);
    toDoList.appendChild(li);
}

function handleSubmit(event) {
    event.preventDefault(); //submit이벤트 발생시 데이터를 다른 url로 전송시키지 말고..
    const currentValue = toDoInput.value;// input태그에 입력된 값을 변수로 만들어 담고,
    paintToDo(currentValue); //input태그에 입력된 값을 매개변수로 함수 호출
    toDoInput.value = ""; //input태그의 값을 없앰
}

function loadToDos() {
    const toDos = localStorage.getItem(TODOS_LS);
    if(toDos!==null){

    } 
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();