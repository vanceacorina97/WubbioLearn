import * as React from 'react';
import { useEffect, useState } from 'react';
import PhotoService from './PhotoService';
import PhotoGateway from './PhotoGateway'
import Gallery from 'react-grid-gallery';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit';

const gateway = new PhotoGateway();

export const PhotoComponent = (props) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // const [inputSearch, setList] = useState([]);
  // const [search, setList] = useState([]);
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
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await PhotoService.getAllPhotos(); //va fi search {search} -> asta inseamna search:search label:value search din useState
        setIsLoading(false);
        setList(response)
      } catch (err) {
        setIsError(true);
      }
    }
    fetchData();
  }, []);
  return (
    isLoading ?
      <div>Loading...</div> :
      <Gallery images={handleSetImages(list)} backdropClosesModal={true} rowHeight={250} customControls={[
        <IconButton> <DeleteIcon color="primary" /></IconButton>,
        <IconButton><EditIcon color="primary" /></IconButton>
      ]} />
  )
}