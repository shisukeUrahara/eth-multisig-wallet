import React from 'react';

function Header ({approvers,quorum}){
    console.log("**@ approvers are , ",approvers);
    return (
        <div>
        <ul>
            <li><ul className='list-group'><strong>Approvers</strong> </ul>
            {approvers.map(approver=>(
                <li className='list-group-item'>{approver}</li>
            ))}
            </li>
            <li><strong>Quorum :- {quorum} </strong> </li>
        </ul>
        </div>
    )
};

export default Header;