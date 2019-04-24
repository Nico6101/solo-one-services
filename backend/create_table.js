'use strict';
var dynamo = require('./utils/dynamo/utils')
var create_response = dynamo.CREATE_RESPONSE

module.exports.handler = async (event, context) => {

  console.log(event.body);
  var reqbody = {};
  reqbody = JSON.parse(event.body);
  console.log('request body = ', reqbody.data);

  try {
    var tableinfo = await dynamo.createUserTable(reqbody.tablename, reqbody.hashkey, reqbody.sortkey);
    console.log('tableinfo = ',tableinfo);
    context.succeed(create_response(200,{"status":200,"message":"table created successfully"}));
  }
  catch (err) {
    console.log("error occured while creating table : ",err)
    context.succeed(create_response(401,{"status":401,"message":"table cannot be created"}));
  }

};