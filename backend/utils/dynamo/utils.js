var AWS = require('aws-sdk')

const createUserTable = () => {
var dynamodb = new AWS.DynamoDB({ region: 'ap-south-1' });
    var params = {
        AttributeDefinitions: [
            {
                AttributeName: 'customer_id',
                AttributeType: 'S'
            }
        ],
        KeySchema: [
            {
                AttributeName: 'customer_id',
                KeyType: 'HASH'
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
        },
        TableName: 'users_table',
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
    })
}

const insertUserTable = (profile,context) => {
var dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'ap-south-1' });
    var params = {
        TableName : 'users_table',
        Item : profile
    }

    return dynamodb.put(params).promise();
}
module.exports = {
    createUserTable,
    insertUserTable
}