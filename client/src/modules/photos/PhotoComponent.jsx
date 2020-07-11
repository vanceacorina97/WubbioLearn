import * as React from 'react';
import { useEffect } from 'react';
import PhotoService from './PhotoService';
import PhotoGateway from './PhotoGateway'
import Gallery from 'react-grid-gallery';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


const gateway = new PhotoGateway();

export const PhotoComponent = ({ dispatch, isFetching, isError, list }) => {

  const classes = useStyles();

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
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop> :
      <Gallery images={handleSetImages(list)} backdropClosesModal={true} rowHeight={250}/>

  )
}