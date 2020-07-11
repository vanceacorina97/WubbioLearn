import * as React from 'react';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CustomCard from './components/CustomCard';
import Grid from '@material-ui/core/Grid';
import ProjectService from './ProjectService'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import PhotoGateway from '../photos/PhotoGateway'
import Grow from '@material-ui/core/Grow';
import Skeleton from '@material-ui/lab/Skeleton';
import { CustomSkeleton } from './components/CustomSkeleton';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: '10px',
    },
    gridContainer: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },

}));

const gateway = new PhotoGateway();

export const ProjectsComponent = ({ dispatch, isFetching, isError, list }) => {

    const classes = useStyles();

    const handleSetProjects = (list) => {
        const projects = new Array();
        list.forEach((project) => projects.push({
            user: project.user,
            id: project.id.low,
            name: project.name,
            date: project.date,
            location: project.location,
            description: project.description,
            photo: project.photo ? gateway.baseUrl + '/' + project.photo : ''
        }));
        return projects;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: 'projects-list-start' });
                const response = await ProjectService.getAllProjects();
                dispatch({ type: 'projects-list-success', payload: response });
            } catch (err) {
                dispatch({ type: 'projects-list-error', payload: err });
            }
        }
        fetchData();
    }, []);


    return (
        <div className={classes.root}>
            <Grid container className={classes.gridContainer} spacing={2}>
                {
                    handleSetProjects(list).map((project, index) =>
                        <Grow
                            in={true}
                            style={{ transformOrigin: '0 0 0' }}
                            {...(true ? { timeout: 1000 } : {})}
                            key={index}
                        >
                            <Grid item key={index}>
                                <CustomCard
                                    title={project.name}
                                    subheader={project.date}
                                    descriere={project.description}
                                    image={project.photo}
                                    projectId={project.id}
                                    user={project.user}
                                />
                            </Grid>
                        </Grow>
                    )
                }
            </Grid>
        </div>

    )

}