import React from "react";
import Layout from "../components/Layout";

const AllData = () => {
  const usernames = [];
  for (var i = 0; i < localStorage.length; i++){
    if (localStorage.key(i) != 'currentUser') {
      var user = JSON.parse(localStorage.getItem(localStorage.key(i)));
      usernames.push(<p>Name : {user.name}</p>)
      usernames.push(<p>Email : {user.email}</p>)
      usernames.push(<p>Password : {user.password}</p>)
      usernames.push(<p>Balance : {user.balance}</p>)
      usernames.push(<br></br>)
    }
  }

  return (
    <Layout>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title text-center">All Data</h4>
                  { usernames }
                </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AllData