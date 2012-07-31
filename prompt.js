/*
TODO:
  - linkify urls in responses?
  - automatic type and submit commands when given a query string, e.g.
    nullsurface.com/12345 -> 'transition-metal' command auto types and
    submits.  maybe not needed at first.
*/

var baseUrl = 'http://nullsurface.com/cmd/';
var cursor = '_';

function scrollToBottom() {
    x = 0;
    y = document.height;
    window.scroll(x,y);
}

function removeLastChar(str) {
    return str.substr(0, str.length - 1);
}

function makeResponse(cmd) {
    http = new XMLHttpRequest();
    var url = baseUrl + escape(cmd);
    http.open("GET", url, false);
    http.send(null);
    return http.responseText;
}

window.addEventListener('keyup', function(event) {
    event.preventDefault();
    if (event.keyCode == 8) {
        event.preventDefault();
        var t = document.getElementById('text');
        var len = t.innerHTML.length;
        if (t.innerHTML.substring(len - 7, len - 2) !== '<br>$') {
            t.innerHTML = t.innerHTML.substring(0, len - 2);
            t.innerHTML += cursor;
        }
    }
    return false;
});

window.addEventListener("keydown", function(e) {
    console.log(e.keyCode);
    if (e.keyCode === 8) {
        console.log("here we go");
        e.preventDefault();
    }});

window.addEventListener('keypress', function(event) {
    event.preventDefault();
    var charCode = (typeof event.which == "number") ? event.which : event.keyCode;
    var c = String.fromCharCode(charCode);
    var t = document.getElementById('text');
    switch (event.keyCode) {
    case 8: //backspace
        var len = t.innerHTML.length;
        if (t.innerHTML.substring(len - 7, len - 2) !== '<br>$') {
            t.innerHTML = t.innerHTML.substring(0, len - 2);
            t.innerHTML += cursor;
        }
        event.preventDefault();
        break;
    case 13: // Return
        var cmd = t.innerHTML.substring(t.innerHTML.lastIndexOf('$') + 2);
        cmd = removeLastChar(cmd);
        t.innerHTML = removeLastChar(t.innerHTML);
        t.innerHTML += '<br/><b>' + makeResponse(cmd) + '</b><br/>$ ' + cursor
        scrollToBottom();
        break;
    default:
        t.innerHTML = removeLastChar(t.innerHTML);
        t.innerHTML += c;
        t.innerHTML += cursor;
        break;
    }
}, false);