'use strict'
const dialogflow = require('dialogflow');
const structjson = require('./structJson');
const config = require('../config/keys');
const mongoose = require('mongoose');
const reg = require("../models/Registration");

const projectID = 'chatbotagent-gmtd';

const credentials = {
    client_email: 'dialogflow-client@chatbotagent-gmtd.iam.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC6DUg34GM9aa2Q\nT+ZkxJh8/ve6f091k4s4r2CU02YBpXRBvlWfh4i/eeM+ucBvvawdbe6EPVi855pw\nqHlrAGEsTFqhrq7NUitMUNGSayFOrBM9VzG3PNPJ1PBHSEgE+zCaxHukNrpdbdu7\npDWihutgnv4+aJyd8AzSPY3SYvAb0Gr+IzFQvu5lB5W7oTepSAWfOLphQGIUjeuN\nfWVSL4oCHFgE52lptd63/Us3PE2vNGPs0VsUDjYW8nLaQDoS8gRtt9m2cB59nWQy\n1EnW9NIU4rDKhqkZGlQevuQ3mj2HYJKTns20IZAdrFlZeTerL8xkDOnOH8i4UISn\nplxEfCrXAgMBAAECggEAIbozq9F1HBZyvNUHLqBHBm3QKdJXbLiVBe8hAom6FbVR\nOHPRIMzYmOF3NRFGVdtb/q/Fi9p1IjWYFTEtZZzZgMbMrT+194mcSMbj3velv5XJ\nHRcX76BKwm1kK3/qcmC45G2W/mNfcH1wVnlDsdVkiQz5iQW80pLIODqpYYjG/zt+\n6qIXyyWOlCnyDiA5xSyuboCJx7bT+VNfYGsRjKRZMhxmlVWLhwREMoY80EBvfsgU\no35kHe9obGBuH0mONve3TnYLop7hfDk9ADQwzsRTlrUqH8V7KqLuCc53tP2rCam+\nZJ7P+NYTudHi7GhZVKuTpSXhM2EHAFaR8200Ulw0rQKBgQD06rSEztkABMnpgH07\nNjJ7W+zeh/iup+geY5CQAElf4rlPViiS09/4ln3ytuBGydm4Vy7hWq9jqw1F5SHA\nokb9aqii/q/jaVy7DkWjJlAYGJAwzmyaGd2LYtB0cYan2XUOgmYxzI8b3REv9I3f\nGarcL8N7b2Fnai+uVnLUFTarzQKBgQDCeKSGD46wh1bNv0x0kg9wkuUcvB+YnZCS\nho+QVyt0kk+B37BUJMcwGTw3d/uVfAxCVQXJlZxw9wL/edbvbNsHvaKe9ofIosmH\nOkX9xt4DxpZLFgWL2pfXgslEI93Sb/aysyu7bQyxsAyrvfMOE650T0Zq7XjefZ5L\nLrBgD6C1MwKBgC4oGXM6BF1jiaXu6CsDkMn8zgw2NeC8lhs8Cl+JHkrq0J+qDiV1\ntq0Dt6LJYkUU/2olTBl+XLV85Bh7ETxbmONjeXqWYxGJpsc97lPMAaY44tu/22nD\nXCRLsBtx1b3GVrAwVRAnjATlSbru7NnR3Yh3m/CkUggKVAgYFLXxdYc1AoGAKNk6\nhcZizIXBH/qczqeXgqf4ZC7H3EDMi1qkcUc+I4BQHxGjcik/hcTnNyeGuwGReaVu\nT8eTUs8v3AX1tdkBsQCOViGmp+g5uKPu672ICPb/vsnjZFsIJgaczClUgM1v3l1w\nRDBFyFUYdEKz+TL9JAU6317+Uo3EYDpwZd0ifq0CgYEAkdkUONc9EKEofxYQFylB\nVUqVnXOzOArkh9Gz8wW7I239wpDGfYcTwiWl/x7QW7/eIw41/xstb0Uh504xOxNb\n+2NqmMfv9XbCCLoC4b2YhVM2a05wH35e9yNmU/7j+hBC52RQdmKayxlaGvaPGxDC\nMoAAYUG1zl2XMKXeeBvuUKI=\n-----END PRIVATE KEY-----\n'
}

const sessionClient = new dialogflow.SessionsClient({projectID, credentials});

const sessionPath = sessionClient.sessionPath('chatbotagent-gmtd', 'react-bot-session');

const Registration = mongoose.model('registration');

module.exports = {
    textQuery: async function(text, parameters = {}) {
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: text,
                    languageCode: 'en-US',
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
                    languageCode: 'en-US',
                },
            },
        };
        //send request and log result
        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;
    },


    //add a case, that switches between action name
    handleAction: function(responses){
        let self = module.exports;     //define self and set it to module.exports to call saveRegistration
        let queryResult = responses[0].queryResult;
        switch (queryResult.action) {
            case 'Extracourses-yes':
                //queryResult is set when all the parameters requires
                if (queryResult.allRequiredParamsPresent) {  //read parameters
                    self.saveRegistration(queryResult.parameters.fields);
                }
                break;
        }

        console.log(queryResult.action);
        //console.log(queryResult.allRequiredParamsPresent);
        //console.log(queryResult.fulfillmentMessages);
        //console.log(queryResult.parameters.fields);

        return responses;
    },

    saveRegistration: async function(fields){
        const registration = new Registration({
            name: fields.name.stringValue,
            address: fields.address.stringValue,
            phone: fields.phone.stringValue,
            email: fields.email.stringValue,
            dateSent: Date.now()
        });
        try{
            let reg = await registration.save();
            console.log(reg);
        } catch (err){
            console.log(err);
        }
    }
}