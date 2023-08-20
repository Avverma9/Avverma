import React from 'react';
import styles from './BookingDetails.module.css';

const BookingDetails = ({price}) => {
  return (
    <>
      <h5>Booking Summary</h5>
      <div className={styles.main}>
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
          <button>Make Payment</button>
        </div>
      </div>
    </>
  );
};

export default BookingDetails;
