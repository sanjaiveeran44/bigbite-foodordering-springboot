import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, Platform, StyleSheet, Easing } from 'react-native';
import { ArrowRight, Globe, Camera, Briefcase, Eye, EyeOff, Facebook, Instagram, Linkedin, ShieldCheck } from 'lucide-react';

const SocialButton = ({ icon: Icon }: any) => {
  const [hovered, setHovered] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, { toValue: hovered ? 1.15 : 1, useNativeDriver: false }).start();
  }, [hovered]);

  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      // @ts-ignore
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Animated.View style={[
        styles.socialBtn, 
        { transform: [{ scale: scaleAnim }] },
        hovered && { backgroundColor: '#4F46E5', borderColor: '#4F46E5' },
        hovered && Platform.OS === 'web' && { boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)' } as any
      ]}>
        <Icon size={18} color={hovered ? "white" : "#6B7280"} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const LiquidSubmitButton = ({ onHoverIn, onHoverOut }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: isHovered ? 1 : 0,
      duration: 500,
      delay: isHovered ? 100 : 0, // matching the 0.1s delay in CSS for wave entrance
      easing: isHovered ? Easing.bezier(0.55, 0, 0.1, 1) : Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [isHovered]);

  const wave1Top = anim.interpolate({ inputRange: [0, 1], outputRange: ['100%', '-35%'] });
  const wave1ScaleX = anim.interpolate({ inputRange: [0, 1], outputRange: [1.25, 0.8] });
  const wave1ScaleY = anim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.3] });
  const wave1Color = anim.interpolate({ inputRange: [0, 1], outputRange: ['rgba(0,0,0,0.05)', '#4F46E5'] });

  const wave2Top = anim.interpolate({ inputRange: [0, 1], outputRange: ['180%', '-45%'] });
  const wave2ScaleX = anim.interpolate({ inputRange: [0, 1], outputRange: [1.45, 0.8] });
  const wave2ScaleY = anim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.3] });

  const textColor = anim.interpolate({ inputRange: [0, 0.3, 1], outputRange: ['#090909', '#090909', '#ffffff'] });
  const borderColor = anim.interpolate({ inputRange: [0, 1], outputRange: ['#e8e8e8', '#4F46E5'] });

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      // @ts-ignore
      onMouseEnter={() => { setIsHovered(true); onHoverIn && onHoverIn(); }}
      onMouseLeave={() => { setIsHovered(false); onHoverOut && onHoverOut(); }}
      style={{ width: '100%', marginVertical: 8 }}
    >
      <Animated.View style={[
        styles.liquidBtnBase,
        { borderColor },
        isPressed && styles.liquidBtnPressed
      ]}>
        <Animated.View style={[
          styles.liquidWave1,
          { top: wave1Top, backgroundColor: wave1Color, transform: [{ scaleX: wave1ScaleX }, { scaleY: wave1ScaleY }] }
        ]} />
        <Animated.View style={[
          styles.liquidWave2,
          { top: wave2Top, transform: [{ scaleX: wave2ScaleX }, { scaleY: wave2ScaleY }] }
        ]} />
        <Animated.Text style={[styles.liquidBtnText, { color: isPressed ? '#666666' : textColor }]}>
          Sign In
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default function AnimatedCustomForm({ onFocusChange }: { onFocusChange?: (section: string | null) => void }) {
  const [focusState, setFocusState] = useState<'email' | 'password' | 'footer' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);

  const animHeight = useRef(new Animated.Value(0)).current; 
  const animScale = useRef(new Animated.Value(1)).current;
  const btnScale = useRef(new Animated.Value(1)).current;
  const btnSweepY = useRef(new Animated.Value(-150)).current;
  const btnColorAnim = useRef(new Animated.Value(0)).current;
  const [btnHovered, setBtnHovered] = useState(false);

  // Notify parent of focus changes
  useEffect(() => {
    if (onFocusChange) {
      onFocusChange(focusState);
    }
  }, [focusState]);

  useEffect(() => {
    let toHeight = 0;
    
    if (focusState === 'email') {
      toHeight = 220; 
    } else if (focusState === 'password') {
      toHeight = 320; 
    } else if (focusState === 'footer') {
      toHeight = 650; 
    }
    
    Animated.timing(animHeight, {
      toValue: toHeight,
      duration: 450,
      useNativeDriver: false,
    }).start();
  }, [focusState]);

  useEffect(() => {
    if (btnHovered) {
      Animated.timing(btnSweepY, {
        toValue: 150,
        duration: 500,
        useNativeDriver: false,
      }).start();
      Animated.timing(btnColorAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      btnSweepY.setValue(-150);
      Animated.timing(btnColorAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [btnHovered]);

  const isEmail = focusState === 'email';
  const isPassword = focusState === 'password';
  const isFooter = focusState === 'footer';
  const isAny = isEmail || isPassword || isFooter;

  const btnBgColor = btnColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#4F46E5', '#312E81'] // Royal Indigo to deep interaction
  });

  return (
    <Animated.View 
      style={[
        styles.cardContainer,
        {
          transform: [{ scale: animScale }],
          // @ts-ignore
          boxShadow: isCardHovered ? '0 24px 50px -12px rgba(8,11,22,0.1)' : '0 10px 30px rgba(8,11,22,0.05)'
        }
      ]}
      // @ts-ignore
      onMouseEnter={() => {
        setIsCardHovered(true);
        Animated.timing(animScale, { toValue: 1.015, duration: 350, useNativeDriver: false }).start();
      }}
      onMouseLeave={() => {
        setIsCardHovered(false);
        Animated.timing(animScale, { toValue: 1, duration: 350, useNativeDriver: false }).start();
      }}
    >
      <View style={styles.cornerCutout} />
      
      <Animated.View style={[styles.reactiveBg, { height: animHeight }]} />

      <View style={styles.content}>
        <View style={styles.headerArea}>
          <Text style={[styles.welcomeLabel, isAny && styles.textWhite80]}>WELCOME BACK</Text>
          <Text style={[styles.mainHeading, isAny && styles.textWhite]}>Sign in to your account</Text>
          <Text style={[styles.supportingText, isAny && styles.textWhite80]}>Continue your academic journey.</Text>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.labelRow}>
            <Text style={[styles.label, isEmail && styles.textWhite90]}>Email address</Text>
          </View>
          <TextInput 
            placeholder="EMAIL"
            placeholderTextColor={isEmail ? 'rgba(255,255,255,0.5)' : 'rgba(107,114,128,0.5)'}
            style={[styles.input, isEmail && styles.inputFocused, Platform.OS === 'web' && { outlineStyle: 'none' } as any]}
            onFocus={() => setFocusState('email')}
            onBlur={() => focusState === 'email' && setFocusState(null)}
          />
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.labelRow}>
            <Text style={[styles.label, isPassword && styles.textWhite90]}>Password</Text>
            <TouchableOpacity>
              <Text style={[styles.forgotLink, isPassword && styles.textWhite]}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.passwordWrapper}>
            <TextInput 
              placeholder="PASSWORD"
              placeholderTextColor={isPassword ? 'rgba(255,255,255,0.5)' : 'rgba(107,114,128,0.5)'}
              secureTextEntry={!showPassword}
              style={[styles.input, { paddingRight: 40 }, isPassword && styles.inputFocused, Platform.OS === 'web' && { outlineStyle: 'none' } as any]}
              onFocus={() => setFocusState('password')}
              onBlur={() => focusState === 'password' && setFocusState(null)}
            />
            <TouchableOpacity 
              style={styles.eyeIcon} 
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Eye size={18} color={isPassword ? "white" : "#6B7280"} />
              ) : (
                <EyeOff size={18} color={isPassword ? "white" : "#6B7280"} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.submitGroup}>
          <LiquidSubmitButton 
            onHoverIn={() => setBtnHovered(true)} 
            onHoverOut={() => setBtnHovered(false)} 
          />
        </View>

        <View 
          style={styles.footerArea}
          // @ts-ignore
          onMouseEnter={() => {
            if (focusState !== 'email' && focusState !== 'password') setFocusState('footer');
          }}
          onMouseLeave={() => {
            if (focusState === 'footer') setFocusState(null);
          }}
        >
          <View style={styles.socialRow}>
            <SocialButton icon={Facebook} />
            <SocialButton icon={Instagram} />
            <SocialButton icon={Linkedin} />
          </View>
          
          <View style={styles.signupContainer}>
            <Text style={[styles.createAccountText, isFooter && styles.textWhite80]}>
              Don't have an account? <Text style={[styles.createAccountLink, isFooter && styles.textWhite]}>Create an account</Text>
            </Text>
          </View>

          <View style={styles.securityContainer}>
            <ShieldCheck size={14} color={isFooter ? 'rgba(255,255,255,0.6)' : '#9CA3AF'} />
            <Text style={[styles.securityText, isFooter && styles.textWhite60]}>
              Your academic information is protected and secure.
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#FAFAFC', // Premium pearl
    borderRadius: 24,
    borderTopRightRadius: 40, // Asymmetric corner
    padding: 40,
    borderWidth: 1,
    borderColor: '#E5E7EB', // Fine border
    ...(Platform.OS === 'web' ? {
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    } : {
      elevation: 5,
    }),
    overflow: 'hidden',
    position: 'relative',
  },
  cornerCutout: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.05)',
    transform: [{ rotate: '45deg' }],
    zIndex: 2,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    ...(Platform.OS === 'web' ? { backdropFilter: 'blur(20px)' } : {}),
  },
  reactiveBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#312E81', // Deep indigo depth
    ...(Platform.OS === 'web' ? {
      backgroundImage: 'radial-gradient(120% 100% at 50% 0%, #4F46E5 0%, #312E81 100%)',
    } : {}),
    zIndex: 0,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  content: {
    zIndex: 1,
    position: 'relative',
  },
  headerArea: {
    marginBottom: 32,
  },
  welcomeLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4F46E5',
    letterSpacing: 2,
    marginBottom: 8,
    fontFamily: Platform.OS === 'web' ? 'Inter, sans-serif' : 'System',
    ...(Platform.OS === 'web' ? { transition: 'color 0.4s ease' } : {}),
  },
  mainHeading: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    letterSpacing: -0.5,
    fontFamily: Platform.OS === 'web' ? 'Inter, sans-serif' : 'System',
    ...(Platform.OS === 'web' ? { transition: 'color 0.4s ease' } : {}),
  },
  supportingText: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: Platform.OS === 'web' ? 'Inter, sans-serif' : 'System',
    ...(Platform.OS === 'web' ? { transition: 'color 0.4s ease' } : {}),
  },
  inputGroup: {
    marginBottom: 20,
    position: 'relative',
    zIndex: 1,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
    fontFamily: Platform.OS === 'web' ? 'Inter, sans-serif' : 'System',
    ...(Platform.OS === 'web' ? { transition: 'color 0.4s ease' } : {}),
  },
  forgotLink: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4F46E5',
    fontFamily: Platform.OS === 'web' ? 'Inter, sans-serif' : 'System',
    ...(Platform.OS === 'web' ? { transition: 'color 0.4s ease' } : {}),
  },
  passwordWrapper: {
    position: 'relative',
  },
  input: {
    width: '100%',
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8DCE8',
    color: '#111827',
    fontSize: 14,
    fontFamily: Platform.OS === 'web' ? 'Inter, sans-serif' : 'System',
    ...(Platform.OS === 'web' ? { transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' } : {}),
  },
  inputFocused: {
    backgroundColor: 'rgba(24, 36, 92, 0.85)', // Dark indigo surface
    borderColor: 'rgba(124, 58, 237, 0.6)', // Subtle glow outline
    color: '#FFFFFF',
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 8px 24px rgba(8,11,22,0.3), inset 0 1px 1px rgba(255,255,255,0.08)',
      backdropFilter: 'blur(10px)',
    } : {}),
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 15,
  },
  submitGroup: {
    paddingTop: 12,
    position: 'relative',
    zIndex: 1,
  },
  liquidBtnBase: {
    display: 'flex',
    width: '100%',
    height: 52,
    borderRadius: 8,
    backgroundColor: '#e8e8e8',
    borderWidth: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
    ...(Platform.OS === 'web' ? {
      boxShadow: '6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff',
      transition: 'all 0.2s ease-in',
    } : {
      elevation: 4,
    })
  },
  liquidBtnPressed: {
    ...(Platform.OS === 'web' ? {
      boxShadow: 'inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff',
    } : {
      elevation: 1,
    })
  },
  liquidWave1: {
    position: 'absolute',
    left: '-20%',
    width: '140%',
    height: '180%',
    borderRadius: 9999,
    zIndex: -1,
  },
  liquidWave2: {
    position: 'absolute',
    left: '-25%',
    width: '160%',
    height: '190%',
    backgroundColor: '#4F46E5',
    borderRadius: 9999,
    zIndex: -1,
  },
  liquidBtnText: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: Platform.OS === 'web' ? 'Inter, sans-serif' : 'System',
    zIndex: 2,
  },
  footerArea: {
    marginTop: 32,
    paddingTop: 32,
    position: 'relative',
    zIndex: 1,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
  },
  socialBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FAFAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  createAccountText: {
    fontSize: 13,
    color: '#6B7280',
    fontFamily: Platform.OS === 'web' ? 'Inter, sans-serif' : 'System',
    ...(Platform.OS === 'web' ? { transition: 'color 0.4s ease' } : {}),
  },
  createAccountLink: {
    color: '#4F46E5',
    fontWeight: '600',
  },
  securityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(229,231,235,0.5)',
    paddingTop: 20,
  },
  securityText: {
    fontSize: 11,
    color: '#9CA3AF',
    fontFamily: Platform.OS === 'web' ? 'Inter, sans-serif' : 'System',
    ...(Platform.OS === 'web' ? { transition: 'color 0.4s ease' } : {}),
  },
  textWhite: { color: '#FFFFFF' },
  textWhite90: { color: 'rgba(255,255,255,0.9)' },
  textWhite80: { color: 'rgba(255,255,255,0.8)' },
  textWhite60: { color: 'rgba(255,255,255,0.6)' },
});
