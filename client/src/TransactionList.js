import React from 'react';

function TransactionList({transactions,approveTransaction}){

    return (
        <div>
        <h1 className='text-center'>Transaction List</h1>
        <table className='table table-striped table-bordered'>
      
        <thead className='thead-dark'>
        <tr>
        <th scope='col'>Id</th>
        <th scope='col'>Amount</th>
        <th scope='col'>To</th>
        <th scope='col'>Approvals</th>
        <th scope='col'>Approve</th>
        <th scope='col'>Sent</th>
        </tr>


        </thead>

        <tbody>
        { transactions.map(transaction=>(
            <tr key={transaction.id}>
            <td>{transaction.id}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.to}</td>
            <td>{transaction.approvals}
            </td>
            <td> 
             <button type="button" className="btn btn-success"  onClick={()=>{approveTransaction(transaction.id)}}>Approve</button>
            </td>
            <td>{transaction.sent?'True':'False'}</td>
            </tr>
        ))

        }
        </tbody>

        </table>
        </div>
    )
}

export default TransactionList;