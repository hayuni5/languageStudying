function confirmCheck() {

var msg = '예를 누르겠니?';

var b_result = confirm(msg);

if(b_result===true) {
	console.log('예를 눌렀습니다.');
}
else {
	console.log('아니오를 눌렀습니다.');
}
}

confirmCheck();