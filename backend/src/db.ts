const sqlite3 = require("sqlite3").verbose();
// const db = new sqlite3.Database(
//   "./db/test.db",
//   sqlite3.OPEN_READWRITE,
//   (err: Error) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("db connected...");
//     }
//   }
// );
const db = new sqlite3.Database(":memory", (err: Error) => {
  if (err) {
    console.error(err);
  }
  console.log("db connected...");
});

export default db;
