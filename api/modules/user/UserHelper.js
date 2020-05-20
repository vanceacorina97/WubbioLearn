const neo4jConfig = require('../../config');

class Helper {

    session = neo4jConfig.config();

    async checkIfEmailExist(email) {
        let exist = false;
        const result = await this.session
            .run("MATCH (u:User) RETURN u.email = '" + email + "'as exist")
            .then(function (result) {
                result.records.forEach(function (record) {
                    exist = record._fields[0];
                });
                return exist;
            })
            .catch(function (error) {
                return error;
            })
        return result;
    }

    async validateEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true
        }
        return false
    }

    async validatePassword(password) {
        const passValidator = /^[A-Za-z]\w{7,14}$/;
        if (password.match(passValidator)) {
            return true;
        }
        return false;
    }

}

const UserHelper = new Helper();
Object.freeze(UserHelper);

module.exports = UserHelper;