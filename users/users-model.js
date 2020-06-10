const db = require('../data/dbConfig');

function find() {
    return db('userDept');
}

function findBy(filter) {
    return db("userDept").where(filter).orderBy("id");
  }
  
  async function add(user) {
    try {
      const [id] = await db("userDept").insert(user, "id");
  
      return findById(id);
    } catch (error) {
      throw error;
    }
  }
  
  function findById(id) {
    return db("userDept").where({ id }).first();
  }

module.exports = {
    find,
    findBy,
    add,
    findById
};