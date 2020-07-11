import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

const filter = createFilterOptions();

export const CustomAutoComplete = ({ id, label, list, onChange, value, ...props }) => {

    return (
        <Autocomplete

            size="small"
            value={value}
            onChange={onChange}

            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                if (params.inputValue !== '') {
                    filtered.push({
                        inputValue: params.inputValue,
                        title: `Add "${params.inputValue}"`,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur

            id={id}
            options={list}
            getOptionLabel={(option) => {
                if (typeof option === 'string') {
                    return option;
                }
                if (option.inputValue) {
                    return option.inputValue;
                }
                return option.title;
            }}
            renderOption={(option) => option.title}
            freeSolo
            renderInput={(params) => (
                <TextField  {...params} label={label} color='secondary' variant="outlined" />
            )}
            {...props}
        />
    );
}