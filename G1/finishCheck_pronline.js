function start(GUID) {
    debugger
    Xrm.Page.data.save();
    Xrm.WebApi.online.retrieveRecord("gppr2p_prodonlinenotification", GUID, "?$select=gppr2p_onlinetime").then(
        function success(result) {
            var gppr2p_onlinetime = result["gppr2p_onlinetime"];
            //产品完成时间为空则提醒
            if(gppr2p_onlinetime == null){
                Xrm.Utility.alertDialog("请填写产品上线时间！");
            }else{
                //不为空，完成任务
                var entity = {};
                entity.statecode = 1;
                Xrm.WebApi.online.updateRecord("gppr2p_prodonlinenotification", GUID, entity).then(
                    function success(result) {
                        var updatedEntityId = result.id;
                        Xrm.Page.data.refresh();
                    },
                    function(error) {
                        Xrm.Utility.alertDialog(error.message);
                    }
                );
            }
        },
        function(error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
}