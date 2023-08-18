import React from "react";
import logo from "./bank.png";
import Layout from "../components/Layout";


const Home = () => {
  localStorage.clear()
  return (
    <Layout>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body text-center">
                <h4 className="card-header">Welcome to Quinn's Bad Bank!</h4>
                <div className="card-body">
                  <h6 className="card-text">You can navigate using the navigation bar above!</h6>
                </div>
                <img src={logo} className="card-img-top img-center" alt="" style={{ width: "18rem" }} />
                <div>
                  <p className="card-text">MITxPro exercise</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;