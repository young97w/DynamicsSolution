function start(GUID) {
    debugger
    Xrm.Page.data.save().then(
        function(success){
            Xrm.WebApi.online.retrieveRecord("gppr2p_preprocurementtask", GUID, "?$select=gppr2p_isbiddingsampleaudittaskfinished,gppr2p_bidfinishdate,_regardingobjectid_value").then(
                function success(result) {
                    var description = result["description"];//供应商评样结果记录
                    var biddingfinish = result["gppr2p_isbiddingsampleaudittaskfinished"];//候选供应商的样品是否已全部确认
                    var splconfirm = result["gppr2p_suppliercfmparam"];//候选供应商是否均已明确参数
                    var bidfinishdate = result['gppr2p_bidfinishdate'];//技术标评审完成时间
                    var preprcmowner = result["_gppr2p_preprcmowner_value"];//招采准备负责人
                    var reviewsolution = result["cr74e_demandforbiddingsamplereview"];//评标方案
                    var reqId = result["_regardingobjectid_value"];


                   
                    //分支切换并判断
                    switch (reviewsolution) {
                        case 418120000://先商务后技术
                            if(notEmpty(description,biddingfinish,splconfirm,bidfinishdate,preprcmowner)){
                                getRequirement(reqId,GUID);
                            }else{
                                Xrm.Utility.alertDialog("请补充完整以下字段：供应商评样结果记录、候选供应商的样品是否已全部确认、候选供应商是否均已明确参数、技术标评审完成时间、招采准备负责人");
                            }                          
                            break;
                        case 418120001://先技术后商务
                            if(notEmpty(description,biddingfinish,bidfinishdate,preprcmowner)){
                                getRequirement(reqId,GUID);
                            }else{
                                Xrm.Utility.alertDialog("请补充完整以下字段：供应商评样结果记录、候选供应商的样品是否已全部确认、技术标评审完成时间、招采准备负责人");
                            }                          
                            break;
                        case 551130001://单一来源
                            if(notEmpty(description,biddingfinish,bidfinishdate,preprcmowner)){
                                getRequirement(reqId,GUID);
                            }else{
                                Xrm.Utility.alertDialog("请补充完整以下字段：供应商评样结果记录、候选供应商的样品是否已全部确认、技术标评审完成时间、招采准备负责人");
                            }  
                            break;
                        default:
                            Xrm.Utility.alertDialog("请选择评标方案！");
                      }

                    if(bidfinishdate != null && biddingfinish != null && biddingfinish == true){
                        
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


function notEmpty(...parmas) {
    for (e of parmas) {
        if(e == null){
            return false
        }
    }
    return true
    
}



