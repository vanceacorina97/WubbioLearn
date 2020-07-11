import * as React from 'react';
import ProjectService from './ProjectService';
import { useEffect } from 'react';
import PhotoGateway from '../photos/PhotoGateway';
import Gallery from 'react-grid-gallery';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles((theme) => ({
    //font-family: 'TeXGyreHerosRegular,Helvetica,Arial,sans-serif';
    mainFeaturedPost: {
        position: 'relative',
        top: '3vh',
        padding: '30px',
        backgroundColor: 'white',
        marginBottom: theme.spacing(4),
        marginBottom: '5vh'
    },

    text: {
        fontFamily: "Trebuchet MS, Helvetica, sans-serif",
        color: '#FE6B8B'
    }
}));

export const ProjectComponent = ({ match, location, dispatch, isProjectFetching, isProjectError, projectList }) => {
    const { params: { projectId } } = match;
    const gateway = new PhotoGateway();
    const classes = useStyles();

    const getProjectDetail = (type) => {
        let result = '';
        const projectDetails = projectList.projectDetails;
        for (let key in projectDetails) {
            switch (type) {
                case 'user': result = projectDetails[key].user; break;
                case 'area': result = projectDetails[key].area; break;
                case 'date': result = projectDetails[key].date; break;
                case 'description': result = projectDetails[key].description; break;
                case 'environement': result = projectDetails[key].environement; break;
                case 'location': result = projectDetails[key].location; break;
                case 'name': result = projectDetails[key].name; break;
                case 'type': result = projectDetails[key].type; break;
                case 'status': result = projectDetails[key].status; break;
            }
        }
        return result;
    }
    const handleSetImages = (projectList) => {
        const photos = projectList.photos;
        const images = [];
        for (let key in photos) {
            images.push({
                src: gateway.baseUrl + '/' + photos[key].path,
                thumbnail: gateway.baseUrl + '/' + photos[key].path,
                thumbnailWidth: parseInt(photos[key].width.low),
                thumbnailHeight: parseInt(photos[key].height.low)
            })
        }
        return images;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: 'project-list-start' });
                const response = await ProjectService.getProject({ idProject: projectId });
                dispatch({ type: 'project-list-success', payload: response.data });
            } catch (err) {
                dispatch({ type: 'project-list-error', payload: err });
            }
        }
        fetchData();
    }, []);

    return (

        isProjectFetching ?
            <div><p>Se incarca...</p></div> :
            <div >
                <Paper elevation={2} className={classes.mainFeaturedPost}>
                    <Typography component="h2" variant="h4" color='inherit' align="center" className={classes.text} >{getProjectDetail('name')}</Typography>
                    <Typography color='textSecondary' align="center" paragraph style={{ fontStyle: 'italic' }}>by {getProjectDetail('user')}</Typography>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ width: '50%' }}>
                            <Typography paragraph><b className={classes.text}> LOCATION:</b> {getProjectDetail('location')} </Typography>
                            <Typography paragraph><b className={classes.text}>ENVIRONEMENT:</b> {getProjectDetail('environement')} </Typography>
                            <Typography paragraph><b className={classes.text}>DATE:</b> {getProjectDetail('date')} </Typography>
                            <Typography paragraph><b className={classes.text}>AREA:</b> {getProjectDetail('area')} </Typography>
                            <Typography paragraph><b className={classes.text}>TYPE:</b> {getProjectDetail('type')} </Typography>
                            <Typography paragraph><b className={classes.text}>STATUS:</b> {getProjectDetail('status')} </Typography>

                        </div>
                        <div style={{ width: '35%' }}>
                            <h3 className={classes.text}>DESCRIPTION:</h3> <p>{getProjectDetail('description')}</p>
                        </div>
                    </div>
                </Paper>
                <Gallery images={handleSetImages(projectList)} backdropClosesModal={true} rowHeight={250} />
            </div>




    )

}