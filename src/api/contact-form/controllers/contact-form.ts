'use strict';

/**
 * contact-form controller
 */
import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::contact-form.contact-form', ({ strapi }) => ({
    async create(ctx) {
        const { data } = await super.create(ctx);
        try {
            await strapi.plugin('email').service('email').send({
                to: ['1000kaktusu@gmail.com', 'info@noreikis.com', 'ernestasno@gmail.com'],
                from: 'info@noreikis.com',
                replyTo: 'info@noreikis.com',
                subject: `NEW contact form from: ${data.attributes.name}`,
                html: JSON.stringify(data, null, '___'),
            });

        } catch (error) {
            console.log(error, "failed to send contact-form notification");
        }

        return { data };
    }
}));