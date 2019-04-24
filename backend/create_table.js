'use strict';
var dynamo = require('./utils/dynamo/utils')

module.exports.handler = async (event, context) => {

  console.log(event.body);

  reqbody = JSON.parse(event.body);

  console.log('request body = ', reqbody.data);
  try {
    var tableinfo = await dynamo.createUserTable(reqbody.tablename, reqbody.primarykey);
    console.log('tableinfo = ',tableinfo);
    context.succeed(200,{"status":200,"message":"table created successfully"});
  }
  catch (err) {
    console.log("error occured while creating table : ",err)
    context.succeed(401,{"status":401,"message":"table cannot be created"});
  }

};
