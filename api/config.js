const neo4j = require('neo4j-driver');
exports.config = function () {
    var address = 'bolt://localhost:11007';
    var user = 'neo4j';
    var password = 'linawub';
    var driver = neo4j.driver(address, neo4j.auth.basic(user, password));
    var session = driver.session();
    // var session = driver.session({
    //     database: 'foo', // to select what database you need
    //     defaultAccessMode: neo4j.session.WRITE
    // })
    return session;
}

