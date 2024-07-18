import { connect } from "mongoose";

class Database {
  static connect() {
    const mongoUri = "mongodb://localhost:27017/blacklist";

    return new Promise((resolve, reject) => {
      connect(mongoUri)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          console.log("error connecting to mongodb", err);
          reject();
        });
    });
  }
}

export default Database;
