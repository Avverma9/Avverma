import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDefaultCoupon } from '../../redux/reducers/profileSlice';

export default function Coupon() {
    const dispatch = useDispatch();
    const location = window.location;
    const coupon = useSelector((state) => state.profile.coupon);
    const [daysRemaining, setDaysRemaining] = useState([]);
    const [copiedCode, setCopiedCode] = useState(null);
    if (location.pathname !== '/coupons') return null;
    useEffect(() => {
        dispatch(fetchDefaultCoupon()).unwrap();
    }, [dispatch]);

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

    if (location.pathname !== '/coupons') return null;

    return (
        <div style={styles.wrapper}>
            <h2 style={styles.heading}>🎟️ Coupons Just for You</h2>
            <div style={styles.list}>
                {coupon?.map((item, index) => (
                    <div key={index} style={styles.card}>
                        <div style={styles.left}>
                            <div style={styles.code}>{item.couponCode}</div>
                            <div style={styles.name}>{item.couponName}</div>
                            <div style={styles.statusTag}>
                                {item.expired
                                    ? (new Date(item.validity) < new Date()
                                        ? 'Expired'
                                        : 'Already Used')
                                    : `Expires in ${daysRemaining[index]} day${daysRemaining[index] !== 1 ? 's' : ''}`}
                            </div>
                        </div>
                        <div style={styles.right}>
                            <div style={styles.discount}>₹{item.discountPrice} OFF</div>
                            <button
                                onClick={() => copyToClipboard(item.couponCode)}
                                style={styles.copyBtn}
                            >
                                {copiedCode === item.couponCode ? '✓ Copied' : 'Copy'}
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
        maxWidth: '600px',
        margin: '2rem auto',
        padding: '0 1rem',
        fontFamily: `'Segoe UI', sans-serif`,
    },
    heading: {
        fontSize: '1.5rem',
        fontWeight: 600,
        textAlign: 'center',
        marginBottom: '1.5rem',
        color: '#333',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    card: {
        backgroundColor: '#fff',
        border: '1px dashed #d1d5db',
        borderRadius: '8px',
        padding: '0.8rem 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.03)',
    },
    left: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.2rem',
        maxWidth: '65%',
    },
    code: {
        fontWeight: 700,
        fontSize: '1rem',
        color: '#1d4ed8',
    },
    name: {
        fontSize: '0.9rem',
        color: '#374151',
    },
    validity: {
        fontSize: '0.75rem',
        color: '#6b7280',
    },
    right: {
        textAlign: 'right',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
        alignItems: 'flex-end',
    },
    discount: {
        fontWeight: 700,
        fontSize: '0.95rem',
        color: '#10b981',
    },
    copyBtn: {
        backgroundColor: '#3b82f6',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '0.3rem 0.6rem',
        fontSize: '0.75rem',
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
    statusTag: {
        backgroundColor: '#f87171', // Tailwind's red-400
        color: '#fff',
        padding: '2px 6px',
        borderRadius: '4px',
        fontSize: '0.75rem',
        fontWeight: 600,
        display: 'inline-block',
        width: 'fit-content',
    },
};
