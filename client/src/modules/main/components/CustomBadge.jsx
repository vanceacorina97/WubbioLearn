
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import headerIcon from "../../../../public/assets/icons/headerIcon.svg";
import Button from '@material-ui/core/Button';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { history } from '../../../utils/history'
import JwtDecode from 'jwt-decode';
const useStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
        position: 'relative',
        top: '3vh',
        height: '35vh',
        backgroundColor: 'white',
        color: '#FF8E53',
        marginBottom: theme.spacing(4),
        backgroundImage: `url(${headerIcon})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
    button: {
        height: 42,
        marginTop: 40,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    }
}));

export function CustomBadge() {
    const classes = useStyles();

    const handleExploreGallery = (event) => {
        event.preventDefault();
        history.push('/photos');
    }

    return (
        <Paper elevation={2} className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${headerIcon})` }}>
            {<img style={{ display: 'none' }} src={headerIcon} alt="headerIcon" />}
            <div className={classes.overlay} />
            <Grid container>
                <Grid item md={6}>
                    <div className={classes.mainFeaturedPostContent}>
                        <Typography component="h2" variant="h3" color="inherit" gutterBottom>
                            {"Explore our gallery"}
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                            {"Search to inspire for your project"}
                        </Typography>
                        <Button className={classes.button}
                            variant="contained"
                            color="primary"
                            endIcon={<KeyboardArrowRightIcon />}
                            onClick={handleExploreGallery}
                        >
                            Go to Gallery
                </Button>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    );
}