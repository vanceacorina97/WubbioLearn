import React from 'react';
import { useState, useContext } from 'react';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import PhotoService from '../modules/photos/PhotoService';
import { store } from '../store/store';


const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: '30%',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        width: '100%',
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '100%',
        },
    },
}));

const CustomSearch = () => {
    const classes = useStyles();
    const theme = useTheme();
    

    const [inputSearch, setInputSerach] = useState('');
    const [search, setSerach] = useState('');

    const globalState = useContext(store);
    const { dispatch } = globalState;

    const getSearchPhoto = async (value) => {
   
        try {
            dispatch({ type: 'photos-list-start' });
            const response = await PhotoService.getAllPhotos({ search: value });
            dispatch({ type: 'photos-list-success', payload: response });
        } catch (err) {
            dispatch({ type: 'photos-list-error', payload: err });
        }

    }

    const handleInputSearchChange = (ev) => {
        setInputSerach(ev.target.value);
    }

    const handleOnEnter = () => {
        setSerach(search);
        getSearchPhoto(inputSearch);
    }

    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                value={inputSearch}
                onChange={handleInputSearchChange}
                onKeyUp={(event) => {
                    if (event.keyCode == 13) {
                        handleOnEnter();
                    }
                }}
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
            />
        </div>)
}

export default CustomSearch;