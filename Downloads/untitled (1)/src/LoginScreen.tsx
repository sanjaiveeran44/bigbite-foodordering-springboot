import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Animated,
  Platform,
  TouchableOpacity
} from 'react-native';
import AnimatedCustomForm from './components/AnimatedCustomForm';
import CinematicBackground from './components/CinematicBackground';

const NoiseOverlay = () => {
  if (Platform.OS !== 'web') return null;
  return (
    <View style={{
      ...StyleSheet.absoluteFill as any,
      opacity: 0.04,
      zIndex: 1,
      pointerEvents: 'none',
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    } as any} />
  );
};



export default function LoginScreen({ onNavigateHome }: any) {
  const { width, height } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const getLeftPanelWidth = () => {
    if (isMobile) return '100%';
    if (isTablet) return '45%';
    return '58%';
  };

  const getRightPanelWidth = () => {
    if (isMobile) return '100%';
    if (isTablet) return '55%';
    return '42%';
  };

  return (
    <View style={styles.container}>
      <View style={[styles.contentWrapper, { flexDirection: isMobile ? 'column' : 'row' }]}>
        
        {/* LEFT PANEL */}
        <View style={[styles.leftPanel, { width: getLeftPanelWidth(), minHeight: isMobile ? 300 : '100%' }]}>
          <CinematicBackground />
          <NoiseOverlay />
          <View style={styles.leftOverlay}>
            
            <View style={[styles.leftContent, isMobile && { paddingBottom: 24 }]}>
              <TouchableOpacity style={styles.brandContainer} onPress={onNavigateHome}>
                <Text style={styles.brandName}>EDUCORE</Text>
                <Text style={styles.brandSubtitle}>ACADEMIC INTELLIGENCE PLATFORM</Text>
              </TouchableOpacity>

              <View style={[styles.heroContainer, isMobile && { marginVertical: 20, marginTop: 20 }]}>
                <Text style={[styles.heroText, isMobile && { fontSize: 40, lineHeight: 46 }]}>Learn deeper.</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.heroText, isMobile && { fontSize: 40, lineHeight: 46 }]}>Perform </Text>
                  <Text style={[styles.heroText, styles.heroHighlight, isMobile && { fontSize: 40, lineHeight: 46 }]}>better.</Text>
                </View>
                <Text style={[styles.heroSubText, isMobile && { fontSize: 16, lineHeight: 24, marginTop: 16 }]}>
                  One intelligent academic ecosystem for students, teachers, and administrators.
                </Text>
              </View>

              {!isMobile && <View style={{ height: 40 }} />}
            </View>
          </View>
        </View>

        {/* RIGHT PANEL */}
        <View style={[styles.rightPanel, { width: getRightPanelWidth(), padding: isMobile ? 20 : 24 }]}>
          <AnimatedCustomForm onFocusChange={setActiveSection} />
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080B16',
  },
  contentWrapper: {
    flex: 1,
  },
  leftPanel: {
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#080B16',
  },
  leftOverlay: {
    ...StyleSheet.absoluteFill as any,
    justifyContent: 'center',
    padding: 60,
    zIndex: 2,
  },
  leftContent: {
    flex: 1,
    justifyContent: 'space-between',
    zIndex: 3,
  },
  brandContainer: {
    marginTop: 20,
  },
  brandName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 4,
    fontFamily: Platform.OS === 'web' ? 'Inter, sans-serif' : 'System',
  },
  brandSubtitle: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 2,
    marginTop: 8,
    fontFamily: Platform.OS === 'web' ? 'Inter, sans-serif' : 'System',
  },
  heroContainer: {
    marginVertical: 40,
    marginTop: -40,
  },
  heroText: {
    color: '#FFFFFF',
    fontSize: Platform.OS === 'web' ? 64 : 42,
    fontWeight: '600',
    lineHeight: Platform.OS === 'web' ? 70 : 50,
    letterSpacing: -1,
    fontFamily: Platform.OS === 'web' ? 'Inter, sans-serif' : 'System',
  },
  heroHighlight: {
    color: '#818CF8',
    ...(Platform.OS === 'web' ? {
      backgroundImage: 'linear-gradient(90deg, #818CF8, #7C3AED)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    } : {}),
  },
  heroSubText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '400',
    marginTop: 24,
    maxWidth: 500,
    fontFamily: Platform.OS === 'web' ? 'Inter, sans-serif' : 'System',
  },
  rightPanel: {
    height: '100%',
    backgroundColor: '#FAFAFC', // Pearl background for the right panel to seamlessly integrate with card
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    ...(Platform.OS === 'web' ? {
      boxShadow: '-20px 0 40px rgba(0,0,0,0.02)',
    } : {}),
  },
});
