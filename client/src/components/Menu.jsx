import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FolderSpecialOutlinedIcon from '@material-ui/icons/FolderSpecialOutlined';
import PermMediaOutlinedIcon from '@material-ui/icons/PermMediaOutlined';
import CreateNewFolderOutlinedIcon from '@material-ui/icons/CreateNewFolderOutlined';
import { Drawer, List, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Link } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeftRounded';

const menuItems = [{ 'id': 'project', 'name': 'Project', 'icon': <FolderSpecialOutlinedIcon />, 'href': '/projects' },
{ 'id': 'photos', 'name': 'Photos', 'icon': <PermMediaOutlinedIcon />, 'href': '/photos' },
{ 'id': 'space', 'icon': <Divider key='space' /> },
{ 'id': 'addproject', 'name': 'Add Project', 'icon': <CreateNewFolderOutlinedIcon />, 'href': '/add/project' }];

const drawerWidth = 240; // facut fisier de constante si adaugat acolo
const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    link: {
        textDecoration: 'none',
        color: 'black',
        '&:hover': {
            textDecoration: 'none',
            color: 'black',
        }
    },
}));

const Menu = ({ open, handleDrawerClose }) => {
    const classes = useStyles();
    const theme = useTheme();
    return (

        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
        >
            <div className={classes.toolbar}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                {menuItems.map((menuItem) => (
                    menuItem.id === 'space' ? (menuItem.icon) : (
                        <Link className={classes.link} href={menuItem.href} key={menuItem.id}>
                            <ListItem button >
                                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                                <ListItemText primary={menuItem.name} />
                            </ListItem>
                        </Link>)
                ))}
            </List>
        </Drawer>
    )
}
export default Menu;