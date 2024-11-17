import { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import React from "react";
import '../styles/footer.css'
import $ from "jquery";
import swal from "sweetalert";

export const Contact = (props) => {
  useEffect(() => {
    const name = document.querySelector("#name");
    const emailAdress = document.querySelector("#email");
    const text = document.querySelector("#textArea");
    const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    const handleClick = () => {
      if (name.value === "" || /\d/.test(name.value)) {
        swal("Error !", "Please enter a valid name !", "error");
        return;
      } else if (emailAdress.value === "" || !emailPattern.test(emailAdress.value)) {
        swal("Error !", "Please enter a valid email !", "error");
        return;
      } else if (text.value === "") {
        swal("Error !", "Please enter a valid message !", "error");
        return;
      } else {
        setTimeout(() => {
          $("#lnch").addClass("launching").text("Sending");
          $("#lnch_btn").addClass("launching");
        }, 0);
        setTimeout(() => {
          $("#lnch").addClass("launched").text("SENT");
          $("#lnch_btn").addClass("launched");
        }, 1400);
        setTimeout(() => {
          document.querySelector('form').submit();
        }, 2200);
      }
    };

    $("#lnch").on("click", handleClick);

    // Cleanup function to remove event listener
    return () => {
      $("#lnch").off("click", handleClick);
    };
  }, []);

  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0 form-comtainer">
            <div className="form-style-6">
              <div className="form-header">
                <h2 className="display">Contact Us</h2>
              </div>
              <form action="https://formcarry.com/s/Ppn9dGWH5lo" method="POST" acceptCharset="UTF-8">
                <input id="name" type="text" name="name" placeholder="Nama" required />
                <input id="email" type="email" name="email" placeholder="Alamat email" required />
                <textarea id="textArea" name="message" placeholder="Ketikkan Pesan" required></textarea>
                <div id="main">
                  <button className="btn-kirim" id="lnch" type="button" value="Send">Submit</button>
                  <div id="lnch_btn"><i className="fas fa-space-shuttle"></i></div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className="contact-item">
              <h3>Contact Info</h3>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-phone"></i> Phone
                </span>{" "}
                {props.data ? props.data.phone : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope-o"></i> Email
                </span>{" "}
                {props.data ? props.data.email : "loading"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id="footer">
          <div>
            <svg
              className="waves"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 24 150 28"
              preserveAspectRatio="none"
              shapeRendering="auto"
            >
              <defs>
                <path
                  id="gentle-wave"
                  d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                />
              </defs>
              <g className="parallax">
                <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(0,0,0,0.7)" />
                <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(0,0,0,0.5)" />
                <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(0,0,0,0.3)" />
                <use xlinkHref="#gentle-wave" x="48" y="7" fill="#000" />
              </g>
            </svg>
          </div>
        </div>
        <div className="content flex">
          <p>© 2025 Mangcoding The Debuggers. All right reserved.</p>
        </div>
    </div>
  );
};
