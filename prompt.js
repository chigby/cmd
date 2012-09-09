/*
TODO:
  - linkify urls in responses?
  - automatic type and submit commands when given a query string, e.g.
    nullsurface.com/12345 -> 'transition-metal' command auto types and
    submits.  maybe not needed at first.
*/

var baseUrl = 'http://nullsurface.com/cmd/';

function makeResponse(cmd) {
    http = new XMLHttpRequest();
    var url = baseUrl + escape(cmd);
    http.open("GET", url, false);
    http.send(null);
    return http.responseText;
}

$(function() {
      var prompt = $('#prompt');
      var responseBox = $('#responses');
      var code = null;
      prompt.focus(
          function(e) {
              prompt.val('');
          }
      );

      prompt.keypress(
          function(e) {
              code = (e.keyCode ? e.keyCode : e.which);
              if (code == 13) {
                  var command = prompt.val();
                  var response = makeResponse(command);
                  var responseDiv = ["<div class='responseBox'><span>", command, "</span><br/><span><b>", response, "</b></span></div>"].join("");
                  responseBox.append(responseDiv);
                  prompt.val('');
                  var rBox = responseBox[0];
                  var scrollHeight = Math.max(rBox.scrollHeight, rBox.clientHeight);
                  console.log(scrollHeight);
                  rBox.scrollTop = scrollHeight - rBox.clientHeight;
              }
          });

  });