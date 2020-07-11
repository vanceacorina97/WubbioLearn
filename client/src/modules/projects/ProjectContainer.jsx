

import * as React from 'react';
import { useContext } from 'react';
import { get } from 'lodash';
import { store } from '../../store/store';
import { ProjectComponent } from './ProjectComponent';

export const ProjectContainer = ({ match, location, ...props }) => {

    const globalState = useContext(store);
    const { state, dispatch } = globalState;

    const project_data = get(state, ['project', 'list']) || {}

    const projectState = {
        isProjectFetching: project_data.status === 'running' ? true : false,
        isProjectError: project_data.status === 'failed' ? true : false,
        projectList: project_data.data || [],
    }

    return <ProjectComponent dispatch={dispatch} {...projectState} match={match} location={location} {...props} />
}