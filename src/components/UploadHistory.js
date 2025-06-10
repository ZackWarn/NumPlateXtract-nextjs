// components/UploadHistory.js
import { useState, useEffect } from 'react';

export default function UploadHistory({ imageSrc, plateNumber, confidence }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (imageSrc && plateNumber) {
      setHistory((prev) => [...prev, {
        src: imageSrc,
        plateNumber: plateNumber,
        confidence: confidence
      }]);
    }
  }, [imageSrc, plateNumber, confidence]);

  if (history.length === 0) return null;

  return (
    <div style={{ 
      marginTop: '2rem',
      marginBottom: '2rem',
      padding: '1.5rem',
      backgroundColor: '#2c3e50', // Updated to #2c3e50
      borderRadius: '8px',
      color: '#ecf0f1' // Light text color for contrast
    }}>
      <h2 style={{ 
        marginBottom: '1rem',
        color: '#ffffff' // White for heading
      }}>📜 Upload History</h2>
      <div style={{
        display: 'flex',
  gap: '20px',
  overflowX: 'auto',
  padding: '10px 0',
  width: '100%',
  maxWidth: '100vw'
      }}>
        {history.map((item, idx) => (
          <div key={idx} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            flexShrink: 0,
            minWidth: '200px'
          }}>
            <img
              src={item.src}
              alt={`Upload ${idx + 1}`}
              style={{
                height: '120px',
                borderRadius: '8px',
                border: '2px solid #ecf0f1',
                objectFit: 'cover'
              }}
            />
            <div style={{
              padding: '12px',
              background: '#34495e', // Slightly lighter than background
              borderRadius: '6px',
              textAlign: 'center',
              width: '100%',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}>
              <div style={{ 
                fontWeight: 'bold', 
                marginBottom: '5px',
                color: '#bdc3c7' // Light gray for label
              }}>Plate Number</div>
              <div style={{ 
                fontSize: '1.2rem',
                color: '#f39c12', // Changed to orange for plate numbers
                marginBottom: '10px',
                fontWeight: '600'
              }}>{item.plateNumber}</div>
              <div style={{ 
                fontSize: '0.9rem',
                color: '#ecf0f1' // Light color for confidence
              }}>Confidence: <span style={{ 
                fontWeight: 'bold',
                color: '#2ecc71' // Green for confidence value
              }}>{item.confidence}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}// components/UploadHistory.js
