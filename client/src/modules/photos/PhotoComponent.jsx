import * as React from 'react';
import { useEffect } from 'react';
import PhotoService from './PhotoService';
import PhotoGateway from './PhotoGateway'
import Gallery from 'react-grid-gallery';

const gateway = new PhotoGateway();

export const PhotoComponent = ({ dispatch, isFetching, isError, list }) => {

  const handleSetImages = (list) => {
    const images = new Array();
    list.forEach((photo) => images.push({
      src: gateway.baseUrl + '/' + photo.path,
      thumbnail: gateway.baseUrl + '/' + photo.path,
      thumbnailWidth: parseInt(photo.width.low),
      thumbnailHeight: parseInt(photo.height.low)
    }));
    return images;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'photos-list-start' });
        const response = await PhotoService.getAllPhotos();
        dispatch({ type: 'photos-list-success', payload: response });
      } catch (err) {
        dispatch({ type: 'photos-list-error', payload: err });
      }
    }
    fetchData();
  }, []);
  return (
    isFetching ?
      <div>Loading...</div> :
      <Gallery images={handleSetImages(list)} backdropClosesModal={true} rowHeight={250} />
    //customControls={[
    //<IconButton> <DeleteIcon color="primary" /></IconButton>,
    //<IconButton><EditIcon color="primary" /></IconButton>
    //]}
  )
}