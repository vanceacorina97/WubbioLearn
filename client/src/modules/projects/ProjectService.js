import ProjectGateway from './ProjectGateway';

class ProjectService {

    constructor() {
        this.gateway = new ProjectGateway();
    }

    getAllMetadatas() {
        return this.gateway.getAllMetadatas()
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error;
            })
    }
    getAllProjects() {
        return this.gateway.getAllProjects()
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error;
            })
    }

    createProject(payload) {
        return this.gateway.createProject(payload)
            .then((result) => {
                return result.data;
            })
            .catch((error) => {
                return error;
            })
    }

    getProject(data) {
        return this.gateway.getProject(data)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            })
    }
}

export default new ProjectService;