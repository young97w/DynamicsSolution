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