var Sequelize = require("sequelize");
var sequelize = new Sequelize("enkiRun","root","",{
    host : 'localhost',
    dialect : 'mysql'
});

var db = {};

db.users = sequelize.import(__dirname + "/models/dbuser.js");
db.problems = sequelize.import(__dirname + "/models/dbproblem.js");
db.problemCategorie = sequelize.import(__dirname + "/models/dbproblemcategorie.js");
db.pools = sequelize.import(__dirname + "/models/dbpool.js");
db.words = sequelize.import(__dirname + "/models/dbword.js");
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;