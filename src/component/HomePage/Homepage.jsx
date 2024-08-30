import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Homepage.css';
import Pic1 from '../../assets/pic1.png';
import Pic2 from '../../assets/pic2.png';
import Pic3 from '../../assets/pic3.png';

export const Homepage = () => {
  return (
    <div>
      {/* Products Section */}
      <div className="container my-5">
        <h2 className="text-center mb-4">Available Products</h2>
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card">
              <img src={Pic1} className="card-img-top" alt="Product 1" />
              <div className="card-body">
                <h5 className="card-title">Product 1</h5>
                <p className="card-text">$49.99</p>
                <a href="#" className="btn btn-primary">Add to Cart</a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card">
              <img src={Pic2} className="card-img-top" alt="Product 2" />
              <div className="card-body">
                <h5 className="card-title">Product 2</h5>
                <p className="card-text">$59.99</p>
                <a href="#" className="btn btn-primary">Add to Cart</a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card">
              <img src={Pic3} className="card-img-top" alt="Product 3" />
              <div className="card-body">
                <h5 className="card-title">Product 3</h5>
                <p className="card-text">$69.99</p>
                <a href="#" className="btn btn-primary">Add to Cart</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
