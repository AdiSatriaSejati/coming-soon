import React from "react";

export const Header = (props) => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
              <p className="first">Designing with us</p>
                <h1>
                  <span>THE BELOVED DESIGN </span>
                  <br />
                  <span>COMPANY IN THE DEBUGGERS</span>
                </h1>
                <p className="two">With us achieving dreams in building your productss, together say “ Yes “ to extraordinary designs</p>
                <a
                  href="#about"
                  className="btn btn-custom btn-lg page-scroll"
                >
                  Learn More
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
