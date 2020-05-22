import * as React from 'react';
import MainLayout from '../modules/MainLayout'
import { PhotoContainer } from '../modules/photos/PhotoContainer';

export const PhotosPage = (props) => <MainLayout renderContent={<PhotoContainer />} {...props} />