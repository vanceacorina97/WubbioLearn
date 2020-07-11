import * as React from 'react';
import MainLayout from '../modules/MainLayout'
import { MainComponent } from '../modules/main/MainComponent';

export const MainPage = (props) => <MainLayout renderContent={<MainComponent />} {...props} />