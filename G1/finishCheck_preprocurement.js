function start(GUID) {
    debugger
    Xrm.Page.data.save().then(
        function(success){
            Xrm.WebApi.online.retrieveRecord("gppr2p_preprocurementtask", GUID, "?$select=gppr2p_isbiddingsampleaudittaskfinished,gppr2p_bidfinishdate,_regardingobjectid_value").then(
                function success(result) {
                    var biddingfinish = result["gppr2p_isbiddingsampleaudittaskfinished"];
                    var reqId = result["_regardingobjectid_value"];
                    var bidfinishdate = result['gppr2p_bidfinishdate'];
                    if(bidfinishdate != null && biddingfinish != null && biddingfinish == true){
                        getRequirement(reqId,GUID);
                    }else{
                        Xrm.Utility.alertDialog("请将招标样审核结束选择为“是”,并填写招标样审核完成时间！");
                    }
                },
                function(error) {
                    Xrm.Utility.alertDialog(error.message);
                }
            );
        },function(error){
            Xrm.Utility.alertDialog(error.message);
        }
    );
}

function getRequirement(reqId,GUID) {
    Xrm.WebApi.online.retrieveMultipleRecords("gppr2p_procurementrequest", "?$select=gppr2p_srmprocurementrequestid&$filter=_regardingobjectid_value eq " + reqId).then(
        function success(results) {
            if(results.entities.length > 0){
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
            Xrm.Page.data.refresh();
        },
        function(error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
}