jQuery.sap.require('sap.ui.model.odata.datajs');
sap.ui.controller("login.loginApp", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf login.loginApp
*/
	onInit: function() {
		
	},

	
	btnClick: function() {
		var userID =  this.byId('userID').getValue();
		var password =  this.byId('userPassword').getValue();
		var str1 = "proxy/http/192.168.2.60:8000/sap/opu/odata/sap/ZMC_LOGIN1_SRV/LoginSet";
		var credentials = {IUserid:userID,IPassword:password}
		
//		var xhr = new XMLHttpRequest();
//		xhr.open('POST', str1, true);
		this.postRequest(str1,credentials);
		
	},
	////requestUri: "proxy/http/192.168.2.60:8000/sap/opu/odata/sap/ZMC_LOGIN1_SRV/LoginSet(IUserid='4',IPassword='1234')",
	postRequest: function(uri,credentials) {
		var userID =  this.byId('userID').getValue();
		var password =  this.byId('userID').getValue();
		var str1 = "proxy/http/192.168.2.60:8000/sap/opu/odata/sap/ZMC_LOGIN1_SRV/" +
					"LoginSet(IUserid='"+userID+"',IPassword='"+password+"')";
		
		
		OData.request({
			requestUri: str1,
			method: "GET",
			headers: {
				"X-Requested-With": "XMLHttpRequest",
				"Content-Type": "application/atom+xml;type=entry; charset=utf-8",
				"DataServiceVersion": "2.0",
				"X-CSRF-Token": "Fetch"
			}
		},
		
		
		function(data, response) {
			var token =  response.headers['x-csrf-token'];
			OData.request({
				requestUri: uri,
				method: "POST",
				headers: {
					"X-Requested-With": "XMLHttpRequest",
					"Content-Type": "application/atom+xml;type=entry; charset=utf-8",
					"DataServiceVersion": "2.0",
					"X-CSRF-Token": token
				},
				data:credentials
			},
			function(data, response) {
//				bu sayfadan başka sayfaya geçilecek eğer adminse bütün kullanıcı bilgilerini görecek değilse kendi kullanıcısını görecek.
				window.alert('basarili');
			},
			function(err) {
				window.alert('basarısız');
			});
			
		},
		function(err) {
			window.alert('asdasdasd');
			console.log('TEST');
			console.log('this is master branch')
		});

	},
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf login.loginApp
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf login.loginApp
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf login.loginApp
*/
//	onExit: function() {
//
//	}

});