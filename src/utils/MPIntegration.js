import axios from 'axios';
import { ACCESS_TOKEN } from "./config.json";

export const handleIntegrationMP = async (item) => {
    console.log(item.title)
    const preferencia = {
        "auto_return": "approved",
        "back_urls": {
            "success": `http://test.com/success`,
            "pending": "http://test.com/pending",
            "failure": "http://test.com/failure"
        },
        "payment_methods": {
            "excluded_payment_methods": [
                { "id": "pix" }
            ],
            "excluded_payment_types": [
                { "id": "ticket" },

            ]
        },
        "items": [
            {
                "id": "Point system",
                "title": item.title,
                "description": item.description,
                "picture_url": `${item.imageSource}`,
                "category_id": "points",
                "quantity": item.quantity,
                "currency_id": "BRL",
                "unit_price": item.price
            },
        ],
        "payer": {
            "name": "Alisson",
            "surname": "",
            "email": "john@doe.com",
            "phone": {
                "area_code": "11",
                "number": 988888888
            },
            "identification": {
                "type": "CPF",
                "number": "12345678909"
            },

        }

    }

    try {
        const response = await axios.post('https://api.mercadopago.com/checkout/preferences', preferencia, {
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        const data = response.data;
        //console.log(data);
        return data;
    } catch (e) {
        console.error('Error creating checkout preference:', e);
    }
}
