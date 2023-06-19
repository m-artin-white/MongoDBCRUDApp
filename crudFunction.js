const { MongoClient} = require('mongodb');
//My functions below are very basic, a lot of them are just using the mongoDB drivers. 
//I have two functions, run and runOrder; run handles all operations regarding the customers and phones databases while runOrder specifically deals 
//with the orders database.
//Whenever either of the functions are called they connect to my database which is called online store.
//Then depending on what is passed to these functions in the server.js program, that will determine what operations take place on which collection.
//You will see below my run function takes in 4 parameters, a database to connect to, which collection it should perform operations, the operation 
//(CRUD) and the data that is being passed to it.
//Then depending on what is given to it, it will do its job.
//The functions then just use MongoDB drivers.

const uri = "mongodb+srv://root:root@onlinestore.2mmt83c.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

exports.run = async(database, collect, operation, userData) =>{
  try {
      await client.connect();
      const db = client.db(`${database}`);
      const collection = db.collection(`${collect}`);
  
      // Below where you put different functions
      if(operation === 'Create' && collect !== 'orders'){
          const insert = await collection.insertOne(userData);
      }else if(operation === 'Retrieve' && collect !== 'orders'){
        const [randomDocument] = await collection.aggregate([{ $sample: { size: 1 } }]).toArray();
        console.log("Random document:", randomDocument);
      }else if(operation === 'Update' && collect !== 'orders'){
        const [randomDocument] = await collection.aggregate([{ $sample: { size: 1 } }]).toArray();

          if(collect === 'customers'){
            const updateResult = await collection.updateOne(
              { _id: randomDocument._id },
              { $set: customerUpdateFields }
            );
            console.log("Update result:", updateResult);
          }

          else if(collect === 'phones'){
            const updateResult = await collection.updateOne(
              { _id: randomDocument._id },
              { $set: phoneUpdateFields }
            );
            console.log("Update result:", updateResult);
          }
        }
      else if(operation === 'Delete' && collect !== 'orders'){
        const deleteResult = await collection.deleteMany(userData);
        console.log("Delete result:", deleteResult);
      }
    
    }catch(error){
      console.log(error);
    }finally{
      // Close the database connection when finished or an error occurs
      await client.close();
    }
}


exports.runOrder = async(operation, userData) =>{
  try {
      await client.connect();
      const db = client.db('onlineStore');
      const orderCollection = db.collection('orders');
  
      // Below where you put different functions
      if(operation === 'Create'){
        const insert = await orderCollection.insertOne(newOrder);
      }else if(operation === 'Retrieve'){
        const [randomDocument] = await orderCollection.aggregate([{ $sample: { size: 1 } }]).toArray();
        console.log("Random document:", randomDocument);
      }else if(operation === 'Update'){
       
        const result = await orderCollection.findOne({ customer_id: newOrder.customer_id });
        const check = result._id;
      
        if (check) {
          const updateResult = await orderCollection.updateOne(
            { _id: check },
            { $push: { items: newOrderItem } }
          );
          console.log('Order updated:', updateResult.modifiedCount);
        } else {
          console.log('Invalid _id.');
        }
      }else if(operation === 'Delete'){
        const deleteResult = await orderCollection.deleteMany(userData);
        console.log("Delete result:", deleteResult);
      }

    } catch(error){
      console.log(error);
    }finally{
      await client.close();
    }
}


//I had to put the new fields for my update functions, alter these below to change how you update the data in the collections.
//To create a new order, change the newOrder object below.
//To add a new item to the order that already exists, alter the newOrderItem object below.

const customerUpdateFields = {
  Title: 'Fr',
  Mobile: '5656565656565',
  Email: 'updatedEmail@gmail.com',
  BillingAddressLine1: 'UpdatedBillingAddressLine1',
  BillingAddressLine2: 'UpdatedBillingAddressLine2',
  BillingTown: 'UpdatedBillingTown',
  billingCountyCity: 'UpdatedBillingCountyCity',
  BillingEircode: 'UpdatedBillingEircode',
  ShippingAddressLine1: 'UpdatedShippingAddressLine1',
  ShippingAddressLine2: 'UpdatedShippingAddressLine2',
  ShippingTown: 'UpdatedShippingTown',
  ShippingCountyCity: 'UpdatedShippingCountyCity',
  ShippingEircode: 'UpdatedShippingEircode'
  
}

const phoneUpdateFields = {
  Manufacturer: 'UpdatedSony',
  Model: 'UpdatedModel',
  Price: '$999999'
}

const newOrder = {
  customer_id: "1",
  firstName: "Jhon",
  surName: "Doe",
  items: [
    { manufacturer: 'Huawei', model: 'X385', price: "$600" },
    { manufacturer: 'Samsung', model: 'S10', price: "$700" }
  ],
  order_date: new Date()
};

const newOrderItem = {
   manufacturer: 'Apple', 
   model: 'iPhone 10', 
   price: "$900" 
}









