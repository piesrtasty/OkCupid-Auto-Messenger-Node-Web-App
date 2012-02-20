var request = require('request'),
	jsdom = require('jsdom');

request({uri: 'http://www.okcupid.com/login'}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    // console.log(body) // Print the google web page.
  }

  jsdom.env({
  	html: body,
  	scripts: [
  		'http://code.jquery.com/jquery-1.5.min.js'
  	]
  }, function (err, window)	{

  	var $ = window.jQuery;

    request({
      url    : "http://www.okcupid.com/login",
      method : "post",
      body   : "p=&dest=&username=piesrtasty&password=shutup%211",
      headers : {
        'Content-type' : 'application/x-www-form-urlencoded'
      }
    },function (error, response, body) {

      var newDoc = jsdom.env(body, ['http://code.jquery.com/jquery-1.5.min.js'], function (errors, window) {

        var $ = window.jQuery;

        console.log($("#home_heading").html());
       
        var matchesUrl = $("#nav_matches a").attr("href");
        console.log(matchesUrl);

        
        request({
          url    : "http://www.okcupid.com/match?timekey=1&matchOrderBy=SPECIAL_BLEND&use_prefs=1&discard_prefs=1&matchSortRelative=1",
          method : 'get',
          body   : '',
          headers : {
            'Content-type' : 'text/html; charset=utf-8'
          }
        },function (error, response, body) {

          // this assumes no error for brevity.
          var newDoc = jsdom.env(body, ['http://code.jquery.com/jquery-1.5.min.js'], function (errors, window) {
            
            var $ = window.jQuery;

            var usernames = [];

            $("span.username").each(function()  {
              usernames.push($(this).text());
            })

            for ( var i = 0; i < usernames.length; i ++ ) {

              request({
                url    : "http://www.okcupid.com/mailbox",
                method : "post",
                body   : "folderid=1&contactflag=compose&threadid=&from_msgid=&reply=&authcode=1%2C0%2C1329783471%2C0x5a7dffa7fa354f88%3B2cc95465a4098ea8673b301cf8f546f5e2fd4c88&msg_filter=&r1=" + usernames[i] + "&r2=none&body=Hi+I%27m+Luke%21+So+I+think+I%27m+supposed+to+message+you+because+you+keep+popping+up+under+%27You+might+like%27+and+every+time+I+look+at+your+profile+I+think+you%27re+super+cool+and+find+it+hard+to+write+a+message+because+of+your+eclecticism%2C+which+is+actually+really+awesome+when+you+think+about+it.+But+I+actually+think+I+just+may+have+captured+what+I+was+intending+to+write+%3DP+&sendmsg=SEND+MESSAGE",
                headers : {
                 'Content-type' : "application/x-www-form-urlencoded"
                }
                },function(error, response, body) {
                  // this assumes no error for brevity.
                  var newDoc = jsdom.env(body, [/* scripts */], function(errors, window) {
                  // do your post processing

                });
              });

              console.log("Messaged " + usernames[i]);

            }

          });
        });

      });
    });

  });
});