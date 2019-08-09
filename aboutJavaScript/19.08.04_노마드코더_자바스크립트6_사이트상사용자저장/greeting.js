/* 
전체 흐름:
1. 첫 화면 - input text 박스가 있다. 이름을 입력한다. - currentUser값으로 들어갈 것.
2. 자바스크립트 처리
    - html DOM 객체를 지역상수 const변수 처리 해줌
    - 로컬스토리지의 키의 값을 const변수 처리 해줌
3. 로컬스토리지에 저장된 데이터를 가지고 함수처리하기
    - 어떤 함수를 실행할 건데, 그 함수는 로컬스토리지에 저장된 키의 값을 불러서
        그 값이 ⓐ존재할 때와 ⓑ존재하지 않을 때(===null) 다른 처리를 한다.
            function ⓐ; 
            function ⓑ; 가져온 값(문자열)을 h4태그 내부 문자로 지정해놓은 문자열에 포함시켜 띄우고,
                        
*/


const form = document.querySelector(".js-form"),
        input = form.querySelector("input"),
        greeting = document.querySelector(".js-greetings");

        // querySelector는 해당 선택자의 첫번째 것을 가져온다.
// querySelectroAll은 해당 선택자를 가진 모든 것을 가져온다. -> array형식을 준다.

/* 
브라우저 콘솔창에 localStorage.setItem 하는 중 ....
localStorage.setItem("key명", value값);
=> 요소검사 창의 Application - 왼쪽 메뉴창 중 Storage-Local Storage에서 키와 값을 확인가능
    새로고침해도 유지됨.
    키의 값 변경은 해당 창에서 가능하고, localStorage.getItem("key명")으로 알아낼 수 있음

    localStorage works based on URLs.
    your Facebook local storage cannot load the local storage of your blog.
    */

const USER_LOCALSTORAGE = "currentUser",
        SHOWING_CLASSNAME = "showing";


/*  form태그 안에서 데이터를 입력하고 enter를 누르면, submit이 되는데
    이 이벤트가 발생하면 데이터를 넘겨서 다른 url을 타고 갔다가 페이지가
    새로고침된 것처럼 보임.. 이벤트가 document 객체까지 타고 올라갔다고
    Nicolas가 표현함
    zerocho의 이벤트리스너&콜백함수 단원을 참고함
    -> "이벤트버블링" 이라고 하는데, DOM에 연결한 이벤트에서 발생
        자식의 이벤트가 부모에게 전달되고... DOM 트리상 타고타고 올라가서
        최상위 객체인 document에게까지 전달된다.
        
        DOM에 대한 이벤트에 연결한 함수는 이벤트객체를 매개변수로 사용가능하다.
        그리하여, DOM객체로 불러온 태그에 해당되는 기본 동작을 제어하여 막을 수
        있고(preventDefault), 자식 태그 작동시 부모에게로 이벤트가 전달되지 않
        게 할 수도 있다(stopPropagation).

*/

function saveName(text) {
    localStorage.setItem(USER_LOCALSTORAGE, text);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;

    console.log(currentValue);

    paintGreeting(currentValue);
    saveName(currentValue);
    /*  input박스에 데이터를 입력하고 enter를 눌러도 이 함수가 실행되었기 때문에
        데이터가 url을 타고 일어나는 전송도, 화면 전환도 일어나지 않음 */
}

function askForName() {
    //function ⓑ.
    form.classList.add(SHOWING_CLASSNAME);
    form.addEventListener("submit", handleSubmit);
}


function paintGreeting(text){
    //function ⓐ.
    form.classList.remove(SHOWING_CLASSNAME);
    greeting.classList.add(SHOWING_CLASSNAME);
    greeting.innerText = `Hello ${text}`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LOCALSTORAGE);
    if(currentUser===null) {
        askForName();
    } else {
        // currentUser값이 존재할 때ⓐ
        paintGreeting(currentUser);

    }
}

function init() {
    loadName();
}

init();