import react from react
const PoliciesPage = () => {
  const [activeTab, setActiveTab] = useState('customers');
// These are used across different page components
const BuildingIcon = ({ style }) => (<svg xmlns="http://www.w.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path><path d="M16 14h.01"></path></svg>);
const UsersIcon = ({ style }) => (<svg xmlns="http://www.w.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>);
const CarIcon = ({ style }) => (<svg xmlns="http://www.w.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1 .4-1 1v12c0 .6.4 1 1 1h3.5"/><circle cx="6.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="17.5" r="2.5"/><path d="M5 11h11"/></svg>);
const RouteIcon = ({ style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>);
const PhoneIcon = ({ style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>);
const MailIcon = ({ style }) => (<svg xmlns="http://www.w.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>);
const MapPinIcon = ({ style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>);
const FileTextIcon = ({ style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>);
const LockIcon = ({ style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>);
const GavelIcon = ({ style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="m14 13-8.5 8.5a2.12 2.12 0 1 1-3-3L11 10"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/></svg>);
const HeartIcon = ({ style }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>;
const HeartHandshakeIcon = ({ style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.82 2.94 0l.06-.06L12 11l2.96-2.96a2.17 2.17 0 0 0 0-3.08v0c-.82-.82-2.13-.82-2.94 0l-.06.06L12 5Z"/></svg>);
const OmIcon = ({ style }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M8 10h.01"/><path d="M8 14h.01"/><path d="M10.26 18.4a4.5 4.5 0 1 0 0-8.89"/><path d="M10.64 14.33c.57-2.47 2.66-4.33 5.1-4.33 2.8 0 5.06 2.29 4.8 5.09-.25 2.7-2.54 4.91-5.3 4.91-1.41 0-2.71-.56-3.66-1.51"/></svg>;
const SunIcon = ({ style }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>;
const MountainIcon = ({ style }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="m8 3 4 8 5-5 5 15H2L8 3z"></path></svg>;
const PalmtreeIcon = ({ style }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M13.5 9.5a4 4 0 1 0-4-4v10a4 4 0 0 0 4 4h.5a4 4 0 0 0 4-4v-1.5a1.5 1.5 0 0 0-3 0V15a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1.5a1.5 1.5 0 0 0-3 0V15a4 4 0 0 0 4 4h.5a4 4 0 0 0 4-4v-1.5a1.5 1.5 0 0 0-3 0V15a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1zM6 10.1V21a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-5.1"></path></svg>;
const FamilyIcon = ({ style }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M4 12h16M4 12a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M10 16h4M12 12v8"/></svg>;
const CastleIcon = ({ style }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M22 20v-9H2v9h20zM2 11V9l2-2 2 2v2M10 11V9l2-2 2 2v2M18 11V9l2-2 2 2v2M6 20v-4h2v4M14 20v-4h2v4"/></svg>;
const PawPrintIcon = ({ style }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><circle cx="11" cy="4" r="2"></circle><circle cx="18" cy="8" r="2"></circle><circle cx="20" cy="16" r="2"></circle><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-7 0V15a5 5 0 0 1 5-5z"></path></svg>;

  const tabContent = {
    customers: [
      {title: "Booking", text: "All bookings must be made via our official website/app."},
      {title: "Payments", text: "Customers agree to pay the full/advance amount as per partner policy."},
      {title: "Cancellations", text: "Refunds depend on the partner’s cancellation policy. HRS service/transaction charges are non-refundable."},
      {title: "Liability", text: "HRS is a facilitator. Responsibility for service quality lies with the partner."},
    ],
    hotels: [
      {title: "Accuracy", text: "Must provide accurate tariffs, amenities, photos & availability."},
      {title: "Standards", text: "Maintain cleanliness, safety & hygiene standards."},
      {title: "Commitment", text: "Honor all confirmed bookings received via HRS."},
    ],
    cabs: [
      {title: "Safety", text: "Provide licensed drivers, insured vehicles, and safe travel."},
      {title: "Professionalism", text: "Maintain proper behavior and punctuality."},
      {title: "Fairness", text: "No overcharging beyond agreed tariffs."},
    ],
    tours: [
      {title: "Clarity", text: "Provide clear itinerary, inclusions/exclusions, and pricing."},
      {title: "Compliance", text: "Ensure legal compliance (permits, insurance, safety measures)."},
      {title: "Reliability", text: "Honor all bookings without sudden changes."},
    ]
  };

  const policies = [
    { id: 'privacy', title: 'Privacy Policy', icon: <LockIcon style={{width: '2rem', height: '2rem', color: '#2dd4bf'}}/>, points: [
      {title: 'Data Collection', text: 'We collect customer name, contact, email, and booking details.'},
      {title: 'Usage', text: 'Information is used only for booking confirmation and customer support.'},
      {title: 'Data Sharing', text: 'Data is shared only with relevant partners for booking fulfillment.'},
    ]},
    { id: 'general', title: 'General Policies', icon: <GavelIcon style={{width: '2rem', height: '2rem', color: '#2dd4bf'}}/>, points: [
      {title: 'Fair Usage', text: 'Partners must not misrepresent their services.'},
      {title: 'Non-Discrimination', text: 'No refusal of service based on caste, religion, gender, or nationality.'},
      {title: 'Jurisdiction', text: 'All terms are governed under Indian law, with jurisdiction in Aligarh, UP courts.'},
    ]},
  ];

  const styles = {
    pageWrapper: { background: '#0a0a0a', color: '#f0f0f0', paddingBottom: '6rem' },
    header: { padding: '6rem 2rem', textAlign: 'center', background: '#111' },
    headerTitle: { fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: '800', lineHeight: 1.1, color: 'white' },
    headerSubtitle: { fontSize: 'clamp(1rem, 3vw, 1.125rem)', maxWidth: '600px', margin: '1rem auto 0', color: '#a7a7a7' },
    mainContent: { maxWidth: '1000px', margin: '4rem auto', padding: '0 2rem' },
    section: { marginBottom: '4rem' },
    sectionHeader: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' },
    sectionTitle: { fontSize: '2.5rem', fontWeight: 'bold' },
    tabContainer: { display: 'flex', gap: '0.5rem', borderBottom: '2px solid #333', marginBottom: '2rem' },
    tabButton: { padding: '1rem', background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', fontSize: '1rem', borderBottom: '3px solid transparent' },
    tabButtonActive: { color: '#2dd4bf', borderBottomColor: '#2dd4bf' },
    contentBox: { background: '#1a1a1a', padding: '2rem', borderRadius: '0.5rem' },
    policyGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' },
  };

  return(
    <div style={styles.pageWrapper}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Our Policies</h1>
        <p style={styles.headerSubtitle}>Clear guidelines for a trusted partnership.</p>
      </header>
      <main style={styles.mainContent}>
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <FileTextIcon style={{width: '2.5rem', height: '2.5rem', color: '#2dd4bf'}}/>
            <h2 style={styles.sectionTitle}>Terms & Conditions</h2>
          </div>
          <div style={styles.tabContainer}>
            <button style={activeTab === 'customers' ? {...styles.tabButton, ...styles.tabButtonActive} : styles.tabButton} onClick={() => setActiveTab('customers')}>For Customers</button>
            <button style={activeTab === 'hotels' ? {...styles.tabButton, ...styles.tabButtonActive} : styles.tabButton} onClick={() => setActiveTab('hotels')}>For Hotels</button>
            <button style={activeTab === 'cabs' ? {...styles.tabButton, ...styles.tabButtonActive} : styles.tabButton} onClick={() => setActiveTab('cabs')}>For Cabs</button>
            <button style={activeTab === 'tours' ? {...styles.tabButton, ...styles.tabButtonActive} : styles.tabButton} onClick={() => setActiveTab('tours')}>For Tours</button>
          </div>
          <div style={styles.contentBox}>
            <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              {tabContent[activeTab].map(item => (
                <li key={item.title}><strong>{item.title}:</strong> {item.text}</li>
              ))}
            </ul>
          </div>
        </section>

        <div style={styles.policyGrid} className="policy-grid-responsive">
          {policies.map(policy => (
            <section key={policy.id} style={styles.section}>
              <div style={styles.sectionHeader}>
                {policy.icon}
                <h2 style={{...styles.sectionTitle, fontSize: '2rem'}}>{policy.title}</h2>
              </div>
              <div style={styles.contentBox}>
                <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                  {policy.points.map(point => (
                     <li key={point.title}><strong>{point.title}:</strong> {point.text}</li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PoliciesPage