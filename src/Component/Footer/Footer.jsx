import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import styles from './footer.module.css';

function Footer() {
  return (
    <footer>
      <div className={styles.footerContainer}>
        <div className={styles.footerSection}>
          <h3>Company</h3>
          <ul>
            <li><a href="/about-us" class="no-underline text-black">About Us</a></li>
            <li><a href="/contact-us" class="no-underline text-black">Contact Us</a></li>
            <li><a href="/help" class="no-underline text-black">Help</a></li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h3>Services</h3>
          <div className='footer-compo'>
          <ul className='li-space'>
            <li><a href="/cities/jaipur" class="no-underline text-black">Hotels in Jaipur</a></li>
            <li><a href="/cities/agra" class="no-underline text-black">Hotels in Agra</a></li>
            <li><a href="/cities/kota" class="no-underline text-black">Hotels in Kota</a></li>
            <li><a href="/cities/mumbai" class="no-underline text-black">Hotels in Mumbai</a></li>
            <li><a href="/cities/jodhpur" class="no-underline text-black">Hotels in Jodhpur</a></li>
            <li><a href="/cities/Ahmedabad" class="no-underline text-black">Hotels in Ahmedabad</a></li>
          </ul>
          <ul>
            <li><a href="/cities/dehradun" class="no-underline text-black">Hotels in Dehradun</a></li>
            <li><a href="/cities/patna" class="no-underline text-black">Hotels in Patna</a></li>
            <li><a href="/cities/vadodara" class="no-underline text-black">Hotels in Vadodara</a></li>
            <li><a href="/cities/surat" class="no-underline text-black">Hotels in Surat</a></li>
            <li><a href="/cities/ratlam" class="no-underline text-black">Hotels in Ratlam</a></li>
            <li><a href="/cities/gwalior" class="no-underline text-black">Hotels in Gwalior</a></li>
          </ul>
          <ul>
            <li><a href="/cities/rishikesh" class="no-underline text-black">Hotels in Rishikesh</a></li>
            <li><a href="/cities/nainital" class="no-underline text-black">Hotels in Nainital</a></li>
            <li><a href="/cities/mussoorie" class="no-underline text-black">Hotels in Mussoorie</a></li>
            <li><a href="/cities/haridwar" class="no-underline text-black">Hotels in Haridwar</a></li>
            <li><a href="/cities/jamnagar" class="no-underline text-black">Hotels in Jamnagar</a></li>
            <li><a href="/cities/bhopal" class="no-underline text-black">Hotels in Bhopal</a></li>
          </ul>
          <ul>
            <li><a href="/cities/noida" class="no-underline text-black">Hotels in Noida</a></li>
            <li><a href="/cities/lucknow" class="no-underline text-black">Hotels in Lucknow</a></li>
            <li><a href="/cities/jabalpur" class="no-underline text-black">Hotels in Jabalpur</a></li>
            <li><a href="/cities/indore" class="no-underline text-black">Hotels in Indore</a></li>
            <li><a href="/cities/nalanda" class="no-underline text-black">Hotels in Nalanda</a></li>
            <li><a href="/cities/gaya" class="no-underline text-black">Hotels in Gaya</a></li>
          </ul>
          </div>
        </div>
        <div className={styles.footerSection}>
          <h3>Follow Us</h3>
          <ul className={styles.socialIcons}>
            <li>
              <a href="https://www.facebook.com/yourcompany" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/yourcompany" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/yourcompany" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/yourcompany" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
