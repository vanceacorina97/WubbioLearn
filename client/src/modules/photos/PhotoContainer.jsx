import * as React from 'react';
import { useContext } from 'react';
import { PhotoComponent } from './PhotoComponent';
import { get } from 'lodash';
import { store } from '../../store/store';

export const PhotoContainer = (props) => {
    const globalState = useContext(store);
    const { state, dispatch } = globalState;

    const data = get(state, ['photos', 'list']) || {}
    const photoState = {
        isFetching: data.status === 'running' ? true : false,
        isError: data.status === 'failed' ? true : false,
        list: data.data || [],
    }

    return <PhotoComponent dispatch={dispatch} {...photoState} {...props} />
}