import React from "react";
import {Card} from "react-bootstrap";
function Balance() {
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [balance, setBalance] = React.useState(null);
  
    return (
      <Card>
<Card.Header>
  Balance
</Card.Header>
<Card.Body>
{
          show ? (
            <BalanceForm setShow={setShow} setBalance={setBalance} setStatus={setStatus} />
          ) : (
            <div>
              {balance !== null ? (
                <>
                  <h5>Account Balance:</h5>
                  <p>{balance}</p>
                </>
              ) : (
                <p>Cannot retrieve balance</p>
              )}
              <button type="submit" className="btn btn-light" onClick={() => setShow(true)}>
                Back
              </button>
            </div>
          )
        }
</Card.Body>


      </Card>
       
    
    );
  }
  
  function BalanceMsg(props) {
    return (
      <>
        <h5> account balance:</h5>
        <p>{props.balance}</p>
        <button type="submit" className="btn btn-light" onClick={() => props.setShow(true)}>
          Back
        </button>
      </>
    );
  }
  
  function BalanceForm(props) {
    const [email, setEmail] = React.useState('');
  
    async function handle() {
      if (email.trim() === '') {
        props.setStatus('Please enter an account name');
        return;
      }
  
      const url = `/account/balance/${email}`;
      const res = await fetch(url);
      const data = await res.json();
  
      if (res.status === 200) {
        props.setBalance(data.balance);
        props.setShow(false);
      } else {
        props.setStatus(`Error retrieving balance for ${email}`);
      }
    }
  
    return (
      <>
        Account Name<br />
        <input
          type="input"
          className="form-control"
          placeholder="Enter Account Name"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <br />
        {props.status && <p>{props.status}</p>}
        <button type="submit" className="btn btn-light" onClick={handle}>
          Show Balance
        </button>
      </>
    );
  }
  export default Balance;