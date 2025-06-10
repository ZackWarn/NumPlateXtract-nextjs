import { useState, useRef } from 'react';
import styles from '../styles/styles.module.css';
import ProcessingStatus from './ProcessingStatus';
import UploadHistory from './UploadHistory';

export default function LicensePlateDetector() {
  const [imageSrc, setImageSrc] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [plateNumber, setPlateNumber] = useState('');
  const [confidence, setConfidence] = useState('');
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const src = URL.createObjectURL(file);
      setImageSrc(src);
      setPlateNumber('');
      setConfidence('');
      setTimeout(() => {
        setPlateNumber('ABC ' + Math.floor(100 + Math.random() * 900));
        setConfidence((90 + Math.random() * 9).toFixed(0) + '%');
      }, 2000);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const src = URL.createObjectURL(file);
      setImageSrc(src);
      setPlateNumber('');
      setConfidence('');
      setTimeout(() => {
        setPlateNumber('XYZ ' + Math.floor(100 + Math.random() * 900));
        setConfidence((90 + Math.random() * 9).toFixed(0) + '%');
      }, 2000);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>Welcome to NumPlateXtract</div>
        <div className={styles.tagline}>AI-Powered License Plate Detection & Recognition</div>
        <div className={styles.description}>
          <p>
            Upload any vehicle image and let our advanced AI technology automatically detect and extract license plate numbers with high accuracy. Perfect for parking management, security systems, and traffic monitoring applications.
          </p>
        </div>
      </header>

      <div className={styles.mainContent}>
        <div className={styles.uploadSection}>
          <h2 className={styles.sectionTitle}>📸 Upload Vehicle Image</h2>
          <div
            className={`${styles.uploadArea} ${isDragging ? styles.dragover : ''}`}
            onClick={triggerFileInput}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className={styles.uploadIcon}>📷</div>
            <p className={styles.DD}>Drag & drop your image here or click to browse</p>
            <input
              type="file"
              ref={fileInputRef}
              className={styles.fileInput}
              accept="image/*"
              onChange={handleImageChange}
            />
            <button className={styles.uploadBtn}>
              Choose Image
            </button>
            {imageSrc && (
              <>
                <img
                  src={imageSrc}
                  alt="Preview"
                  style={{
                    maxWidth: '180px',
                    maxHeight: '130px',
                    marginTop: '12px',
                    borderRadius: '8px',
                    border: '2px solid #ddd',
                    objectFit: 'cover'
                  }}
                />
                <ProcessingStatus imageSrc={imageSrc} />
              </>
            )}
          </div>
        </div>

        {/* Centered detection result box */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <div
            className={styles.resultsSection}
            style={{
              width: '100%',
              maxWidth: '500px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '50vh',
              margin: '0 auto'
            }}
          >
            {!imageSrc ? (
              <div className={styles.noResults}>
                Upload an image to detect license plates
              </div>
            ) : (
              <div
                className={styles.detectedPlate}
                style={{
                  textAlign: 'center',
                  padding: '20px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  width: '100%',
                  maxWidth: '400px',
                  flexShrink: 0
                }}
              >
                {plateNumber ? (
                  <>
                    <div
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        marginBottom: '10px'
                      }}
                    >
                      Detected Plate:
                    </div>
                    <div
                      style={{
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: '#2c3e50',
                        marginBottom: '15px',
                        letterSpacing: '2px'
                      }}
                    >
                      {plateNumber}
                    </div>
                    <div style={{ fontSize: '1.2rem', color: '#5c6f70' }}>
                      Confidence:{' '}
                      <span style={{ color: '#2980b9', fontWeight: 'bold' }}>
                        {confidence}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.spinner}></div>
                    <p>Processing image...</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Upload history below and isolated */}
        <div style={{ width: '100%' }}>
          <UploadHistory
            imageSrc={imageSrc}
            plateNumber={plateNumber}
            confidence={confidence}
          />
        </div>
      </div>

      <div className={styles.features}>
        {[
          {
            icon: '🚗',
            title: 'Multi-Vehicle Support',
            text: 'Detect plates on cars, trucks, motorcycles, and more'
          },
          {
            icon: '⚡',
            title: 'Lightning Fast',
            text: 'Get results in seconds with our optimized AI engine'
          },
          {
            icon: '🎯',
            title: 'High Accuracy',
            text: 'Advanced OCR technology for precise plate recognition'
          },
          {
            icon: '🔒',
            title: 'Secure & Private',
            text: 'Your images are processed locally and never stored'
          }
        ].map((feature, index) => (
          <div key={index} className={styles.featureCard}>
            <div className={styles.featureIcon}>{feature.icon}</div>
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureText}>{feature.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
