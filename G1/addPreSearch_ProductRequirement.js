var accountid
function start(){  
    debugger
    var lookup= Xrm.Page.getAttribute("gppr2p_account").getValue(); 
    if (lookup == null){
        accountid = "00000000-0000-0000-0000-000000000000";
    }else{
        accountid = lookup[0].id.slice(1, -1);
    }
    Xrm.Page.getControl("gppr2p_contact").addPreSearch(addFilter);
}
    

function addFilter(){
  var fetchXML= 
    "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'>"+
    "<entity name='contact'>"+
        "<attribute name='fullname' />"+
        "<attribute name='telephone1' />"+
        "<attribute name='contactid' />"+
        "<order attribute='fullname' descending='false' />"+
        "<link-entity name='gppr2p_account2contact' from='gppr2p_contact' to='contactid' link-type='inner' alias='ab'>"+
        "<filter type='and'>"+
            "<condition attribute='gppr2p_account' operator='eq' uiname='test-杨远' uitype='account' value='"+accountid+"' />"+
        "</filter>"+
        "</link-entity>"+
    "</entity>"+
    "</fetch>";
    var layoutXml = "<grid name='resultSet' object='10024' jump='name' select='1' icon='1' preview='1'>" +
    "<row name='result' id='contactid'>" +
    "<cell name='fullname' width='300' />" +
    "</row></grid>";
    
    Xrm.Page.getControl("gppr2p_contact").addCustomView("00000000-0000-0000-00aa-000010001004", "contact", "可用联系人", fetchXML, layoutXml, true);
}