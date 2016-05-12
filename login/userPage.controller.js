jQuery.sap.require('sap.ui.model.odata.datajs');
jQuery.sap.require('sap.m.Dialog')
jQuery.sap.require('sap.ui.layout.form.SimpleForm')



sap.ui.controller("root.login.userPage", {
	
	
	 btnClick: function() {
			var userID =  this.byId('IUser').getValue();
			var name =  this.byId('BName').getValue();
			var surname =  this.byId('CSurname').getValue();
			var str1 = "proxy/http/192.168.2.60:8000/sap/opu/odata/sap/ZMC_LOGIN1_SRV/OUserSet";
			var credentials = {Userid:userID,Name:name,Surname:surname};
			this.putRequest(str1,credentials);
	 
	 },
	
	
	

	onInit: function() {
		var that = this;
		 var str1 = "proxy/http/192.168.2.60:8000/sap/opu/odata/sap/ZMC_LOGIN1_SRV/OUserSet";
		 this.getUserList(str1,this);
		 

	
		 
		 
		 
		 
//			OData.request({
//				requestUri: str1,
//				method: "GET",
//				headers: {
//					"X-Requested-With": "XMLHttpRequest",
//					"Content-Type": "application/atom+xml;type=entry; charset=utf-8",
//					"DataServiceVersion": "2.0",
//					"X-CSRF-Token": "Fetch"
//				}
//			},					
//			function(data, response) {
//				
//                var data22 = {};
//			    console.log(JSON.stringify(data));
////			    console.log(data.oData);
//				
//			    var oModel2 = new sap.ui.model.json.JSONModel();
//			    oModel2.setData(data);			    			  
////			    that.getView().setModel(oModel2, "d1");
//			    sap.ui.getCore().byId("app").setModel(oModel2, "d1");
//			    
//			    data22.Name = data.results[0].Name;
//			    var oModel22 = new sap.ui.model.json.JSONModel();			    
//			    oModel22.setData(data22);			    			  
//			    that.getView().setModel(oModel22, "d22");
//			    		    		         		   
//			},
//			function(err) {
//				window.alert('Sorgu başarısız!(GET)');
//			});
			
			
//		var that= this; 
//		this.getView().addDelegate({
//			onBeforeShow: function(evt) {
//			        var userId = evt.data.data;
//			        var str1 = "proxy/http/192.168.2.60:8000/sap/opu/odata/sap/ZMC_LOGIN1_SRV/OUserSet";
////			        str1 = str1 + "('"+userId+"')";
//
//			        that.getUserList(str1);
//			}
//		});
		
	},
	
	updateUser: function(){
		
	},
	
	createUser: function(){
		
	},
	
	deleteUser: function(){
		
	},
	
	onListItemEdit: function(oEvent){
		
		
		var context = oEvent.getSource().getBindingContext() 
		
		
		 
	
		
		
//		this.nav.to("userPage", context);
      
		
		
		var oDialog1 = new sap.m.Dialog({afterClose : function(){oDialog1.destroy();}});
		
		
		oDialog1.setBindingContext(context);
		
//		var oModel3 = new sap.ui.model.json.JSONModel(userModel);
//		sap.ui.getCore().setModel(userModel);
//		
        var oModel3 = this.getView().getModel();
		
		oDialog1.setModel(oModel3);
		
//		oDialog1.setmodel(oModel);
//		

			var oSimpleForm = new sap.ui.layout.form.SimpleForm({
				
			
			content:[		
				
				         
   	
				new sap.m.Label({text:"UserID"}),
		        new sap.m.Input({
		        	
		        	value : '{Userid}',
//		        	placeholder: "UserID...",
		        	id: "IUser"
		            	
		        }),
		        
				
				new sap.m.Label({text:"Name"}),
		        new sap.m.Input({
		        	
		        	value : '{Name}',
		        	
		        	id: "BName"
		            	
		        }),
		        
		    	new sap.m.Label({text:"Surname"}),
		        new sap.m.Input({
		        	value : '{Surname}',
		        	
		        	id: "CSurname"
		            	
		        }),
		        
		     	new sap.m.Label({text:"Password"}),
		        new sap.m.Input({
		        	
		        	
		        	value : '{Password}',
		        	
		        	id: "DName"
		            	
		        })
		        
		
		        
		            	
		            ]
			
			});
			
			oDialog1.addContent(oSimpleForm);
			
			oDialog1.setTitle("Kayıt Düzenle");
			
			oDialog1.addButton(new sap.m.Button({text: "Save", 
			    press:function(){
			    	btnClick();
			        oDialog1.close();
		    	}
			}));
			
			
			
			oDialog1.addButton(new sap.m.Button({text: "Ok", 
			press:function(){
				oDialog1.close();
				}
			}));
			
			oDialog1.open();
			
			
		
			
//			new sap.m.Label({text:"UserID"}),
//		
//		        new sap.m.Input({
//		        	
//		            maxLength: 20,
//		            id: "FName"
//		            	
//		        }),
//		        
//				new sap.m.Label({text:"Name"}),
//				
//		        new sap.m.Input({
//		        	
//		            maxLength: 20,
//		            id: "BName"
//		            	
//		        });
		
	
		
	},
	
	
	 afterClose:function(){
	        this.destroy();
	      },
	
	getUserList: function(uri,that) {
		
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
//			var token = response.headers["x-csrf-token"];
//
////		    console.log(data);
////		    console.log(data.oData);
			
			
			var token =  response.headers['x-csrf-token'];
			
			OData.request({
				requestUri: uri,
				method: "PUT",
				headers: {
					"X-Requested-With": "XMLHttpRequest",
					"Content-Type": "application/atom+xml;type=entry; charset=utf-8",
					"DataServiceVersion": "2.0",
					"X-CSRF-Token": token
				},
					});
				
			
		    var userModel = new sap.ui.model.json.JSONModel();
		  
		    userModel.setData(data);
		    that.getView().setModel(userModel);
////		    userModel.refresh();
//		    
		    
		    
		    
		    
		    
		    		    		         		   
		},
		function(err) {
			window.alert('Sorgu başarısız!(GET)');
		});

	},
	
	
	
	
});