const http = require("http");
//This class is setup to quickly test my functions from the terminal. Each function sends requests into my server server.js.

//Create customer function. Change the values below to add a different user to the database.

const CreateCustomer = () => {
    const id = '1';
    const title = 'Mr';
    const firstName = 'John';
    const surname = 'White';
    const mobile = '0123456789';
    const email = 'john.doe@example.com';
    const billingAddressLine1 = '123 Main St';
    const billingAddressLine2 = 'Any Street';
    const billingTown = 'Anytown';
    const billingCountyCity = 'County';
    const billingEircode = '12345';
    const shippingAddressLine1 = '123 Main St';
    const shippingAddressLine2 = 'Any Street';
    const shippingTown = 'Anytown';
    const shippingCountyCity = 'County';
    const shippingEircode = '12345';
    
    const encodedPath = `/insertCustomer?Id=${encodeURIComponent(id)}&Title=${encodeURIComponent(title)}&FirstName=${encodeURIComponent(firstName)}&Surname=${encodeURIComponent(surname)}&Mobile=${encodeURIComponent(mobile)}&Email=${encodeURIComponent(email)}&BillingAddressLine1=${encodeURIComponent(billingAddressLine1)}&BillingAddressLine2=${encodeURIComponent(billingAddressLine2)}&BillingTown=${encodeURIComponent(billingTown)}&BillingCountyCity=${encodeURIComponent(billingCountyCity)}&BillingEircode=${encodeURIComponent(billingEircode)}&ShippingAddressLine1=${encodeURIComponent(shippingAddressLine1)}&ShippingAddressLine2=${encodeURIComponent(shippingAddressLine2)}&ShippingTown=${encodeURIComponent(shippingTown)}&ShippingCountyCity=${encodeURIComponent(shippingCountyCity)}&ShippingEircode=${encodeURIComponent(shippingEircode)}`;

    const options = {
        hostname: 'localhost',
        port: 3500,
        path: encodedPath,
        method: 'GET'
    };

    http.request(options, (res)=>{
        console.log(`Create User: ${res.statusCode}`);
    }).end();
}

//Create phone function. Change values below to add different items to the store (phones collection on mongoDB)
const CreatePhone = () => {
    const manufacturer = 'Sony';
    const model = 'TestModel';
    const price = '$3000';
    
    const encodedPath = `/insertItem?Manufacturer=${encodeURIComponent(manufacturer)}&Model=${encodeURIComponent(model)}&Price=${encodeURIComponent(price)}`;

    const options = {
        hostname: 'localhost',
        port: 3500,
        path: encodedPath,
        method: 'GET'
    };

    http.request(options, (res)=>{
        console.log(`Create Phone: ${res.statusCode}`);
    }).end();
}

//Create order function. In order to change the type of order that is added to the orders collection,
//go to crudFunctions.js and change the 'New Order' object at the bottom of the program.
const CreateOrder = () =>{
   
    const options = {
        hostname: 'localhost',
        port: 3500,
        path: '/createOrder',
        method: 'GET'
    }
    http.request(options, (res)=>{
        console.log(`Created Order: ${res.statusCode}`);
    }).end();

}

//Find customer function. Sends a request to the server to return a random customer from the database. Used for testing here only.
const FindCustomer = () => {
   
    const options = {
        hostname: 'localhost',
        port: 3500,
        path: '/findCustomer?',
        method: 'GET'
    };

    http.request(options, (res)=>{
        console.log(`Found customer: ${res.statusCode}`);
    }).end();
}

//Find phone function. Sends a request to the server to return a random phone from the database. Used for testing here only.
const FindPhone = () => {
    
    const options = {
        hostname: 'localhost',
        port: 3500,
        path: '/findItem?',
        method: 'GET'
    };

    http.request(options, (res)=>{
        console.log(`Found Phone: ${res.statusCode}`);
    }).end();
}

//Find order function. Sends a request to the server to return a random order from the database. Used for testing here only.
const FindOrder = () =>{

    const options = {
        hostname: 'localhost',
        port: 3500,
        path: '/findOrder?',
        method: 'GET'
    };

    http.request(options, (res)=>{
        console.log(`Found Order: ${res.statusCode}`);
    }).end();

}

//Update customer function. Sends the request to update, but no values are passed in here. 
const UpdateCustomer = () => {
    
    const options = {
        hostname: 'localhost',
        port: 3500,
        path: '/updateCustomer?',
        method: 'GET'
    };

    http.request(options, (res)=>{
        console.log(`Updated Customer: ${res.statusCode}`);
    }).end();
}

//Update phone function. Sends the request to update, but no values are passed in here.
const UpdatePhone = () => {
    
    const options = {
        hostname: 'localhost',
        port: 3500,
        path: '/updateItem?',
        method: 'GET'
    };

    http.request(options, (res)=>{
        console.log(`Updated Phone: ${res.statusCode}`);
    }).end();
}

//Update order function. Sends the request to update, but no values are passed in here.
const UpdateOrder = () =>{

    const options = {
        hostname: 'localhost',
        port: 3500,
        path: '/updateOrder?',
        method: 'GET'
    };

    http.request(options, (res)=>{
        console.log(`Updated Order: ${res.statusCode}`);
    }).end();

}


//Deletes a customer given a firstname, surname, email and number. Values are passed in here or through the browser in the url to delete a customer
//with the specified fields.
const DeleteCustomer = () => {
    const firstName = 'John';
    const surname = 'White';
    const email = 'john.doe@example.com';
    const mobile = '0123456789';
    
    const encodedPath = `/deleteCustomer?FirstName=${encodeURIComponent(firstName)}&Surname=${encodeURIComponent(surname)}&Email=${encodeURIComponent(email)}&Mobile=${encodeURIComponent(mobile)}`;

    const options = {
        hostname: 'localhost',
        port: 3500,
        path: encodedPath,
        method: 'GET'
    };

    http.request(options, (res)=>{
        console.log(`Deleted Customer: ${res.statusCode}`);
    }).end();
}

//Deletes a phone that matches the manufacturer, model and price given. Values are passed in here or in the browser.
const DeletePhone = () => {
    const manufacturer = 'Sony';
    const model = 'TestModel';
    const price = '$3000';
    
    const encodedPath = `/deleteItem?Manufacturer=${encodeURIComponent(manufacturer)}&Model=${encodeURIComponent(model)}&Price=${encodeURIComponent(price)}`;

    const options = {
        hostname: 'localhost',
        port: 3500,
        path: encodedPath,
        method: 'GET'
    };

    http.request(options, (res)=>{
        console.log(`Deleted Phone: ${res.statusCode}`);
    }).end();
}

//Deletes an order that matches the customer_id of the order. Values can be passed in here, the browser, thunderclient etc...
const DeleteOrder = () =>{

    const customer_id = "1"; 
    const encodedPath = `/deleteOrder?customer_id=${encodeURIComponent(customer_id)}`;

    const options = {
        hostname: 'localhost',
        port: 3500,
        path: encodedPath,
        method: 'GET'
    };

    http.request(options, (res)=>{
        console.log(`Deleted Order: ${res.statusCode}`);
    }).end();

}

//Call the functions below to test my program.


// CreateCustomer();
// CreatePhone();
//CreateOrder();
//FindCustomer();
//FindPhone();
//FindOrder();
//UpdateCustomer();
//UpdatePhone();
//UpdateOrder();
//DeleteCustomer();
//DeletePhone();
//DeleteOrder();


