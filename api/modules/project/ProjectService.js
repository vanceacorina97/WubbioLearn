const neo4jConfig = require('../../config');

class Service {
    session = neo4jConfig.config();

    async createProject(idUser, projectName, description, status) {
        let date = new Date().toISOString().slice(0, 10);
        const result = await this.session
            .run(`MATCH (u:User) where ID(u) = ${idUser} CREATE(p:Project{name:'${projectName}', date:'${date}', description:'${description}', status:'${status}'}) <- [:CREATED] - (u) return p`)
            .then(function (result) {
                return "Project created successfully";
            })
            .catch(function (error) {
                return error;
            })
        return result;
    }

    async getAllProjects() {
        //aici vin toate proiectele + poza.
    }
}

const ProjectService = new Service();
Object.freeze(ProjectService);

module.exports = ProjectService;