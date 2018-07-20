'use strict'

module.exports.storeData = async (dynamo, tableName, record) => {
    try {
        const params = {
            TableName: tableName,
            Item: record
        }

        const result = await dynamo.putItem(params).promise()
        return result
    }
    catch (err) {
        throw err
    }
}

module.exports.sendSns = async (sns, topicArn, subject, message) => {
    try {
        const params = {
            TopicArn: topicArn,
            Subject: subject,
            Message: message
        }

        const result = await sns.publish(params).promise()
        return result
    }
    catch (err) {
        throw err
    }
}
