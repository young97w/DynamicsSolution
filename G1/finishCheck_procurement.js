function start(GUID) {
    debugger
    Xrm.Page.data.save().then(
        function(success){
            Xrm.WebApi.online.retrieveRecord("gppr2p_procurementrequest", GUID, "?$select=gppr2p_rfx_num,gppr2p_hadnotifyvendor,gppr2p_agreementcompletedon,gppr2p_agreementstarton,gppr2p_quotaionstarton,gppr2p_quotationcompletedon").then(
                function success(result) {
                    var agreementcompletedon = result["gppr2p_agreementcompletedon"];
                    var greementstarton = result["gppr2p_agreementstarton"];
                    var quotaionstarton = result["gppr2p_quotaionstarton"];
                    var quotationcompletedon = result["gppr2p_quotationcompletedon"];
                    var ntfvendor = result['gppr2p_hadnotifyvendor'];
                    var rfxnum = result['gppr2p_rfx_num'];
                    if(ntfvendor != true || rfxnum == null || agreementcompletedon == null || greementstarton == null || quotaionstarton == null || quotationcompletedon == null){
                        Xrm.Utility.alertDialog("请将是否告知供应商准备图片选择为“是”，补充完整询价单号RFX、询价创建时间、询价完成时间、协议发起时间、协议签署完成时间！");
                    }else{
                        finish(GUID);
                    }
                },
                function(error) {
                    Xrm.Utility.alertDialog(error.message);
                }
            );
        },
        function(error){
            Xrm.Utility.alertDialog(error.message);
        }
    );

}

function finish(GUID) {
    var entity = {};
    entity.statecode = 1;
    
    Xrm.WebApi.online.updateRecord("gppr2p_procurementrequest", GUID, entity).then(
        function success(result) {
            var updatedEntityId = result.id;
            Xrm.Page.data.refresh();
        },
        function(error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
}

function retrieve(parameter, formContext, isAsy) {
    var serverUrl = formContext.context.getClientUrl();
    var req = new XMLHttpRequest();
    req.open("GET", encodeURI(serverUrl + "/api/data/v9.1/" + parameter), isAsy);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
    req.send();
    return JSON.parse(req.responseText);
}

  
para = "gppr2p_prodonlinenotifications?$filter=_gppr2p_procurementrequest_value eq "

var req = new XMLHttpRequest();
req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/", true);
req.setRequestHeader("OData-MaxVersion", "4.0");
req.setRequestHeader("OData-Version", "4.0");
req.setRequestHeader("Accept", "application/json");
req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
req.onreadystatechange = function() {
    if (this.readyState === 4) {
        req.onreadystatechange = null;
        if (this.status === 200) {
            var results = JSON.parse(this.response);
            for (var i = 0; i < results.value.length; i++) {
                var activityid = results.value[i]["activityid"];
            }
        } else {
            Xrm.Utility.alertDialog(this.statusText);
        }
    }
};
req.send();