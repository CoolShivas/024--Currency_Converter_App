import chalk from "chalk";
import https from "https";
import readline from "readline";

const lineReader = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});


const apiKey = `7fa642aa79bbfa4e8451c11c`;
const uRL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;


const convertCurrency = (amount, rate) => {
    return (amount * rate).toFixed(2); // // .toFixed(2) is used for only two decimal values;
};


https.get(uRL, (response) => {
    // // uRL is used to hit the uRL link for fetching the data from it;
    // // Addition of response object i.e., ((response)) as a callback function;
    // // And, this (response) object is a readable string to listen 3 things data, end and error;
    let data = ""; // // Storing the chunk of data into a blank string;
    response.addListener('data', (chunk) => {
        data = data + chunk; // // Getting the chunk of data from the server responding;
    }); // // Use of response.on / response.addListener to listen the event 'data';
    response.on('end', () => {
        const rate = JSON.parse(data).conversion_rates;
        // console.log(rate); 
        // // Showing the data on console screen;
        // // Here, we are getting the data from the server;

        // // amount = 90;
        // // currency = INR;
        // // 90USD = how much INR?
        // // 1USD = 84.9667 INR;
        // // Therefore, 90USD = ?
        // // 90 * 84.9667 


        lineReader.question(`Enter the amount in USD : `, (amount) => {
            lineReader.question(`Enter the target currency (e.g., INR, EUR, NPR) : `, (currency) => {
                const rating = rate[currency.toUpperCase()];
                if(rating)
                {
                    console.log(chalk.blue.bgRed.bold(`${amount} USD is approximately ${convertCurrency(amount, rating)} ${currency}`));
                }
                else
                {
                    console.log(`Invalid currency code`);
                }
                // console.log("End of printing Headings.");
                lineReader.close(); // // Closing the project execution here;
            });
        });
    });  // // Use of response.on / response.addListener to listen the event 'end' after the data event not responding or server not responding;
});
// // // Here, we are getting the Output on Terminal as :-
// // // Enter the amount in USD : 2
// // // Enter the target currency (e.g., INR, EUR, NPR) : inr
// // // 2 USD is approximately 171.30 inr
// // // Completed running 'projCurrConv.js'



