import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Platform } from 'react-native';
import { Sparkles, Loader2 } from 'lucide-react';

// TEMPLATE #8: Diagonal Swipe Button (adapted for premium actions)
export const SweepButton = ({ title, onPress, primary = true, style }: any) => {
  const [hovered, setHovered] = useState(false);
  const sweepAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (hovered) {
      Animated.timing(sweepAnim, {
        toValue: 200,
        duration: 400, // refined timing
        useNativeDriver: false,
      }).start();
    } else {
      sweepAnim.setValue(-100);
    }
  }, [hovered]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      // @ts-ignore
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={[
        styles.sweepBtn,
        primary ? styles.sweepBtnPrimary : styles.sweepBtnSecondary,
        style,
        hovered && primary && Platform.OS === 'web' && { boxShadow: '0 8px 20px rgba(79, 70, 229, 0.4)' } as any
      ]}
    >
      <Animated.View style={[
        styles.sweepElement,
        {
          left: '-50%',
          transform: [{
            translateX: sweepAnim.interpolate({
              inputRange: [-100, 200],
              outputRange: [0, 400]
            })
          }]
        }
      ]} />
      <Text style={[styles.sweepBtnText, !primary && { color: '#111827' }]}>{title}</Text>
    </TouchableOpacity>
  );
};

// TEMPLATE #10: Tactile / Neumorphic Button (for secondary controls)
export const TactileButton = ({ title, onPress, active = false, style }: any) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      // @ts-ignore
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={[
        styles.tactileBtn,
        active && styles.tactileBtnActive,
        style,
        Platform.OS === 'web' && { 
          transition: 'all 0.25s ease',
          boxShadow: active 
            ? 'inset 0 4px 6px rgba(0,0,0,0.1), 0 0 0 rgba(0,0,0,0)' 
            : hovered ? '0 6px 12px rgba(0,0,0,0.08)' : '0 2px 5px rgba(0,0,0,0.05)'
        } as any
      ]}
    >
      <Text style={[
        styles.tactileText,
        active && styles.tactileTextActive
      ]}>{title}</Text>
    </TouchableOpacity>
  );
};

// TEMPLATE #9: AI Generate / Analyze Button
export const AIAnalyzeButton = ({ title, onPress, style }: any) => {
  const [hovered, setHovered] = useState(false);
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 2000, useNativeDriver: false }),
        Animated.timing(glowAnim, { toValue: 0, duration: 2000, useNativeDriver: false }),
      ])
    ).start();
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      // @ts-ignore
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={[styles.aiBtn, style]}
    >
      <Animated.View style={[
        styles.aiBtnBorderGlow,
        {
          opacity: glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.8] })
        }
      ]} />
      <View style={[styles.aiBtnInner, hovered && styles.aiBtnInnerHovered]}>
        <Sparkles size={16} color="#C4B5FD" />
        <Text style={styles.aiBtnText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

// TEMPLATE #3: Academic Loading Animation
export const PremiumLoader = () => {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false, // Since React Native Web might not support transform rotations well in some versions natively, false is safer. Let's try natively if possible, but false works everywhere.
      })
    ).start();
  }, []);

  const rotate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.loaderContainer}>
      <Animated.View style={[styles.loaderRing, { transform: [{ rotate }] }]}>
        <Loader2 size={32} color="#4F46E5" />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Sweep Button
  sweepBtn: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sweepBtnPrimary: {
    backgroundColor: '#18245C', // Deep Indigo primary
  },
  sweepBtnSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sweepElement: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '50%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    transform: [{ skewX: '-20deg' }],
  },
  sweepBtnText: {
    color: '#F7F8FC',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
    zIndex: 1,
  },

  // Tactile Button
  tactileBtn: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tactileBtnActive: {
    backgroundColor: '#F3F4F6',
    borderColor: '#D1D5DB',
  },
  tactileText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },
  tactileTextActive: {
    color: '#111827',
    fontWeight: '600',
  },

  // AI Button
  aiBtn: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    padding: 1, // Space for the border glow
  },
  aiBtnBorderGlow: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: '#7C3AED',
    borderRadius: 8,
  },
  aiBtnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#080B16',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 7, // Slightly smaller to reveal glow
    ...(Platform.OS === 'web' ? { transition: 'background-color 0.3s ease' } : {})
  },
  aiBtnInnerHovered: {
    backgroundColor: 'rgba(24, 36, 92, 0.9)',
  },
  aiBtnText: {
    color: '#F7F8FC',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginLeft: 12,
  },

  // Loader
  loaderContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderRing: {
    width: 32,
    height: 32,
  }
});
