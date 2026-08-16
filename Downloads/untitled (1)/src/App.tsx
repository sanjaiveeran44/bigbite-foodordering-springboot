/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import CoursesScreen from './CoursesScreen';
import CourseDetailsScreen from './CourseDetailsScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'login' | 'courses' | 'course-details'>('course-details'); // Set to course details for immediate review

  if (currentScreen === 'login') {
    return <LoginScreen onNavigateHome={() => setCurrentScreen('home')} />;
  }
  
  if (currentScreen === 'courses') {
    return <CoursesScreen 
      onNavigateHome={() => setCurrentScreen('home')} 
      onNavigateLogin={() => setCurrentScreen('login')} 
      onNavigateDetails={() => setCurrentScreen('course-details')}
    />;
  }

  if (currentScreen === 'course-details') {
    return <CourseDetailsScreen 
      onNavigateHome={() => setCurrentScreen('home')} 
      onNavigateCourses={() => setCurrentScreen('courses')} 
      onNavigateLogin={() => setCurrentScreen('login')} 
    />;
  }

  return (
    <HomeScreen 
      onNavigateLogin={() => setCurrentScreen('login')} 
      onNavigateCourses={() => setCurrentScreen('courses')} 
    />
  );
}
