const WEATHER_API_KEY = "d5630fe6ba7720f6d89d6e28e5502a6f";
/* 
    API - simple way of getting data from other servers.
    In this case, we only need DATA.


    openweathermap.org 에서 무료로 제공하는 API 소스코드를 참고해보면... 날씨 api가 주는 데이터 형태(개발자도구-Network탭-Name에서 선택-Response탭 에서 확인가능)는 아래 링크와 같아
    https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22

    굳이 여기다 써보자면
    {"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d"}],"base":"stations","main":{"temp":280.32,"pressure":1012,"humidity":81,"temp_min":279.15,"temp_max":281.15},"visibility":10000,"wind":{"speed":4.1,"deg":80},"clouds":{"all":90},"dt":1485789600,"sys":{"type":1,"id":5091,"message":0.0103,"country":"GB","sunrise":1485762037,"sunset":1485794875},"id":2643743,"name":"London","cod":200}
    이렇게 생겼어..
    localStorage에 Value가 저장되는 모양과 같지? 이거 JSON데이터야,,, 자바스크립트객체 모냥임.

    보통 제공되는 api 키값을 주고,
    데이터를 어떻게 넣는지는 사이트에 친절히 알려준다.

    openweathermap.org의 api탭에 들어가
    by geographic coordinates 항목에 보면
    - API Call => 데이터 가져오는 주소 형식을 알려주고("api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}"")
    - Parameters => 값을 어디에 어떻게 넣는지 보여줬음("lat, lon coordinates of the location of your interest")

    가져온 데이터를 확인해보면.. 온도가 Kelvin식로 기본설정되어있음.
    웹사이트에 친절하게도 섭씨(Celsius)를 쓸 수 있는 방법을 알려줬으므로 가이드대로 따라가보도록 함.

            Temperature is available in Fahrenheit, Celsius and Kelvin units.

            For temperature in Fahrenheit use units=imperial
            For temperature in Celsius use units=metric
            Temperature in Kelvin is used by default, no need to use units parameter in API call
            List of all API parameters with units openweathermap.org/weather-data

    fetch()의 파라미터 url 끝에 "&units=metric" 를 추가해주면 됩니다!
*/

const COORDS = "coords";

const weatherCont = document.querySelector(".js-weather");
// HEY, how do I get a URL from Javascript?
// ==>javascript can send request, get websites, and send and get data without the website being refreshed!!

function getWeather(lat, lon) {
  //it's gonna be called by the function handleGeoSuccess()
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
  )
    .then(function(response) {
      return response.json(); //[[PromiseValue]]: Object - 열어보면 내가 따서 쓸 정보가 짠, 하고 있지롱.
    })
    .then(function(json) {
      console.log(json);
      const temperature = json.main.temp; //json 내용 중 main: {temp: 27.08, pressure: 1002, humidity: 62, temp_min: 24, temp_max: 29}
      const place = json.name;
      weatherCont.innerText = `${temperature}ºC @ ${place}`;
    });
  /* 데이터가 완전히 들어온 다음-fetch가 완료되기까지 기다리고==서버로부터 데이터가 다 들어올때까지 기다리고==응답으로 받는 Response객체를 기다리고
  -함수를 호출함 / 이 때 호출할 함수의 매개변수는 json데이터로 받을거니까 선언시 알아보기 쉽게 json이라고 이름짓자
  페이지 새로고침하고 확인해보면 console창에서 Response객체를 확인할 수 있음
  확인 결과로 Response객체는 network정보만 보이잖여? 근데 그 중에 정작 내가 꺼내서 쓸 body는 내용을 확인할 수 없다ㅠㅠ
  console.log(jsonResponse.json()); -> 이 행 수정추가하고 결과 봐 보면
  Promise객체가 Promise{<pending>} 꼴로 등장해벌이는데, 이거슨 대기상태라고 볼 수 있어. 가져온 데이터를 처리 중이라는 뜻.
  이것 역시 끝날 때까지 기다리고.. 다 끝나면 실행할 함수를 호출해야해. 한 번 더 .then() 을 쓰자.
  [[PromiseValue]]: Object 안의 내용을 따기 위해 .then()의 콜백함수로..

  */
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
  /* 다시한번, JSON.stringify -> 자바스크립트 객체나 배열을 json 문자열로 변환 */
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude /* = latitude, */,
    longitude /* = longitude */ //한곳에서 변수 이름과 새로 지정한 객체 내 속성 이름이 같으면 그냥 변수 이름으로 써도 됨!
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS); // @@@@@@ REMEMBER; VALUE FROM THE LOCAL STORAGE ARE ALL STRINGS, SO YOU NEED TO PARSE THOSE JSON STRINGS TO A JAVASCRIPT OBJECT @@@@@@
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
