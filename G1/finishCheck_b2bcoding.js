function start(GUID) {
    debugger
    Xrm.Page.data.save().then(
        function(success){
            Xrm.WebApi.online.retrieveRecord("cr74e_commoditycodingtask", GUID, "?$select=_regardingobjectid_value").then(
                function success(result) {
                    var reqId = result["_regardingobjectid_value"];
                    getProducts(GUID,reqId);
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

//获取关联产品
function getProducts(GUID,reqId) {
    Xrm.WebApi.online.retrieveMultipleRecords("gppr2p_product", "?$select=gppr2p_b2bproductcode,gppr2p_b2bproductname&$filter=statecode eq 1 and _gppr2p_requirement_value eq "+reqId).then(
        function success(results) {
            var flag = true;
            for (var i = 0; i < results.entities.length; i++) {
                var b2bcode = results.entities[i]["gppr2p_b2bproductcode"];
                var b2bname = results.entities[i]["gppr2p_b2bproductname"];
                //校验所有的编码与名称不为空
                if(b2bcode == null || b2bname == null){
                    flag = false;
                }
            }
            if(flag){
                finish(GUID);
            }else{
                Xrm.Utility.alertDialog("请将所有产品的B2B编码与B2B商品名称填写完整！");
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

    Xrm.WebApi.online.updateRecord("cr74e_commoditycodingtask", GUID, entity).then(
        function success(result) {
            var updatedEntityId = result.id;
            Xrm.Page.data.refresh();
        },
        function(error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
}