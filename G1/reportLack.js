function start(GUID) {
  debugger
  alert(GUID);
}
//GUID为上线检查任务ID

function updatePr(entityName,entityId){
    var entity = {};
    entity.statuscode = 551130000;//默认上线检查statuscode
    if(entityName == "gppr2p_productrequirements"){
        entity.statuscode = 551130008;//产品需求statuscode
    }else if(entityName == "gppr2p_qatask"){
        entity = {};
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '/' + mm + '/' + dd;
        entity.gppr2p_tasktime = today;
    }

    Xrm.WebApi.online.updateRecord(entityName, entityId, entity).then(
        function success(result) {
            var updatedEntityId = result.id;
            Xrm.Page.data.refresh();
        },
        function(error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
}

function alert(GUID) {
    debugger;
    var confirmStrings = { text: "确认标记缺质检报告？", title: "提示：" };
    var confirmOptions = { height: 200, width: 450 };

    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
        function (success) {
            if(success.confirmed){
                Xrm.WebApi.online.retrieveRecord("gppr2p_prodonlinenotification", GUID, "?$select=_regardingobjectid_value").then(
                    function success(result) {
                        //产品需求ID
                        var _regardingobjectid_value = result["_regardingobjectid_value"];
                        updatePr("gppr2p_prodonlinenotification",GUID);
                        updatePr("gppr2p_productrequirements",_regardingobjectid_value);
                    },
                    function(error) {
                        Xrm.Utility.alertDialog(error.message);
                    }
                );
            }
        },
        function (error) {
            console.log(error.message);
        }
    );
}

function retrieveRequirement(reqId) {
    Xrm.WebApi.online.retrieveMultipleRecords("gppr2p_qatask", "?$select=activityid&$filter=_regardingobjectid_value eq " + reqId).then(
        function success(results) {
            for (var i = 0; i < results.entities.length; i++) {
                var activityid = results.entities[i]["activityid"];
                updatePr();
            }
        },
        function(error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
}

