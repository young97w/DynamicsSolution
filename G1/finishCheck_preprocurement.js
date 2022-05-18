function start(GUID) {
    debugger
    Xrm.WebApi.online.retrieveRecord("gppr2p_preprocurementtask", GUID, "?$select=gppr2p_isbiddingsampleaudittaskfinished").then(
        function success(result) {
            var biddingfinish = result["gppr2p_isbiddingsampleaudittaskfinished"];
            var reqId = result["_regardingobjectid_value"];
            if(biddingfinish != null && biddingfinish == true){
                getRequirement(reqId);
            }else{
                Xrm.Utility.alertDialog("请将招标样审核结束选择为“是”！");
            }
        },
        function(error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );

}

function getRequirement(reqId,GUID) {
    Xrm.WebApi.online.retrieveMultipleRecords("gppr2p_procurementrequest", "?$select=gppr2p_srmprocurementrequestid&$filter=_regardingobjectid_value eq " + reqId).then(
        function success(results) {
            var flag = true;
            for (var i = 0; i < results.entities.length; i++) {
                var srmid = results.entities[i]["gppr2p_srmprocurementrequestid"];
                if(srmid == null){
                    flag = false;
                }
            }
            if(flag){
                finish(GUID);
            }else{
                Xrm.Utility.alertDialog("请生成采购申请！");
            }
        },
        function(error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
}

function finish(GUID) {
    var entity = {};
    entity.statecode = 1;

    Xrm.WebApi.online.updateRecord("gppr2p_preprocurementtask", GUID, entity).then(
        function success(result) {
            var updatedEntityId = result.id;
        },
        function(error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
}