var AWS = require('aws-sdk')

const createUserTable = (tablename, hashkey, sortkey) => {
    console.log('creating table....')
    var dynamodb = new AWS.DynamoDB({ region: 'ap-south-1' });
    var dbkeyschema = {};
    if (sortkey !== undefined) {
        dbkeyschema = [
            {
                AttributeName: hashkey,
                KeyType: 'HASH',
                AttributeName: sortkey,
                KeyType: 'RANGE'
            }
        ]
    }
    else {
        dbkeyschema = [
            {
                AttributeName: hashkey,
                KeyType: 'HASH'
            }
        ]
    }
    var params = {
        AttributeDefinitions: [
            {
                AttributeName: hashkey,
                AttributeType: 'S',
                AttributeName: sortkey,
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

    return dynamodb.put(params).promise().then(()=> {return true});
}

CREATE_RESPONSE = (statusCode, payload) => ({
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Header' : '*'
    },
    body: JSON.stringify(payload),
})

module.exports = {
    createUserTable,
    insertUserTable,
    CREATE_RESPONSE
}