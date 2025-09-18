import React, { useState } from 'react';

// SVG Icons
const PhoneIcon = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const MailIcon = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

const MapPinIcon = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const ContactPage = () => {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });
    const [formStatus, setFormStatus] = useState({ submitting: false, message: '' });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus({ submitting: true, message: '' });
        const formspreeUrl = 'https://formspree.io/f/mpwjgyqq'; 
        try {
            const response = await fetch(formspreeUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setFormStatus({ submitting: false, message: 'Thank you! Your message has been sent.' });
                setFormData({ firstName: '', lastName: '', email: '', message: '' });
            } else {
                throw new Error('Failed to send message.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setFormStatus({ submitting: false, message: 'Oops! Something went wrong. Please try again.' });
        }
    };

    const headerStyle = {
        background: '#1f2937',
        color: 'white',
        padding: '80px 0',
        textAlign: 'center'
    };

    const h1Style = {
        fontSize: '3rem',
        fontWeight: 'bold',
        marginBottom: '16px'
    };

    const headerPStyle = {
        fontSize: '1.125rem',
        color: '#d1d5db',
        marginTop: '16px'
    };

    const mainStyle = {
        padding: '64px 0',
        background: 'white'
    };

    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px'
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
        gap: '48px'
    };

    const cardStyle = {
        background: '#f9fafb',
        padding: '32px',
        borderRadius: '8px'
    };

    const cardTitleStyle = {
        fontSize: '1.875rem',
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: '24px'
    };

    const contactInfoStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '24px'
    };

    const iconStyle = {
        width: '32px',
        height: '32px',
        color: '#3b82f6'
    };

    const contactTextStyle = {
        fontSize: '1.25rem',
        fontWeight: '600',
        color: '#111827',
        marginBottom: '4px'
    };

    const contactLinkStyle = {
        fontSize: '1.125rem',
        color: '#4b5563',
        textDecoration: 'none'
    };

    const contactLinkHoverStyle = {
        color: '#3b82f6'
    };

    const mapStyle = {
        marginTop: '32px',
        borderRadius: '8px',
        overflow: 'hidden'
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column'
    };

    const formRowStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        marginBottom: '24px'
    };

    const inputGroupStyle = {
        display: 'flex',
        flexDirection: 'column'
    };

    const labelStyle = {
        fontSize: '1.125rem',
        fontWeight: '500',
        color: '#374151',
        marginBottom: '8px'
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        fontSize: '16px',
        outline: 'none',
        transition: 'border-color 0.2s'
    };

    const inputFocusStyle = {
        borderColor: '#3b82f6',
        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
    };

    const textareaStyle = {
        ...inputStyle,
        resize: 'vertical',
        minHeight: '120px'
    };

    const buttonStyle = {
        width: '100%',
        background: '#3b82f6',
        color: 'white',
        fontWeight: 'bold',
        padding: '12px 32px',
        borderRadius: '9999px',
        fontSize: '1.125rem',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    };

    const buttonHoverStyle = {
        background: '#2563eb'
    };

    const buttonDisabledStyle = {
        background: '#9ca3af',
        cursor: 'not-allowed'
    };

    const messageStyle = {
        marginTop: '16px',
        textAlign: 'center',
        fontSize: '1.125rem'
    };

    const successMessageStyle = {
        ...messageStyle,
        color: '#059669'
    };

    const errorMessageStyle = {
        ...messageStyle,
        color: '#dc2626'
    };

    return (
        <div style={{ animation: 'fadeInUp 0.5s ease-out' }}>
            <header style={headerStyle}>
                <h1 style={h1Style}>Get In Touch</h1>
                <p style={headerPStyle}>We'd love to hear from you. Whether you have a question about our services, partnerships, or anything else, our team is ready to answer all your questions.</p>
            </header>
            <main style={mainStyle}>
                <div style={containerStyle}>
                    <div style={gridStyle}>
                        <div style={cardStyle}>
                            <h2 style={cardTitleStyle}>Contact Information</h2>
                            <div>
                                <div style={contactInfoStyle}>
                                    <PhoneIcon style={iconStyle}/>
                                    <div>
                                        <h3 style={contactTextStyle}>Phone Number</h3>
                                        <a href="tel:9917991758" style={contactLinkStyle} onMouseOver={(e) => e.target.style.color = contactLinkHoverStyle.color} onMouseOut={(e) => e.target.style.color = contactLinkStyle.color}>9917991758</a>
                                    </div>
                                </div>
                                <div style={contactInfoStyle}>
                                    <MailIcon style={iconStyle}/>
                                    <div>
                                        <h3 style={contactTextStyle}>Email Address</h3>
                                        <a href="mailto:info@hotelroomsstay.com" style={contactLinkStyle} onMouseOver={(e) => e.target.style.color = contactLinkHoverStyle.color} onMouseOut={(e) => e.target.style.color = contactLinkStyle.color}>info@hotelroomsstay.com</a>
                                    </div>
                                </div>
                                <div style={contactInfoStyle}>
                                    <MapPinIcon style={iconStyle}/>
                                    <div>
                                        <h3 style={contactTextStyle}>Our Office</h3>
                                        <p style={{...contactLinkStyle, color: '#4b5563'}}>Surya Vihar Colony, Aligarh, Uttar Pradesh, 202001</p>
                                    </div>
                                </div>
                            </div>
                             <div style={mapStyle}>
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.782501377852!2d78.07949431505697!3d27.8778931826359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3974a5769d32306d%3A0x3b5f5f5f5f5f5f5f!2sSurya%20Vihar%20Colony%2C%20Aligarh%2C%20Uttar%20Pradesh%20202001!5e0!3m2!1sen!2sin!4v1678886400000!5m2!1sen!2sin" 
                                    width="100%" 
                                    height="250" 
                                    style={{ border: 0 }}
                                    allowFullScreen="" 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="HRS Office Location"
                                ></iframe>
                            </div>
                        </div>
                        <div style={cardStyle}>
                             <h2 style={cardTitleStyle}>Send us a Message</h2>
                             <form onSubmit={handleSubmit} style={formStyle}>
                                 <div style={formRowStyle}>
                                     <div style={inputGroupStyle}>
                                        <label htmlFor="firstName" style={labelStyle}>First Name</label>
                                        <input 
                                            type="text" 
                                            id="firstName" 
                                            name="firstName" 
                                            value={formData.firstName} 
                                            onChange={handleChange} 
                                            style={inputStyle}
                                            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                            required 
                                        />
                                     </div>
                                      <div style={inputGroupStyle}>
                                        <label htmlFor="lastName" style={labelStyle}>Last Name</label>
                                        <input 
                                            type="text" 
                                            id="lastName" 
                                            name="lastName" 
                                            value={formData.lastName} 
                                            onChange={handleChange} 
                                            style={inputStyle}
                                            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                            required 
                                        />
                                     </div>
                                 </div>
                                 <div style={{...inputGroupStyle, marginBottom: '24px'}}>
                                     <label htmlFor="email" style={labelStyle}>Email Address</label>
                                     <input 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        style={inputStyle}
                                        onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                        required 
                                    />
                                 </div>
                                  <div style={{...inputGroupStyle, marginBottom: '24px'}}>
                                     <label htmlFor="message" style={labelStyle}>Message</label>
                                     <textarea 
                                        id="message" 
                                        name="message" 
                                        value={formData.message} 
                                        onChange={handleChange} 
                                        style={textareaStyle}
                                        onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                        required
                                    ></textarea>
                                 </div>
                                 <button 
                                    type="submit" 
                                    disabled={formStatus.submitting} 
                                    style={{
                                        ...buttonStyle,
                                        ...(formStatus.submitting ? buttonDisabledStyle : {})
                                    }}
                                    onMouseOver={(e) => !formStatus.submitting && (e.target.style.background = buttonHoverStyle.background)}
                                    onMouseOut={(e) => !formStatus.submitting && (e.target.style.background = buttonStyle.background)}
                                >
                                     {formStatus.submitting ? 'Sending...' : 'Send Message'}
                                 </button>
                                 {formStatus.message && (
                                    <p style={formStatus.message.includes('Thank you') ? successMessageStyle : errorMessageStyle}>
                                        {formStatus.message}
                                    </p>
                                )}
                             </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ContactPage;