const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1");

    console.log(clockTitle);
    //we need to get current date.
    //practice how to use Date object
    /* 
    콘솔창에서..
        const date = new Date();
        date;
        => 입력시 날짜, 월, 일, 년도, 시분초, 표준시각 까지 출력해줌

        date.getDay();
        => 1~7까지의 숫자로 오늘 날짜의 요일을 알려줌
            (월요일 1, 화요일 2, ..., 토요일 6, 일요일 7)
    */

function getTime() {
    const date = new Date(); //it's an Object!
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText =
        `${hours < 10 ? `0${hours}`: hours
    }:${minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
                                                            //    true일때 실행 : false일때
                                                //변수와 관련된 조건을 적을 수 있다.   
    
    // ternary operator(삼항연산자)! it's called "Mini-if"
}
/* 
여기까지 getTime이라는 함수를 정의한 거고,
실행을 하려면? 호출을 해야지!
*/

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();

/* 항상 나눠서 문제를 해결하도록 해 A L W A Y S

clock.js 로직..
1. HTML파일을 이용하여 어느 부분에 어느 id와 어느 class를 따와서 이용할것인지
2. 거기에 무슨 내용을 집어넣을 것인지->여기서는 현재 시각을 집어넣기로 함
3. 현재 시각을 어떻게 가져오는지 -> Date 객체를 활용하여 상수 이용,
                                시와 분을 알아내어 또 상수처리,
                                그 상수를 화면에 띄워야 하니까 .innerText 함수와 백틱(``), ${} 이용하기
4. 어떻게 실행할 것인지 -> init함수를 써서 현재 시간을 처리하는 함수를 호출한다.

+) 새로고침할 때 초단위로 시간이 바뀌는 것을 확인할 수 있음
    내가 하고 싶은 건? 시간을 계속 받아와서 초가 바뀌는 것을 보고 싶음.
    이를 위해서는? setInterval이 필요함!

    setInterval(실행시킬 함수-function to execute, 실행시킬 횟수-how much time you want to execute
                                                    -밀리세컨 기준으로 n초에 1번씩 실행하도록 함);
*/

