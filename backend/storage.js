'use strict';
var dynamo = require('./utils/dynamo/utils')

module.exports.handler = async (event, context) => {

  console.log(event.body);
  var reqbody = JSON.parse(event.body);

  console.log('request body = ', reqbody);
  try {
    var tableinfo = dynamo.createUserTable();
    console.log('tableinfo = ',tableinfo);
  }
  catch (err) {
    console.log("error occured while creating table : ",err)
  }

  var userinfo = await dynamo.insertUserTable(reqbody,context);

  console.log(userinfo);
  context.succeed("data inserted successfully");
};
