import * as React from 'react';
import { useContext } from 'react';
import { ProjectsComponent } from './ProjectsComponent';
import { get } from 'lodash';
import { store } from '../../store/store';

export const ProjectsContainer = (props) => {
    const globalState = useContext(store);
    const { state, dispatch } = globalState;

    const data = get(state, ['projects', 'list']) || {}
    const projectsState = {
        isFetching: data.status === 'running' ? true : false,
        isError: data.status === 'failed' ? true : false,
        list: data.data || [],
    }

    return <ProjectsComponent dispatch={dispatch} {...projectsState} {...props} />
}