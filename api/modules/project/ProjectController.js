const ProjectService = require("../project/ProjectService");
class ProjectController {

    async createProject(req, res, next) {
        const status = 'proposed';
        const { name, description, location, area, type, environement } = req.body;
        const projectID = await ProjectService.createProject(
            req.user.id,
            name,
            description,
            location,
            area,
            type,
            environement,
            status);
        req.projectId = projectID;
        next();
    }

    async getAllProjects(req, res) {
        const projects = await ProjectService.getAllProjects();
        return res.send(projects);
    }

    async getProject(req, res, next) {
        let idProject =  req.query.idProject;
        const detailsProject = await ProjectService.getProject(idProject); 
        req.detailsProject = detailsProject;
        next();
    }

}

module.exports = ProjectController;