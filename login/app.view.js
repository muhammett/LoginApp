sap.ui.jsview("root.login.app",{

	getControllerName:function(){
		return "root.login.app";
	},
	createContent:function(oController){
		this.setDisplayBlock(false);
		this.app = new sap.m.App();
		
		var home = sap.ui.xmlview('page1','root.login.loginApp');
		home.getController().nav = this.getController();
		this.app.addPage(home,true);
		
		return this.app;
	}
	
});