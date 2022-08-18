const mysql = require("mysql2");

module.exports = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Suvro@96",
  database: "testdb1",
});

// module.exports = mysql.createConnection({
//   host: "boq2xnnche5gjcnj1i3o-mysql.services.clever-cloud.com",
//   user: "ujuqyjj7ujpgosrz",
//   password: "DHSdBTL5g7QCbmyFoElK",
//   database: "boq2xnnche5gjcnj1i3o",
// });
