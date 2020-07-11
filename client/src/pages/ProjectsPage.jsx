import * as React from 'react';
import { ProjectsContainer } from '../modules/projects/ProjectsContainer'
import MainLayout from '../modules/MainLayout'

export const ProjectsPage = (props) => <MainLayout renderContent={<ProjectsContainer />} {...props} />