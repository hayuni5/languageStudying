// view in browser -> 브라우저창 띄우기 단축키 Ctrl + F1
// Live Server -> 브라우저창 띄우기 단축키 ALT+L ALT+O

/* 190816에서 중요한 포인트는
    ## filter() ## 와 ## forEach() ##
*/

const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

/* 할일의 목록-여러 개-를 한 묶음으로 저장하기 위해 array를 씀              
=> array에 원소를 추가하는 법; (배열명).push(집어넣을 원소);
<-> (배열명).pop(인덱스번호 역순); 맨 뒤에서부터 인덱스를 0으로 매겨 앞으로 올 수록 1씩 커짐. 
    submit이벤트 발생시 paintTodo함수가 호출되어 실행될 때, 목록에 하나씩 추가하여 넣는 것이 내가 하고픈 거여
    그러기 위해선 paintToDo 안에 toDoObj를 만들어야 함

    ==>이 짓을 왜 하지?
        local storage에도 todo 항목들을 저장해둬야 하기 때문에!!
*/

/* function filterFn(toDo) {
  // 마치 forEach에서 function을 실행하는 것과 같이
  // 각각의 item과 같이 실행될 것임
  return toDo.id === 1;
} */

let toDos = [];

/* 190816 todolist(3)
    We are going to delete one of the list from both the local storage
    and the screen.
    For this procedure, we need to...
    
    1. delete one from localStorage,
    2. and save it.
    3. and also from the HTML.

    WE WILL GONNA DELETE IT FIRST FROM THE HTML.
    */

function deleteToDo(event) {
  const btn = event.target; /* (어떤 버튼을 선택했는지 타겟지정) */
  const liTargeted = btn.parentNode;
  toDoList.removeChild(liTargeted);
  const cleanToDos = toDos.filter(function(toDo) {
    console.log(toDo);
    console.log(toDo.id, liTargeted.id); //toDo.id는 숫자, li.id는 문자열
    return toDo.id !== parseInt(liTargeted.id); //parseInt()로 정수형 숫자로 형변환해줌
  });
  toDos = cleanToDos; // 먼저 원소가 지워진 cleanToDos 배열을 toDos 배열로 바꿔주고
  saveToDos(); // 그 다음 저장한다.

  /* 선택된 버튼의 부모가 뭔지 몰라.. -console.log()로 띄워서 확인해보면
        버튼마다 클릭했을 때 전부 <button>X</button>이라고 뜬다.
        그래서 우리는 그 버튼의 부모 선택자인 li에 부여되었던 id값을 이용할 거야.
        console.dir로 확인하여서... 해당 태그의 모든 속성을 살펴보다..
        parentNode가 li인 것을 확인! console.log로 다시 확인
        나누어서 로직을 짜준다.

        한번 실행은 되지만 페이지 새로고침하면 삭제된 리스트가 다시 떠있다.ㅠ
        해결해야겠지?
        */

  // filterFn()이 toDos 배열 안의 모든 원소에 통함
  // toDos.filter(filterFn)의 의미; filterFn()에 걸러져서 값이 true인 원소만 return한다.
  // AGAIN; .filter() runs a function through every item of the array
  // and then makes a new array only with the items that are 'true'.
}

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
        local Storage는 문자열만 값으로 저장할 수 있다.
        그래서 JSON.stringify() 를 쓴다. 해당 함수는 자바스크립트 문서 내 객체나 배열 값을
        문자열로 변환해준다.
    */
}

function paintToDo(text) {
  //handleSubmit이 호출한 함수
  const li = document.createElement("li");
  const delBtn = document.createElement("button"); //
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "X";
  delBtn.addEventListener("click", deleteToDo);
  /* 리스트 중 어떤 버튼이 선택되었는지 알아야 함! 
        .target을 이용한다~~
        function deleteToDo()의 바디에서 다루어준다.
        */

  span.innerText = text; //매개변수 값이 span 태그의 내부 문자열로...
  li.appendChild(span);
  li.appendChild(delBtn);
  // delBtn.className = newId; => .classname으로 dom객체 해당 태그에 클래스 속성과 이름을 부여할 수 있다니!!
  // ※ .classList.add(추가할 클래스명), remove(클래스명) 등의 속성이 더 있다
  li.id = newId; // 해당 dom객체에 id를 부여할 수 있는 속성이다.
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj); // Put element inside the array by this code.
  saveToDos(); //Be sure you call this function after you push the toDoObj element
}
function handleSubmit(event) {
  event.preventDefault(); //submit이벤트 발생시 데이터를 다른 url로 전송시키지 말고..
  const currentValue = toDoInput.value; // input태그에 입력된 값을 변수로 만들어 담고,
  paintToDo(currentValue); //input태그에 입력된 값을 매개변수로 함수 호출
  toDoInput.value = ""; //input태그의 값을 없앰
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      console.log("this is" + JSON.stringify(toDo));
      paintToDo(toDo.text);
      /* .forEach() -> 배열의 각 원소마다 주어진 함수를 실행 */
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();

/* 190816 todolist(3)
    We are going to delete one of the list from both the local storage
    and the screen.
    For this procedure, we need to...
    
    1. delete one from localStorage,
    2. and save it.
    3. and also from the HTML.

    WE WILL GONNA DELETE IT FIRST FROM THE HTML.
    */
