var room = "messages";
var memory = {};
var friends = {};

var changeroom = function(newRoom){
  room = newRoom || "messages";
  $('.current-chat-room').text("Chatting in: " +room);
  $('#userMessages').html("");
  memory = {};
};

var receiveIt = function(){
  $.ajax({
    url:'https://api.parse.com/1/classes/'+room,
    contentType: 'application/json',
    data: {"order":"-createdAt","limit":"20"},
    success: function(data){
      displayMessages(data);
    },
    error: function(data) {
      console.log('Ajax request failed');
    }
  });

  var boldFriends = function(){
    $('.username').each(function(index){
        $(this)[friends[$(this).text()] ? "addClass" : "removeClass"]("friend");
    });
    displayFriends();
  };

  var displayFriends = function(){
    $('#friends-list').html("");
    for(var key in friends){
      $('#friends-list').append($('<li></li>').text(key));
    }
  };

  var displayMessages = function(data) {
    for(var i = data.results.length-1; i >= 0; i--) {
      if(!memory.hasOwnProperty(data.results[i].objectId)){
        memory[data.results[i].objectId] = true;
        $litag = $('<li class = "chatMessage"></li>');
        $msg = $('<span class="message"></span>');
        $msg.text(data.results[i].text);
        $username = $('<span class="username" data-username="' + data.results[i].username + '"></span>');
        $username.text(data.results[i].username);
        $username.on('click', function(){
          if(friends[$(this).text()] === true){
            delete friends[$(this).text()];
          }else {
            friends[$(this).text()] = true;
          }
          boldFriends();
        });
        $createdDate = $('<span class="createdAt"></span>');
        $createdDate.text(moment(data.results[i].createdAt).fromNow());
        $litag.append($username,": ",$msg," -- ",$createdDate);
        $('#userMessages').append($litag);
        $('#main ul').animate({ scrollTop: $('#main ul').prop("scrollHeight") - $('#main ul').height() }, 1);
      }
    }
  };
};

var postIt = function(message) {
    $.ajax('https://api.parse.com/1/classes/'+room,
    {contentType: "application/json",
    data: JSON.stringify(message),
    type: "POST"
  });
};

setInterval(receiveIt, 500);

$('#sendMsg').on('click',function(){
  var message = {
  'username': window.location.search.slice(window.location.search.indexOf('=')+1),
  'text': $('#writeMsg').val(),
  'roomname': 'tucker'
};
  postIt(message);
});
$('#receiveMsg').on('click',function(){
    receiveIt();
  });
$('#submitChangeRoom').on('click', function(event){
  changeroom(prompt("Where to?"));
  receiveIt();
});
