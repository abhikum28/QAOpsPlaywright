const base = require('@playwright/test');

exports.customtest = base.test.extend(
    {
        testDataForOrder : 
        {
            userName : "abhikum28@hotmail.com",
            password : "Le@rning15",
            productName : "ZARA COAT 3",
            deliveryAddress : "India"
        }
    }
);

