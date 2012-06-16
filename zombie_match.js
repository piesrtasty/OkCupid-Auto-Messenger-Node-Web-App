var Browser = require("zombie");
var assert = require("assert");

browser = new Browser();

browser.visit("http://www.match.com/login/logout.aspx?lid=1", function()	{

	console.log(browser);
	browser.field("#ctl00_workarea_logoutPageView_ctl00_login_ctl00_tbxHandle", "piesrtasty");
	browser.field("#ctl00_workarea_logoutPageView_ctl00_login_ctl00_tbxPassword", "shutup");
	browser.pressButton("#ctl00_workarea_logoutPageView_ctl00_login_ctl00_btnLogin", function()	{
		assert.ok(browser.success);
	});

});