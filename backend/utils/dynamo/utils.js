var AWS = require('aws-sdk')

const createUserTable = (tablename, primarykey, hashkey) => {
    console.log('creating table....')
    var dynamodb = new AWS.DynamoDB({ region: 'ap-south-1' });
    var dbkeyschema = {};
    if (hashkey !== undefined) {
        dbkeyschema = [
            {
                AttributeName: primarykey,
                KeyType: 'HASH',
                AttributeName: hashkey,
                KeyType: 'RANGE'
            }
        ]
    }
    else {
        dbkeyschema = [
            {
                AttributeName: primarykey,
                KeyType: 'HASH'
            }
        ]
    }
    var params = {
        AttributeDefinitions: [
            {
                AttributeName: primarykey,
                AttributeType: 'S',
                AttributeName: hashkey,
                AttributeType: 'S'
            }
        ],
        KeySchema: dbkeyschema,
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

const insertUserTable = (profile, tablename) => {
    console.log('inserting data.....')
    var dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'ap-south-1' });
    var params = {
        TableName: tablename,
        Item: profile
    }

    return dynamodb.put(params).promise();
}
module.exports = {
    createUserTable,
    insertUserTable
}