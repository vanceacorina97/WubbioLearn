import * as React from 'react';
import { PhotoComponent } from '../modules/photos/PhotoComponent'
import MainLayout from '../modules/MainLayout'

export const PhotosPage = (props) => <MainLayout renderContent={<PhotoComponent />} {...props} />