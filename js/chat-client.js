var receiveIt = function(){
$.ajax('https://api.parse.com/1/classes/testnode', {
          contentType: 'application/json',
          success: function(data){
            displayMessages(data);
            console.log(data);
          },
        error: function(data) {
          console.log('Ajax request failed');
        }
        });

        var displayMessages = function(data) {
          for(var i = 0; i < data.results.length; i++) {
            $litag = $('<li class = "chatMessage"></li>');
            $litag.text(data.results[i].text);
            $('#userMessages').append($litag);
          }
        };
};

  var postIt = function(data) {
      $.ajax('https://api.parse.com/1/classes/testnode',
      {contentType: "application/json",
      data: '{"text":"Nick"}',
      type: "POST",
      success: function(){
        console.log("message sent");
      }
    });
  };


$(document).ready(function(){

  var message = {
    'username': 'shawndrost',
    'text': 'trololo',
    'roomname': '4chan', // Optional
    'hax': 'alert("hi")' // Optional; used in an extra credit option below
  };

  $('#sendMsg').on('click',function(){
    postIt();
  });
$('#receiveMsg').on('click',function(){
    receiveIt();
  });


});