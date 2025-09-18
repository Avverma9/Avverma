import React from 'react';

// SVG Icons
const UsersIcon = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const HeartHandshakeIcon = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.82 2.94 0l.06-.06L12 11l2.96-2.96a2.17 2.17 0 0 0 0-3.08v0c-.82-.82-2.13-.82-2.94 0l-.06.06L12 5Z"/>
  </svg>
);

const AboutPage = () => {
    const headerStyle = {
        position: 'relative',
        height: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        overflow: 'hidden',
        '@media (min-width: 768px)': {
            height: '70vh'
        }
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: 10
    };

    const headerImageStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    };

    const headerContentStyle = {
        position: 'relative',
        zIndex: 20,
        padding: '16px',
        maxWidth: '1024px',
        margin: '0 auto'
    };

    const h1Style = {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        letterSpacing: '-0.025em',
        lineHeight: 1.1,
        marginBottom: '16px',
        animation: 'fadeInDown 0.6s ease-out',
        '@media (min-width: 768px)': {
            fontSize: '3.75rem'
        },
        '@media (min-width: 1024px)': {
            fontSize: '4.5rem'
        }
    };

    const headerPStyle = {
        fontSize: '1.125rem',
        maxWidth: '512px',
        margin: '0 auto',
        color: '#e5e7eb',
        animation: 'fadeInUp 0.6s ease-out',
        '@media (min-width: 768px)': {
            fontSize: '1.25rem'
        }
    };

    const mainStyle = {
        padding: 0
    };

    const sectionStyle = {
        padding: '64px 0',
        background: 'white',
        '@media (min-width: 768px)': {
            padding: '96px 0'
        }
    };

    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px'
    };

    const sectionHeaderStyle = {
        textAlign: 'center',
        marginBottom: '64px',
        maxWidth: '768px',
        margin: '0 auto 64px auto'
    };

    const sectionTitleStyle = {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#111827',
        '@media (min-width: 768px)': {
            fontSize: '3rem'
        }
    };

    const sectionTextStyle = {
        marginTop: '16px',
        fontSize: '1.25rem',
        color: '#4b5563',
        lineHeight: 1.75
    };

    const dividerStyle = {
        marginTop: '24px',
        width: '96px',
        height: '6px',
        background: '#3b82f6',
        margin: '24px auto 0',
        borderRadius: '9999px'
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '40px',
        '@media (min-width: 768px)': {
            gridTemplateColumns: '1fr 1fr'
        }
    };

    const cardStyle = {
        padding: '32px',
        borderRadius: '12px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        borderLeftWidth: '4px',
        borderLeftStyle: 'solid'
    };

    const customerCardStyle = {
        ...cardStyle,
        background: '#eff6ff',
        borderLeftColor: '#3b82f6'
    };

    const partnerCardStyle = {
        ...cardStyle,
        background: '#f0fdf4',
        borderLeftColor: '#10b981'
    };

    const cardHeaderStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '16px'
    };

    const cardIconStyle = {
        width: '48px',
        height: '48px'
    };

    const cardTitleStyle = {
        fontSize: '1.875rem',
        fontWeight: 'bold',
        color: '#1f2937'
    };

    const cardTextStyle = {
        fontSize: '1.125rem',
        color: '#374151'
    };

    const founderSectionStyle = {
        padding: '64px 0',
        background: '#f9fafb',
        '@media (min-width: 768px)': {
            padding: '96px 0'
        }
    };

    const founderContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '48px',
        background: 'linear-gradient(to right, #1f2937, #111827)',
        color: 'white',
        borderRadius: '8px',
        padding: '32px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '@media (min-width: 1024px)': {
            flexDirection: 'row',
            padding: '48px'
        }
    };

    const founderImageContainerStyle = {
        width: '100%',
        flexShrink: 0,
        '@media (min-width: 1024px)': {
            width: '33.333333%'
        }
    };

    const founderImageStyle = {
        borderRadius: '50%',
        width: '256px',
        height: '256px',
        margin: '0 auto',
        objectFit: 'cover',
        border: '8px solid #374151',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '@media (min-width: 768px)': {
            width: '320px',
            height: '320px'
        }
    };

    const founderContentStyle = {
        width: '100%',
        textAlign: 'center',
        '@media (min-width: 1024px)': {
            width: '66.666667%',
            textAlign: 'left'
        }
    };

    const founderTitleStyle = {
        fontSize: '1.875rem',
        fontWeight: 'bold',
        marginBottom: '16px',
        '@media (min-width: 768px)': {
            fontSize: '2.25rem'
        }
    };

    const founderQuoteStyle = {
        fontSize: '1.25rem',
        color: '#d1d5db',
        fontStyle: 'italic',
        marginBottom: '24px',
        lineHeight: 1.75
    };

    const founderNameStyle = {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: 'white'
    };

    const founderTitleTextStyle = {
        fontSize: '1rem',
        color: '#93c5fd',
        fontWeight: '600'
    };

    return (
        <>
            <header style={headerStyle}>
                <div style={overlayStyle}></div>
                <img 
                    src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop" 
                    alt="A serene travel destination with a pool and palm trees" 
                    style={headerImageStyle} 
                />
                <div style={headerContentStyle}>
                    <h1 style={h1Style}>Your Journey, Our Platform.</h1>
                    <p style={headerPStyle}>Welcome to Hotel Room Stay (HRS), your trusted Online Travel Agency (OTA).</p>
                </div>
            </header>
            <main style={mainStyle}>
                <section style={sectionStyle}>
                    <div style={containerStyle}>
                        <div style={sectionHeaderStyle}>
                            <h2 style={sectionTitleStyle}>Our Role as an OTA Platform</h2>
                            <p style={sectionTextStyle}>
                                We are not a hotel, cab company, or tour operator. Instead, HRS works as an <strong>Online Travel Agency (OTA)</strong> platform, acting as a bridge of trust between you and our verified partners in the hospitality and travel industry.
                            </p>
                            <div style={dividerStyle}></div>
                        </div>
                        <div style={gridStyle}>
                            <div style={customerCardStyle}>
                                <div style={cardHeaderStyle}>
                                    <UsersIcon style={{...cardIconStyle, color: '#3b82f6'}}/>
                                    <h3 style={cardTitleStyle}>For Customers</h3>
                                </div>
                                <p style={cardTextStyle}>
                                    Our vision is to provide a reliable booking experience, transparent pricing, and completely hassle-free travel, ensuring you make memories, not worries.
                                </p>
                            </div>
                            <div style={partnerCardStyle}>
                                <div style={cardHeaderStyle}>
                                    <HeartHandshakeIcon style={{...cardIconStyle, color: '#10b981'}}/>
                                    <h3 style={cardTitleStyle}>For Partners</h3>
                                </div>
                                <p style={cardTextStyle}>
                                    We offer a powerful digital platform for hotels, cab services, and tour operators to showcase their services, receive bookings, and grow their business with fair commission.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section style={founderSectionStyle}>
                    <div style={containerStyle}>
                        <div style={founderContainerStyle}>
                            <div style={founderImageContainerStyle}>
                                <img 
                                    src="https://placehold.co/400x400/E2E8F0/4A5568?text=Naveen+K" 
                                    alt="Naveen Kumar, Co-Founder of HRS" 
                                    style={founderImageStyle}
                                />
                            </div>
                            <div style={founderContentStyle}>
                                <h2 style={founderTitleStyle}>A Message From Our Founder</h2>
                                <p style={founderQuoteStyle}>
                                    "As a traveler myself, I know how much trust matters. That's why we built HRS—it's not just a platform, but a promise. A promise of a great experience, whether you are our guest or our partner. Our roots are deep in hospitality, but our thinking is new. We use technology to connect people, and with every booking, we're delivering not just a room, but a happy memory."
                                </p>
                                <h3 style={founderNameStyle}>Naveen Kumar</h3>
                                <p style={founderTitleTextStyle}>Co-Founder, HRS</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default AboutPage;