import React from 'react'
import { Button, TextField } from '@material-ui/core';
import { filterByValue, filterByDate } from '../../actions/meeting';
import { useDispatch, useSelector } from 'react-redux';
import {DatePicker} from '@material-ui/pickers';
import {MuiPickersUtilsProvider} from '@material-ui/pickers' ;
import DateFnsUtils from '@date-io/date-fns';

function Search() {
    const searchValue = useSelector((state) => state.meetings.searchValue);
    const dispatch = useDispatch();

    const reset = (e) => {

        searchValue.name = "";
        searchValue.date = null;
        dispatch(filterByValue(null));
        dispatch(filterByDate(null));
        
    }
    
    const filterByInput = (e) => {
        let input = e.target.value;
        searchValue.name = input;
        dispatch(filterByValue(input));
    }

    const filterByInputDate = (e) => {

        let input = new Date(e);
        searchValue.date = input;
        dispatch(filterByDate(input));
    }

    return (
        <div>
            <TextField 
                name="search" 
                variant="standard" 
                label="Search"
                size="small"
                value={searchValue.name}
                onChange={filterByInput}
            />
            
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    size="small"
                    name="date"
                    openTo="date"
                    format="dd/MM/yyyy"
                    label="Search Date"
                    value={searchValue.date}
                    views={["year", "month", "date"]}
                    onChange={filterByInputDate}
                />
            </MuiPickersUtilsProvider>

            <Button 
                variant="contained" 
                color="secondary" 
                size="small" 
                onClick={reset}
            >Reset</Button>
        </div>
    )
}

export default Search;
