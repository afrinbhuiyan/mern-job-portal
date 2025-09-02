function User(db) {
  return db.collection("users");
}

module.exports = User;