$(document).ready(function()	{
	
	console.log("Starting");

	$("#start-btn").click(function()	{
		console.log("clicked");

		$.post("/start", function()	{
			
		});

	});

	$("#copy-inbox-btn").click(function()	{

		$.post("/copyinbox", function()	{

		});

	})


});