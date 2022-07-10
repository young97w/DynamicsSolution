/**
 *  产品需求
 *
 */
 "use strict";
 function AccountChange(executionContext) {
     var formContext = executionContext.getFormContext();
     var account = formContext.getAttribute("gppr2p_account").getValue();
     if (!!account) {
         var r = new hdRest();
         var req = "accounts?$select=gppr2p_stadardroomtotal,gppr2p_directstorepercentage&$filter=accountid eq " + account[0].id;
         var accountEntity = r.retrieve(req, formContext, false);
         console.log(accountEntity)
         if (!!accountEntity && !!accountEntity.value[0]) {
             formContext.getAttribute("gppr2p_standardroomtotal").setValue(accountEntity.value[0].gppr2p_stadardroomtotal);
             formContext.getAttribute("gppr2p_directstorepercentage").setValue(accountEntity.value[0].gppr2p_directstorepercentage);
         }
     }
 }
 
 function IsSingleSourceChange(executionContext) {
     var formContext = executionContext.getFormContext();
     var issinglesource = formContext.getAttribute("gppr2p_issinglesource").getValue();
     console.log(issinglesource);
     var singlesourcequalificationdocumentAttr = Xrm.Page.getAttribute("gppr2p_singlesourcequalificationdocument");
     if (singlesourcequalificationdocumentAttr != null) {
         if (!!issinglesource && issinglesource) {
             Xrm.Page.getAttribute("gppr2p_singlesourcequalificationdocument").setRequiredLevel("required");
         } else {
             Xrm.Page.getAttribute("gppr2p_singlesourcequalificationdocument").setRequiredLevel("none");
         }
     }
 }
 
 //产品研发任务维度
 function ProdDevRequestConfigOnLoad(executionContext) {
     var proddevrequestconfigCtl = Xrm.Page.getControl("gppr2p_proddevrequestconfig");
     if (proddevrequestconfigCtl != null) {
         Xrm.Page.getControl("gppr2p_proddevrequestconfig").addPreSearch(function () {
             addLookupFilter("gppr2p_proddevrequestconfig", 20);
         });
     }
 }
 
 //招采准备任务维度
 function PreProcurementTaskOnLoad(executionContext) {
     var preprocurementtaskconfigCtl = Xrm.Page.getControl("gppr2p_preprocurementtaskconfig");
     if (preprocurementtaskconfigCtl != null) {
         Xrm.Page.getControl("gppr2p_preprocurementtaskconfig").addPreSearch(function () {
             addLookupFilter("gppr2p_preprocurementtaskconfig", 40);
         });
     }
 }
 
 //招采任务维度
 function ProcurementRequestOnLoad(executionContext) {
     var procurementrequestconfigCtl = Xrm.Page.getControl("gppr2p_procurementrequestconfig");
     if (procurementrequestconfigCtl != null) {
         Xrm.Page.getControl("gppr2p_procurementrequestconfig").addPreSearch(function () {
             addLookupFilter("gppr2p_procurementrequestconfig", 50);
         });
     }
 }
 
 //产品上线任务维度
 function ProdOnlineNotificationOnLoad(executionContext) {
     var prodonlinenotificationconfigCtl = Xrm.Page.getControl("gppr2p_prodonlinenotificationconfig");
     if (prodonlinenotificationconfigCtl != null) {
         Xrm.Page.getControl("gppr2p_prodonlinenotificationconfig").addPreSearch(function () {
             addLookupFilter("gppr2p_prodonlinenotificationconfig", 60);
         });
     }
 }
 
 function addLookupFilter(entityField, taskType) {
     var fetchXml = "<filter type='and'><condition attribute='gppr2p_slatasktype' operator='eq' value='" + taskType + "' /></filter>";
     Xrm.Page.getControl(entityField).addCustomFilter(fetchXml);
 }
 
 function Load(context) {
     IsSingleSourceChange(context);
     ProdDevRequestConfigOnLoad(context);
     PreProcurementTaskOnLoad(context);
     ProcurementRequestOnLoad(context);
     ProdOnlineNotificationOnLoad(context);
 }
 
 function CopyProductRequirements(context) {
     
 }
 
 function CopyProductRequirementsEnableRule(formContext) {
     var entityName = Xrm.Page.data.entity.getEntityName();
     console.log("entityName:" + entityName);
     if (entityName == "gppr2p_projectrequirements") {
         return true;
     }
     var projectrequirementsid = formContext.getAttribute("gppr2p_projectrequirementsid").getValue();
     console.log("projectrequirementsid:" + projectrequirementsid);
     if (projectrequirementsid !=null ) {
         return true;
     }
     return false;
 }
 