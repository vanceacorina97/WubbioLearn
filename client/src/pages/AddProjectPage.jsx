import * as React from 'react';
import { FormContainer } from '../modules/projects/FormContainer'
import MainLayout from '../modules/MainLayout'

export const AddProjectPage = (props) => <MainLayout renderContent={<FormContainer />} {...props} />