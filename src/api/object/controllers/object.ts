'use strict';
import { factories } from '@strapi/strapi';
import axios from 'axios';
import cheerio from 'cheerio'

export default factories.createCoreController('api::object.object', ({ strapi }) => ({
    async find(ctx) {
        const sanitizedQueryParams = await this.sanitizeQuery(ctx);
        const { results, pagination } = await strapi.service('api::object.object').find(sanitizedQueryParams);

        const entities = await Promise.all(results.map(async (entity) => {
            if (entity.url) {
                try {
                    const axiosResponse = await axios.request({
                        method: "GET",
                        url: entity.url,
                        headers: {
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
                        }
                    });

                    const $ = cheerio.load(axiosResponse.data);
                    const bodyData = $('script').text();
                    const topbroker = JSON.parse(bodyData);

                    return { ...entity, topbroker };
                } catch (error) {
                    console.error("Error fetching data from entity URL:", error);
                    return entity;
                }
            } else {
                return entity;
            }
        }));

        const sanitizedResults = await this.sanitizeOutput(entities, ctx);

        return this.transformResponse(sanitizedResults, { pagination });
    },

    async findOne(ctx) {
        const { id } = ctx.params;

        const entity = await strapi.db.query('api::object.object').findOne({
            where: { slug: id },
            populate: ['images']
        });
        if (entity.url) {
            const axiosResponse = await axios.request({
                method: "GET",
                url: entity.url,
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
                }
            })

            const $ = cheerio.load(axiosResponse.data);
            const bodyData = $('script').text();
            entity.topbroker = JSON.parse(bodyData)
        }
        const sanitizedResults = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedResults);
    }
}));
