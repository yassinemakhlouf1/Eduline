'use strict'
const dialogflow = require('dialogflow');
const structjson = require('./structJson');
const config = require('../config/keys');

const sessionClient = new dialogflow.SessionsClient;

const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);

module.exports = {
    textQuery: async function(text, parameters = {}) {
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: text,
                    languageCode: config.dialogFlowSessionLanguageCode,
                },
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };
        let responses = await sessionClient .detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;
    },

    eventQuery: async function(event, parameters = {}) {
        let self = module.exports;

        //the event query request
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    //the query to send to the dialogflow agent
                    name: event,
                    parameters: structjson.jsonToStructProto(parameters),
                    //the language used by the client
                    languageCode: config.dialogFlowSessionLanguageCode,
                },
            },
        };
        //send request and log result
        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;
    },


    handleAction: function(responses){
        return responses;
    },
}