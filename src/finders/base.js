const { isPresent } = require('../utils/lang');
const responder = require('../helpers/responder');

class BaseFinder {
  constructor(scopePromise, params, options) {
    this.scopePromise = scopePromise || responder.resolve([]);
    this.params = params || {};
    this.options = options || {};
    this.transaction = options.transaction;

    this.errors = [];
    this.model = this.model();
    this.filterBy = this.params.filterBy;
  }

  static find(scopePromise, params, options = {}) {
    const finder = new this(scopePromise, params, options);

    return finder.find();
  }

  static findAndCount(scopePromise, params, options = {}) {
    const finder = new this(scopePromise, params, options);
    return finder.findAndCount();
  }

  static count(scopePromise, params, options = {}) {
    const finder = new this(scopePromise, params, options);

    return finder.count();
  }

  // Default is return a resource. For fetch collection data, override method return true at subclass
  isFetchAll() {
    return false;
  }

  // Return list async functions
  beforeValidate() {
    return [];
  }

  addErrors(error) {
    this.errors.push(error);
  }

  find() {
    return Promise.all(this.beforeValidate()).then(() => {
      this.validate();

      if (isPresent(this.errors)) {
        throw responder.unprocessableEntity(this.errors.join(', '));
      }

      return this.executeQuery();
    });
  }

  /**
   * returns a list and the total count (to be used for pagination)
   */
  findAndCount() {
    return Promise.all(this.beforeValidate()).then(() => {
      this.validate();

      if (isPresent(this.errors)) {
        throw responder.unprocessableEntity(this.errors.join(', '));
      }

      return this.executeFindAndCountQuery().then((result) => this.addPaginationData(result));
    });
  }

  count() {
    return Promise.all(this.beforeValidate()).then(() => {
      this.validate();

      if (isPresent(this.errors)) {
        throw responder.unprocessableEntity(this.errors.join(', '));
      }

      return this.executeCountQuery();
    });
  }

  async executeQuery() {
    const scopeData = await this.scopePromise;
    const condition = this.conditionBuilder();

    // If transaction is in the option, insert the transaction
    if (this.transaction) {
      condition.transaction = this.transaction;
    }

    if (this.isFetchAll()) {
      return this.model.scope(scopeData).findAll(condition);
    }

    return this.model.scope(scopeData).findOne(condition);
  }

  async executeFindAndCountQuery() {
    const scopeData = await this.scopePromise;
    let condition = this.conditionBuilder();
    condition['distinct'] = true;
    condition['col'] = `${this.model.name}.id`;

    if (this.transaction) {
      condition.transaction = this.transaction;
    }

    return this.model.scope(scopeData).findAndCountAll(condition);
  }

  async executeCountQuery() {
    const scopeData = await this.scopePromise;
    let condition = this.conditionBuilder();
    condition['distinct'] = true;
    condition['col'] = `${this.model.name}.id`;

    if (this.transaction) {
      condition.transaction = this.transaction;
    }

    return this.model.scope(scopeData).count(condition);
  }

  validate() {}

  conditionBuilder() {
    throw 'Please implement me at subclass';
  }

  model() {
    throw 'Please implement me at subclass';
  }

  addPaginationData(data) {
    return {
      ...data,
      currentPage: this.pageBuilder(),
      perPage: this.perPageBuilder(),
      totalPage: Math.ceil(data.count / this.perPageBuilder()),
    };
  }
}

exports.BaseFinder = BaseFinder;
