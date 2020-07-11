const neo4j = require('neo4j-driver');
const dotenv = require('dotenv');
dotenv.config();

exports.config = function () {
    var address = process.env.NEO4j_ADDRESS;
    var user = process.env.NEO4J_USER;
    var password = process.env.NEO4J_PASSWORD;
    var driver = neo4j.driver(address, neo4j.auth.basic(user, password));
    var session = driver.session();
    return session;
}

