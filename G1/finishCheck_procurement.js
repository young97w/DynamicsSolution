function start(GUID) {
    debugger
    Xrm.WebApi.online.retrieveRecord("gppr2p_procurementrequest", GUID, "?$select=gppr2p_agreementcompletedon,gppr2p_agreementstarton,gppr2p_quotaionstarton,gppr2p_quotationcompletedon").then(
        function success(result) {
            var agreementcompletedon = result["gppr2p_agreementcompletedon"];
            var greementstarton = result["gppr2p_agreementstarton"];
            var quotaionstarton = result["gppr2p_quotaionstarton"];
            var quotationcompletedon = result["gppr2p_quotationcompletedon"];
            if(agreementcompletedon == null || greementstarton == null || quotaionstarton == null || quotationcompletedon == null){
                Xrm.Utility.alertDialog("请将询价创建时间、询价完成时间、协议发起时间、协议签署完成时间补充完整！");
            }else{
                finish(GUID);
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
    
    Xrm.WebApi.online.updateRecord("gppr2p_procurementrequest", GUID, entity).then(
        function success(result) {
            var updatedEntityId = result.id;
        },
        function(error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
}