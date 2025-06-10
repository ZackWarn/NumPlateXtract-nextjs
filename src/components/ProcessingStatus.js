// components/ProcessingStatus.js
import { useState, useEffect } from 'react';

export default function ProcessingStatus({ imageSrc }) {
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (imageSrc) {
      setProcessing(true);
      const timer = setTimeout(() => {
        setProcessing(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [imageSrc]);

  if (!imageSrc) return null;

  return (
    <div style={{ marginTop: '1rem', textAlign: 'center' }}>
      {processing ? (
        <>
          <div className="spinner" />
          <p>Processing image...</p>
        </>
      ) : (
        <p style={{ color: 'green' }}>✅ Processing complete!</p>
      )}
    </div>
  );
}
