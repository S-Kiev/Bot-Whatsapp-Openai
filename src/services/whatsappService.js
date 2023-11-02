const dotenv = require('dotenv');
dotenv.config();
const https = require('https');


function sendMessageWhatsapp(data) {

    const options = {
        host: 'graph.facebook.com',
        path: '/v17.0/146235795241755/messages',
        method: 'POST',
        body: data,
        headers: {
            'Content-Type' : 'application/json',
            Authorization: `Bearer EAAzZBUjbVc9QBOZC6lOKrqp0HPZBkrgRO9FZCbHMyY8eC1u56VHy7aqnYTR4962ZCZAtM9zlQNkc0RFj8iOEEl8dV9UK7nTxa8ZAvg63mOCOqwKxDLlO1zjuFV953ZA8fRIKiy7EsVSvBA2bXZBMghT1BX8bH7KKYnhzArHHhlEO3I1flzTWTDJEhGgNC9prZAQnhA`
        }
    };

    const req = https.request(options, res=>{
        res.on('data', d=>{
            process.stdout.write(d);
        })
    });

    req.on('error', error=>{
        console.error(error);
    });

    req.write(data);
    req.end();
}

module.exports = {
    sendMessageWhatsapp
};
