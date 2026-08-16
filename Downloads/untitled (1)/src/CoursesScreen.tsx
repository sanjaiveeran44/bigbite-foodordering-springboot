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
  TextInput,
} from 'react-native';
import { Search, ChevronDown, CheckCircle, Clock, BookOpen, Star, Sparkles, Filter, X } from 'lucide-react';
import { CATEGORIES, MOCK_COURSES, Course } from './data/courses';
import { SweepButton, TactileButton, AIAnalyzeButton, PremiumLoader } from './components/CoursesUI';
import CinematicBackground from './components/CinematicBackground';

// -- COMPONENTS -- //

const NavBar = ({ onNavigateHome, onNavigateLogin, isScrolled }: any) => {
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
          <TouchableOpacity style={styles.navLinkActive}><Text style={styles.navLinkTextActive}>Courses</Text></TouchableOpacity>
          <TouchableOpacity style={styles.navLink}><Text style={styles.navLinkText}>Contact</Text></TouchableOpacity>
        </View>
      )}

      <View style={styles.navRight}>
        {!isMobile && (
          <TouchableOpacity style={styles.navIconBtn}>
            <Search size={20} color="#111827" />
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

// TEMPLATE #7: Corner Reveal Category Card
const CategoryCard = ({ category }: { category: string }) => {
  const [hovered, setHovered] = useState(false);
  const hoverAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(hoverAnim, {
      toValue: hovered ? 1 : 0,
      duration: 400,
      useNativeDriver: false
    }).start();
  }, [hovered]);

  const cornerWidth = hoverAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 200] // 200 is the width of the card
  });

  const cornerHeight = hoverAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 120] // 120 is the height of the card
  });

  const contentOpacity = hoverAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1]
  });

  return (
    <View 
      style={styles.categoryCard}
      // @ts-ignore
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Text style={styles.categoryTitleText}>{category.replace(' ', '\n').toUpperCase()}</Text>
      
      <Animated.View style={[
        styles.categoryRevealCorner,
        {
          width: cornerWidth,
          height: cornerHeight,
          borderRadius: hoverAnim.interpolate({ inputRange: [0,1], outputRange: [24, 16] }) // match card border radius on full expansion
        }
      ]}>
        <Animated.View style={[styles.categoryRevealContent, { opacity: contentOpacity }]}>
          <Text style={styles.categoryRevealText}>12 Courses</Text>
          <Text style={styles.categoryRevealText}>8 Instructors</Text>
          <View style={styles.categoryRevealBtn}>
            <Text style={styles.categoryRevealBtnText}>Explore →</Text>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

// TEMPLATE #1 / #5: Featured Course Cards
const FeaturedCourseCard = ({ course, variant }: { course: Course, variant: '3d' | 'glass' | '3d-alt' }) => {
  const [hovered, setHovered] = useState(false);
  const hoverAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(hoverAnim, {
      toValue: hovered ? 1 : 0,
      duration: 500,
      useNativeDriver: false
    }).start();
  }, [hovered]);

  const translateY = hoverAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -8] });
  const rotateX = hoverAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '4deg'] });
  const rotateY = hoverAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-4deg'] });
  const shadowOpacity = hoverAnim.interpolate({ inputRange: [0, 1], outputRange: [0.05, 0.15] });

  const isGlass = variant === 'glass';

  return (
    <View style={{ perspective: 1000, flex: 1, marginHorizontal: 8 } as any}>
      <Animated.View
        style={[
          styles.featuredCard,
          isGlass ? styles.featuredCardGlass : styles.featuredCard3D,
          {
            transform: [{ translateY }, { rotateX }, { rotateY }],
            // @ts-ignore
            boxShadow: Platform.OS === 'web' 
              ? (isGlass 
                  ? (hovered ? '0 20px 40px rgba(124, 58, 237, 0.2)' : '0 10px 30px rgba(124, 58, 237, 0.1)')
                  : (hovered ? '0 24px 48px rgba(8,11,22,0.15)' : '0 12px 24px rgba(8,11,22,0.05)'))
              : undefined,
            elevation: hovered ? 10 : 5
          }
        ]}
        // @ts-ignore
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Visual Layer */}
        {isGlass && <View style={styles.glassRadialGlow} />}
        {!isGlass && (
          <View style={[styles.layeredCircles, variant === '3d-alt' && { right: -20, bottom: -20, top: 'auto', left: 'auto' }]}>
            <View style={[styles.circle, { width: 120, height: 120, opacity: 0.1 }]} />
            <View style={[styles.circle, { width: 80, height: 80, opacity: 0.2 }]} />
            <View style={[styles.circle, { width: 40, height: 40, opacity: 0.3 }]} />
          </View>
        )}

        <View style={styles.fcContent}>
          <Text style={[styles.fcCategory, isGlass && { color: '#C4B5FD' }]}>{course.category.toUpperCase()}</Text>
          <Text style={[styles.fcTitle, isGlass && { color: '#F7F8FC' }]}>{course.title}</Text>
          <Text style={[styles.fcInstructor, isGlass && { color: '#A78BFA' }]}>{course.instructor}</Text>
          
          <View style={styles.fcMetaRow}>
            <View style={styles.fcMetaItem}>
              <BookOpen size={14} color={isGlass ? "#C4B5FD" : "#6B7280"} />
              <Text style={[styles.fcMetaText, isGlass && { color: '#E1D4FD' }]}>{course.lessons} Lessons</Text>
            </View>
            <View style={styles.fcMetaItem}>
              <Clock size={14} color={isGlass ? "#C4B5FD" : "#6B7280"} />
              <Text style={[styles.fcMetaText, isGlass && { color: '#E1D4FD' }]}>{course.duration}</Text>
            </View>
          </View>

          {course.progress > 0 && (
            <View style={styles.fcProgress}>
              <View style={[styles.fcProgressBar, { width: `${course.progress}%` }]} />
            </View>
          )}

          <View style={{ marginTop: 'auto', paddingTop: 20 }}>
             <SweepButton 
                title={course.status === 'enrolled' ? "Continue Learning →" : "Explore Course →"} 
                primary={!isGlass}
                style={isGlass ? { borderColor: 'rgba(255,255,255,0.2)' } : {}}
             />
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

// Main Standard Course Card
const StandardCourseCard = ({ course, onViewDetails }: { course: Course, onViewDetails: (course: Course) => void }) => {
  const [hovered, setHovered] = useState(false);
  const hoverAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(hoverAnim, {
      toValue: hovered ? 1 : 0,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, [hovered]);

  const translateY = hoverAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -4] });
  const shadowOpacity = hoverAnim.interpolate({ inputRange: [0, 1], outputRange: [0.05, 0.12] });

  const getActionTitle = () => {
    if (course.status === 'enrolled') return 'Continue Learning';
    if (course.status === 'completed') return 'Review Course';
    return 'Enroll Now';
  };

  return (
    <Animated.View
      style={[
        styles.stdCard,
        {
          transform: [{ translateY }],
          // @ts-ignore
          boxShadow: Platform.OS === 'web' 
            ? (hovered ? '0 16px 32px rgba(8,11,22,0.1)' : '0 4px 12px rgba(8,11,22,0.05)')
            : undefined,
          elevation: hovered ? 6 : 2
        }
      ]}
      // @ts-ignore
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Text style={styles.stdCategory}>{course.category.toUpperCase()}</Text>
      <Text style={styles.stdTitle}>{course.title}</Text>
      <Text style={styles.stdDesc} numberOfLines={2}>{course.description}</Text>
      
      <View style={styles.stdMetaContainer}>
        <View style={styles.stdMetaRow}>
          <Star size={14} color="#F59E0B" fill="#F59E0B" />
          <Text style={styles.stdMetaTextBold}>{course.rating}</Text>
        </View>
        <View style={styles.stdMetaRow}>
          <Clock size={14} color="#6B7280" />
          <Text style={styles.stdMetaText}>{course.duration}</Text>
        </View>
        <View style={styles.stdMetaRow}>
          <Text style={styles.stdMetaText}>{course.difficulty}</Text>
        </View>
      </View>

      <View style={styles.stdActionRow}>
        <TactileButton title="View Details" onPress={() => onViewDetails(course)} />
        <SweepButton title={getActionTitle()} style={{ paddingVertical: 10, paddingHorizontal: 20 }} />
      </View>
    </Animated.View>
  );
};


// -- MAIN SCREEN -- //
export default function CoursesScreen({ onNavigateHome, onNavigateLogin, onNavigateDetails }: any) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Courses');
  const [isSearching, setIsSearching] = useState(false);

  // Mock filtering
  const filteredCourses = MOCK_COURSES.filter(c => {
    const matchesCat = selectedCategory === 'All Courses' || c.category === selectedCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleScroll = (e: any) => {
    const y = e.nativeEvent.contentOffset.y;
    setIsScrolled(y > 50);
  };

  const categoriesToExplore = CATEGORIES.filter(c => c !== 'All Courses').slice(0, 5);

  return (
    <View style={styles.container}>
      <NavBar onNavigateHome={onNavigateHome} onNavigateLogin={onNavigateLogin} isScrolled={isScrolled} />
      
      <ScrollView 
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* HERO SECTION */}
        <View style={styles.heroSection}>
          <Text style={styles.heroEyebrow}>ACADEMIC CATALOG</Text>
          <Text style={[styles.heroTitle, isMobile && { fontSize: 48, lineHeight: 56 }]}>
            EXPLORE{'\n'}YOUR NEXT{'\n'}
            <Text style={styles.heroHighlight}>BREAKTHROUGH.</Text>
          </Text>
          <Text style={styles.heroSubtitle}>
            Discover courses designed to build knowledge, strengthen skills, and improve academic performance.
          </Text>

          {/* SEARCH BAR */}
          <View style={styles.searchContainer}>
             <Search size={20} color="#6B7280" style={styles.searchIcon} />
             <TextInput 
               style={styles.searchInput}
               placeholder="Search courses, subjects, instructors..."
               placeholderTextColor="#9CA3AF"
               value={searchQuery}
               onChangeText={(text) => {
                 setSearchQuery(text);
                 setIsSearching(true);
                 setTimeout(() => setIsSearching(false), 600); // Simulate network delay
               }}
             />
          </View>
        </View>

        {/* FILTER SYSTEM */}
        <View style={styles.filterSection}>
           <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              <View style={styles.filterRow}>
                {CATEGORIES.map((cat, i) => (
                  <TactileButton 
                    key={i} 
                    title={cat} 
                    active={selectedCategory === cat}
                    onPress={() => setSelectedCategory(cat)}
                    style={{ marginRight: 12, marginBottom: 12 }}
                  />
                ))}
              </View>
           </ScrollView>
           <View style={[styles.sortContainer, isMobile && { marginTop: 16 }]}>
             <Text style={styles.sortLabel}>Sort by:</Text>
             <TactileButton title="Recommended" style={{ paddingVertical: 6, paddingHorizontal: 12 }} />
           </View>
        </View>

        {/* CATEGORY REVEAL CARDS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EXPLORE BY SUBJECT</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -40, paddingHorizontal: 40 }}>
            <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
               {categoriesToExplore.map((cat, i) => (
                 <React.Fragment key={i}>
                   <CategoryCard category={cat} />
                 </React.Fragment>
               ))}
            </View>
          </ScrollView>
        </View>

        {/* FEATURED COURSES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FEATURED COURSES</Text>
          <Text style={styles.sectionSubtitle}>Hand-picked learning experiences designed to accelerate your academic journey.</Text>
          
          <View style={[styles.featuredGrid, isMobile && { flexDirection: 'column' }]}>
             <FeaturedCourseCard course={MOCK_COURSES[0]} variant="3d" />
             {isMobile && <View style={{ height: 24 }} />}
             <FeaturedCourseCard course={MOCK_COURSES[1]} variant="glass" />
             {isMobile && <View style={{ height: 24 }} />}
             <FeaturedCourseCard course={MOCK_COURSES[2]} variant="3d-alt" />
          </View>
        </View>

        {/* AI RECOMMENDATION */}
        <View style={styles.aiSection}>
          <View style={styles.aiContent}>
             <Text style={styles.aiHeading}>RECOMMENDED{'\n'}FOR YOU</Text>
             <Text style={styles.aiSubtitle}>Based on your academic activity and learning progress.</Text>
          </View>
          
          <View style={styles.aiCard}>
             <View style={styles.aiCardHeader}>
                <Sparkles size={16} color="#7C3AED" />
                <Text style={styles.aiCardTitle}>ACADEMIC INTELLIGENCE</Text>
             </View>
             
             <Text style={styles.aiRecTitle}>Recommended next:</Text>
             <Text style={styles.aiRecCourse}>Data Structures & Algorithms</Text>
             
             <Text style={styles.aiRecWhyLabel}>Why:</Text>
             <Text style={styles.aiRecWhyText}>Your recent performance suggests that strengthening algorithmic problem-solving could improve your Computer Science progress.</Text>
             
             <AIAnalyzeButton title="ANALYZE MY LEARNING PATH" style={{ marginTop: 24, alignSelf: 'flex-start' }} />
          </View>
        </View>

        {/* ALL COURSES */}
        <View style={[styles.section, { paddingBottom: 120 }]}>
           <Text style={styles.sectionTitle}>ALL COURSES</Text>
           
           {isSearching ? (
             <PremiumLoader />
           ) : filteredCourses.length === 0 ? (
             <View style={styles.emptyState}>
               <Search size={48} color="#D1D5DB" style={{ marginBottom: 24 }} />
               <Text style={styles.emptyTitle}>No courses found.</Text>
               <Text style={styles.emptySubtitle}>Try a different subject, instructor, or keyword.</Text>
               <TactileButton title="Clear Filters" onPress={() => { setSearchQuery(''); setSelectedCategory('All Courses'); }} style={{ marginTop: 24 }} />
             </View>
           ) : (
             <View style={styles.coursesGrid}>
                {filteredCourses.map((course, i) => (
                  <React.Fragment key={course.id}>
                    <View 
                      style={[
                        styles.courseWrapper, 
                        isMobile ? { width: '100%' } : isTablet ? { width: '48%' } : { width: '31%' }
                      ]}
                    >
                      <StandardCourseCard course={course} onViewDetails={onNavigateDetails} />
                    </View>
                  </React.Fragment>
                ))}
             </View>
           )}
        </View>
      </ScrollView>
    </View>
  );
}

// -- STYLES -- //
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FC', // Light academic environment
  },
  scrollView: {
    flex: 1,
  },
  // NavBar overrides for light theme
  navBar: {
    position: 'absolute',
    top: 0, left: 0, right: 0, height: 80,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 40, zIndex: 100,
    backgroundColor: 'transparent',
  },
  navBarScrolled: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    ...(Platform.OS === 'web' ? { backdropFilter: 'blur(16px)', boxShadow: '0 4px 20px rgba(8,11,22,0.05)' } : {}),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(8,11,22,0.05)',
  },
  navLeft: { flexDirection: 'column' },
  navLogo: { color: '#111827', fontSize: 20, fontWeight: '800', letterSpacing: 2 },
  navSubLogo: { color: '#4F46E5', fontSize: 10, fontWeight: '600', letterSpacing: 1, marginTop: 2 },
  navCenter: { flexDirection: 'row', alignItems: 'center', position: 'absolute', left: 0, right: 0, justifyContent: 'center', pointerEvents: 'box-none' },
  navLink: { marginHorizontal: 20 },
  navLinkActive: { marginHorizontal: 20, borderBottomWidth: 2, borderBottomColor: '#4F46E5', paddingBottom: 4 },
  navLinkText: { color: '#6B7280', fontSize: 14, fontWeight: '500' },
  navLinkTextActive: { color: '#111827', fontSize: 14, fontWeight: '700' },
  navRight: { flexDirection: 'row', alignItems: 'center' },
  navIconBtn: { marginRight: 24 },
  navSignIn: { marginRight: 24 },
  navSignInText: { color: '#111827', fontSize: 14, fontWeight: '600' },
  navGetStarted: { backgroundColor: '#18245C', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 6 },
  navGetStartedText: { color: '#F7F8FC', fontSize: 14, fontWeight: '600' },

  // Hero Section
  heroSection: {
    paddingTop: 160,
    paddingBottom: 60,
    paddingHorizontal: '10%',
    position: 'relative',
  },
  heroEyebrow: {
    fontSize: 12, fontWeight: '700', color: '#4F46E5', letterSpacing: 2, marginBottom: 16,
  },
  heroTitle: {
    fontSize: 72, lineHeight: 80, fontWeight: '800', color: '#111827', letterSpacing: -1, marginBottom: 24,
  },
  heroHighlight: {
    color: '#7C3AED',
  },
  heroSubtitle: {
    fontSize: 20, color: '#6B7280', lineHeight: 30, maxWidth: 600, marginBottom: 48,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 24,
    height: 64,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    maxWidth: 800,
    ...(Platform.OS === 'web' ? { 
      boxShadow: '0 8px 30px rgba(8,11,22,0.04)',
      transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
    } : { elevation: 2 }),
  },
  searchIcon: { marginRight: 16 },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#111827',
    outlineStyle: 'none'
  } as any,

  // Filters
  filterSection: {
    paddingHorizontal: '10%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 40,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterScroll: {
    flex: 1,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  sortLabel: {
    fontSize: 14, color: '#6B7280', marginRight: 12,
  },

  // Generic Sections
  section: {
    paddingVertical: 80,
    paddingHorizontal: '10%',
  },
  sectionTitle: {
    fontSize: 14, fontWeight: '700', color: '#18245C', letterSpacing: 2, marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 24, color: '#4B5563', maxWidth: 600, lineHeight: 34, marginBottom: 40,
  },

  // Category Reveal Card (Temp #7)
  categoryCard: {
    width: 200,
    height: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 20,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  categoryTitleText: {
    fontSize: 16, fontWeight: '800', color: '#111827', letterSpacing: 1, lineHeight: 22,
  },
  categoryRevealCorner: {
    position: 'absolute',
    top: -1, right: -1,
    backgroundColor: '#18245C', // Deep Indigo
    borderBottomLeftRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryRevealContent: {
    padding: 24,
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  categoryRevealText: {
    color: '#F7F8FC', fontSize: 14, fontWeight: '500', marginBottom: 8,
  },
  categoryRevealBtn: {
    marginTop: 16, borderBottomWidth: 1, borderBottomColor: '#818CF8', paddingBottom: 4,
  },
  categoryRevealBtnText: {
    color: '#818CF8', fontSize: 12, fontWeight: '700', letterSpacing: 1,
  },

  // Featured Courses (Temp #1 & #5)
  featuredGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -8,
  },
  featuredCard: {
    flex: 1,
    borderRadius: 24,
    padding: 32,
    minHeight: 380,
    position: 'relative',
    overflow: 'hidden',
  },
  featuredCard3D: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  featuredCardGlass: {
    backgroundColor: 'rgba(24, 36, 92, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.3)',
  },
  layeredCircles: {
    position: 'absolute',
    top: -30, left: -30,
    width: 200, height: 200,
    justifyContent: 'center', alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#4F46E5',
  },
  glassRadialGlow: {
    position: 'absolute',
    top: '-50%', right: '-50%',
    width: '100%', height: '100%',
    backgroundColor: 'rgba(124, 58, 237, 0.15)',
    ...(Platform.OS === 'web' ? { filter: 'blur(60px)' } : {}),
  },
  fcContent: {
    flex: 1, zIndex: 2,
  },
  fcCategory: {
    fontSize: 11, fontWeight: '700', color: '#4F46E5', letterSpacing: 1.5, marginBottom: 16,
  },
  fcTitle: {
    fontSize: 28, fontWeight: '800', color: '#111827', lineHeight: 36, marginBottom: 12,
  },
  fcInstructor: {
    fontSize: 14, color: '#6B7280', fontWeight: '500', marginBottom: 24,
  },
  fcMetaRow: {
    flexDirection: 'row', marginBottom: 24,
  },
  fcMetaItem: {
    flexDirection: 'row', alignItems: 'center', marginRight: 24,
  },
  fcMetaText: {
    fontSize: 14, color: '#4B5563', fontWeight: '500', marginLeft: 8,
  },
  fcProgress: {
    height: 4, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 2, width: '100%', marginBottom: 16,
  },
  fcProgressBar: {
    height: '100%', backgroundColor: '#4F46E5', borderRadius: 2,
  },

  // AI Recommendation Section (Temp #9 Context)
  aiSection: {
    marginHorizontal: '10%',
    marginVertical: 40,
    backgroundColor: '#080B16',
    borderRadius: 24,
    padding: 60,
    flexDirection: Platform.OS === 'web' && window.innerWidth >= 768 ? 'row' : 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  aiContent: {
    flex: 1, paddingRight: 40,
  },
  aiHeading: {
    fontSize: 40, fontWeight: '800', color: '#F7F8FC', lineHeight: 48, marginBottom: 16,
  },
  aiSubtitle: {
    fontSize: 18, color: '#9CA3AF', lineHeight: 28, maxWidth: 400,
  },
  aiCard: {
    flex: 1,
    backgroundColor: 'rgba(24, 36, 92, 0.4)',
    borderWidth: 1, borderColor: 'rgba(124, 58, 237, 0.3)',
    borderRadius: 16, padding: 32,
    marginTop: Platform.OS === 'web' && window.innerWidth >= 768 ? 0 : 40,
    width: '100%',
  },
  aiCardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  aiCardTitle: { color: '#C4B5FD', fontSize: 12, fontWeight: '700', letterSpacing: 2, marginLeft: 12 },
  aiRecTitle: { color: '#9CA3AF', fontSize: 14, marginBottom: 8 },
  aiRecCourse: { color: '#F7F8FC', fontSize: 24, fontWeight: '700', marginBottom: 24 },
  aiRecWhyLabel: { color: '#818CF8', fontSize: 14, fontWeight: '600', marginBottom: 8 },
  aiRecWhyText: { color: '#E5E7EB', fontSize: 16, lineHeight: 24 },

  // All Courses Grid
  coursesGrid: {
    flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between',
  },
  courseWrapper: {
    marginBottom: 40,
  },
  stdCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1, borderColor: '#E5E7EB',
    height: '100%',
  },
  stdCategory: { fontSize: 10, fontWeight: '700', color: '#4F46E5', letterSpacing: 1.5, marginBottom: 12 },
  stdTitle: { fontSize: 20, fontWeight: '700', color: '#111827', lineHeight: 28, marginBottom: 12 },
  stdDesc: { fontSize: 14, color: '#6B7280', lineHeight: 22, marginBottom: 24, height: 44 },
  stdMetaContainer: {
    borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#F3F4F6',
    paddingVertical: 16, marginBottom: 24,
    flexDirection: 'row', justifyContent: 'space-between',
  },
  stdMetaRow: { flexDirection: 'row', alignItems: 'center' },
  stdMetaText: { fontSize: 12, color: '#4B5563', marginLeft: 6 },
  stdMetaTextBold: { fontSize: 12, fontWeight: '700', color: '#111827', marginLeft: 6 },
  stdActionRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto'
  },

  // Empty State
  emptyState: {
    alignItems: 'center', justifyContent: 'center', paddingVertical: 100,
  },
  emptyTitle: { fontSize: 24, fontWeight: '700', color: '#111827', marginBottom: 8 },
  emptySubtitle: { fontSize: 16, color: '#6B7280' }
});
