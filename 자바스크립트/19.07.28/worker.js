function sleep(delay) {
    var start = new Date().getTime();
    while(new Date().getTime() < start + delay);
}

self.addEventListener('message', function(e) {
    console.log(e.data);
    sleep(3000);
    var coords = Math.randon();
    console.log(coords);
    self.postMessage(coords);
});