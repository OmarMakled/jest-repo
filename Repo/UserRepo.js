const Mongo = require('mongodb');

class UserRepo {
  constructor(db) {
    this.collection = db.collection('users');
  }

  async find(id) {
    const plugin = await this.collection.findOne({
      _id: Mongo.ObjectID(id)
    });

    return plugin;
  }
}

module.exports = UserRepo;