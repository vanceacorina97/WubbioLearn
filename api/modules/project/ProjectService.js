const neo4jConfig = require('../../config');

class Service {
    session = neo4jConfig.config();

    async createProject(idUser, projectName, description, location, area, type, environement, status) {
        let date = new Date().toISOString().slice(0, 10);
        const result = await this.session
            .run(`MATCH (u:User) where ID(u) = ${idUser} CREATE(p:Project{name:'${projectName}', date:'${date}', description:'${description ? description : 'No description'}',location:'${location ? location : 'No location'}', area:'${area ? area : 'No area'}',type:'${type ? type : 'No type'}', environement:'${environement ? environement : 'No environement'}', status:'${status}'}) <- [:CREATED] - (u) return p`)
            .then(function (result) {
                return result.records[0]._fields[0].identity.low;
            })
            .catch(function (error) {
                return error;
            })
        return result;
    }

    async getAllProjects() {
        let allProjects = [];
        const result = await this.session
            .run('match (u:User) - [:CREATED] -> (p:Project) optional match (p:Project) - [:HAS] -> (ph:Photo) return u.name,ID(p), p.name, p.description, p.date, p.location, collect(ph.path)[..1] AS photo')
            .then(function (result) {
                result.records.forEach(function (record) {
                    allProjects.push({
                        user: record.get(0),
                        id: record.get(1),
                        name: record.get(2),
                        description: record.get(3),
                        date: record.get(4),
                        location: record.get(5),
                        photo: record.get(6)[0]
                    });
                });
                return allProjects;
            })
            .catch(function (error) {
                return error;
            })
        return result;
    }

    async getProject(idProject) {
        let detailsProject = [];
        const result = await this.session
        .run(`match (u:User) - [:CREATED] -> (p:Project) where ID(p) = ${idProject} return p,u.name`)
        .then(function (result) {
            result.records.forEach(function (record) {
                detailsProject.push({
                   user:  record._fields[1],
                   id: record._fields[0].identity.low,
                   area: record._fields[0].properties.area,
                   date:record._fields[0].properties.date,
                   description: record._fields[0].properties.description,
                   environement: record._fields[0].properties.environement,
                   location: record._fields[0].properties.location,
                   name: record._fields[0].properties.name,
                   status: record._fields[0].properties.status,
                   type: record._fields[0].properties.type,
                   status: record._fields[0].properties.status
                });
            });
            return detailsProject;
        })
        .catch(function (error) {
            return error;
        })
    return result;
    }
}

const ProjectService = new Service();
Object.freeze(ProjectService);

module.exports = ProjectService;