import React,{useState} from 'react';

function NewTransaction({createTransaction}){
    const [transaction,setTransaction]=useState(undefined);

    const updateTransaction=async (e,field)=>{
     // getting value from the form field
        const value=e.target.value;
        setTransaction({...transaction,[field]:value});
        console.log("**@ update transaction called for field ,",field)
    }

    const submit=async (e,transaction)=>{
     // prevent full page reload
     e.preventDefault();
     console.log("**@ the transaction being sent to createTransaction is , ",transaction);
     createTransaction(transaction);
    }

    return (
       
        <div className="jumbotron">
        <h1 className='text-center'>Send Transaction</h1>
        <form action="" onSubmit={e => submit(e,transaction)}>

        <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input type="text" id="amount" onChange={e=>updateTransaction(e,'amount')}  className='form-control' />
        </div>

        <div className="form-group">
        <label htmlFor="to">To</label>
       <input type="text" id="to" onChange={e=>updateTransaction(e,'to')} className='form-control' />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        
        </form>
        </div>
        
    )
};
export default NewTransaction;

// <div className='jumbotron'>
//         <h2>New Transaction</h2>
//         <form action="" onSubmit={(e)=>submit(e,transaction)}>

        
//         <div>
//         <h1>Hello world</h1>
//         </div>
//         <label htmlFor="amount">Amount</label>
//         <input type="text" id="amount" onChange={e=>updateTransaction(e,'amount')} />
//         <br></br>

//         <label htmlFor="to">To</label>
//         <input type="text" id="to" onChange={e=>updateTransaction(e,'to')}/>
//         <br></br>
//         <button type='submit'>Submit</button>
        
//         </form>
//         </div>