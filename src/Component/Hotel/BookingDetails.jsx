import React from 'react';
import styles from './BookingDetails.module.css';

const BookingDetails = ({price}) => {
  return (
    <>
    <div className='new-booking-details'>
      
      <div className={styles.main}>
      <h5>Booking Summary</h5>
        <div className={styles.details}>
          <p>
            <span className={styles.gray}>Rooms:</span> <span className={styles.spanprice}>{price}</span>
          </p>
          <p>
            <span className={styles.gray}>Extra Person:</span> <span className={styles.spanprice}>0</span>
          </p>
          <p>
            <span className={styles.gray}>Food Price:</span> <span className={styles.spanprice}>0</span>
          </p>
          <p>
            <span className={styles.gray}>Subtotal:</span> <span className={styles.spanprice}>300</span>
          </p>
          <p>
            <span className={styles.gray}>Final Price:</span> <span className={styles.spanprice}>3000</span>
          </p>
          
        </div>
      </div>
      
      </div>
      <div className={styles.btn_payment}><button className='payment-btn'>Make Payment</button></div>
    </>
  );
};

export default BookingDetails;
