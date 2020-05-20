const ProjectService = require("../project/ProjectService");

class ProjectController {

    async createProject(req, res) {
        const idUser = req.user.id;
        const projectName = req.body.name;
        const description = req.body.description;
        const status = 'proposed';
        const result = await ProjectService.createProject(idUser, projectName, description, status);
        return res.status(200).send(result);

    }

    async getAllProjects(req, res) {
        const projects = await ProjectService.getAllProjects();
        return res.send(projects);
    }

}

module.exports = ProjectController;