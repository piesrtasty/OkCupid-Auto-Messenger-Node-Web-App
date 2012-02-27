var request = require('request'),
	jsdom = require('jsdom'),
	mongoose = require('/usr/local/lib/node_modules/mongoose'),
	db = mongoose.connect('mongodb://localhost/ok-cupid-messages'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;	

// Create a new mongoose schema to store messages
var Message = new Schema({
	toUsername: String
});

var MyMessage = mongoose.model('Message', Message);

// Create a Main OkCupid function
OkCupid = function(){};

// Extend the OkCupid function's prototype with an init method
OkCupid.prototype.init = function()	{
	
	// Send a login request
	request({uri: 'http://okcupid.com/login'}, function (error, response, body)	{
		
		// If there is no error
		if (!error && response.statusCode == 200)	{
			// Code should probably go in here
		}

		// Instantiate a new jsdom object
		jsdom.env({
			html: body,
			scripts: [
				'http://code.jquery.com/jquery-1.5.min.js'
			]
		},	function (err, window)	{
			var $ = window.jQuery;
			request({
				url: "http://www.okcupid.com/login",
				method: "post"
				body: "p=&dest=&username=piesrtasty&password=shutup%211",
				headers: {
					'Content Type' : 'text/html; charset=utf-8'
				}
			},	function (error, response, body)	{
				// This assumes no errors for brevity
				var newDoc = jsdom.env({
					html: body,
					scripts: [
						'http://code.jquery.com/jquery-1.5.min.js'
					]
				},	function (err, window)	{
					var $ = window.jQuery;
					var usernames = [];
					$("span.username").each(function()	{
						usernames.push($(this).text());
					});
					for ( var i = 0; i < usernames.length; i++ )	{
						// Beginning of for loop
						// Create a closure to encompass scope
						(function (i)	{
							var user = usernames[i];
							// Beginning of MongoDB Username Check
							MyMessage.findOne({ toUsername: user}, function (err, doc)	{
								// Check if doc exists
								if ( doc == null )	{
									// Create new MyMessage() object
									var instance = new MyMessage();
									// Set the "toUsername" field on MyMessage() to curent username in the for loop
									instance.toUsername = user;
									// Attempt to save the instance of MyMessagE() object
									instance.save(function (err)	{
										if ( err )	{ console.log(err) }
									});
									// Log that the user was messaged
									console.log("Messaged: " + user);
									// Create a new request object to message the actual user
									request({
										url: "http://www.okcupid.com/mailbox",
										method: "post",
										body   : "folderid=1&contactflag=compose&threadid=&from_msgid=&reply=&authcode=1%2C0%2C1329936940%2C0x5a7dffa7fa354f88%3Bfa799adb64dcdcd1097acb2f268469c95f0756e3&msg_filter=&r1=" + user + "+&r2=none&body=Hi+I%27m+Luke%21+So+I+think+I%27m+supposed+to+message+you+because+you+keep+popping+up+under+%27You+might+like%27+and+every+time+I+look+at+your+profile+I+think+you%27re+super+cool+and+find+it+hard+to+write+a+message+because+of+your+eclecticism%2C+which+is+actually+really+awesome+when+you+think+about+it.+But+I+actually+think+I+just+may+have+captured+what+I+was+intending+to+write+%3DP+&sendmsg=SEND+MESSAGE",
										headers : {
                   		 					'Content-type' : "application/x-www-form-urlencoded"
                  						}
									// End of Create a new request object to message the actual user
									}, function (error, response, body)	{
										if ( error )	{ console.log(error) }
									});
								// End of Check if doc exists
								}
							// End of MongoDB Username Check
							})
						// Pass the value of i into the closure
						})(i);
						// End of for loop
					}

				});

			});

		});

	});
// End of function
}