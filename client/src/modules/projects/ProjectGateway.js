import Gateway from '../../utils/GatewayUtils'

class ProjectGateway extends Gateway {


    getAllProjects() {
        return this.getRequest('/projects/AllProjects');
    }

    createProject(payload) {
        return this.postImageRequest('/projects/createProject', payload);
    }

    getAllMetadatas() {
        return this.getRequest('/photos/allMetadatas')
    }

    getProject(data) {
        return this.getRequest('/projects/getProject', data)
    }
}

export default ProjectGateway;