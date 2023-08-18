import React, { useState, useEffect} from "react";
import Layout from "../components/Layout";
import { baseURL } from "../App";

const Withdraw = () => {
  const [user, setUser] = useState(null);
  useEffect(()=>{
    const usefromStorage = localStorage.getItem("Logged in User");
    if(usefromStorage){
      setUser(JSON.parse(usefromStorage))
    }
      },[])
  if(localStorage.getItem("currentUser") === null) {
    return (
      <div className="container">
        <h2 className="text-center mt-5 mb-3">Error: Please create an account before trying to make a withdrawal.</h2>
      </div>
    )
  }
  else {
    /* eslint-disable */
    var currentUser = localStorage.getItem("currentUser");
    //var user = JSON.parse(localStorage.getItem(currentUser));
    const [withdrawAmount, setWithdrawAmount] = useState("");
   // var [displayedBalance, setBalance] = useState(user.balance);
    //var balance = user.balance
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    /* eslint-enable */

    const handleWithdraw = async () => {
      if (withdrawAmount === "") {
        setErrorMessage("Please enter a withdrawal amount.");
      } else if (isNaN(withdrawAmount)) {
        setErrorMessage("Please enter a valid number.");
      } else if (parseFloat(withdrawAmount) > user.balance) {
        setErrorMessage("Withdrawal amount exceeds account balance.");
      } else {
        // Process withdrawal
        //const newBalance = balance - parseFloat(withdrawAmount);
        const newBalance = user.balance - parseFloat(withdrawAmount);
        // setBalance(newBalance);
         //balance = newBalance;
         var name = user.name
         var email = user.email
         var password = user.password
         const userResponse = await fetch(`${baseURL}/account/update/${email}/${newBalance}`);
         const userData = await userResponse.json()
         console.log("Withdraw Response", userData);
         setUser(userData);
        //setBalance(newBalance);
        //balance = newBalance;
        // var name = user.name
        // var email = user.email
        // var password = user.password
        localStorage.setItem(currentUser, JSON.stringify({name, email, password, balance:user.balance}));
        setSuccessMessage(`Withdrawal of $${withdrawAmount} processed successfully.`);
        setWithdrawAmount("");
        setErrorMessage("");
        localStorage.setItem('Logged in User', JSON.stringify(userData));
      }
    };

    return (
      <Layout>
         {user && (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title text-center">Withdraw Form</h4>
                  {successMessage && (
                    <div className="alert alert-success" role="alert">
                      {successMessage}
                    </div>
                  )}
                  {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  )}
                  <div className="form-group">
                    <label htmlFor="balance">Balance</label>
                    <input
                      type="text"
                      className="form-control"
                      id="balance"
                      value={`$${user.balance}`}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="withdrawAmount">Withdraw Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      id="withdrawAmount"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleWithdraw}
                    disabled={!withdrawAmount}
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
         )};
      </Layout>
    );
  };
};

export default Withdraw;