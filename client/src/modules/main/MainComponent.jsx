
import React from 'react';
import { CustomBadge } from './components/CustomBadge';
import { ProjectsContainer } from '../projects/ProjectsContainer';


export function MainComponent() {

    return (
        <div>
            <CustomBadge />
            <ProjectsContainer />
        </div>
    );
}