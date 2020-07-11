const neo4jConfig = require('../../config');

class Service {
    session = neo4jConfig.config();

    async register(name, email, password, type, idUser) {
        let userDetails = new Array();
        const result = await this.session
            .run(`MATCH (n:User) where ID(n) = ${idUser} CREATE (u:User{name:'${name}', email:'${email}', password:'${password}', type:'${type}'})<-[:REGISTERED]-(n) return u`)
            .then(function (result) {
                result.records.forEach(function (record) {
                    userDetails.push({
                        id: record._fields[0].identity.low,
                        name: record._fields[0].properties.name,
                        email: record._fields[0].properties.email,
                        password: record._fields[0].properties.password,
                        type: record._fields[0].properties.type
                    });
                });
                return userDetails;
            })
            .catch(function (error) {
                return error;
            })
        return result;
    }

    async getByEmail(email) {
        let userDetail = new Array();
        return this.session
            .run(`match (u:User{email:'${email}'}) return u`)
            .then(function (result) {
                result.records.forEach(function (record) {
                    userDetail.push({
                        id: record._fields[0].identity.low,
                        name: record._fields[0].properties.name,
                        email: record._fields[0].properties.email,
                        password: record._fields[0].properties.password,
                        type: record._fields[0].properties.type
                    });
                });
                if (userDetail.length === 0) {
                    return undefined;

                }
                return userDetail[0];
            })
            .catch(function (error) {
                throw error;
            })
    }


    async getUserById(userId) {
        let userDetail = new Array();
        return this.session
            .run(`match (u:User) where ID(u) = ${userId} return u`)
            .then(function (result) {
                result.records.forEach(function (record) {
                    userDetail.push({
                        id: record._fields[0].identity.low,
                        name: record._fields[0].properties.name,
                        email: record._fields[0].properties.email,
                        type: record._fields[0].properties.type
                    });
                });
                if (userDetail.length === 0) {
                    return undefined;

                }
                return userDetail[0];
            })
            .catch(function (error) {
                throw error;
            })
    }

    async getAllUsers(curentUserId){
        let allUsers = new Array();
        return this.session
            .run(`match (u:User) where ID(u) <> ${curentUserId} return u`)
            .then(function (result) {
                result.records.forEach(function (record) {
                    allUsers.push({
                        id: record._fields[0].identity.low,
                        name: record._fields[0].properties.name,
                        email: record._fields[0].properties.email,
                        type: record._fields[0].properties.type
                    });
                });
                if (allUsers.length === 0) {
                    return undefined;

                }
                return allUsers;
            })
            .catch(function (error) {
                throw error;
            })

    }
}

const UserService = new Service();
Object.freeze(UserService);

module.exports = UserService;