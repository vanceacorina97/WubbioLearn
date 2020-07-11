import * as React from 'react';
import MainLayout from '../modules/MainLayout';
import Test from '../modules/Test'

export const TestPage = (props) => <MainLayout renderContent={<Test/>} {...props} />