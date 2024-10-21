'use strict';

/**
 * contact-form controller
 */
import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::contact-form.contact-form', ({ strapi }) => ({
    async create(ctx) {
        const { data } = await super.create(ctx);
        const emailContent = `
        <h1>New Contact Form Submission</h1>
        <p><strong>Date:</strong> ${data.attributes.createdAt}</p>
        <p><strong>Name:</strong> ${data.attributes.name}</p>
        <p><strong>Email:</strong> ${data.attributes.email}</p>
        <p><strong>Phone:</strong> ${data.attributes.phone}</p>
        <p><strong>Message:</strong> ${data.attributes.message}</p>
    `;
        try {
            await strapi.plugin('email').service('email').send({
                to: ['1000kaktusu@gmail.com', 'info@noreikis.com', 'ernestasno@gmail.com'],
                from: 'info@noreikis.com',
                replyTo: 'info@noreikis.com',
                subject: `NEW contact form from: ${data.attributes.name}`,
                html: emailContent,
            });

        } catch (error) {
            console.log(error, "failed to send contact-form notification");
        }

        return { data };
    }
}));