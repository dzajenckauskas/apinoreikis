'use strict';

/**
 * object-purpose service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::object-purpose.object-purpose');
