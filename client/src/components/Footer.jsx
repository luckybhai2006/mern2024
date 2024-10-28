// import React from 'react';

const styles = `
  .footer2 {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: black;
    padding: 10px;
    // height: 5rem;
  }

  .card {
  height:60px;
    width: 100%;
    margin: auto;
    background-image:url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbKJK-pxTCDTIiXIGlnDKS-QpnKBO0EbptFA&s");
    background-size: cover;
    background-repeat: no-repeat;
    font-weight: bold;
    background-color:grey;
  }
  .card-bodyy {
    text-align: center;
    margin-Top: 17px
  }
`;

const Footer = () => {
  return (
    <div>
      <style>{styles}</style>
      <div className="footer2">
        <div className="card">
          <div className="card-bodyy">
          @All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;