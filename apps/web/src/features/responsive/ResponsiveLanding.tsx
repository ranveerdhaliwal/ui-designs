import React, { useState } from 'react';
import { MobileContainer, BottomNav } from '@/components/ui/Responsive';
import { AgenticSerif, AgenticSans } from '@/components/ui/Typography';
import styles from './ResponsiveLanding.module.css';

const ONBOARDING_DATA = [
  {
    image: '/assets/time_onboarding_1.png',
    title: 'Plan with clarity',
    description: 'Organize your day, capture priorities, and stay in control from morning to night.'
  },
  {
    image: '/assets/time_onboarding_2.png',
    title: 'Focus on what matters',
    description: 'Manage tasks, reduce distractions, and build a workflow that keeps you moving forward.'
  },
  {
    image: '/assets/time_onboarding_3.png',
    title: 'Grow every day',
    description: 'Track progress, celebrate small wins, and turn daily routines into meaningful results.'
  }
];

export function ResponsiveLanding() {
  const [currentStep, setCurrentStep] = useState(0);
  const data = ONBOARDING_DATA[currentStep]!;

  return (
    <div className={styles.pageBackground}>
      <MobileContainer>
        <div className={styles.onboardingScreen}>
          
          <div className={styles.header}>
            <div className={styles.logoIcon} />
            <span>Time.</span>
          </div>

          <div className={styles.carousel}>
            <img src={data.image} alt={data.title} className={styles.illustration} />
            
            <AgenticSerif className={styles.title}>
              {data.title}
            </AgenticSerif>
            
            <AgenticSans className={styles.description}>
              {data.description}
            </AgenticSans>
            
            <div className={styles.dots}>
              {ONBOARDING_DATA.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`${styles.dot} ${idx === currentStep ? styles.active : ''}`}
                  onClick={() => setCurrentStep(idx)}
                />
              ))}
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.primaryButton}>
              Get started
            </button>
            <button className={styles.secondaryButton}>
              Already have an account? Log in
            </button>
          </div>

        </div>

        {/* 
          Example of how BottomNav would look if we navigated to a dashboard.
          For the onboarding, we usually hide it, but we can show it here 
          to demonstrate the Mobile-First responsive primitives we built.
        */}
        <div style={{ marginTop: 'auto' }}>
          {/* We'll leave it out of the onboarding screen for aesthetic accuracy, 
              but the component is ready for the main app view! */}
        </div>

      </MobileContainer>
    </div>
  );
}
