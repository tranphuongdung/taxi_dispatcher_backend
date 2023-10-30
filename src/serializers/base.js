const map = require('lodash/map');
const flattenDeep = require('lodash/flattenDeep');
const mask = require('json-mask');
const Json = require('../utils/json');

class BaseSerializer {
  constructor(resource, options = {}) {
    this.resourceObject = resource;
    this.constructorName = resource.constructor.name;
    this.resource = Array.isArray(resource) ? resource : resource.toJSON();
    this.options = options;
  }

  static serialize(resource, options = {}) {
    const serializer = new this(resource, options);

    return serializer.serialize();
  }

  static serializeWithPagination(data, options = {}) {
    const serializer = new this(data.rows, { options, rawData: data });

    return serializer.serializeWithPagination();
  }

  // Return list async functions
  beforeSerialize() {
    return [];
  }

  async prepareAssociationResources() {}

  async serialize() {
    try {
      await this.prepareAssociationResources();
      await Promise.all(this.beforeSerialize());
      const resourceFiltered = mask(this.resource, this.fieldMask());

      return Json.camelizeKeys(resourceFiltered);
    } catch (error) {
      // TODO: Log error to file
      console.error(this.resource, error);
      return {};
    }
  }

  async serializeWithPagination() {
    const rawData = this.options.rawData;

    return {
      currentPage: rawData.currentPage,
      perPage: rawData.perPage,
      totalPage: rawData.totalPage,
      count: rawData.count,
      rows: await this.serialize(),
    };
  }

  fieldMask() {
    const attributes = this.attributes();

    return flattenDeep(this.fieldMaskBuilder(attributes)).join(',');
  }

  fieldMaskBuilder(data) {
    if (Array.isArray(data)) {
      return data;
    } else if (data !== null && data.constructor === Object) {
      return map(data, (value, key) => {
        if (key == 'attributes') {
          return value;
        } else {
          return `${key}(${this.fieldMaskBuilder(value, key)})`;
        }
      });
    }

    return data;
  }
}

exports.BaseSerializer = BaseSerializer;
