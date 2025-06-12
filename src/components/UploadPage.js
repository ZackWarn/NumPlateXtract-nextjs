import { useState, useRef } from 'react';
import styles from '../styles/styles.module.css';
import ProcessingStatus from './ProcessingStatus';
import UploadHistory from './UploadHistory';

export default function LicensePlateDetector() {
  const [imageSrc, setImageSrc] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [plateNumber, setPlateNumber] = useState('');
  const [manualPlateInput, setManualPlateInput] = useState('');
  const [confidence, setConfidence] = useState('');
  const [plateInfo, setPlateInfo] = useState(null);
  const [isCheckingPlate, setIsCheckingPlate] = useState(false);
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' or 'manual'
  const fileInputRef = useRef(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const src = URL.createObjectURL(file);
    setImageSrc(src);
    setPlateNumber('');
    setConfidence('');
    setPlateInfo(null);

    try {
      const base64 = await convertToBase64(file);

      const detectionResponse = await fetch("/api/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64 }),
      });

      const detectionData = await detectionResponse.json();
      setPlateNumber(detectionData.plate);
      setConfidence(detectionData.confidence);
      await checkPlateWithNinjaAPI(detectionData.plate);
    } catch (error) {
      console.error("Error during processing:", error);
      setPlateNumber("Error");
      setConfidence("0%");
      setPlateInfo({ error: "Failed to process license plate" });
    }
  };

  const handleManualCheck = async () => {
    if (!manualPlateInput.trim()) return;
    setPlateNumber(manualPlateInput.trim());
    setConfidence('100%'); // Manual input gets 100% confidence
    setImageSrc(null); // Clear any uploaded image
    await checkPlateWithNinjaAPI(manualPlateInput.trim());
  };

  const checkPlateWithNinjaAPI = async (plate) => {
    if (!plate) return;
    
    setIsCheckingPlate(true);
    try {
      const response = await fetch("/api/verifyPlate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plateNumber: plate }),
      });

      const data = await response.json();
      setPlateInfo(data);
    } catch (error) {
      console.error("Error checking plate:", error);
      setPlateInfo({ error: "Failed to check plate information" });
    } finally {
      setIsCheckingPlate(false);
    }
  };



  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
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
      const fileEvent = { target: { files: [file] } };
      handleImageChange(fileEvent);
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
            Upload a vehicle image or manually enter a license plate to check vehicle information using our advanced system.
          </p>
        </div>
      </header>

      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${activeTab === 'upload' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('upload')}
        >
          Upload Image
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'manual' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('manual')}
        >
          Enter Plate Manually
        </button>
      </div>

      <div className={styles.mainContent}>
        {activeTab === 'upload' ? (
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
        ) : (
          <div className={styles.manualSection}>
            <h2 className={styles.sectionTitle}> Enter License Plate</h2>
            <div className={styles.manualInputContainer}>
              <input
                type="text"
                value={manualPlateInput}
                onChange={(e) => setManualPlateInput(e.target.value)}
                placeholder="Enter license plate number"
                className={styles.manualInput}
              />
              <button 
                onClick={handleManualCheck}
                className={styles.checkButton}
                disabled={!manualPlateInput.trim()}
              >
                Check Plate
              </button>
            </div>
          </div>
        )}

        {/* Results section */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <div className={styles.resultsSection}>
            {plateNumber ? (
              <div className={styles.detectedPlate}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
                  {activeTab === 'upload' ? 'Detected Plate:' : 'Checking Plate:'}
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2c3e50', marginBottom: '15px', letterSpacing: '2px' }}>
                  {plateNumber}
                </div>
                {activeTab === 'upload' && (
                  <div style={{ fontSize: '1.2rem', color: '#5c6f70', marginBottom: '15px' }}>
                    Confidence:{' '}
                    <span style={{ color: '#2980b9', fontWeight: 'bold' }}>
                      {confidence}
                    </span>
                  </div>
                )}

                {isCheckingPlate ? (
                  <div style={{ marginTop: '20px' }}>
                    <div className={styles.spinner}></div>
                    <p>Checking plate information...</p>
                  </div>
                ) : plateInfo ? (
                  <div style={{ marginTop: '20px', textAlign: 'left', borderTop: '1px solid #ddd', paddingTop: '15px' }}>
                    {plateInfo.error ? (
                      <div style={{ color: '#e74c3c' }}>{plateInfo.error}</div>
                    ) : (
                      <>
                        <h3 style={{ marginBottom: '10px' }}>Plate Information:</h3>
                        <div><strong>Make:</strong> {plateInfo.make || 'Unknown'}</div>
                        <div><strong>Model:</strong> {plateInfo.model || 'Unknown'}</div>
                        <div><strong>Year:</strong> {plateInfo.year || 'Unknown'}</div>
                        <div><strong>Color:</strong> {plateInfo.color || 'Unknown'}</div>
                        {plateInfo.stolen && <div style={{ color: '#e74c3c', fontWeight: 'bold' }}>⚠️ Reported stolen</div>}
                      </>
                    )}
                  </div>
                ) : null}
              </div>
            ) : (
              <div className={styles.noResults}>
                {activeTab === 'upload' 
                  ? 'Upload an image to detect license plates' 
                  : 'Enter a license plate number to check vehicle information'}
              </div>
            )}
          </div>
        </div>

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
            text: 'Works with cars, trucks, motorcycles, and more'
          },
          {
            icon: '⚡',
            title: 'Dual Mode',
            text: 'Check plates via image upload or manual entry'
          },
          {
            icon: '🔍',
            title: 'Detailed Information',
            text: 'Get comprehensive vehicle details from our database'
          },
          {
            icon: '🔒',
            title: 'Secure & Private',
            text: 'Your queries are processed securely'
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