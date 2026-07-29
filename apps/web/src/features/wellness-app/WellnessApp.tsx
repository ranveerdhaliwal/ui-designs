import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './screens/HomeScreen';
import { ProgressScreen } from './screens/ProgressScreen';
import { LearnScreen } from './screens/LearnScreen';
import styles from './WellnessApp.module.css';

export type Tab = 'home' | 'progress' | 'learn' | 'profile';

export function WellnessApp() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  return (
    <div className={styles.appWrapper}>
      <div className={styles.deviceFrame}>
        <div className={styles.screenContent}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={styles.screenInner}
            >
              {activeTab === 'home' && <HomeScreen />}
              {activeTab === 'progress' && <ProgressScreen />}
              {activeTab === 'learn' && <LearnScreen />}
              {activeTab === 'profile' && (
                <div className={styles.placeholderScreen}>
                  <h2>Profile</h2>
                  <p>Settings & Preferences</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}
