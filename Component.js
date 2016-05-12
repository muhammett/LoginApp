jQuery.sap.declare("root.Component");

sap.ui.core.UIComponent.extend("root.Component", {

	createContent : function() {

//		sap.ui.localResources("login");
//		var app = new sap.m.App({id:"mainApp", initialPage:"appPage"});
//		var page = sap.ui.view({id:"appPage", viewName:"root.login.app", type:sap.ui.core.mvc.ViewType.XML});
//		app.addPage(page); 
//		app.placeAt("content");

		var oView = sap.ui.view({
			id : "app",
			viewName : "root.login.app",
			type : "JS",
			viewData : { component : this }
		});
		
		return oView;

	}
});