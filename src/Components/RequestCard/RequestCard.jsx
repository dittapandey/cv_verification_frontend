import { MoreVert } from '@mui/icons-material';
import { useState } from 'react';
import './RequestCard.css';
import { full } from '../../Assets/FullForm';

const RequestCard = () => {
    return ( 
        <div className="card ">
            <p><b>Alpha T (20000001)</b> Requested for a Project Approval</p>
            <button>View Request</button>
        </div>
    );
}
 
export default RequestCard;