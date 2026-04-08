import { useState } from 'react';
import './PrankLanding.css';

function PrankLanding({ onUnlockAttempt }) {
  const [showModal, setShowModal] = useState(false);
  const [iban, setIban] = useState('');
  const [processing, setProcessing] = useState(false);

  function handleUnlock() {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setShowModal(false);
      onUnlockAttempt();
    }, 2000);
  }

  return (
    <div className="prank-landing">
      <div className="landing-content">
        <div className="lock-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>

        <h1>OHS Exam Questions</h1>
        <p className="subtitle">All 6 past exams with answers — fully organized and ready for you.</p>

        <div className="features">
          <div className="feature">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span>mid-2024-b (20 questions)</span>
          </div>
          <div className="feature">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span>mid-2022-b (9 questions)</span>
          </div>
          <div className="feature">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span>mid-2025-a (20 questions)</span>
          </div>
          <div className="feature">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span>mid-2025-b (20 questions)</span>
          </div>
          <div className="feature">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span>mid-unknown-1 & mid-unknown-2</span>
          </div>
        </div>

        <div className="price-card">
          <div className="price">
            <span className="currency">₺</span>
            <span className="amount">200</span>
          </div>
          <p className="price-desc">One-time payment for lifetime access</p>
          <button className="unlock-btn" onClick={() => setShowModal(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Unlock All Exams
          </button>
        </div>

        <p className="disclaimer">Secure payment • Instant access • No refunds</p>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => !processing && setShowModal(false)}>
          <div className="payment-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => !processing && setShowModal(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>

            {processing ? (
              <div className="processing">
                <div className="spinner"></div>
                <p>Processing payment...</p>
                <p className="processing-sub">Please wait while we verify your transfer</p>
              </div>
            ) : (
              <>
                <h3>Complete Payment</h3>
                <p className="modal-desc">Transfer <strong>₺200</strong> to the IBAN below to unlock all exams.</p>

                <div className="iban-box">
                  <label>IBAN</label>
                  <div className="iban-value">TR33 0006 1005 1978 5457 8413 26</div>
                </div>

                <div className="iban-box">
                  <label>Account Holder</label>
                  <div className="iban-value">SALMAN</div>
                </div>

                <div className="iban-box">
                  <label>Bank</label>
                  <div className="iban-value">Ziraat Bankası</div>
                </div>

                <div className="input-group">
                  <label>Enter your IBAN (for verification)</label>
                  <input
                    type="text"
                    placeholder="TR00 0000 0000 0000 0000 0000 00"
                    value={iban}
                    onChange={e => setIban(e.target.value)}
                  />
                </div>

                <button className="confirm-btn" onClick={handleUnlock} disabled={!iban.trim()}>
                  I've Sent the Payment — Unlock Now
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PrankLanding;
