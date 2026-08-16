import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, StyleSheet, Platform, Easing, useWindowDimensions } from 'react-native';

const Particle = ({ startX, startY, tx, ty, duration, size, opacity, delay }: any) => {
  const animProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(animProgress, {
        toValue: 1,
        duration: duration,
        delay: delay,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: false,
      })
    );
    animation.start();
    return () => animation.stop();
  }, [animProgress, duration, delay]);

  const translateX = animProgress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, tx, 0]
  });

  const translateY = animProgress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, ty, 0]
  });

  const animOpacity = animProgress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [opacity * 0.1, opacity * 1.5, opacity * 0.1]
  });

  return (
    <Animated.View style={{
      position: 'absolute',
      left: startX,
      top: startY,
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: '#818CF8', // Soft periwinkle
      opacity: animOpacity,
      transform: [
        { translateX },
        { translateY }
      ],
      ...(Platform.OS === 'web' ? { filter: 'blur(1px)', boxShadow: '0 0 6px rgba(129,140,248,1)' } as any : {})
    }} />
  );
};

export default function CinematicBackground() {
  const lampGlowAnim = useRef(new Animated.Value(0)).current;
  const { width, height } = useWindowDimensions();
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(lampGlowAnim, { toValue: 1, duration: 6000, easing: Easing.inOut(Easing.sin), useNativeDriver: false }),
        Animated.timing(lampGlowAnim, { toValue: 0, duration: 6000, easing: Easing.inOut(Easing.sin), useNativeDriver: false }),
      ])
    ).start();

    // Generate static initial particles
    const generatedParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      startX: Math.random() * (width * 0.9), // Keep mostly on left/mid
      startY: Math.random() * height,
      tx: (Math.random() - 0.5) * 200, // Move further
      ty: (Math.random() - 0.5) * 300, // Move further
      duration: 8000 + Math.random() * 8000, // Move faster
      delay: Math.random() * 3000,
      size: Math.random() * 4 + 2, // Larger particles
      opacity: Math.random() * 0.6 + 0.2, // More opaque
    }));
    setParticles(generatedParticles);
  }, [width, height]);

  return (
    <View style={styles.container}>
      {/* Deep Violet Base */}
      <View style={styles.baseBg} />

      {/* Geometric Data Lines Pattern */}
      <View style={styles.techPattern} />

      {/* Soft Periwinkle & Indigo Blooms */}
      <View style={styles.indigoBloom} />
      <View style={styles.periwinkleBloom} />

      {/* Warm Golden Lamp Light (Right/Mid-ground) */}
      <Animated.View style={[
        styles.lampGlow,
        {
          opacity: lampGlowAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.3, 0.9] // More pronounced contrast
          }),
          transform: [{
            scale: lampGlowAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.95, 1.15] // Larger breathing
            })
          }]
        }
      ]} />

      {/* Floating Particles */}
      {particles.map((p) => (
        <Particle key={p.id} {...p} />
      ))}
      
      {/* Gradient to darken the far left for typography */}
      <View style={styles.textVignette} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill as any,
    backgroundColor: '#080B16',
    overflow: 'hidden',
    zIndex: 0,
  },
  baseBg: {
    ...StyleSheet.absoluteFill as any,
    ...(Platform.OS === 'web' ? {
      backgroundImage: 'radial-gradient(circle at 40% 50%, rgba(24,36,92,0.7) 0%, rgba(8,11,22,1) 100%)'
    } : {
      backgroundColor: '#080B16'
    })
  },
  techPattern: {
    ...StyleSheet.absoluteFill as any,
    opacity: 0.04,
    ...(Platform.OS === 'web' ? {
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='150' height='150' viewBox='0 0 150 150' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M75 0L75 150M0 75L150 75' stroke='%23818CF8' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='75' cy='75' r='50' stroke='%23818CF8' stroke-width='0.5' stroke-dasharray='2 4' fill='none'/%3E%3Ccircle cx='75' cy='75' r='2' fill='%23818CF8'/%3E%3C/svg%3E")`,
      backgroundSize: '150px 150px',
    } as any : {})
  },
  indigoBloom: {
    position: 'absolute',
    left: '10%',
    top: '10%',
    width: '60%',
    height: '60%',
    borderRadius: 9999,
    backgroundColor: 'rgba(79, 70, 229, 0.15)', // Royal Indigo
    ...(Platform.OS === 'web' ? { filter: 'blur(120px)' } as any : {})
  },
  periwinkleBloom: {
    position: 'absolute',
    left: '30%',
    bottom: '-10%',
    width: '50%',
    height: '50%',
    borderRadius: 9999,
    backgroundColor: 'rgba(124, 58, 237, 0.1)', // Violet
    ...(Platform.OS === 'web' ? { filter: 'blur(120px)' } as any : {})
  },
  lampGlow: {
    position: 'absolute',
    right: '-15%',
    top: '25%',
    width: '70%',
    height: '80%',
    borderRadius: 9999,
    backgroundColor: 'rgba(217, 160, 91, 0.1)', // Warm golden lamp light
    ...(Platform.OS === 'web' ? { filter: 'blur(140px)' } as any : {})
  },
  textVignette: {
    ...StyleSheet.absoluteFill as any,
    ...(Platform.OS === 'web' ? {
      backgroundImage: 'linear-gradient(90deg, rgba(8,11,22,0.95) 0%, rgba(8,11,22,0.4) 45%, transparent 100%)'
    } : {})
  }
});
