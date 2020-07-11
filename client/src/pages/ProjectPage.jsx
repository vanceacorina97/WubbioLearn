import * as React from 'react';
import { ProjectContainer } from '../modules/projects/ProjectContainer'
import MainLayout from '../modules/MainLayout'
import { ProjectComponent } from '../modules/projects/ProjectComponent';

export const ProjectPage = ({ match, location, ...props }) => <MainLayout renderContent={<ProjectContainer match={match} location={location} />} {...props} />