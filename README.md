# Amortization front-end application

The Amortization front end application is a React app, which is responsible for accepting the loan request, 
and publishing the amortization schedule, in a tabular format.

The application exposes a form that accepts the following fields as input:
 - Loan amount (or principal)
 - Interest rate (expressed as an annual percentage rate or APY)
 - Term (in years)
 
And returns, as output, the following in a tabular format:
 - Month
 - Starting balance
 - Fixed Payment
 - Interest Payment
 - Principal Payment
 - Ending balance
 - Total interest

The UI application makes an API request to the Amortization service back-end application, which computes the amortization schedule, and returns the response as a JSON document, back to the UI.

### About the service.

 - The application was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). 
 - It uses the [Axios](https://github.com/axios/axios) framework as the HTTP client to make API calls to the Amortization service application.
 - It uses [ReactTable](https://reactjsexample.com/a-lightweight-and-extendable-datagrid-for-react/), as the light weight data grid to display the amortization schedule.
 
# Getting Started with running the Amortization React application.

### How to run the service.
Assuming that you have Node v10+, installed on your machine, you could just unzip the folder, and execute either of the following
commands, from the root of the unzipped folder:

```
yarn start
```
This runs the amortization app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view the application in the browser, and use it. 

Plaese make sure that you have unzipped, and are executing the amortization service application, before submitting any requests.

