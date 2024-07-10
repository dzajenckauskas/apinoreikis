'use strict';

/**
 * price-inquiry-form controller
 */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::price-inquiry-form.price-inquiry-form');

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::price-inquiry-form.price-inquiry-form', ({ strapi }) => ({
    async create(ctx) {
        const { data } = await super.create(ctx);
        try {
            // const orderReceivedTemplate = await axios.get(
            //     `${process.env.NEXT_PUBLIC_API_URL}/api/mails/order-received/email?id=${data.id}`
            // )
            // await strapi.plugins['email'].services.email.send({
            //     to: data.customer.email,
            //     from: process.env.SMTP_USERNAME,
            //     replyTo: process.env.SMTP_USERNAME,
            //     subject: `Order received #${data.id}`,
            //     html: orderReceivedTemplate.data,
            // })

            await strapi.plugin('email').service('email').send({
                to: ['1000kaktusu@gmail.com', 'info@noreikis.com', 'ernestas@urbanestate.lt'],
                from: process.env.SMTP_USERNAME,
                replyTo: process.env.SMTP_USERNAME,
                subject: `NEW price-inquiry-form form from: ${data.attributes.name}`,
                html: JSON.stringify(data, null, '___'),
            });

        } catch (error) {
            console.log(error, "failed to send price-inquiry-form notification");
        }

        return { data };
    }
}));