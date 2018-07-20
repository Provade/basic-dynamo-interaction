'use strict'

const uuid = require('uuid/v4')
const aws = require('aws-sdk')
const dynamodb = new aws.DynamoDB()
const sns = new aws.SNS()
const awsInteractions = require('./awsInteractions')

module.exports.useCase = async (event, context, callback) => {
    const tableName = process.env.TableName
    const topicArn = process.env.TopicArn

    try {
        const requestBody = JSON.parse(event.body)
        const userName = requestBody.userName
        const password = requestBody.password
        const emailAddress = requestBody.emailAddress

        if (!userName || !password || !emailAddress) {
            throw { statusCode: 400, responseBody: { message: 'Invalid params' } }
        }


        const id = uuid()

        const record = {
            id: {
                S: id
            },
            userName: {
                S: userName
            },
            password: {
                S: password
            },
            emailAddress: {
                S: emailAddress
            }
        }

        const StoreDataResponse = await awsInteractions.storeData(dynamodb, tableName, record)
        callback(null, { statusCode: 200, body: JSON.stringify({ message: 'Success' }), headers: defaultResponseHeaders })

    }
    catch (err) {
        console.log('ERROR', err)
        const sendSnsResponse = await awsInteractions.sendSns(sns, topicArn, 'Something went wrong when trying to store data', `${err}`)
        callback(null, { statusCode: err.statusCode || 500, body: JSON.stringify(err.responseBody || { err }), headers: defaultResponseHeaders })
    }
}

const defaultResponseHeaders = {
    'Content-Type': 'application/json'
}
