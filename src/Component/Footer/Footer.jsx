import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBCol,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";

const Footer = () => {

  return (
    <MDBFooter className="text-center" color="white" bgColor="dark">
      <MDBContainer className="p-4">
        <section className="mb-4">
          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="facebook-f" />
          </MDBBtn>

          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="twitter" />
          </MDBBtn>

          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="google" />
          </MDBBtn>

          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="instagram" />
          </MDBBtn>

          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="linkedin-in" />
          </MDBBtn>
        </section>

        <section className="mb-4">
          <p>
            Welcome to [Company Name], where we believe that your vacations
            deserve the best of everything. As a leading provider of hotel
            accommodations, we are dedicated to delivering exceptional
            experiences that exceed your expectations.
          </p>
        </section>

        <section className="">
          <MDBRow>
            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <h5 className="text-uppercase">Company</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a href="/about-us" class="text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact-us" class="text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/help" class="text-white">
                    Help
                  </a>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <h5 className="text-uppercase">Hotels</h5>

              <ul className="list-unstyled mb-0">
                <li className="citylist-name">
                  <a href="/cities/jaipur" class="text-white">
                    Hotels in Jaipur
                  </a>
                </li>
                <li className="citylist-name">
                  <a href="/cities/agra" class="text-white">
                    Hotels in Agra
                  </a>
                </li>
                <li className="citylist-name">
                  <a href="/cities/kota" class="text-white">
                    Hotels in Kota
                  </a>
                </li>
                <li className="citylist-name">
                  <a href="/cities/mumbai" class="text-white">
                    Hotels in Mumbai
                  </a>
                </li>
                <li className="citylist-name">
                  <a href="/cities/jodhpur" class="text-white">
                    Hotels in Jodhpur
                  </a>
                </li>
                <li className="citylist-name">
                  <a href="/cities/Ahmedabad" class="text-white">
                    Hotels in Ahmedabad
                  </a>
                </li>
              </ul>
            
            </MDBCol>

            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
             

              <ul className="list-unstyled mb-0">
              <li className='citylist-name'><a href="/cities/patna" class="text-white">Hotels in Patna</a></li>
            <li className='citylist-name'><a href="/cities/vadodara" class="text-white">Hotels in Vadodara</a></li>
            <li className='citylist-name'><a href="/cities/surat" class="text-white">Hotels in Surat</a></li>
            <li className='citylist-name'><a href="/cities/ratlam" class="text-white">Hotels in Ratlam</a></li>
            <li className='citylist-name'><a href="/cities/gwalior" class="text-white">Hotels in Gwalior</a></li>
            <li className='citylist-name'><a href="/cities/rishikesh" class="text-white">Hotels in Rishikesh</a></li>
            <li className='citylist-name'><a href="/cities/nainital" class="text-white">Hotels in Nainital</a></li>
            <li className='citylist-name'><a href="/cities/mussoorie" class="text-white">Hotels in Mussoorie</a></li>
            <Dropdown>
  

      <Dropdown.Menu>
        <Dropdown.Item href="/cities/dehradun">Hotels in Dehradun</Dropdown.Item>
        <Dropdown.Item href="/cities/haridwar">Hotels in Haridwar</Dropdown.Item>
       
        <Dropdown.Item href="/cities/jamnagar">Hotels in Jamnagar</Dropdown.Item>
        <Dropdown.Item href="/cities/bhopal">Hotels in Bhopal</Dropdown.Item> <Dropdown.Item href="/cities/jamnagar">Something else</Dropdown.Item>
        <Dropdown.Item href="/cities/noida">Hotels in Noida</Dropdown.Item>
        <Dropdown.Item href="/cities/lucknow">Hotels in Lucknow</Dropdown.Item>
        <Dropdown.Item href="/cities/jabalpur">Hotels in Jabalpur</Dropdown.Item>
        <Dropdown.Item href="/cities/indore">Hotels in Indore</Dropdown.Item>
       
        <Dropdown.Item href="/cities/nalanda" >Hotels in Nalanda</Dropdown.Item> <Dropdown.Item href="/cities/nalanda" >Something else</Dropdown.Item>
        <Dropdown.Item  href="/cities/gaya" >Hotels in Gaya</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
              </ul>
            </MDBCol>

            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <h5 className="text-uppercase">Services</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" className="text-white">
                    Hotel & Rooms
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Locations & Tour
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Link 3
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Link 4
                  </a>
                </li>
              </ul>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        Copyright © Shivila Technologies Private Limited, 2023<br />
         <a className="text-white" href="https://mdbootstrap.com/">
      All Rights Reserved, Developed By Shivila Technologies Pvt Ltd.

        </a>
      </div>
    </MDBFooter>
  );
};
export default Footer;
