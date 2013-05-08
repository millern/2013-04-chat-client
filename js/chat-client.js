$.ajax('https://api.parse.com/1/classes/messages', {
          contentType: 'application/json',
          success: function(data){
            displayMessages(data);
            console.log(data);
            console.log(data.results);
            console.log(data.results[0]);
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

var sendMessage = function(message){
  $.ajax('https://api.parse.com/1/classes/messages', {
    type: 'POST',
    success: function(){console.log("message sent");},
    error: function(){console.log("error..sorry");},
    data: message
  });
};

