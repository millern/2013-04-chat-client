var room = "tuckertest1";
var memory = {};
var temp;
var changeroom = function(newRoom){
  room = newRoom || "messages";
};

var receiveIt = function(){
$.ajax('https://api.parse.com/1/classes/'+room, {
  contentType: 'application/json',
      success: function(data){
        displayMessages(data);
        temp = data;
      },
    error: function(data) {
      console.log('Ajax request failed');
    }
    });

    var displayMessages = function(data) {
      for(var i = 0; i < data.results.length; i++) {
        if(!memory.hasOwnProperty(data.results[i].objectId)){
          memory[data.results[i].objectId] = true;
          $litag = $('<li class = "chatMessage"></li>');
          $litag.text(data.results[i].text);
          $span = $('<span class="username"></span>');
          $span.text(data.results[i].username + ": ");
          $litag.prepend($span);
          $('#userMessages').append($litag);
        }

      }
    };
};

  var postIt = function(message) {
      console.log(message.text);
      $.ajax('https://api.parse.com/1/classes/'+room,
      {contentType: "application/json",
      data: JSON.stringify(message),
      type: "POST",
      success: function(){
        console.log("message sent");
      }
    });
  };


$(document).ready(function(){

  setInterval(receiveIt, 500);
  receiveIt();
  var writeMsgVal = $('#writeMsg').val();

  $('#sendMsg').on('click',function(){
    var message = {
    'username': window.location.search.slice(window.location.search.indexOf('=')+1, (window.location.search.indexOf('/'))),
    'text': $('#writeMsg').val()
    //'roomname': '4chan' // Optional
    //'hax': 'alert("hi")' // Optional; used in an extra credit option below
  };
    postIt(message);
  });
$('#receiveMsg').on('click',function(){
    receiveIt();
  });


});