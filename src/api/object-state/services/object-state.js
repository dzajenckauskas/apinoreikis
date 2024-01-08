'use strict';

/**
 * object-state service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::object-state.object-state');
