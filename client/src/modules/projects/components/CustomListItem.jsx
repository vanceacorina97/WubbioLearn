import * as React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';

export const CustomListItem = ({filename, metadatas, id}) => {
    
    return (
        <ListItem key={id}>
        <ListItemText
            primary={filename}
            secondary={metadatas}
        />
        <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" disabled={true}>
                <DeleteIcon />
            </IconButton>
        </ListItemSecondaryAction>
        </ListItem>
    )
}