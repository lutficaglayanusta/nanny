import styles from './HeroSection.module.css';
import heroImage from '../../assets/img/Rectangle1.jpg';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className={styles.pageWrapper}>

      
      <div className={styles.hero}>
        
        <div className={styles.heroLeft}>
          <div className={styles.heroLeftInner}>
            <h1 className={styles.heroTitle}>
              Make Life Easier<br />for the Family:
            </h1>
            <p className={styles.heroSubtitle}>
              Find Babysitters Online for All Occasions
            </p>
            <Link to="/nannies" className={styles.btnGetStarted}>
              Get started
              <span className={styles.btnArrow}>↗</span>
            </Link>
          </div>
        </div>

        
        <div className={styles.heroRight}>
          <img
            src={heroImage}
            alt="Nanny with baby"
            className={styles.heroImage}
          />

          
          <div className={styles.statsCard}>
            <div className={styles.statsIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className={styles.statsText}>
              <span className={styles.statsLabel}>Experienced nannies</span>
              <span className={styles.statsNumber}>15,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;