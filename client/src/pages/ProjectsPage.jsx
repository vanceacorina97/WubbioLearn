import * as React from 'react';
import { ProjectComponent } from '../modules/projects/ProjectComponent'
import MainLayout from '../modules/MainLayout'

export const ProjectPage = (props) => <MainLayout renderContent={<ProjectComponent />} {...props} />