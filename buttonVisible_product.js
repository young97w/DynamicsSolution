function start(unitName){
    debugger
    // get the userId
    var userId = Xrm.Utility.getGlobalContext().userSettings.userId;
    // remove { and } from the userId
    userId = userId.replace("{", "").replace("}", "");
    // Xrm.WebApi call to retrieve details of the user (fullname)
    // and the name of the businessunit (name from expand)
    Xrm.WebApi.online.retrieveRecord("systemuser", 
    userId,
    "?$select=fullname&$expand=businessunitid($select=name)").then(
    function success(result) {
        console.log(result);
        // Columns
        var systemuserid = result["systemuserid"]; // Guid
        var fullname = result["fullname"]; // Text
        
        // Many To One Relationships
        if (result.hasOwnProperty("businessunitid")) {
            var businessunitid_name = result["businessunitid"]["name"]; // Text
        }
        if(unitName == businessunitid_name){
            return false
        }
        return true
    },
    function(error) {
        console.log(error.message);
    }
    );
}