import { useState, useRef } from 'react';
import styles from '../styles/styles.module.css';

export default function LicensePlateDetector() {
  const [imageSrc, setImageSrc] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
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
      setImageSrc(URL.createObjectURL(file));
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
              <img src={imageSrc} alt="Preview" className={styles.imagePreview} />
            )}
          </div>
        </div>

        <div className={styles.resultsSection}>
          <h2 className={styles.sectionTitle}>🔍 Detection Results</h2>
          <div className={styles.resultsContainer}>
            {!imageSrc ? (
              <div className={styles.noResults}>
                Upload an image to detect license plates
              </div>
            ) : (
              <div className={styles.detectedPlate}>
                <div className={styles.plateNumber}>ABC 123</div>
                <div className={styles.confidence}>Confidence: 98%</div>
              </div>
            )}
          </div>
          <div className={styles.processing}>
            <div className={styles.spinner}></div>
            <p>Processing image...</p>
          </div>
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