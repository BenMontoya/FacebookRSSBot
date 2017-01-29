var conf        = require("./config"); //Load in the config.js file
var FB          = require('fb'); //Facebook Graph API
var http        = require("http"); //HTTP requests
var request     = require('request'); //Requests for URL requests
var parseString = require('xml2js').parseString; //Parse XML to Javascript Object
FB.setAccessToken(conf.fbAccessToken); //Set the Facebook Graph API's access token
var newsfeed    = conf.rssLink; //URL for news
var lastNews    = []; //Previous news posts
var posts       = []; //Posts that are ready to post
console.log("\033[2J"); //Clear screen
var updateNews  = function(){
  http.get(newsfeed, function(res) {
    var body = '';
    res.on('data', function(chunk) {body += chunk;});
    res.on('end', function() {
      parseString(body, function (err, result) { if(err) return console.log(err);
        result = result.rss.channel[0].item;
        for(var i = 0; i < result.length; i++){ //Sort and check which are new
          var post = result[i];
          var link = post.guid[0]._.split("?")[0];
          if(lastNews.indexOf(link) <= -1){
            lastNews.push(link); posts.push(post);
          }
        }
      });
    });
  }).on('error', function(e) { console.log("Error getting rss feed!"); });
};
var postNews = function(){
  if(posts.length != 0){
    var post = posts[0];
    var title = post.title[0];
    var desc = post.description[0].split("<")[0];
    var link = post.guid[0]._.split("?")[0];
    var pBody = "===["+conf.botName+"]===\n"+title+"\n\n"+desc;
    if(posts.length != 1){
      pBody += "\n\n\n"+(posts.length-1)+" new stor";
      if((posts.length -1) != 1) pBody += "ies"; else pBody += "y";
      pBody += " remaining. Next story to be posted in 5 mins.";
    }
    console.log(pBody+"\n");
    FB.api('me/feed', 'post', {message: pBody, link: link}, function(res){ if(!res || res.error) return console.log(res.error); });
    posts.splice(post, 1);
  }
};
updateNews(); setInterval(postNews, 300000); setInterval(updateNews, 300000);
