export type CourseStatus = 'enrolled' | 'completed' | 'not_started';

export interface Course {
  id: string;
  category: string;
  title: string;
  description: string;
  instructor: string;
  lessons: number;
  duration: string; // e.g., "6 Weeks"
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  progress: number;
  status: CourseStatus;
}

export const CATEGORIES = [
  'All Courses',
  'Artificial Intelligence',
  'Computer Science',
  'Mathematics',
  'Science',
  'Business',
  'Languages'
];

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    category: 'Artificial Intelligence',
    title: 'Machine Learning Fundamentals',
    description: 'Learn the core concepts of ML, supervised and unsupervised learning, and neural network basics.',
    instructor: 'Dr. Arjun Mehta',
    lessons: 18,
    duration: '6 Weeks',
    difficulty: 'Intermediate',
    rating: 4.8,
    progress: 72,
    status: 'enrolled'
  },
  {
    id: 'c2',
    category: 'Computer Science',
    title: 'Data Structures & Algorithms',
    description: 'Master the fundamental data structures and algorithmic paradigms used in computer science.',
    instructor: 'Prof. Ananya Rao',
    lessons: 24,
    duration: '8 Weeks',
    difficulty: 'Advanced',
    rating: 4.9,
    progress: 48,
    status: 'enrolled'
  },
  {
    id: 'c3',
    category: 'Mathematics',
    title: 'Advanced Mathematics',
    description: 'A deep dive into calculus, linear algebra, and discrete mathematics for engineering.',
    instructor: 'Dr. Kavya Sharma',
    lessons: 20,
    duration: '7 Weeks',
    difficulty: 'Intermediate',
    rating: 4.7,
    progress: 0,
    status: 'not_started'
  },
  {
    id: 'c4',
    category: 'Artificial Intelligence',
    title: 'Deep Learning',
    description: 'Explore deep neural networks, CNNs, RNNs, and modern transformer architectures.',
    instructor: 'Dr. Arjun Mehta',
    lessons: 22,
    duration: '8 Weeks',
    difficulty: 'Advanced',
    rating: 4.9,
    progress: 100,
    status: 'completed'
  },
  {
    id: 'c5',
    category: 'Science',
    title: 'Physics Fundamentals',
    description: 'Classical mechanics, electromagnetism, and an introduction to modern physics.',
    instructor: 'Prof. David Chen',
    lessons: 15,
    duration: '5 Weeks',
    difficulty: 'Beginner',
    rating: 4.6,
    progress: 0,
    status: 'not_started'
  },
  {
    id: 'c6',
    category: 'Business',
    title: 'Business Analytics',
    description: 'Data-driven decision making, statistical analysis, and business intelligence tools.',
    instructor: 'Sarah Jenkins, MBA',
    lessons: 12,
    duration: '4 Weeks',
    difficulty: 'Beginner',
    rating: 4.5,
    progress: 0,
    status: 'not_started'
  },
  {
    id: 'c7',
    category: 'Languages',
    title: 'Academic English',
    description: 'Improve your academic writing, reading comprehension, and presentation skills.',
    instructor: 'Dr. Elena Rossi',
    lessons: 10,
    duration: '4 Weeks',
    difficulty: 'Intermediate',
    rating: 4.8,
    progress: 25,
    status: 'enrolled'
  },
  {
    id: 'c8',
    category: 'Computer Science',
    title: 'Operating Systems',
    description: 'Process management, memory management, file systems, and OS design principles.',
    instructor: 'Prof. Ananya Rao',
    lessons: 20,
    duration: '7 Weeks',
    difficulty: 'Advanced',
    rating: 4.7,
    progress: 0,
    status: 'not_started'
  }
];
