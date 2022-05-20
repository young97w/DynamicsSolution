function start(GUID) {
    debugger
    Xrm.Page.data.save();
    Xrm.WebApi.online.retrieveRecord("gppr2p_qatask", GUID, "?$select=description,gppr2p_allreceived").then(
        function success(result) {
            var description = result["description"];
            var received = result["gppr2p_allreceived"];
            if(received == false || description == null){
                Xrm.Utility.alertDialog("请将质检报告情况备注和质检报告是否已收齐补充完整！");
            }else{
                finish(GUID);
            }
        },
        function(error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
}

function finish(GUID){
    var entity = {};
    entity.statecode = 1;

    Xrm.WebApi.online.updateRecord("gppr2p_qatask", GUID, entity).then(
        function success(result) {
            var updatedEntityId = result.id;
            Xrm.Page.data.refresh();
        },
        function(error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
}