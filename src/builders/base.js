const isNull = require('lodash/isNull');
const isUndefined = require('lodash/isUndefined');
const map = require('lodash/map');
const cloneDeep = require('lodash/cloneDeep');
const models = require('../models');

const { loader } = require('../utils/loader');

class BaseBuilder {
  constructor(req, params = {}, options = {}) {
    this.req = req;
    this.params = cloneDeep(params);
    this.options = options;
    this.transaction = options.transaction;

    this.builders = BaseBuilder.builders();
    this.models = this.model();
    this.sequelize = models.sequelize;
    this.attrs = {};
    this.resource = null;
    this.instance = null;
    this.skipActionWithoutThrowingError = options.skipActionWithoutThrowingError || false;
  }

  // CLASS METHODS

  static builders() {
    if (this.allBuilders) return this.allBuilders;

    this.allBuilders = loader('builders/dashboard', {
      recursive: true,
      excludeFiles: ['index.js', 'base.js'],
      namespace: true,
    });

    return this.allBuilders;
  }

  static execute(req, params = {}, options = {}) {
    const builder = new this(req, params, options);

    return builder.process();
  }

  // INSTANCES METHODS

  async createTransaction() {
    // Create new transaction if it doesn't exist.
    // We use the transaction to rollback resources relation when process fail
    this.isRootTransaction = isUndefined(this.transaction) || isNull(this.transaction);
    this.transaction = this.transaction || (await this.sequelize.transaction());
  }

  async process() {
    try {
      await this.createTransaction();

      // Preparing parameters
      await Promise.all(this.prepareData());

      // Create/Update some resources before main query execute
      await Promise.all(this.beforeExecute());
      // Preparing instance for create (build record) or update (find a record)
      await this.prepareInstance();
      if (!this.instance) {
        if (this.skipActionWithoutThrowingError) {
          if (this.isRootTransaction) {
            await this.transaction.commit();
          }
          return this.resource;
        } else {
          throw 'Initialize instance fail';
        }
      }

      // TODO: Remove after release
      // Debug info
      console.log(this.instance.constructor.name, this.constructor.name, 'with params', this.permittedParams());

      // Execute main query
      await this.validate();
      await this.execute();

      // Create/Update some resources after main query executed
      await Promise.all(this.afterExecute());

      // Just commit transaction once
      if (this.isRootTransaction) {
        await this.transaction.commit();
      }

      return this.resource;
    } catch (errors) {
      if (this.isRootTransaction) {
        await this.transaction.rollback();
      }

      if (errors.code) {
        // errors is object having code and (most probably) message and (sometimes) error_code
        throw errors;
      } else {
        // errors is simple string
        throw { code: 400, message: errors };
      }
    }
  }

  // PRIVATE

  async validate() {
    return this.instance.validate().catch((errors) => {
      this.errorHandler(errors);
    });
  }

  async execute() {
    if (this.executeAction() == 'update') {
      return this.instance
        .update(this.permittedParams(), { transaction: this.transaction })
        .then((resource) => (this.resource = resource))
        .catch((errors) => {
          this.errorHandler(errors);
        });
    }
    if (this.executeAction() == 'duplicate') {
      this.resource = this.instance;
      return this.resource;
    }

    return this.instance
      .destroy({ transaction: this.transaction })
      .then((resource) => (this.resource = resource))
      .catch((errors) => {
        this.errorHandler(errors);
      });
  }

  instance() {
    throw 'Please implement me at subclass';
  }

  // Return list async functions
  prepareData() {
    return [];
  }

  // Return list async functions
  beforeExecute() {
    return [];
  }

  // Return list async functions
  afterExecute() {
    return [];
  }

  executeAction() {
    return 'update';
  }

  permittedParams() {
    return {};
  }

  errorHandler(errors) {
    if (Array.isArray(errors.errors) && errors.errors.length > 0) {
      const messages = map(errors.errors, (error) => {
        return `Validation "${error.value}" (${error.validatorKey}) on ${error.path} failed`;
      });
      throw messages.join('\n');
    } else {
      if (errors.name) {
        //In case of Sequelize error, returns only name to hide the detail of the related database schema.
        throw errors.name;
      } else {
        throw errors;
      }
    }
  }
}
exports.BaseBuilder = BaseBuilder;
