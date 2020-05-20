import * as React from 'react';
import { FormComponent } from '../modules/projects/FormCompoment'
import MainLayout from '../modules/MainLayout'

export const AddProjectPage = (props) => <MainLayout renderContent={<FormComponent />} {...props} />