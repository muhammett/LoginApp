jQuery.sap.require('sap.ui.model.odata.datajs');
sap.ui.controller("root.login.loginApp", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf login.loginApp
*/
	onInit: function() {
		var oModel = new sap.ui.model.json.JSONModel();
		sap.ui.getCore().setModel(oModel);
		
		
	},
	
	handleFooterBarButtonPress: function() {
		var userID =  this.byId('userID').getValue();
		var password =  this.byId('userPassword').getValue();
		
		var str1 = "proxy/http/192.168.2.60:8000/sap/opu/odata/sap/ZMC_LOGIN1_SRV/LoginSet";
		var credentials = {IUserid:userID,IPassword:password};
	
		
		this.postRequest(str1,credentials,this);
		
	},
	postRequest: function(uri,credentials,that) {
		OData.request({
			requestUri: uri,
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
				if (data.EResponse==1){
					sap.ui.getCore().getModel().setData(data);
					that.nav.to("userPage",undefined);  
				}
				else{
					window.alert("Kullanıcı adı veya şifre hatalı!");
				}
				
				
			},
			function(err) {
				window.alert('Giriş başarısız!(POST)');
			});
			
		},
		function(err) {
		
		});

	},

});