

import * as React from 'react';
import { useContext } from 'react';
import { FormComponent } from './FormCompoment';
import { get } from 'lodash';
import { store } from '../../store/store';

export const FormContainer = (props) => {
    const globalState = useContext(store);
    const { state, dispatch } = globalState;

    const metadata_data = get(state, ['metadatas', 'list']) || {}

    const metadatasState = {
        isMetadataFetching: metadata_data.status === 'running' ? true : false,
        isMetadataError: metadata_data.status === 'failed' ? true : false,
        metadataList: metadata_data.data || [],
    }

    return <FormComponent dispatch={dispatch} {...metadatasState} {...props} />
}