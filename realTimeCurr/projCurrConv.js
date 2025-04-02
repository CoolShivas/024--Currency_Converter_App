import https from "https";
import readline from "readline";

const lineReader = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});


const apiKey = `7fa642aa79bbfa4e8451c11c`;
const uRL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;


https.get(uRL, (response) => {
    // // uRL is used to hit the uRL link for fetching the data from it;
    // // Addition of response object i.e., ((response)) as a callback function;
    // // And, this (response) object is a readable string to listen 3 things data, end and error;
    let data = ""; // // Storing the chunk of data into a blank string;
    response.addListener('data', (chunk) => {
        data = data + chunk; // // Getting the chunk of data from the server responding;
    }); // // Use of response.on / response.addListener to listen the event 'data';
    response.on('end', () => {
        const rate = data;
        console.log(rate); 
        // // Showing the data on console screen;
        // // Here, we are getting the data from the server;
    });  // // Use of response.on / response.addListener to listen the event 'end' after the data event not responding or server not responding;
});