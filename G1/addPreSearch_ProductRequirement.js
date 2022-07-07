var userid
function start(){  
    debugger
    var lookup= Xrm.Page.getAttribute("gppr2p_account").getValue(); 
    if (lookup !== null){
        para = "accounts("+lookup[0].id.slice(1, -1)+")?$select=_gppr2p_systemuser_account__value";
        var result = retrieve(para);
        if (result["_gppr2p_systemuser_account__value"] != null) {
            userid = result["_gppr2p_systemuser_account__value"];
            Xrm.Page.getControl("gppr2p_contact").addPreSearch(addFilter);
        }else{
            userid = "00000000-0000-0000-0000-000000000000";
            Xrm.Page.getControl("gppr2p_contact").addPreSearch(addFilter);
        }
    }else{
        userid = "00000000-0000-0000-0000-000000000000";
        Xrm.Page.getControl("gppr2p_contact").addPreSearch(addFilter);
    }
}
    

function addFilter(){
    var conditionStr = "<condition attribute='new_user' operator='eq' uiname='7天BU#' uitype='systemuser' value='"+userid+"' />";
    var filterStr = "<filter type='and'>" + conditionStr + "</filter>";
    Xrm.Page.getControl("gppr2p_contact").addCustomFilter(filterStr, "contact");
}

function retrieve(parameter) {
    var req = new XMLHttpRequest();
    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/" + parameter, false);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
    req.send();
    return JSON.parse(req.responseText);
}