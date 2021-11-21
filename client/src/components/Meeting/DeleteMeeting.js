import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteMeeting } from '../../actions/meeting';
import { useDispatch } from 'react-redux';

function DeleteMeeting(props) {

    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteMeeting(props.currentId));
    }

    return (
        <div>
            <DeleteIcon onClick={handleDelete}/>
        </div>
    )
}

export default DeleteMeeting
