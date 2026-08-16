import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Animated,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  Search,
  BookOpen,
  Award,
  BarChart2,
  Users,
  CheckCircle,
  ArrowRight,
  Sparkles,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import CinematicBackground from './components/CinematicBackground';

// -- BUTTONS -- //
const SweepButton = ({ title, onPress, primary = true }: any) => {
  const [hovered, setHovered] = useState(false);
  const sweepAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (hovered) {
      Animated.timing(sweepAnim, {
        toValue: 200,
        duration: 600,
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
      <Text style={[styles.sweepBtnText, !primary && { color: '#F7F8FC' }]}>{title}</Text>
    </TouchableOpacity>
  );
};

// -- COMPONENTS -- //
const NavBar = ({ onNavigateLogin, onNavigateCourses, isScrolled }: any) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <Animated.View style={[
      styles.navBar,
      isScrolled && styles.navBarScrolled
    ]}>
      <View style={styles.navLeft}>
        <Text style={styles.navLogo}>EDUCORE</Text>
        {!isMobile && <Text style={styles.navSubLogo}>ACADEMIC INTELLIGENCE PLATFORM</Text>}
      </View>

      {!isMobile && (
        <View style={styles.navCenter}>
          <TouchableOpacity style={styles.navLink}><Text style={styles.navLinkText}>Home</Text></TouchableOpacity>
          <TouchableOpacity style={styles.navLink} onPress={onNavigateCourses}><Text style={styles.navLinkText}>Courses</Text></TouchableOpacity>
          <TouchableOpacity style={styles.navLink}><Text style={styles.navLinkText}>Contact</Text></TouchableOpacity>
        </View>
      )}

      <View style={styles.navRight}>
        {!isMobile && (
          <TouchableOpacity style={styles.navIconBtn}>
            <Search size={20} color="#F7F8FC" />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.navSignIn} onPress={onNavigateLogin}>
          <Text style={styles.navSignInText}>Sign In</Text>
        </TouchableOpacity>
        {!isMobile && (
          <TouchableOpacity style={styles.navGetStarted}>
            <Text style={styles.navGetStartedText}>Get Started</Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

const HeroSection = ({ onNavigateLogin, onNavigateCourses }: any) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.heroSection}>
      <View style={styles.heroBg}>
        <CinematicBackground />
        <View style={styles.heroOverlay} />
      </View>

      <View style={styles.heroContent}>
        <Text style={[styles.heroTitle, isMobile && { fontSize: 44, lineHeight: 52 }]}>
          LEARN.{'\n'}
          PERFORM.{'\n'}
          <Text style={styles.heroEvolve}>EVOLVE.</Text>
        </Text>
        
        <Text style={[styles.heroSubtitle, isMobile && { width: '100%' }]}>
          An intelligent academic ecosystem designed to connect learning, performance, progress, and opportunity.
        </Text>

        <View style={[styles.heroActions, isMobile && { flexDirection: 'column', width: '100%' }]}>
          <View style={isMobile ? { width: '100%', marginBottom: 16 } : { marginRight: 16 }}>
            <SweepButton title="EXPLORE COURSES" onPress={onNavigateCourses} />
          </View>
          <View style={isMobile ? { width: '100%' } : {}}>
            <SweepButton title="SIGN IN" primary={false} onPress={onNavigateLogin} />
          </View>
        </View>
      </View>
    </View>
  );
};

const TrustStrip = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.trustStrip}>
      <View style={styles.trustContainer}>
        <View style={[styles.trustLeft, isMobile && { marginBottom: 24 }]}>
          <Text style={styles.trustTitle}>ONE PLATFORM</Text>
          <Text style={styles.trustSubtitle}>FOR THE COMPLETE{'\n'}ACADEMIC JOURNEY</Text>
        </View>
        <View style={[styles.trustRight, isMobile && { flexWrap: 'wrap', justifyContent: 'flex-start' }]}>
          {[
            { icon: Users, label: 'Students' },
            { icon: GraduationCap, label: 'Teachers' },
            { icon: BookOpen, label: 'Courses' },
            { icon: Award, label: 'Assessments' },
            { icon: BarChart2, label: 'Analytics' }
          ].map((item, i) => (
            <React.Fragment key={i}>
              <View style={[styles.trustItem, isMobile && { width: '50%', marginBottom: 16 }]}>
                <item.icon size={20} color="#818CF8" />
                <Text style={styles.trustItemText}>{item.label}</Text>
              </View>
            </React.Fragment>
          ))}
        </View>
      </View>
    </View>
  );
};

const CourseCard = ({ course }: any) => {
  const [hovered, setHovered] = useState(false);
  const hoverAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(hoverAnim, {
      toValue: hovered ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [hovered]);

  const translateY = hoverAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -10] });
  const scale = hoverAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.02] });
  const shadowOpacity = hoverAnim.interpolate({ inputRange: [0, 1], outputRange: [0.1, 0.3] });

  return (
    <Animated.View
      style={[
        styles.courseCard,
        {
          transform: [{ translateY }, { scale }],
          // @ts-ignore
          boxShadow: Platform.OS === 'web' ? (hovered ? '0 30px 60px rgba(8,11,22,0.15)' : '0 10px 30px rgba(8,11,22,0.05)') : undefined,
          elevation: hovered ? 10 : 5
        }
      ]}
      // @ts-ignore
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <View style={styles.cardGlow} />
      <View style={styles.cardGeometry} />
      
      <View style={styles.cardContent}>
        <Text style={styles.courseCategory}>{course.category}</Text>
        <Text style={styles.courseTitle}>{course.title}</Text>
        
        <View style={styles.courseMeta}>
          <View style={styles.metaItem}>
            <BookOpen size={16} color="#6B7280" />
            <Text style={styles.metaText}>{course.lessons}</Text>
          </View>
          <View style={styles.metaItem}>
            <CheckCircle size={16} color="#6B7280" />
            <Text style={styles.metaText}>{course.duration}</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.exploreBtn}>
          <Text style={styles.exploreBtnText}>Explore</Text>
          <ArrowRight size={16} color="#F7F8FC" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const FeaturedCourses = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const courses = [
    { category: 'ARTIFICIAL INTELLIGENCE', title: 'Machine Learning Fundamentals', lessons: '18 Lessons', duration: '6 Weeks' },
    { category: 'COMPUTER SCIENCE', title: 'Data Structures & Algorithms', lessons: '24 Lessons', duration: '8 Weeks' },
    { category: 'MATHEMATICS', title: 'Advanced Mathematics', lessons: '20 Lessons', duration: '7 Weeks' }
  ];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>FEATURED COURSES</Text>
      <Text style={styles.sectionSubtitle}>Discover courses designed to build knowledge, skills, and academic confidence.</Text>
      
      <View style={[styles.coursesGrid, isMobile && { flexDirection: 'column' }]}>
        {courses.map((c, i) => (
          <React.Fragment key={i}>
            <View style={[styles.courseWrapper, isMobile && { width: '100%', marginBottom: 24 }]}>
              <CourseCard course={c} />
            </View>
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

const AISection = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [hovered, setHovered] = useState(false);

  return (
    <View style={[styles.section, styles.darkSection]}>
      <View style={[styles.aiContainer, isMobile && { flexDirection: 'column' }]}>
        <View style={[styles.aiLeft, isMobile && { width: '100%', marginBottom: 40 }]}>
          <Text style={styles.aiHeading}>INTELLIGENCE{'\n'}BEHIND YOUR{'\n'}PROGRESS.</Text>
          <Text style={styles.aiSubtitle}>Understand your academic performance through meaningful insights, trends, and personalized recommendations.</Text>
          
          <View style={styles.aiStatsGrid}>
            <View style={styles.aiStat}>
              <Text style={styles.aiStatValue}>84.7%</Text>
              <Text style={styles.aiStatLabel}>Performance</Text>
            </View>
            <View style={styles.aiStat}>
              <Text style={styles.aiStatValue}>92%</Text>
              <Text style={styles.aiStatLabel}>Attendance</Text>
            </View>
            <View style={styles.aiStat}>
              <Text style={styles.aiStatValue}>88%</Text>
              <Text style={styles.aiStatLabel}>Assignments</Text>
            </View>
            <View style={styles.aiStat}>
              <Text style={styles.aiStatValue}>81%</Text>
              <Text style={styles.aiStatLabel}>Examinations</Text>
            </View>
          </View>
        </View>

        <View style={[styles.aiRight, isMobile && { width: '100%' }]}>
          <View style={styles.aiCard}>
            <View style={styles.aiCardHeader}>
              <Sparkles size={16} color="#7C3AED" />
              <Text style={styles.aiCardTitle}>ACADEMIC INTELLIGENCE</Text>
            </View>
            
            <Text style={styles.aiInsightText}>
              Your performance in Mathematics has improved 12% over the last four weeks.
            </Text>
            
            <View style={styles.aiActionBox}>
              <Text style={styles.aiActionLabel}>Recommended action:</Text>
              <Text style={styles.aiActionText}>Review Calculus Module 04.</Text>
            </View>

            <TouchableOpacity 
              style={[styles.generateBtn, hovered && { backgroundColor: '#2e1966' }]}
              // @ts-ignore
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <Sparkles size={16} color="#C4B5FD" />
              <Text style={styles.generateBtnText}>GENERATE INSIGHT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const ExperienceSection = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.section}>
      <View style={[styles.expGrid, isMobile && { flexDirection: 'column' }]}>
        <View style={[styles.expCol, isMobile && { width: '100%', marginBottom: 40 }]}>
          <Text style={styles.expTitle}>STUDENTS</Text>
          <View style={styles.expList}>
            <Text style={styles.expItem}>• Learn at your own pace.</Text>
            <Text style={styles.expItem}>• Track assignments.</Text>
            <Text style={styles.expItem}>• Monitor attendance.</Text>
            <Text style={styles.expItem}>• Understand grades.</Text>
            <Text style={styles.expItem}>• Receive personalized recommendations.</Text>
          </View>
          <TouchableOpacity style={styles.expLink}>
            <Text style={styles.expLinkText}>EXPLORE STUDENT EXPERIENCE</Text>
            <ArrowRight size={16} color="#4F46E5" />
          </TouchableOpacity>
        </View>
        
        <View style={[styles.expCol, isMobile && { width: '100%' }]}>
          <Text style={styles.expTitle}>TEACHERS</Text>
          <View style={styles.expList}>
            <Text style={styles.expItem}>• Manage courses.</Text>
            <Text style={styles.expItem}>• Record attendance.</Text>
            <Text style={styles.expItem}>• Evaluate assignments.</Text>
            <Text style={styles.expItem}>• Conduct examinations.</Text>
            <Text style={styles.expItem}>• Understand student performance.</Text>
          </View>
          <TouchableOpacity style={styles.expLink}>
            <Text style={styles.expLinkText}>EXPLORE TEACHER EXPERIENCE</Text>
            <ArrowRight size={16} color="#4F46E5" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const JourneySection = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const steps = ['DISCOVER', 'LEARN', 'PRACTICE', 'ASSESS', 'IMPROVE', 'ACHIEVE'];

  return (
    <View style={[styles.section, { paddingTop: 40 }]}>
      <Text style={[styles.sectionTitle, { textAlign: 'center' }]}>ACADEMIC JOURNEY</Text>
      
      <View style={styles.journeyContainer}>
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <View style={styles.journeyStep}>
              <View style={styles.journeyNode} />
              <Text style={styles.journeyText}>{step}</Text>
            </View>
            {i < steps.length - 1 && (
              <View style={styles.journeyLine} />
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

const FinalCTA = () => {
  return (
    <View style={styles.ctaSection}>
      <Text style={styles.ctaHeading}>YOUR NEXT{'\n'}BREAKTHROUGH{'\n'}STARTS HERE.</Text>
      <Text style={styles.ctaSubtitle}>Build knowledge. Understand your performance. Improve continuously.</Text>
      <View style={styles.ctaActions}>
        <View style={{ marginRight: 16 }}><SweepButton title="GET STARTED" /></View>
        <SweepButton title="EXPLORE COURSES" primary={false} />
      </View>
    </View>
  );
};

const Footer = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.footer}>
      <View style={[styles.footerGrid, isMobile && { flexDirection: 'column' }]}>
        <View style={[styles.footerBrand, isMobile && { marginBottom: 32 }]}>
          <Text style={styles.footerLogo}>EDUCORE</Text>
          <Text style={styles.footerSubLogo}>ACADEMIC INTELLIGENCE PLATFORM</Text>
        </View>
        
        <View style={styles.footerLinks}>
          <Text style={styles.footerColTitle}>Navigation</Text>
          <Text style={styles.footerLink}>Home</Text>
          <Text style={styles.footerLink}>Courses</Text>
          <Text style={styles.footerLink}>Contact</Text>
        </View>
        
        <View style={styles.footerLinks}>
          <Text style={styles.footerColTitle}>Platform</Text>
          <Text style={styles.footerLink}>Students</Text>
          <Text style={styles.footerLink}>Teachers</Text>
          <Text style={styles.footerLink}>Administrators</Text>
          <Text style={styles.footerLink}>AI Intelligence</Text>
          <Text style={styles.footerLink}>Reports</Text>
        </View>

        <View style={styles.footerLinks}>
          <Text style={styles.footerColTitle}>Support</Text>
          <Text style={styles.footerLink}>Help</Text>
          <Text style={styles.footerLink}>Privacy</Text>
          <Text style={styles.footerLink}>Terms</Text>
        </View>
      </View>
      
      <View style={styles.footerBottom}>
        <Text style={styles.footerCopyright}>© 2026 EDUCORE. All rights reserved.</Text>
      </View>
    </View>
  );
};

// -- MAIN SCREEN -- //
export default function HomeScreen({ onNavigateLogin, onNavigateCourses }: any) {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (e: any) => {
    const y = e.nativeEvent.contentOffset.y;
    setIsScrolled(y > 50);
  };

  return (
    <View style={styles.container}>
      <NavBar onNavigateLogin={onNavigateLogin} onNavigateCourses={onNavigateCourses} isScrolled={isScrolled} />
      <ScrollView 
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <HeroSection onNavigateLogin={onNavigateLogin} onNavigateCourses={onNavigateCourses} />
        <TrustStrip />
        <FeaturedCourses />
        <AISection />
        <ExperienceSection />
        <JourneySection />
        <FinalCTA onNavigateCourses={onNavigateCourses} />
        <Footer />
      </ScrollView>
    </View>
  );
}

// -- STYLES -- //
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080B16',
  },
  scrollView: {
    flex: 1,
  },
  // Sweep Button
  sweepBtn: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sweepBtnPrimary: {
    backgroundColor: '#4F46E5',
  },
  sweepBtnSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#4F46E5',
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
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1.5,
    zIndex: 1,
  },
  
  // NavBar
  navBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    zIndex: 100,
    backgroundColor: 'transparent',
  },
  navBarScrolled: {
    backgroundColor: 'rgba(8, 11, 22, 0.85)',
    ...(Platform.OS === 'web' ? { backdropFilter: 'blur(16px)' } : {}),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  navLeft: {
    flexDirection: 'column',
  },
  navLogo: {
    color: '#F7F8FC',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 2,
  },
  navSubLogo: {
    color: '#818CF8',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
    marginTop: 2,
  },
  navCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    pointerEvents: 'box-none',
  },
  navLink: {
    marginHorizontal: 20,
  },
  navLinkText: {
    color: '#F7F8FC',
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.8,
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navIconBtn: {
    marginRight: 24,
  },
  navSignIn: {
    marginRight: 24,
  },
  navSignInText: {
    color: '#F7F8FC',
    fontSize: 14,
    fontWeight: '600',
  },
  navGetStarted: {
    backgroundColor: '#F7F8FC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  navGetStartedText: {
    color: '#080B16',
    fontSize: 14,
    fontWeight: '600',
  },

  // Hero Section
  heroSection: {
    minHeight: 800,
    justifyContent: 'center',
    paddingHorizontal: '10%',
    position: 'relative',
  },
  heroBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(8, 11, 22, 0.4)',
  },
  heroContent: {
    zIndex: 1,
    maxWidth: 800,
    marginTop: 80, // Offset for navbar
  },
  heroTitle: {
    fontSize: 80,
    lineHeight: 88,
    fontWeight: '800',
    color: '#F7F8FC',
    letterSpacing: -1,
    marginBottom: 24,
  },
  heroEvolve: {
    color: '#818CF8', // We will simulate gradient with a solid rich color for now if true gradient isn't trivial in RN Web Text, but let's use the requested Periwinkle
  },
  heroSubtitle: {
    fontSize: 20,
    color: '#E5E7EB',
    lineHeight: 30,
    maxWidth: 600,
    marginBottom: 48,
  },
  heroActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Trust Strip
  trustStrip: {
    backgroundColor: '#05070E',
    paddingVertical: 40,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  trustContainer: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    flexWrap: 'wrap',
  },
  trustLeft: {
    marginRight: 40,
  },
  trustTitle: {
    color: '#818CF8',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 4,
  },
  trustSubtitle: {
    color: '#F7F8FC',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
  },
  trustRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trustItem: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  trustItemText: {
    color: '#9CA3AF',
    fontSize: 14,
    marginLeft: 12,
    fontWeight: '500',
  },

  // Common Sections
  section: {
    paddingVertical: 100,
    paddingHorizontal: '10%',
    backgroundColor: '#F7F8FC',
    alignItems: 'center',
  },
  darkSection: {
    backgroundColor: '#080B16',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4F46E5',
    letterSpacing: 2,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  sectionSubtitle: {
    fontSize: 24,
    color: '#111827',
    maxWidth: 600,
    lineHeight: 34,
    marginBottom: 60,
    alignSelf: 'flex-start',
  },

  // Featured Courses
  coursesGrid: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  courseWrapper: {
    width: '31%',
  },
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 320,
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  cardGlow: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(79, 70, 229, 0.05)',
  },
  cardGeometry: {
    position: 'absolute',
    bottom: -20,
    right: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(79, 70, 229, 0.1)',
  },
  cardContent: {
    zIndex: 1,
    flex: 1,
    justifyContent: 'space-between',
  },
  courseCategory: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4F46E5',
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 32,
    marginBottom: 24,
  },
  courseMeta: {
    marginBottom: 32,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  metaText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  exploreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#111827',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  exploreBtnText: {
    color: '#F7F8FC',
    fontSize: 14,
    fontWeight: '600',
  },

  // AI Section
  aiContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aiLeft: {
    width: '45%',
  },
  aiHeading: {
    fontSize: 48,
    lineHeight: 56,
    fontWeight: '800',
    color: '#F7F8FC',
    marginBottom: 24,
  },
  aiSubtitle: {
    fontSize: 18,
    color: '#9CA3AF',
    lineHeight: 28,
    marginBottom: 48,
  },
  aiStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  aiStat: {
    width: '50%',
    marginBottom: 32,
  },
  aiStatValue: {
    fontSize: 36,
    fontWeight: '700',
    color: '#F7F8FC',
    marginBottom: 8,
  },
  aiStatLabel: {
    fontSize: 14,
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  aiRight: {
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiCard: {
    backgroundColor: 'rgba(24, 36, 92, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.3)',
    borderRadius: 16,
    padding: 32,
    width: '100%',
    ...(Platform.OS === 'web' ? { backdropFilter: 'blur(12px)' } : {}),
  },
  aiCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  aiCardTitle: {
    color: '#C4B5FD',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    marginLeft: 12,
  },
  aiInsightText: {
    fontSize: 20,
    color: '#F7F8FC',
    lineHeight: 30,
    marginBottom: 32,
  },
  aiActionBox: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 20,
    borderRadius: 8,
    marginBottom: 32,
    borderLeftWidth: 2,
    borderColor: '#7C3AED',
  },
  aiActionLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  aiActionText: {
    fontSize: 16,
    color: '#F7F8FC',
    fontWeight: '500',
  },
  generateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#18245C',
    borderWidth: 1,
    borderColor: '#7C3AED',
    paddingVertical: 16,
    borderRadius: 8,
  },
  generateBtnText: {
    color: '#F7F8FC',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 12,
  },

  // Experience Section
  expGrid: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  expCol: {
    width: '45%',
    backgroundColor: '#FFFFFF',
    padding: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  expTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: 1,
    marginBottom: 32,
  },
  expList: {
    marginBottom: 40,
  },
  expItem: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 16,
  },
  expLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expLinkText: {
    color: '#4F46E5',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
    marginRight: 12,
  },

  // Journey Section
  journeyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 40,
    flexWrap: 'wrap',
  },
  journeyStep: {
    alignItems: 'center',
    flexDirection: 'column',
    width: 80,
  },
  journeyNode: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4F46E5',
    marginBottom: 16,
  },
  journeyText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: 1,
  },
  journeyLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
    marginTop: -28, // align with node
  },

  // Final CTA
  ctaSection: {
    backgroundColor: '#05070E',
    paddingVertical: 120,
    paddingHorizontal: '10%',
    alignItems: 'center',
  },
  ctaHeading: {
    fontSize: 56,
    lineHeight: 64,
    fontWeight: '800',
    color: '#F7F8FC',
    textAlign: 'center',
    marginBottom: 24,
  },
  ctaSubtitle: {
    fontSize: 20,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 48,
  },
  ctaActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Footer
  footer: {
    backgroundColor: '#080B16',
    paddingTop: 80,
    paddingBottom: 40,
    paddingHorizontal: '10%',
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  footerGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 60,
  },
  footerBrand: {
    flex: 2,
  },
  footerLogo: {
    color: '#F7F8FC',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 4,
  },
  footerSubLogo: {
    color: '#818CF8',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
  },
  footerLinks: {
    flex: 1,
  },
  footerColTitle: {
    color: '#F7F8FC',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 24,
  },
  footerLink: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 16,
  },
  footerBottom: {
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    paddingTop: 24,
  },
  footerCopyright: {
    color: '#6B7280',
    fontSize: 14,
  }
});
