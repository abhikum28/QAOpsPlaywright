const { expect } = require('@playwright/test');

class APIUtils {

    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
        { 
            data: this.loginPayload 
        });
        //expect(loginResponse.ok()).toBeTruthy();

        const loginResponseJson = await loginResponse.json();
        let token = loginResponseJson.token;
        console.log(token);
        return token;
    }

    async createOrder(orderPayload) {
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
                {
                  data: orderPayload,
                  headers: {
                    'Authorization': response.token,
                    'Content-Type': 'application/json'
                  }
                });
            
            //expect((await orderResponse).ok()).toBeTruthy();
            const orderResponseJson = await orderResponse.json();
            console.log(orderResponseJson);
            let orderId = orderResponseJson.orders[0];
            response.orderId = orderId;
            return response; 
    }

    async deleteOrder(response) {
        const deleteResponse = await this.apiContext.delete(
            `https://rahulshettyacademy.com/api/ecom/order/delete-order/${response.orderId}`,
            {
                headers: {
                    'Authorization': response.token,
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
        );
        expect((await deleteResponse).ok()).toBeTruthy();
        const deleteResponseJson = await deleteResponse.json();
        console.log(deleteResponseJson);
    }
}




module.exports = {APIUtils}