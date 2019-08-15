// view in browser -> 브라우저창 띄우기 단축키 Ctrl + F1


const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");


const TODOS_LS = 'toDos';

/* 할일의 목록-여러 개-를 한 묶음으로 저장하기 위해 array를 씀              
=> array에 원소를 추가하는 법; (배열명).push(집어넣을 원소);
<-> (배열명).pop(인덱스번호 역순); 맨 뒤에서부터 인덱스를 0으로 매겨 앞으로 올 수록 1씩 커짐. 
    submit이벤트 발생시 paintTodo함수가 호출되어 실행될 때, 목록에 하나씩 추가하여 넣는 것이 내가 하고픈 거여
    그러기 위해선 paintToDo 안에 toDoObj를 만들어야 함

    ==>이 짓을 왜 하지?
        local storage에도 todo 항목들을 저장해둬야 하기 때문에!!
*/

const toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_LS, /* toDos */ JSON.stringify(toDos));
    /* 
    A JavaScript value, usually an object or array, to be converted.
    Converts a JavaScript value to a JavaScript Object Notation (JSON)
    string.
    */
    /* 로컬 스토리지에 setItem(키명, 값에 해당하는 어떤 것-변수 등) 했을 때에
        키 이름은 제대로 들어가는데,
        정확한 데이터는 값으로 저장할 수 없다.
        로컬 스토리지는 문자열만 값으로 저장할 수 있다.
        그래서 JSON.stringify() 를 쓴다. 자바스크립트 문서 내 객체나 배열 값을
        문자열로 변환해준다.
    */
}

function paintToDo(text){ //handleSubmit이 호출한 함수
    const li = document.createElement("li"); 
    const delBtn = document.createElement("button"); //
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText="X";
    span.innerText = text; //매개변수 값이 span 태그의 내부 문자열로...
    li.appendChild(span);
    li.appendChild(delBtn);
    // delBtn.className = newId; => .classname으로 dom객체 해당 태그에 클래스 속성과 이름을 부여할 수 있다니!!
    // ※ .classList.add(추가할 클래스명), remove(클래스명) 등의 속성이 더 있다
    li.id = newId;  // 해당 dom객체에 id를 부여할 수 있는 속성이다.
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);    // Put element inside the array by this code.
    saveToDos();            //Be sure you call this function after you push the toDoObj element
}
function handleSubmit(event) {
    event.preventDefault(); //submit이벤트 발생시 데이터를 다른 url로 전송시키지 말고..
    const currentValue = toDoInput.value;// input태그에 입력된 값을 변수로 만들어 담고,
    paintToDo(currentValue); //input태그에 입력된 값을 매개변수로 함수 호출
    toDoInput.value = ""; //input태그의 값을 없앰
}


function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos!==null){
        console.log(loadedToDos);
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
            /* .forEach() -> 배열의 각 원소마다 주어진 함수를 실행 */
        });
    } 
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();