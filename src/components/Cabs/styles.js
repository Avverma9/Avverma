export const styles =`
:root {
    --primary-color: #4f46e5; 
    --primary-hover: #4338ca; 
    --text-dark: #111827;
    --text-light: #4b5563; 
    --bg-light: #f9fafb; 
    --bg-white: #ffffff;
    --border-color: #e5e7eb; 
    --card-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.07);
    --card-hover-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

* { 
    box-sizing: border-box; 
    margin: 0; 
    padding: 0; 
}

body { 
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
    background-color: var(--bg-light); 
    color: var(--text-dark); 
    -webkit-font-smoothing: antialiased; 
    -moz-osx-font-smoothing: grayscale; 
}

#app-container { 
    display: flex; 
    flex-direction: column; 
    min-height: 100vh; 
}

.app-header { 
    background-color: var(--bg-white); 
    border-bottom: 1px solid var(--border-color); 
    padding: 1rem 1.5rem; 
    display:flex; 
    align-items:center; 
    justify-content: space-between; 
    gap: 1.5rem; 
}

.logo-container { 
    display: flex; 
    align-items: center; 
    gap: 0.75rem; 
    font-weight: 600; 
    font-size: 1.25rem; 
    color: var(--primary-color); 
}

.desktop-search-trigger { 
    display: flex; 
    align-items: center; 
    justify-content: space-between; 
    gap: 1rem; 
    background-color: var(--bg-light); 
    padding: 0.75rem 1rem; 
    border-radius: 999px; 
    cursor: pointer; 
    border: 1px solid var(--border-color); 
    width: 100%; 
    max-width: 400px; 
    transition: box-shadow 0.2s; 
}
.desktop-search-trigger:hover { 
    box-shadow: var(--card-shadow); 
}
.desktop-search-trigger span { 
    color: var(--text-light); 
    text-overflow: ellipsis; 
    white-space: nowrap; 
    overflow: hidden; 
    font-size: 0.9rem; 
    font-weight: 500; 
    flex-grow: 1; 
}

.cabs-page-container { 
    display: grid; 
    max-width: 1400px; 
    margin: 0 auto; 
    padding: 1.5rem; 
    gap: 2rem; 
    width: 100%; 
    grid-template-columns: 300px 1fr; 
    align-items: flex-start; 
}
.main-content { 
    flex-grow: 1; 
    width: 100%; 
}

.mobile-search-trigger { 
    display: none; 
}

.results-header { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    margin-bottom: 1.5rem; 
    padding: 0 0.5rem; 
}
.results-count { 
    font-weight: 500; 
    color: var(--text-light); 
}
.sort-select { 
    padding: 0.5rem 0.75rem; 
    border-radius: 8px; 
    border: 1px solid var(--border-color); 
    font-size: 0.9rem; 
    background-color: var(--bg-white); 
}

.cab-list { 
    display: grid; 
    grid-template-columns: 1fr; 
    gap: 1.5rem; 
}
.cab-card { 
    background-color: var(--bg-white); 
    border-radius: 16px; 
    overflow: hidden; 
    box-shadow: var(--card-shadow); 
    transition: transform 0.2s ease, box-shadow 0.2s ease; 
    display: flex; 
    flex-direction: column; 
}
.cab-card:hover { 
    transform: translateY(-5px); 
    box-shadow: var(--card-hover-shadow); 
}
.cab-card-image-wrapper { 
    position: relative; 
}
.cab-card-image { 
    width: 100%; 
    height: 180px; 
    object-fit: cover; 
    background-color: var(--bg-light); 
}
.cab-card-status { 
    position: absolute; 
    top: 1rem; 
    right: 1rem; 
    font-size: 0.75rem; 
    font-weight: 600; 
    padding: 0.3rem 0.75rem; 
    border-radius: 999px; 
    text-transform: uppercase; 
    letter-spacing: 0.5px; 
}
.cab-card-status.available { 
    background-color: #10b981; 
    color: white; 
}
.cab-card-status.full { 
    background-color: #ef4444; 
    color: white; 
}
.cab-card-content { 
    padding: 1rem; 
}
.cab-card-header { 
    display: flex; 
    justify-content: space-between; 
    align-items: flex-start; 
    margin-bottom: 0.25rem; 
}
.cab-card-title { 
    font-size: 1.15rem; 
    font-weight: 700; 
}
.cab-card-year { 
    font-size: 1rem; 
    color: var(--text-light); 
    font-weight: 500; 
}
.cab-card-route { 
    font-size: 1rem; 
    color: var(--text-light); 
    margin-bottom: 1rem; 
    font-weight: 500; 
}
.cab-card-details { 
    display: grid; 
    gap: 0.5rem; 
    margin-bottom: 1rem; 
    color: var(--text-light); 
    font-size: 0.875rem; 
}
.cab-card-details div { 
    display: flex; 
    align-items: center; 
    gap: 0.5rem; 
}
.cab-card-tags { 
    display: flex; 
    flex-wrap: wrap; 
    gap: 0.75rem; 
    font-size: 0.875rem; 
    color: var(--text-light); 
    margin-bottom: 1.25rem; 
}
.cab-card-tags span { 
    background-color: #f3f4f6; 
    padding: 0.25rem 0.75rem; 
    border-radius: 8px; 
    display:flex; 
    align-items:center; 
    gap: 0.4rem; 
}
.cab-card-footer { 
    margin-top: auto; 
    padding-top: 1.25rem; 
    border-top: 1px solid var(--border-color); 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
}
.cab-card-price { 
    font-size: 1.5rem; 
    font-weight: 700; 
    color: var(--primary-color); 
}
.cab-card-price span { 
    font-size: 0.875rem; 
    font-weight: 500; 
    color: var(--text-light); 
    margin-left: 0.25rem; 
}
.cab-card-button { 
    background-color: var(--primary-color); 
    color: var(--bg-white); 
    border: none; 
    padding: 0.75rem 1.5rem; 
    border-radius: 8px; 
    font-size: 1rem; 
    font-weight: 600; 
    cursor: pointer; 
    transition: background-color 0.2s; 
}
.cab-card-button:hover { 
    background-color: var(--primary-hover); 
}
.cab-card-button:disabled { 
    background-color: #9ca3af; 
    cursor: not-allowed; 
}

.filter-container { 
    width: 300px; 
    flex-shrink: 0; 
}
.filter-wrapper { 
    background-color: var(--bg-white); 
    padding: 1.5rem; 
    border-radius: 12px; 
    height: fit-content; 
    position: sticky; 
    top: 1.5rem; 
    box-shadow: var(--card-shadow); 
}
.filter-header { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    margin-bottom: 1.5rem; 
    padding-bottom: 1rem; 
    border-bottom: 1px solid var(--border-color); 
}
.filter-header h2 { 
    font-size: 1.25rem; 
}
.filter-close-btn { 
    display: none; 
    background: none; 
    border: none; 
    cursor: pointer; 
}
.filter-group { 
    margin-bottom: 1.5rem; 
}
.filter-group > label { 
    font-weight: 600; 
    display: block; 
    margin-bottom: 0.75rem; 
}
.filter-group select, .seats-input { 
    width: 100%; 
    padding: 0.75rem; 
    border-radius: 8px; 
    border: 1px solid var(--border-color); 
    font-size: 1rem; 
    background-color: var(--bg-white); 
}
.price-label { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    margin-bottom: 0.75rem; 
    font-weight: 600; 
}
.price-label span { 
    font-weight: 500; 
    color: var(--primary-color); 
}
.price-slider { 
    width: 100%; 
    cursor: pointer; 
    accent-color: var(--primary-color); 
}
.radio-group { 
    display: flex; 
    flex-direction: column; 
    gap: 0.5rem; 
}
.radio-group label { 
    font-weight: 400; 
    display: flex; 
    align-items: center; 
    gap: 0.5rem; 
    cursor: pointer; 
}
.filter-footer { 
    padding-top: 1rem; 
    border-top: 1px solid var(--border-color); 
}
.filter-reset-btn { 
    background: none; 
    border: none; 
    width: 100%; 
    text-align: center; 
    color: var(--primary-color); 
    cursor: pointer; 
    font-weight: 500; 
    padding: 0.5rem; 
    border-radius: 8px; 
    transition: background-color 0.2s; 
}
.filter-reset-btn:hover { 
    background-color: #eef2ff; 
}

.mobile-filter-trigger { 
    display: none; 
}
.no-results-container { 
    text-align: center; 
    padding: 4rem 2rem; 
    background-color: var(--bg-white); 
    border-radius: 12px; 
    box-shadow: var(--card-shadow); 
}
.no-results-icon { 
    color: var(--primary-color); 
    margin-bottom: 1rem; 
}
.no-results-container h2 { 
    font-size: 1.5rem; 
    margin-bottom: 0.5rem; 
}
.no-results-container p { 
    color: var(--text-light); 
    max-width: 300px; 
    margin: auto; 
}
.skeleton { 
    animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; 
}
.skeleton-box { 
    background-color: #e5e7eb; 
    border-radius: 8px; 
}
.skeleton-title { 
    height: 2rem; 
    width: 60%; 
    margin-bottom: 0.75rem; 
}
.skeleton-text { 
    height: 1rem; 
    width: 80%; 
    margin-bottom: 0.5rem; 
}
.skeleton-footer { 
    height: 2.5rem; 
    width: 40%; 
    margin-top: auto; 
    margin-left: auto; 
}
@keyframes pulse { 
    0%, 100% { opacity: 1; } 
    50% { opacity: 0.5; } 
}

.search-modal-overlay { 
    position: fixed; 
    top: 0; 
    left: 0; 
    width: 100%; 
    height: 100%; 
    background-color: rgba(0,0,0,0.6); 
    z-index: 200; 
    display: flex; 
    justify-content: center; 
    align-items: flex-start; 
    padding-top: 15vh; 
    animation: fadeIn 0.3s ease; 
}
.search-modal { 
    background-color: var(--bg-white); 
    border-radius: 16px; 
    width: 90%; 
    max-width: 500px; 
    animation: slideDown 0.4s ease-out; 
    box-shadow: 0 10px 25px rgba(0,0,0,0.1); 
}
.search-modal-header { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    padding: 1.25rem 1.5rem; 
}
.search-modal-header h3 { 
    font-size: 1.1rem; 
    font-weight: 600; 
}
.search-modal-header button { 
    background: none; 
    border: none; 
    cursor: pointer; 
    color: var(--text-light); 
    padding: 0.25rem; 
}

.search-modal-content { 
    padding: 0 1.5rem 1.5rem; 
    display: grid; 
    grid-template-columns: 1fr; 
    gap: 1rem; 
}
.search-modal-content .search-form-group { 
    display: flex; 
    flex-direction: column; 
}
.search-modal-content .search-form-group.full-width { 
    grid-column: 1 / -1; 
}
.search-modal-content .search-form-group label { 
    font-weight: 500; 
    font-size: 0.875rem; 
    margin-bottom: 0.5rem; 
    color: var(--text-dark); 
}
.search-modal-content input { 
    width: 100%; 
    padding: 0.8rem 1rem; 
    font-size: 1rem; 
    border: 1px solid var(--border-color); 
    border-radius: 8px; 
    transition: border-color 0.2s, box-shadow 0.2s; 
}
.search-modal-content input:focus { 
    outline: none; 
    border-color: var(--primary-color); 
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2); 
}
.search-modal-content input[type="date"] { 
    color: var(--text-light); 
}
.search-modal-content input[type="date"]:focus, .search-modal-content input[type="date"]:valid { 
    color: var(--text-dark); 
}
.search-modal-content input[type="date"]::-webkit-calendar-picker-indicator { 
    cursor: pointer; 
}

.search-modal-footer { 
    padding: 1.25rem 1.5rem; 
}
.search-submit-btn { 
    width: 100%; 
    background-color: var(--primary-color); 
    color: white; 
    border: none; 
    padding: 0.9rem; 
    font-size: 1.1rem; 
    font-weight: 600; 
    border-radius: 8px; 
    cursor: pointer; 
    transition: background-color 0.2s; 
}
.search-submit-btn:hover { 
    background-color: var(--primary-hover); 
}

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }

@media (max-width: 1024px) {
    .desktop-search-trigger { display: none; }
    .cabs-page-container { grid-template-columns: 1fr; padding: 0.5rem; }
    .filter-container { 
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background-color: rgba(0,0,0,0.5); z-index: 100;
        display: flex; justify-content: center; align-items: flex-end;
        pointer-events: none; opacity: 0; transition: opacity 0.3s ease;
    }
    .filter-container.open { opacity: 1; pointer-events: auto; }
    .filter-wrapper { 
        width: 100%; max-height: 90vh; /* Allow more height */
        position: relative; top: 0; right: 0; 
        border-radius: 24px 24px 0 0;
        box-shadow: 0 -10px 25px rgba(0,0,0,0.1);
        transform: translateY(100%); transition: transform 0.3s ease-out;
        display: flex; flex-direction: column; background-color: var(--bg-white);
    }
    .filter-container.open .filter-wrapper { transform: translateY(0); }
    .filter-handle {
        width: 40px; height: 4px; background-color: #d1d5db;
        border-radius: 2px; position: absolute; top: 8px; left: 50%;
        transform: translateX(-50%);
    }
    .filter-header { padding: 1.75rem 1.5rem 0.75rem 1.5rem; flex-shrink: 0; }
    .filter-content { overflow-y: auto; padding: 0 1.5rem; flex-grow: 1; padding-bottom: 2rem; /* Add padding at the bottom */ }
    .filter-close-btn { display: block; }
    .filter-group { margin-bottom: 1.25rem; padding-bottom: 1.25rem; }
    .filter-group > label { margin-bottom: 0.75rem; font-size: 1rem; }
    .radio-group { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
    .radio-group label {
        padding: 0.75rem; border: 1px solid var(--border-color);
        border-radius: 8px; text-align: center; justify-content: center;
        font-size: 0.875rem;
    }
    .filter-footer {
        padding: 1rem 1.5rem; background-color: var(--bg-white);
        border-top: 1px solid var(--border-color);
        flex-shrink: 0;
    }
    .mobile-filter-trigger { 
        display: flex; align-items: center; gap: 0.5rem; 
        position: fixed; bottom: 90px; /* Adjusted for nav bar */
        left: 50%; transform: translateX(-50%);
        background-color: var(--primary-color); color: white; 
        padding: 0.75rem 1.25rem; border-radius: 9999px; border: none; 
        font-size: 1rem; font-weight: 600; 
        box-shadow: 0 4px 12px rgba(0,0,0,0.2); z-index: 50; cursor: pointer; 
    }
    .mobile-search-trigger { 
        display: flex; align-items: center; gap: 1rem; 
        background-color: var(--bg-white); padding: 0.75rem 1rem; 
        margin: 0 0.5rem 1rem 0.5rem; border-radius: 12px; 
        box-shadow: var(--card-shadow); cursor: pointer; border: 1px solid var(--border-color); 
    }
    .mobile-search-trigger span { 
        color: var(--text-light); text-overflow: ellipsis; white-space: nowrap; overflow: hidden; 
    }
}

@media (min-width: 500px) {
    .search-modal-content { grid-template-columns: 1fr 1fr; }
}
@media (min-width: 768px) { .cab-list { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1280px) { .cab-list { grid-template-columns: repeat(3, 1fr); } }

.cab-card-tag {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 0.25rem 0.6rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
}


                `;