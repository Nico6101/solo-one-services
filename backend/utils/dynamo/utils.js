var AWS = require('aws-sdk')

const createUserTable = (tablename, primarykey) => {
var dynamodb = new AWS.DynamoDB({ region: 'ap-south-1' });
    var params = {
        AttributeDefinitions: [
            {
                AttributeName: primarykey,
                AttributeType: 'S'
            }
        ],
        KeySchema: [
            {
                AttributeName: primarykey,
                KeyType: 'HASH'
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
        },
        TableName: tablename,
        StreamSpecification: {
            StreamEnabled: false
        }
    };

    dynamodb.createTable(params, (err, data) => {
        if (err) {
            console.log("error occured while creating table = ", err);
            return err;
        }
        console.log("table created successfully with data = ", data);
        return data;
    }).promise();
}

const insertUserTable = (profile,tablename) => {
var dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'ap-south-1' });
    var params = {
        TableName : tablename,
        Item : profile
    }

    return dynamodb.put(params).promise();
}
module.exports = {
    createUserTable,
    insertUserTable
}