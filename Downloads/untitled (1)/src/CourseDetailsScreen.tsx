import React, { useState, useRef, useEffect } from 'react';
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
import { Search, Clock, BookOpen, Star, Sparkles, ChevronLeft, Download, Share, Bookmark, CheckCircle, ArrowRight, Book, Play, Target, Network } from 'lucide-react';
import { SweepButton, TactileButton, PremiumLoader, AIAnalyzeButton } from './components/CoursesUI';
import CinematicBackground from './components/CinematicBackground';

// -- COMPONENTS -- //

const NavBar = ({ onNavigateHome, onNavigateLogin, onNavigateCourses, isScrolled }: any) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <Animated.View style={[
      styles.navBar,
      isScrolled && styles.navBarScrolled
    ]}>
      <TouchableOpacity style={styles.navLeft} onPress={onNavigateHome}>
        <Text style={styles.navLogo}>EDUCORE</Text>
        {!isMobile && <Text style={styles.navSubLogo}>ACADEMIC INTELLIGENCE PLATFORM</Text>}
      </TouchableOpacity>

      {!isMobile && (
        <View style={styles.navCenter}>
          <TouchableOpacity style={styles.navLink} onPress={onNavigateHome}><Text style={styles.navLinkText}>Home</Text></TouchableOpacity>
          <TouchableOpacity style={styles.navLinkActive} onPress={onNavigateCourses}><Text style={styles.navLinkTextActive}>Courses</Text></TouchableOpacity>
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

// TEMPLATE #1: 3D Hero Visual (Abstract ML)
const HeroVisual3D = () => {
  const [hovered, setHovered] = useState(false);
  const hoverAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(hoverAnim, {
      toValue: hovered ? 1 : 0,
      duration: 600,
      useNativeDriver: false
    }).start();
  }, [hovered]);

  const translateY = hoverAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -10] });
  const rotateX = hoverAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '5deg'] });
  const rotateY = hoverAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-5deg'] });

  return (
    <View style={{ perspective: 1000, alignItems: 'center', justifyContent: 'center' } as any}>
      <Animated.View
        style={[
          styles.hero3DCard,
          {
            transform: [{ translateY }, { rotateX }, { rotateY }],
            // @ts-ignore
            boxShadow: Platform.OS === 'web' 
              ? (hovered ? '0 30px 60px rgba(124, 58, 237, 0.3)' : '0 15px 35px rgba(124, 58, 237, 0.15)')
              : undefined,
          }
        ]}
        // @ts-ignore
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <View style={styles.heroGlassLayer}>
           {/* Abstract Neural/ML Pattern */}
           <View style={styles.abstractNodeContainer}>
              <View style={[styles.abstractNode, { top: '20%', left: '20%' }]} />
              <View style={[styles.abstractNode, { top: '30%', right: '25%' }]} />
              <View style={[styles.abstractNode, { bottom: '25%', left: '30%' }]} />
              <View style={[styles.abstractNode, { bottom: '20%', right: '20%' }]} />
              
              {/* Lines */}
              <View style={[styles.abstractLine, { top: '25%', left: '25%', width: '50%', transform: [{rotate: '15deg'}] }]} />
              <View style={[styles.abstractLine, { top: '50%', left: '30%', width: '40%', transform: [{rotate: '-45deg'}] }]} />
              <View style={[styles.abstractLine, { bottom: '30%', right: '25%', width: '45%', transform: [{rotate: '20deg'}] }]} />
           </View>
           
           <View style={[styles.abstractCircle, { width: 200, height: 200, opacity: 0.1 }]} />
           <View style={[styles.abstractCircle, { width: 140, height: 140, opacity: 0.15 }]} />
           <View style={[styles.abstractCircle, { width: 80, height: 80, opacity: 0.25, backgroundColor: 'rgba(124, 58, 237, 0.2)' }]} />
           
           <Network size={40} color="#E1D4FD" style={{ position: 'absolute' }} />
        </View>
      </Animated.View>
    </View>
  );
};

// TEMPLATE #4: Holographic Course Credential
const HoloCredential = () => {
  const [hovered, setHovered] = useState(false);
  const holoAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(holoAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: false
      })
    ).start();
  }, []);

  const translateXPx = holoAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 600]
  });

  return (
    <View 
      style={styles.holoContainer}
      // @ts-ignore
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
       <View style={styles.holoCard}>
          {/* Holographic animated sweep */}
          <Animated.View style={[
             styles.holoSweep,
             {
               transform: [{ translateX: translateXPx }]
             }
          ]} />
          
          <View style={styles.holoContent}>
             <View style={styles.holoHeader}>
                <Text style={styles.holoBrand}>EDUCORE</Text>
                <Text style={styles.holoLabel}>COURSE CREDENTIAL</Text>
             </View>
             
             <View style={styles.holoMain}>
                <Text style={styles.holoTitle}>MACHINE LEARNING{'\n'}FUNDAMENTALS</Text>
                <Text style={styles.holoCategory}>Artificial Intelligence</Text>
             </View>
             
             <View style={styles.holoDivider} />
             
             <View style={styles.holoMeta}>
                <View>
                   <Text style={styles.holoMetaLabel}>Duration</Text>
                   <Text style={styles.holoMetaValue}>6 Weeks</Text>
                </View>
                <View>
                   <Text style={styles.holoMetaLabel}>Lessons</Text>
                   <Text style={styles.holoMetaValue}>18</Text>
                </View>
                <View>
                   <Text style={styles.holoMetaLabel}>Level</Text>
                   <Text style={styles.holoMetaValue}>Intermediate</Text>
                </View>
             </View>
             
             <View style={styles.holoFooter}>
                {/* Barcode mock */}
                <View style={styles.holoBarcode}>
                   <View style={[styles.bar, { width: 2 }]} />
                   <View style={[styles.bar, { width: 4 }]} />
                   <View style={[styles.bar, { width: 1 }]} />
                   <View style={[styles.bar, { width: 3 }]} />
                   <View style={[styles.bar, { width: 2 }]} />
                   <View style={[styles.bar, { width: 5 }]} />
                   <View style={[styles.bar, { width: 1 }]} />
                   <View style={[styles.bar, { width: 3 }]} />
                   <View style={[styles.bar, { width: 2 }]} />
                   <View style={[styles.bar, { width: 4 }]} />
                   <View style={[styles.bar, { width: 2 }]} />
                   <View style={[styles.bar, { width: 1 }]} />
                   <View style={[styles.bar, { width: 3 }]} />
                </View>
                <Text style={styles.holoId}>ID: AI-ML-024</Text>
             </View>
          </View>
       </View>
    </View>
  );
};

// TEMPLATE #7: Corner Reveal Module Card
const ModuleCard = ({ number, title, lessons, desc }: any) => {
  const [hovered, setHovered] = useState(false);
  const hoverAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(hoverAnim, {
      toValue: hovered ? 1 : 0,
      duration: 400,
      useNativeDriver: false
    }).start();
  }, [hovered]);

  const cornerSize = hoverAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 1000] // large enough to cover the card
  });

  const contentOpacity = hoverAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1]
  });

  return (
    <View 
      style={styles.moduleCard}
      // @ts-ignore
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <View style={styles.moduleNormalContent}>
         <Text style={styles.moduleNum}>{number}</Text>
         <Text style={styles.moduleTitle}>{title}</Text>
         <View style={styles.moduleMetaRow}>
            <BookOpen size={14} color="#6B7280" />
            <Text style={styles.moduleMetaText}>{lessons} Lessons</Text>
         </View>
      </View>
      
      <Animated.View style={[
        styles.moduleRevealCorner,
        {
          width: cornerSize,
          height: cornerSize,
          borderRadius: hoverAnim.interpolate({ inputRange: [0,1], outputRange: [24, 0] }) 
        }
      ]}>
        <Animated.View style={[styles.moduleRevealContent, { opacity: contentOpacity }]}>
          <Text style={styles.moduleRevealTitle}>{title}</Text>
          <Text style={styles.moduleRevealDesc}>{desc}</Text>
          <View style={styles.moduleRevealBtn}>
            <Play size={14} color="#818CF8" style={{marginRight: 8}} />
            <Text style={styles.moduleRevealBtnText}>View Module</Text>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default function CourseDetailsScreen({ onNavigateHome, onNavigateLogin, onNavigateCourses }: any) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isGeneratingPath, setIsGeneratingPath] = useState(false);
  const [pathGenerated, setPathGenerated] = useState(false);
  
  const handleScroll = (e: any) => {
    const y = e.nativeEvent.contentOffset.y;
    setIsScrolled(y > 50);
  };

  const generatePath = () => {
    setIsGeneratingPath(true);
    setTimeout(() => {
      setIsGeneratingPath(false);
      setPathGenerated(true);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <NavBar onNavigateHome={onNavigateHome} onNavigateLogin={onNavigateLogin} onNavigateCourses={onNavigateCourses} isScrolled={isScrolled} />
      
      <ScrollView 
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
         {/* DARK CINEMATIC TOP SECTION */}
         <View style={styles.darkSection}>
            <CinematicBackground />
            <View style={styles.darkOverlay} />
            
            <View style={[styles.heroContent, isMobile && { flexDirection: 'column' }]}>
               <View style={[styles.heroLeft, isMobile && { width: '100%', paddingRight: 0, marginBottom: 40 }]}>
                  {/* Breadcrumb */}
                  <View style={styles.breadcrumb}>
                     <TouchableOpacity style={styles.backBtn} onPress={onNavigateCourses}>
                        <ChevronLeft size={16} color="#9CA3AF" />
                        <Text style={styles.backText}>Back to Courses</Text>
                     </TouchableOpacity>
                     <Text style={styles.bcDivider}>/</Text>
                     <Text style={styles.bcText}>Artificial Intelligence</Text>
                     <Text style={styles.bcDivider}>/</Text>
                     <Text style={styles.bcActive}>Machine Learning</Text>
                  </View>
                  
                  <Text style={styles.heroCategory}>ARTIFICIAL INTELLIGENCE</Text>
                  <Text style={[styles.heroTitle, isMobile && { fontSize: 40, lineHeight: 48 }]}>
                     MACHINE LEARNING{'\n'}
                     <Text style={styles.heroHighlight}>FUNDAMENTALS</Text>
                  </Text>
                  <Text style={styles.heroDesc}>
                     Build a strong foundation in machine learning concepts, algorithms, model evaluation, and practical problem solving.
                  </Text>
                  
                  <View style={styles.heroMeta}>
                     <View style={styles.metaItem}><BookOpen size={16} color="#9CA3AF" /><Text style={styles.metaText}>18 Lessons</Text></View>
                     <View style={styles.metaDivider} />
                     <View style={styles.metaItem}><Clock size={16} color="#9CA3AF" /><Text style={styles.metaText}>6 Weeks</Text></View>
                     <View style={styles.metaDivider} />
                     <View style={styles.metaItem}><Target size={16} color="#9CA3AF" /><Text style={styles.metaText}>Intermediate</Text></View>
                     <View style={styles.metaDivider} />
                     <View style={styles.metaItem}><Star size={16} color="#F59E0B" fill="#F59E0B" /><Text style={styles.metaText}>4.8 (1.2k)</Text></View>
                  </View>
                  
                  <View style={[styles.actionRow, isMobile && { flexDirection: 'column' }]}>
                     <SweepButton title="ENROLL NOW →" style={isMobile ? { width: '100%', marginBottom: 16 } : { marginRight: 16 }} />
                     <View style={styles.secondaryActions}>
                        <TactileButton title={<Bookmark size={18} color="#4B5563" />} style={styles.iconBtn} />
                        <TactileButton title={<Share size={18} color="#4B5563" />} style={styles.iconBtn} />
                     </View>
                  </View>
               </View>
               
               <View style={[styles.heroRight, isMobile && { width: '100%', alignItems: 'center' }]}>
                  <HeroVisual3D />
               </View>
            </View>
         </View>
         
         {/* LIGHT PEARL CONTENT SECTION */}
         <View style={styles.lightSection}>
            <View style={[styles.contentLayout, isMobile && { flexDirection: 'column' }]}>
               
               {/* Left Column - Main Content */}
               <View style={[styles.mainColumn, isMobile && { width: '100%', paddingRight: 0 }]}>
                  
                  {/* OVERVIEW */}
                  <View style={styles.contentBlock}>
                     <Text style={styles.blockTitle}>ABOUT THIS COURSE</Text>
                     <Text style={styles.blockText}>
                        Machine Learning Fundamentals introduces the core ideas behind supervised and unsupervised learning, model evaluation, feature engineering, and practical machine learning workflows. Designed for students who want to build a rigorous academic understanding before diving into complex frameworks.
                     </Text>
                  </View>
                  
                  {/* OUTCOMES */}
                  <View style={styles.contentBlock}>
                     <Text style={styles.blockTitle}>WHAT YOU'LL LEARN</Text>
                     <View style={styles.outcomesGrid}>
                        {[
                           'Understand core machine learning concepts',
                           'Prepare and transform datasets',
                           'Build supervised learning models',
                           'Explore unsupervised learning',
                           'Evaluate model performance',
                           'Apply machine learning to real problems'
                        ].map((outcome, i) => (
                           <React.Fragment key={i}>
                             <View style={styles.outcomeItem}>
                                <CheckCircle size={20} color="#4F46E5" style={{ marginRight: 12, marginTop: 2 }} />
                                <Text style={styles.outcomeText}>{outcome}</Text>
                             </View>
                           </React.Fragment>
                        ))}
                     </View>
                  </View>
                  
                  {/* MODULES (Temp #7) */}
                  <View style={styles.contentBlock}>
                     <Text style={styles.blockTitle}>COURSE CONTENT</Text>
                     <View style={styles.modulesGrid}>
                        <ModuleCard number="01" title="Machine Learning Foundations" lessons={5} desc="Introduction to ML paradigms, history, and core mathematical foundations required for algorithms." />
                        <ModuleCard number="02" title="Data Preparation" lessons={4} desc="Techniques for cleaning, scaling, and transforming datasets for optimal model performance." />
                        <ModuleCard number="03" title="Supervised Learning" lessons={5} desc="Linear regression, logistic regression, decision trees, and support vector machines." />
                        <ModuleCard number="04" title="Unsupervised Learning" lessons={4} desc="Clustering algorithms, K-means, PCA, and anomaly detection." />
                        <ModuleCard number="05" title="Model Evaluation" lessons={3} desc="Cross-validation, confusion matrices, ROC curves, and bias-variance tradeoff." />
                        <ModuleCard number="06" title="Practical Project" lessons={3} desc="Apply learned concepts to a real-world dataset and present findings." />
                     </View>
                  </View>
                  
               </View>
               
               {/* Right Column - Sidebar */}
               <View style={[styles.sideColumn, isMobile && { width: '100%', marginTop: 40 }]}>
                  {/* CREDENTIAL (Temp #4) */}
                  <View style={{ marginBottom: 40 }}>
                     <HoloCredential />
                  </View>
                  
                  {/* INSTRUCTOR (Temp #5 Style) */}
                  <View style={styles.instructorCard}>
                     <Text style={styles.instructorLabel}>YOUR INSTRUCTOR</Text>
                     <Text style={styles.instructorName}>Dr. Arjun Mehta</Text>
                     <Text style={styles.instructorRole}>Senior AI & Machine Learning Instructor</Text>
                     
                     <View style={styles.instMeta}>
                        <View style={styles.instStat}><Text style={styles.instStatVal}>12</Text><Text style={styles.instStatLbl}>Courses</Text></View>
                        <View style={styles.instStat}><Text style={styles.instStatVal}>8y</Text><Text style={styles.instStatLbl}>Experience</Text></View>
                        <View style={styles.instStat}><Text style={styles.instStatVal}>18K</Text><Text style={styles.instStatLbl}>Learners</Text></View>
                     </View>
                     
                     <TouchableOpacity style={styles.instLink}>
                        <Text style={styles.instLinkText}>View Instructor →</Text>
                     </TouchableOpacity>
                  </View>
                  
                  {/* REQUIREMENTS */}
                  <View style={styles.requirementsBlock}>
                     <Text style={styles.reqTitle}>BEFORE YOU BEGIN</Text>
                     <Text style={styles.reqSub}>Prerequisites:</Text>
                     <Text style={styles.reqItem}>• Basic programming knowledge</Text>
                     <Text style={styles.reqItem}>• Basic mathematics (Algebra)</Text>
                     <Text style={styles.reqItem}>• Understanding of fundamental algorithms</Text>
                     
                     <Text style={[styles.reqSub, { marginTop: 16 }]}>Tools used:</Text>
                     <Text style={styles.reqItem}>• Python</Text>
                     <Text style={styles.reqItem}>• Jupyter Notebook</Text>
                  </View>
               </View>
            </View>
         </View>
         
         {/* AI INTELLIGENCE SECTION */}
         <View style={styles.aiSection}>
            <View style={styles.aiContent}>
               <Text style={styles.aiHeading}>LEARN WITH{'\n'}INTELLIGENCE.</Text>
               <Text style={styles.aiSubtitle}>Let AI help you understand how this course fits into your academic journey.</Text>
            </View>
            
            <View style={styles.aiCard}>
               <View style={styles.aiCardHeader}>
                  <Sparkles size={16} color="#7C3AED" />
                  <Text style={styles.aiCardTitle}>COURSE INTELLIGENCE</Text>
               </View>
               
               {isGeneratingPath ? (
                  <View style={styles.aiGenerating}>
                     <PremiumLoader />
                     <Text style={styles.aiGenText}>ANALYZING YOUR LEARNING PATH...</Text>
                     <Text style={styles.aiGenSub}>Reviewing course structure & progress</Text>
                  </View>
               ) : pathGenerated ? (
                  <View style={styles.aiResult}>
                     <Text style={styles.aiRecTitle}>Insight:</Text>
                     <Text style={styles.aiRecWhyText}>Based on your academic profile, completing the Supervised Learning module will directly improve your performance in upcoming Computer Science assignments.</Text>
                     <Text style={[styles.aiRecTitle, { marginTop: 16 }]}>Personalized Path Ready.</Text>
                  </View>
               ) : (
                  <>
                     <Text style={styles.aiRecWhyText}>Analyze this course against your current progress to receive a personalized learning strategy and priority module recommendations.</Text>
                     <AIAnalyzeButton title="GENERATE LEARNING PATH" onPress={generatePath} style={{ marginTop: 24, alignSelf: 'flex-start' }} />
                  </>
               )}
            </View>
         </View>
         
         {/* RELATED COURSES */}
         <View style={styles.relatedSection}>
            <Text style={styles.blockTitle}>CONTINUE EXPLORING</Text>
            <View style={[styles.relatedGrid, isMobile && { flexDirection: 'column' }]}>
               {['Deep Learning', 'Natural Language Processing', 'Computer Vision'].map((course, i) => (
                  <React.Fragment key={i}>
                    <View style={[styles.relatedCard, isMobile ? { width: '100%', marginBottom: 16 } : { width: '31%' }]}>
                       <Text style={styles.relCategory}>ARTIFICIAL INTELLIGENCE</Text>
                       <Text style={styles.relTitle}>{course}</Text>
                       <TactileButton title="Explore →" style={{ marginTop: 16, alignSelf: 'flex-start', paddingVertical: 8, paddingHorizontal: 16 }} />
                    </View>
                  </React.Fragment>
               ))}
            </View>
         </View>
         
         {/* FINAL CTA */}
         <View style={styles.finalCta}>
            <Text style={styles.finalCtaTitle}>READY TO{'\n'}START LEARNING?</Text>
            <Text style={styles.finalCtaSub}>Turn your next hour into meaningful progress.</Text>
            <View style={styles.finalCtaActions}>
               <SweepButton title="START COURSE →" style={{ marginRight: 16 }} />
               <TactileButton title="SAVE FOR LATER" active={true} style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }} />
            </View>
         </View>
         
      </ScrollView>
    </View>
  );
}

// -- STYLES -- //
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080B16' },
  scrollView: { flex: 1 },
  
  // NavBar
  navBar: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 80,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 40, zIndex: 100, backgroundColor: 'transparent',
  },
  navBarScrolled: {
    backgroundColor: 'rgba(8,11,22,0.95)',
    ...(Platform.OS === 'web' ? { backdropFilter: 'blur(16px)', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' } : {}),
  },
  navLeft: { flexDirection: 'column' },
  navLogo: { color: '#F7F8FC', fontSize: 20, fontWeight: '800', letterSpacing: 2 },
  navSubLogo: { color: '#818CF8', fontSize: 10, fontWeight: '600', letterSpacing: 1, marginTop: 2 },
  navCenter: { flexDirection: 'row', alignItems: 'center', position: 'absolute', left: 0, right: 0, justifyContent: 'center', pointerEvents: 'box-none' },
  navLink: { marginHorizontal: 20 },
  navLinkActive: { marginHorizontal: 20, borderBottomWidth: 2, borderBottomColor: '#818CF8', paddingBottom: 4 },
  navLinkText: { color: '#9CA3AF', fontSize: 14, fontWeight: '500' },
  navLinkTextActive: { color: '#F7F8FC', fontSize: 14, fontWeight: '700' },
  navRight: { flexDirection: 'row', alignItems: 'center' },
  navIconBtn: { marginRight: 24 },
  navSignIn: { marginRight: 24 },
  navSignInText: { color: '#F7F8FC', fontSize: 14, fontWeight: '600' },
  navGetStarted: { backgroundColor: '#F7F8FC', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 6 },
  navGetStartedText: { color: '#111827', fontSize: 14, fontWeight: '600' },

  // Dark Section (Hero)
  darkSection: { position: 'relative', paddingTop: 120, paddingBottom: 100, overflow: 'hidden' },
  darkOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(8,11,22,0.6)' },
  heroContent: { flexDirection: 'row', paddingHorizontal: '10%', zIndex: 10 },
  heroLeft: { width: '55%', paddingRight: '5%', justifyContent: 'center' },
  heroRight: { width: '45%', justifyContent: 'center', alignItems: 'center' },
  
  breadcrumb: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginBottom: 32 },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginRight: 12, paddingVertical: 6, paddingHorizontal: 12, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 20 },
  backText: { color: '#D1D5DB', fontSize: 12, fontWeight: '600', marginLeft: 4 },
  bcDivider: { color: '#4B5563', marginHorizontal: 8, fontSize: 12 },
  bcText: { color: '#9CA3AF', fontSize: 12 },
  bcActive: { color: '#F7F8FC', fontSize: 12, fontWeight: '600' },

  heroCategory: { fontSize: 12, fontWeight: '700', color: '#818CF8', letterSpacing: 2, marginBottom: 16 },
  heroTitle: { fontSize: 56, lineHeight: 64, fontWeight: '800', color: '#F7F8FC', letterSpacing: -1, marginBottom: 24 },
  heroHighlight: { color: '#A78BFA' },
  heroDesc: { fontSize: 18, color: '#D1D5DB', lineHeight: 28, maxWidth: 600, marginBottom: 32 },
  
  heroMeta: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginBottom: 40 },
  metaItem: { flexDirection: 'row', alignItems: 'center' },
  metaText: { color: '#F7F8FC', fontSize: 14, fontWeight: '500', marginLeft: 8 },
  metaDivider: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#4B5563', marginHorizontal: 16 },

  actionRow: { flexDirection: 'row', alignItems: 'center' },
  secondaryActions: { flexDirection: 'row' },
  iconBtn: { paddingVertical: 12, paddingHorizontal: 12, marginRight: 12 },

  // Hero 3D Visual (Temp #1)
  hero3DCard: {
    width: 340, height: 340, borderRadius: 32,
    backgroundColor: 'rgba(24, 36, 92, 0.4)',
    borderWidth: 1, borderColor: 'rgba(124, 58, 237, 0.3)',
    justifyContent: 'center', alignItems: 'center',
    overflow: 'hidden'
  },
  heroGlassLayer: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' },
  abstractCircle: { position: 'absolute', borderRadius: 200, borderWidth: 1, borderColor: '#A78BFA' },
  abstractNodeContainer: { position: 'absolute', width: '100%', height: '100%' },
  abstractNode: { position: 'absolute', width: 8, height: 8, borderRadius: 4, backgroundColor: '#E1D4FD', ...(Platform.OS==='web' ? {boxShadow: '0 0 10px #C4B5FD'}:{}) },
  abstractLine: { position: 'absolute', height: 1, backgroundColor: 'rgba(167, 139, 250, 0.4)' },

  // Light Section
  lightSection: { backgroundColor: '#F7F8FC', paddingVertical: 80, paddingHorizontal: '10%', borderTopLeftRadius: 40, borderTopRightRadius: 40, marginTop: -40, zIndex: 20 },
  contentLayout: { flexDirection: 'row' },
  mainColumn: { width: '65%', paddingRight: '8%' },
  sideColumn: { width: '35%' },

  // Content Blocks
  contentBlock: { marginBottom: 60 },
  blockTitle: { fontSize: 16, fontWeight: '800', color: '#111827', letterSpacing: 1.5, marginBottom: 24 },
  blockText: { fontSize: 16, color: '#4B5563', lineHeight: 28 },

  outcomesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  outcomeItem: { width: Platform.OS === 'web' && window.innerWidth >= 768 ? '48%' : '100%', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20 },
  outcomeText: { flex: 1, fontSize: 15, color: '#374151', lineHeight: 24 },

  modulesGrid: { flexDirection: 'column' },

  // Module Card (Temp #7)
  moduleCard: {
    backgroundColor: '#FFFFFF', borderRadius: 16, borderWidth: 1, borderColor: '#E5E7EB',
    padding: 24, marginBottom: 16, position: 'relative', overflow: 'hidden'
  },
  moduleNormalContent: { flexDirection: 'row', alignItems: 'center' },
  moduleNum: { fontSize: 24, fontWeight: '800', color: '#E5E7EB', marginRight: 24, width: 40 },
  moduleTitle: { flex: 1, fontSize: 18, fontWeight: '700', color: '#111827' },
  moduleMetaRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  moduleMetaText: { fontSize: 12, fontWeight: '600', color: '#4B5563', marginLeft: 6 },
  
  moduleRevealCorner: { position: 'absolute', top: -1, right: -1, backgroundColor: '#18245C', borderBottomLeftRadius: 24, justifyContent: 'center', alignItems: 'center' },
  moduleRevealContent: { padding: 32, alignItems: 'flex-start', width: '100%', height: '100%', justifyContent: 'center' },
  moduleRevealTitle: { color: '#F7F8FC', fontSize: 18, fontWeight: '700', marginBottom: 12 },
  moduleRevealDesc: { color: '#9CA3AF', fontSize: 14, lineHeight: 22, marginBottom: 20, maxWidth: '80%' },
  moduleRevealBtn: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#818CF8', paddingBottom: 4 },
  moduleRevealBtnText: { color: '#818CF8', fontSize: 14, fontWeight: '700', letterSpacing: 1 },

  // Holographic Credential (Temp #4)
  holoContainer: { perspective: 1000 } as any,
  holoCard: {
    backgroundColor: '#FFFFFF', borderRadius: 16, overflow: 'hidden', position: 'relative',
    borderWidth: 1, borderColor: '#E5E7EB',
    ...(Platform.OS === 'web' ? { boxShadow: '0 20px 40px rgba(8,11,22,0.08)' } : { elevation: 10 })
  },
  holoSweep: {
    position: 'absolute', top: -100, bottom: -100, width: '200%',
    ...(Platform.OS === 'web' ? {
      backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(124, 58, 237, 0.1) 40%, rgba(255,255,255,0.4) 50%, rgba(124, 58, 237, 0.1) 60%, rgba(255,255,255,0) 100%)',
      mixBlendMode: 'screen'
    } : { backgroundColor: 'rgba(124, 58, 237, 0.1)' }),
    zIndex: 10, pointerEvents: 'none', transform: [{rotate: '15deg'}]
  },
  holoContent: { padding: 24, zIndex: 1 },
  holoHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 },
  holoBrand: { fontSize: 14, fontWeight: '800', color: '#111827', letterSpacing: 2 },
  holoLabel: { fontSize: 10, fontWeight: '700', color: '#818CF8', letterSpacing: 1 },
  holoMain: { marginBottom: 32 },
  holoTitle: { fontSize: 24, fontWeight: '800', color: '#111827', lineHeight: 30, marginBottom: 8 },
  holoCategory: { fontSize: 14, color: '#6B7280' },
  holoDivider: { height: 1, width: '100%', backgroundColor: '#E5E7EB', borderStyle: 'dashed', marginBottom: 32 },
  holoMeta: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
  holoMetaLabel: { fontSize: 10, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  holoMetaValue: { fontSize: 14, fontWeight: '700', color: '#111827' },
  holoFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  holoBarcode: { flexDirection: 'row', height: 24, alignItems: 'center' },
  bar: { backgroundColor: '#111827', height: '100%', marginRight: 2 },
  holoId: { fontSize: 12, color: '#6B7280', fontFamily: 'monospace' },

  // Instructor (Temp #5)
  instructorCard: {
    backgroundColor: 'rgba(24, 36, 92, 0.6)', 
    borderRadius: 16, 
    padding: 24, 
    marginBottom: 40,
    borderWidth: 1, 
    borderColor: 'rgba(124, 58, 237, 0.4)',
    ...(Platform.OS === 'web' ? { backdropFilter: 'blur(16px)', boxShadow: '0 10px 40px rgba(124, 58, 237, 0.15)' } : {})
  },
  instructorLabel: { fontSize: 12, fontWeight: '700', color: '#E1D4FD', letterSpacing: 1.5, marginBottom: 16 },
  instructorName: { fontSize: 20, fontWeight: '800', color: '#F7F8FC', marginBottom: 4 },
  instructorRole: { fontSize: 14, color: '#C4B5FD', marginBottom: 24 },
  instMeta: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24, paddingBottom: 24, borderBottomWidth: 1, borderBottomColor: 'rgba(124, 58, 237, 0.2)' },
  instStat: { alignItems: 'flex-start' },
  instStatVal: { fontSize: 16, fontWeight: '700', color: '#F7F8FC' },
  instStatLbl: { fontSize: 12, color: '#C4B5FD' },
  instLink: {},
  instLinkText: { color: '#E1D4FD', fontSize: 14, fontWeight: '700' },

  // Requirements
  requirementsBlock: { padding: 24, backgroundColor: '#F3F4F6', borderRadius: 16 },
  reqTitle: { fontSize: 14, fontWeight: '700', color: '#111827', letterSpacing: 1, marginBottom: 16 },
  reqSub: { fontSize: 14, fontWeight: '600', color: '#4B5563', marginBottom: 8 },
  reqItem: { fontSize: 14, color: '#6B7280', marginBottom: 4, paddingLeft: 8 },

  // AI Intelligence (Temp #9)
  aiSection: { backgroundColor: '#080B16', marginHorizontal: '10%', padding: 60, borderRadius: 24, flexDirection: Platform.OS === 'web' && window.innerWidth >= 768 ? 'row' : 'column', alignItems: 'center', marginBottom: 80 },
  aiContent: { flex: 1, paddingRight: 40 },
  aiHeading: { fontSize: 40, fontWeight: '800', color: '#F7F8FC', lineHeight: 48, marginBottom: 16 },
  aiSubtitle: { fontSize: 18, color: '#9CA3AF', lineHeight: 28 },
  aiCard: { flex: 1, backgroundColor: 'rgba(24, 36, 92, 0.4)', borderWidth: 1, borderColor: 'rgba(124, 58, 237, 0.3)', borderRadius: 16, padding: 32, width: '100%', marginTop: Platform.OS === 'web' && window.innerWidth >= 768 ? 0 : 40 },
  aiCardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  aiCardTitle: { color: '#C4B5FD', fontSize: 12, fontWeight: '700', letterSpacing: 2, marginLeft: 12 },
  aiGenerating: { alignItems: 'center', paddingVertical: 20 },
  aiGenText: { color: '#F7F8FC', fontSize: 14, fontWeight: '700', letterSpacing: 1, marginTop: 16 },
  aiGenSub: { color: '#9CA3AF', fontSize: 12, marginTop: 8 },
  aiResult: { paddingVertical: 10 },
  aiRecTitle: { color: '#818CF8', fontSize: 14, fontWeight: '600', marginBottom: 8 },
  aiRecWhyText: { color: '#E5E7EB', fontSize: 16, lineHeight: 24 },

  // Related Courses
  relatedSection: { paddingHorizontal: '10%', paddingBottom: 80, backgroundColor: '#F7F8FC' },
  relatedGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  relatedCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 24, borderWidth: 1, borderColor: '#E5E7EB', ...(Platform.OS === 'web' ? {boxShadow: '0 4px 12px rgba(8,11,22,0.05)'}:{elevation:2}) },
  relCategory: { fontSize: 10, fontWeight: '700', color: '#4F46E5', letterSpacing: 1.5, marginBottom: 12 },
  relTitle: { fontSize: 18, fontWeight: '700', color: '#111827', lineHeight: 26 },

  // Final CTA
  finalCta: { backgroundColor: '#080B16', paddingVertical: 100, alignItems: 'center', justifyContent: 'center' },
  finalCtaTitle: { fontSize: 48, fontWeight: '800', color: '#F7F8FC', textAlign: 'center', lineHeight: 56, marginBottom: 16 },
  finalCtaSub: { fontSize: 20, color: '#9CA3AF', textAlign: 'center', marginBottom: 40 },
  finalCtaActions: { flexDirection: 'row', alignItems: 'center' }
});
