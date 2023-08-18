import React, { useState } from "react";
import Layout from "../components/Layout";



const Logout = () => {
    localStorage.removeItem('token-info');
    //setIsLoggedin(false);

 
return (
    <Layout>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
               (
                
                  <>

                      <button
                        type="submit"ÃŸ
                        className="btn btn-primary"
                        
                      >
                        Logout
                      </button>
                      
                    
                  </>
                )
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
                      };

  export default Logout;