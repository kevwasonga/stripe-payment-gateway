const cors = require("cors");
const express = require("express");
//TODO : add a stripe key
const stripe= require("stripe")("pk_test_51QBk5208N544cymPfhMx1ndx9L1ZerRBJffEaxbc6a2tdsM8Rd2vnyaN1xuYiP16J82xIcWkfWGRHKIrRx0lfZxa00jfwGBk3u")
const uuid= require("uuid");

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes

app.get("/", (req, res)=>{
    res.send("IT WORKS OVER HERE MATE");//callback message
});

app.post("/payment", (req,res)=>{
    const {product, token}= req.body;
    console.log("PRODUCT", product);
    console.log("PRICE",product.price);
    const idempotencyKey= uuid(); // unique identifier to prevent double payments

return stripe.customers.create({
    email: token.email,
    source: token.id,
    //if customer is created successfully, then...
}).then (customer=>{
stripe.chages.create({
amount: product.price*100,
currency: 'usd',
customer: customer.id,
receipt_email: token.email,
description: `purrchase of ${product.name}`,
//shipping address
shipping :{
    name: token.card.name,
    address: {
        country : token.card.address_country,
    },
}


},{idempotencyKey})
})
.then(result= res.status(200).json(result))
.catch(err=> console.log(err))
});

//create a post route through which customer will access stripe features
//listen
app.listen(8282, ()=> console.log("LISTEN AT THIS  HOLY PORT : http://localhost:8282/"  ));