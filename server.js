//A simple program used to establish a connection to my server. 
//The server will then wait for requests and direct requests to the correct place given a certain set of parameters.

const http = require('http');
const url = require('url');
const crud = require('./crudFunction');

const server = http.createServer(function(req,res){
    res.setHeader('Content-type','application/json');
    res.setHeader('Access-Control-Allow-Origin',"*");
    res.writeHead(200);

    const parsedUrl = url.parse(req.url, true);
    const queryUrl = parsedUrl.query;
    var collect;

    if (parsedUrl.pathname === '/insertCustomer' || parsedUrl.pathname === '/insertItem'){
        if(parsedUrl.pathname === '/insertCustomer'){
            collect = "customers";
        }else if(parsedUrl.pathname === '/insertItem'){
            collect = "phones"
        }
        crud.run("onlineStore",collect, "Create", queryUrl).catch(console.error);
        res.end("");
    }

    else if(parsedUrl.pathname === '/findCustomer' || parsedUrl.pathname === '/findItem'){
        if(parsedUrl.pathname === '/findCustomer'){
            collect = "customers";
        }else if(parsedUrl.pathname === '/findItem'){
            collect = "phones"
        }
        crud.run("onlineStore", collect, "Retrieve", queryUrl);
        res.end("");
    }

    else if(parsedUrl.pathname === '/updateCustomer' || parsedUrl.pathname === '/updateItem'){
        if(parsedUrl.pathname === '/updateCustomer'){
            collect = "customers";
        }else if(parsedUrl.pathname === '/updateItem'){
            collect = "phones"
        }

        crud.run("onlineStore", collect, "Update", queryUrl);
        res.end("");
    }

    else if(parsedUrl.pathname === '/deleteCustomer' || parsedUrl.pathname === '/deleteItem'){
        if(parsedUrl.pathname === '/deleteCustomer'){
            collect = "customers";
        }else if(parsedUrl.pathname === '/deleteItem'){
            collect = "phones"
        }

        crud.run("onlineStore", collect, "Delete", queryUrl);
        res.end("");
    }

    else if(parsedUrl.pathname === '/createOrder'){
        crud.runOrder("Create", queryUrl);
        res.end("");
    }

    else if(parsedUrl.pathname === '/findOrder'){
        crud.runOrder("Retrieve", queryUrl);
        res.end("");
    }

    else if(parsedUrl.pathname === '/updateOrder'){
        crud.runOrder("Update", queryUrl);
        res.end("");
    }

    else if(parsedUrl.pathname === '/deleteOrder'){
        crud.runOrder("Delete", queryUrl);
        res.end("");
    }

    else{
        res.end("Not Found");
    }
});


server.listen(3500, function(){
    console.log("Listening on port 3500");
});