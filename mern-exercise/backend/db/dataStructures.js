let db;
let collection;

module.exports = class DataStructures{
  static async injectDB(client){

    db = client.db('js');
    collection = db.collection('data-structures');
  }


}