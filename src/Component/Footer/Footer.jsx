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
          <ul>
            <li><a href="/hotels-jaipur" class="no-underline text-black">Hotels in Jaipur</a></li>
            <li><a href="/hotels-agra" class="no-underline text-black">Hotels in Agra</a></li>
            <li><a href="/hotels-goa" class="no-underline text-black">Hotels in Goa</a></li>
            <li><a href="/hotels-mumbai" class="no-underline text-black">Hotels in Mumbai</a></li>
            <li><a href="/hotels-bengaluru" class="no-underline text-black">Hotels in Bengaluru</a></li>
            <li><a href="/hotels-hyderabad" class="no-underline text-black">Hotels in Hyderabad</a></li>
          </ul>
          <ul>
            <li><a href="/hotels-shimla" class="no-underline text-black">Hotels in Shimla</a></li>
            <li><a href="/hotels-chennai" class="no-underline text-black">Hotels in Chennai</a></li>
            <li><a href="/hotels-kolkata" class="no-underline text-black">Hotels in Kolkata</a></li>
            <li><a href="/hotels-udaipur" class="no-underline text-black">Hotels in Udaipur</a></li>
            <li><a href="/hotels-amritsar" class="no-underline text-black">Hotels in Amritsar</a></li>
            <li><a href="/hotels-manali" class="no-underline text-black">Hotels in Manali</a></li>
          </ul>
          <ul>
            <li><a href="/hotels-newdelhi" class="no-underline text-black">Hotels in New Delhi</a></li>
            <li><a href="/hotels-nainital" class="no-underline text-black">Hotels in Nainital</a></li>
            <li><a href="/hotels-mussoorie" class="no-underline text-black">Hotels in Mussoorie</a></li>
            <li><a href="/hotels-mysuru" class="no-underline text-black">Hotels in Mysuru</a></li>
            <li><a href="/hotels-srinagar" class="no-underline text-black">Hotels in Srinagar</a></li>
            <li><a href="/hotels-lonavala" class="no-underline text-black">Hotels in Lonavala</a></li>
          </ul>
          <ul>
            <li><a href="/hotels-rishikesh" class="no-underline text-black">Hotels in Rishikesh</a></li>
            <li><a href="/hotels-gangtok" class="no-underline text-black">Hotels in Gangtok</a></li>
            <li><a href="/hotels-kota" class="no-underline text-black">Hotels in Kota</a></li>
            <li><a href="/hotels-kochi" class="no-underline text-black">Hotels in Kochi</a></li>
            <li><a href="/hotels-jodhpur" class="no-underline text-black">Hotels in Jodhpur</a></li>
            <li><a href="/hotels-madurai" class="no-underline text-black">Hotels in Madurai</a></li>
          </ul>
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
