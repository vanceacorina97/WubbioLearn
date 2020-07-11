import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { Button } from '@material-ui/core';
import { history } from '../.././../utils/history'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '15px',
        minWidth: 340,
        maxWidth: 340,
    },
    media: {
        height: 0,
        paddingTop: '56.25%',

    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
    buttonDetails: {
        marginLeft: 'auto',
        color: '#FE6B8B',

    }
}));

export default function CustomCard({ title, subheader, image, descriere, projectId, user, ...props }) {
    const classes = useStyles();


    const sendToProject = () => {

        history.push(`projects/${projectId}`);
    }


    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {user.match(/\b(\w)/g).join('')}
                    </Avatar>
                }
                title={title}
                subheader={subheader}
            />
            <CardMedia
                className={classes.media}
                image={image == '' ? 'public/assets/img/noImage.png' : image }
                title={title}
            />
            <CardContent>
                <Typography noWrap variant="body2" color="textSecondary" component="p">
                    {descriere}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <p style={{ fontStyle: 'italic', color: 'gray' }}> By {user}</p>
                <Button size="small" color="primary" className={classes.buttonDetails} key={projectId} onClick={sendToProject} >Details</Button>
            </CardActions>
        </Card>
    );
}
