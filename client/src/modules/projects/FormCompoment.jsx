import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CustomTextField from '../../components/CustomTextField';
import { CustomAutoComplete } from './components/CustomAutoComplete';
import { Button, ListItemText } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import ProjectService from './ProjectService';
import ImageUploader from 'react-images-upload';
import { history } from '../../utils/history'
import { useEffect } from 'react';
import List from '@material-ui/core/List';
import { CustomListItem } from './components/CustomListItem';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'calc(100vh - 88px)',
        width: '100%',
        paddingTop: '24px'
    },
    paper: {
        height: '100%',
        width: '100%',
    },
    inputText: {
        width: '100%',
        minWidth: '200px',
        maxWidth: '300px',
        marginLeft: '10px',
        marginRight: '10px',
        paddingRight: '20px',
    },

    inputAutoComplete: {
        display: 'inline-block',
        width: '100%',
        minWidth: '200px',
        maxWidth: '300px',
        marginLeft: '10px',
        marginRight: 'auto',
        paddingRight: '20px',
        marginTop: '16px',
        marginBottom: '8px',
    },
    button: {
        height: 42,
        marginTop: 40,
        marginLeft: 40,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },

    text: {
        color: '#FE6B8B',
        textAlign: 'center'
    }
}));

export const FormComponent = ({ dispatch, isMetadataFetching, isMetadataError, metadataList }) => {

    const classes = useStyles();
    useEffect(() => {
        const fetchMetadataData = async () => {
            try {
                dispatch({ type: 'metadatas-list-start' });
                const response = await ProjectService.getAllMetadatas();
                dispatch({ type: 'metadatas-list-success', payload: response });
            } catch (err) {
                dispatch({ type: 'metadatas-list-error', payload: err });
            }
        }

        fetchMetadataData();
    }, []);

    const [projectDetails, setProjectDetails] = React.useState({
        name: '',
        area: '',
        description: '',
        location: { title: '', inputValue: '' },
        type: { title: '', inputValue: '' },
        environement: { title: '', inputValue: '' },
        images: [],
    });
    const isFormCompleted = () => projectDetails.name && projectDetails.area && projectDetails.description;

    const [imageDetails, setImageDetails] = React.useState({ image: {}, metadate: [] });
    const [metadatas, setMetadatas] = React.useState([]);
    const [preview, setPreview] = React.useState([]);

    const handleSetMetadatas = (metadataList) => {
        const metadatas = new Array();
        metadataList.forEach((metadata) => metadatas.push({ 'title': metadata }));
        return metadatas;
    }
    const handleDelete = (index) => () => {
        setMetadatas((chips) => chips.filter((chip, key) => key !== index));
    };

    const handleSubmit = () => {
        let formData = new FormData();
        projectDetails.images.forEach(({ image, metadate }, index) => {
            formData.append(`images`, image, `${index}.jpg`);
            formData.append(`metadate_${index}.jpg`, metadate);
        })
        formData.append('name', projectDetails.name);
        formData.append('area', projectDetails.area);
        formData.append('location', projectDetails.location.title);
        formData.append('type', projectDetails.type.title);
        formData.append('environement', projectDetails.environement.title);
        formData.append('description', projectDetails.description);

        ProjectService.createProject(formData).then((result) => {
            history.push(`/projects/${result.idProject}`);
        });
    }

    const handleChange = (name) => (event) => {
        setProjectDetails({ ...projectDetails, [name]: event.target.value });
    }

    const handleAddPhoto = () => {
        setPreview([...preview, { 'filename': imageDetails.image.name, 'metadate': imageDetails.metadate.toString() }]);
        setProjectDetails({
            ...projectDetails,
            'images': [...projectDetails.images, imageDetails]
        });
        setImageDetails({ image: {}, metadate: [] })
        setMetadatas([]);
    }

    const handleAutoCompleteChange = (name) => (event, newValue) => {
        if (typeof newValue === 'string') {
            setProjectDetails({
                ...projectDetails,
                [name]: { title: newValue },
            });
        } else if (newValue && newValue.inputValue) {
            setProjectDetails({
                ...projectDetails,
                [name]: { title: newValue.inputValue },
            });
        } else {
            setProjectDetails({
                ...projectDetails,
                [name]: newValue,
            });
        }
    }

    const handleAutoCompleteMetaChange = (event, newValue) => {

        if (newValue !== null) {
            if (typeof newValue === 'string') {
                setMetadatas([...metadatas, newValue]);
                setImageDetails({
                    ...imageDetails,
                    'metadate': [...metadatas, newValue],
                });
            } else if (newValue && newValue.inputValue) {

                setMetadatas([...metadatas, newValue.inputValue]);
                setImageDetails({
                    ...imageDetails,
                    'metadate': [...metadatas, newValue.inputValue],
                });
            } else {
                setMetadatas([...metadatas, newValue.title]);

                setImageDetails({
                    ...imageDetails,
                    'metadate': [...metadatas, newValue.title],
                });
            }
        }
    }
    const handleDrop = (name) => (files) => {
        if (files[0]) {
            setImageDetails({
                ...imageDetails,
                [name]: files[0],
            });
        }
    }

    const { projectName, area, description, location, type, environement } = projectDetails;
    return (
        <div className={classes.root} >
            <Paper elevation={3} className={classes.paper}>
                <Grid container spacing={1} direction="row" justify="center" alignItems="stretch" style={{ height: '100%' }}>
                    <Grid item xs={12} sm={12} md={3} style={{ paddingLeft: '44px' }}>
                        <h2 className={classes.text}>1. Create Project</h2>
                        <div style={{ boxShadow: '0px 2px 9px 0 rgba(4, 4, 4, 0.33)', padding: '35px 35px 27px 48px' }}>
                            <CustomTextField
                                id={'name'}
                                required={true}
                                className={classes.inputText}
                                label='Project Name'
                                value={projectName}
                                onChange={handleChange('name')}
                                type='text'
                            />
                            <CustomTextField
                                id={'area'}
                                required={true}
                                className={classes.inputText}
                                label='Area'
                                value={area}
                                onChange={handleChange('area')}
                                type='text'
                            />
                            <CustomAutoComplete
                                id={'location'}
                                label={'Location'}
                                className={classes.inputAutoComplete}
                                value={location}
                                onChange={handleAutoCompleteChange('location')}
                                list={[]}
                            />
                            <CustomAutoComplete
                                id={'type'}
                                label={'Type'}
                                className={classes.inputAutoComplete}
                                value={type}
                                onChange={handleAutoCompleteChange('type')}
                                list={[]}
                            />
                            <CustomAutoComplete
                                id={'environement'}
                                label={'Environement'}
                                className={classes.inputAutoComplete}
                                value={environement}
                                onChange={handleAutoCompleteChange('environement')}
                                list={[]}
                            />
                            <CustomTextField
                                id="description"
                                label="Description"
                                color="secondary"
                                className={classes.inputText}
                                multiline
                                rows={10}
                                placeholder="Add a short description"
                                value={description}
                                onChange={handleChange('description')}
                                variant="outlined"
                            /></div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <h2 className={classes.text}>2. Add Photos</h2>
                        <div style={{ display: 'flex', boxShadow: '0px 2px 9px 0 rgba(4, 4, 4, 0.33)', padding: '35px 35px 20px' }}>
                            <ImageUploader
                                className={classes.fileContainer}
                                withIcon={false}
                                withLabel={false}
                                singleImage={true}
                                withPreview={true}
                                buttonText='Choose image'
                                onChange={handleDrop('image')}
                                imgExtension={['.jpg', '.jpeg']}
                                maxFileSize={5242880}
                            />

                            <div style={{ width: '50%', padding: '10px 0px 10px 20px' }}>
                                <CustomAutoComplete
                                    id={'metadata'}
                                    label={'Metadata'}
                                    list={handleSetMetadatas(metadataList)}
                                    onChange={handleAutoCompleteMetaChange}
                                />
                                <Paper elevation={3} style={{
                                    height: '400px',
                                    marginTop: '21px',
                                    padding: '10px'
                                }} >
                                    {metadatas.map((metadata, index) => <Chip label={metadata} key={index} onDelete={handleDelete(index)} color="secondary" style={{ marginTop: '5px', marginLeft: '3px' }} />)}
                                </Paper>
                                <Button className={classes.button}
                                    style={{ float: 'right' }}
                                    variant="contained"
                                    color="primary"
                                    onClick={handleAddPhoto}>
                                    Add Photo
                            </Button>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                        <h2 className={classes.text}>3. Preview photos</h2>
                        <div style={{ boxShadow: '0px 2px 9px 0 rgba(4, 4, 4, 0.33)', padding: '35px 14px 20px', height: '66vh', marginRight: '40px' }}>
                            <List>
                                {preview.map((image, index) => <CustomListItem filename={image.filename} metadatas={image.metadate} key={index} />)}
                            </List>
                        </div>
                        <Button className={classes.button}
                            style={{ float: 'right', marginRight: '37px' }}
                            variant="contained"
                            color="primary"
                            disabled={!isFormCompleted()}
                            onClick={handleSubmit}>
                            Submit
                </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}