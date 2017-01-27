var http=require('https');

exports.handler = (event, context, callback) => {
    
    http.get("https://graph.facebook.com/v2.8/?access_token=416110258400269|9EX5IO6WLekHaMj4Xiw1KtrCDe4&id=http://www.imdb.com/title/tt2015381/", function (res) {
        var noaaResponseString = '';
        console.log('Status Code: ' + res.statusCode);
  
        res.on('data', function (data) {
            noaaResponseString += data;
        });
 
        res.on('end', function () {
            var noaaResponseObject = JSON.parse(noaaResponseString);
 
            if (!noaaResponseObject.error) {
               retVal = "Comment count "+noaaResponseObject.share.comment_count +", share count "+noaaResponseObject.share.share_count;
               callback(null, GetResponse(retVal));
            }
           
        });
    }).on('error', function (e) {
        console.log("Communications error: " + e.message);
    }).end();
    
    
};

function GetResponse(txt)
{

return {
  "version": "1.0",
  "sessionAttributes": {},
  "response": {
    "outputSpeech": {
      "type": "PlainText",
      "text": txt
    },
    "card": {
      "type": "Simple",
      "title": "SessionSpeechlet - Welcome",
      "content": "SessionSpeechlet - Welcome to the Alexa Skills Kit sample. Please tell me your favorite color by saying, my favorite color is red"
    },
    "reprompt": {
      "outputSpeech": {
        "type": "PlainText",
        "text": "Please tell me your favorite color by saying, my favorite color is red"
      }
    },
    "shouldEndSession": false
  }
}

}