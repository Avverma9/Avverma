import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchDefaultCoupon } from '../../redux/reducers/profileSlice';
import { useLoader } from '../../utils/loader';

export default function CouponPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const coupon = useSelector((state) => state.profile.coupon);
  const [daysRemaining, setDaysRemaining] = useState([]);
  const [copiedCode, setCopiedCode] = useState(null);
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    showLoader();
    dispatch(fetchDefaultCoupon())
      .unwrap()
      .finally(() => {
        hideLoader();
      });
  }, [dispatch, showLoader, hideLoader]);

  useEffect(() => {
    if (coupon?.length) {
      const countdowns = coupon.map(item => {
        const expirationDate = new Date(item.validity);
        const now = new Date();
        const diffTime = expirationDate - now;
        const diffDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
        return diffDays;
      });
      setDaysRemaining(countdowns);
    }
  }, [coupon]);

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1500);
  };

  if (!coupon || coupon.length === 0) {
    return (
      <div style={styles.noCouponContainer}>
        <div style={styles.noCouponIcon}>
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
            <path d="M15 12h-3V9"/>
            <path d="M12 18v-2"/>
            <path d="M12 8V6"/>
            <path d="M18 12h-2"/>
            <path d="M8 12h-2"/>
          </svg>
        </div>
        <h3 style={styles.noCouponText}>No Coupons Available</h3>
        <p style={styles.noCouponSubtext}>Check back later for new deals and special offers!</p>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>Coupons Just For You</h2>
      <div style={styles.list}>
        {coupon.map((item, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.left}>
              <div style={styles.discount}>₹{item.discountPrice} OFF</div>
              <div style={styles.name}>{item.couponName}</div>
              <div
                style={{
                  ...styles.statusTag,
                  backgroundColor: item.expired || new Date(item.validity) < new Date() ? '#fca5a5' : '#86efac',
                  color: item.expired || new Date(item.validity) < new Date() ? '#991b1b' : '#166534',
                }}
              >
                {item.expired || new Date(item.validity) < new Date()
                  ? 'Expired'
                  : `Expires in ${daysRemaining[index]} day${daysRemaining[index] !== 1 ? 's' : ''}`}
              </div>
            </div>
            <div style={styles.right}>
              <div style={styles.code}>{item.couponCode}</div>
              <button
                onClick={() => copyToClipboard(item.couponCode)}
                style={styles.copyBtn}
              >
                {copiedCode === item.couponCode ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: '550px',
    margin: '1.5rem auto',
    padding: '0 1rem',
    fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
  },
  heading: {
    fontSize: '1.4rem',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: '1.25rem',
    color: '#2d3748',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
        transform: 'translateY(-2px)',
    },
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
    maxWidth: '60%',
  },
  right: {
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
    alignItems: 'flex-end',
  },
  discount: {
    fontWeight: 800,
    fontSize: '1.1rem',
    color: '#4f46e5',
  },
  name: {
    fontSize: '0.85rem',
    color: '#4a5568',
    fontWeight: 500,
  },
  code: {
    fontWeight: 700,
    fontSize: '0.9rem',
    color: '#1d4ed8',
    letterSpacing: '0.025em',
    backgroundColor: '#eff6ff',
    padding: '0.3rem 0.6rem',
    borderRadius: '5px',
    border: '1px solid #dbeafe',
  },
  statusTag: {
    padding: '2px 6px',
    borderRadius: '9999px',
    fontSize: '0.7rem',
    fontWeight: 600,
    width: 'fit-content',
    marginTop: '0.3rem',
  },
  copyBtn: {
    backgroundColor: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '0.5rem 0.9rem',
    fontSize: '0.8rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    '&:hover': {
        backgroundColor: '#4338ca',
    },
    '&:active': {
        transform: 'translateY(1px)',
    }
  },
  noCouponContainer: {
    maxWidth: '550px',
    margin: '1.5rem auto',
    padding: '1.25rem',
    textAlign: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: '10px',
    border: '2px dashed #e2e8f0',
  },
  noCouponIcon: {
    color: '#94a3b8',
    marginBottom: '0.6rem',
  },
  noCouponText: {
    fontSize: '1.2rem',
    fontWeight: 700,
    color: '#475569',
    marginBottom: '0.4rem',
  },
  noCouponSubtext: {
    fontSize: '0.85rem',
    color: '#64748b',
  },
};