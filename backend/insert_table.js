var dynamo = require('./utils/dynamo/utils')

module.exports.handler = async (event, context) => {

    var reqbody ={};
    reqbody.data = JSON.parse(event.body);
    reqbody.tablename = reqbody.data.tablename

    delete reqbody.data.tablename

    console.log('request body = ', reqbody);
    try {
        var userinfo = await dynamo.insertUserTable(reqbody.data, reqbody.tablename);
        console.log("userinfo = ",userinfo);
        context.succeed(200,{"status":200, "message":"data inserted successfully"});
    }
    catch (err) {
        console.log("Error occured while entering data in ",reqbody.tablename," table : ",err)
        context.succeed(401,{"status ":401, "message":"data cannot be inserted" });
    }
};
