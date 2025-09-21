import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './custom_alert.css';

const CustomAlert = ({ message, onClose, duration = 4000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const enter = setTimeout(() => setVisible(true), 10);
    const auto = setTimeout(() => {
      setVisible(false);
      const remove = setTimeout(() => {
        onClose();
        clearTimeout(remove);
      }, 300);
      clearTimeout(auto);
    }, duration);
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      clearTimeout(enter);
      clearTimeout(auto);
      window.removeEventListener('keydown', handleKey);
    };
  }, [duration, onClose]);

  if (!message) return null;

  const SuccessIcon = () => (
    <svg width="72" height="72" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <style>{`.c{stroke-dasharray:166;stroke-dashoffset:166;stroke-width:2.5;stroke-miterlimit:10;stroke:#34D399;fill:none;animation:st 0.6s cubic-bezier(.65,0,.45,1) forwards}.k{transform-origin:50% 50%;stroke-dasharray:48;stroke-dashoffset:48;stroke-width:3;stroke-linecap:round;stroke:#34D399;animation:st 0.3s cubic-bezier(.65,0,.45,1) .8s forwards}@keyframes st{100%{stroke-dashoffset:0}}`}</style>
      <circle className="c" cx="26" cy="26" r="25" fill="none"/>
      <path className="k" d="M14.1 27.2l7.1 7.2 16.7-16.8" fill="none"/>
    </svg>
  );

  return (
    <div className={`custom-alert-backdrop ${visible ? 'visible' : ''}`} onClick={onClose} role="dialog" aria-modal="true">
      <div className={`custom-alert-panel ${visible ? 'visible' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="custom-alert-icon">
          <div className="custom-alert-icon-circle">
            <SuccessIcon />
          </div>
        </div>
        <h3 className="custom-alert-title">Success!</h3>
        <p className="custom-alert-message">{message}</p>
        <button type="button" className="custom-alert-button" onClick={onClose}>Awesome!</button>
      </div>
    </div>
  );
};

const alert = (message, duration = 4000) => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  const handleClose = () => {
    try { root.unmount(); } catch (e) {}
    if (container.parentNode) container.parentNode.removeChild(container);
  };
  root.render(<CustomAlert message={message} onClose={handleClose} duration={duration} />);
};

export default alert;
