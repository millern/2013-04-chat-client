var room = "newtestroom324";
var memory = {};
var friends = {};
var changeroom = function(newRoom){
  room = newRoom || "messages";
};


var receiveIt = function(){
$.ajax('https://api.parse.com/1/classes/'+room, {
  contentType: 'application/json',
      success: function(data){
        displayMessages(data);
      },
    error: function(data) {
      console.log('Ajax request failed');
    }
    });

    var boldFriends = function(){
      $('.username').each(function(index){
        if(friends[$(this).text()]===true) {
          $(this).addClass("friend");
        } else {
          $(this).removeClass("friend");
        }
      });
    };

    var displayMessages = function(data) {
      for(var i = 0; i < data.results.length; i++) {
        if(!memory.hasOwnProperty(data.results[i].objectId)){
          memory[data.results[i].objectId] = true;
          $litag = $('<li class = "chatMessage"></li>');
          $msg = $('<span class="message"></span>');
          $msg.text(data.results[i].text);
          $username = $('<span class="username" data-username="' + data.results[i].username + '"></span>');
          $username.text(data.results[i].username);
          $username.on('click', function(){
            if(friends[$(this).text()] === true){
              friends[$(this).text()] = false;
            }else {
              friends[$(this).text()] = true;
            }
            boldFriends();
          });
          $litag.prepend($username);
          $litag.append(": ");
          $litag.append($msg);
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
    'username': window.location.search.slice(window.location.search.indexOf('=')+1),
    'text': $('#writeMsg').val()
    //'roomname': '4chan' // Optional
    //'hax': 'alert("hi")' // Optional; used in an extra credit option below
  };
    postIt(message);
  });
$('#receiveMsg').on('click',function(){
    receiveIt();
  });


$('.username').on('click', function(event){
  console.log("HDGHJSKHK");
});

});
