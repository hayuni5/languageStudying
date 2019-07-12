var list = [0,1,2,3,4,5,6,7,8,9];
var number = [];
for (var i = 0; i < 4; i++) {
  var select = Math.floor(Math.random() * list.length);
  number[i] = list.splice(select, 1)[0];
}

var count = 0;
var strike = 0;
var ball = 0;
while (count < 10) {
    var input = prompt('숫자를 입력하세요');
    if (input === null) {
        alert('사용자에 의해 게임을 종료합니다.');
        break;
    } else {
    var inputArray = input.split('');	
    strike = 0; //stirke와 ball 개수를 초기화
	ball = 0;
	count++; //공격시도 횟수는 하나 증가시킴
//입력받은 숫자와 수비자가 준비하는 배열 요소를 비교분석하는 부분

    //입력한 숫자 4개끼리 비교하기.
    for(cmpr=0; cmpr<inputArray.length; cmpr++) {
        if(inputArray[cmpr] === inputArray[cmpr+1]) {
            alert('숫자를 중복하여 입력하였습니다. 다시 입력해주세요.');
            break;
        } else {
            continue;
        }
    }

    for(var j = 0; j < 4; j++) {
		for(var k = 0 ; k < 4; k++) {	
        	if (number[j] == inputArray[k]) {
                if(j===k) {
                    strike++;
                } else {
                    ball++;
                }
                break;
            } //외부if문 닫기
        } //내부 for닫기
    } //외부 for닫기
// 결과 표시 부분-console객체 활용
    if(strike === 4) {
        console.log('홈런!!!' + (count -1) + '번 만에 맞추셨습니다');
        break;
    } else if (count >= 10) {
        console.error('시도 횟수를 초과하셨습니다.');
    } else {
        console.info(count + '번째 시도 : ' + inputArray.join('') + ': ' + strike + '스트라이크 ' + ball + '볼');
    }
   }
}
