// Mock data for development and prototyping

export interface Resource {
  id: string
  name: string
  description: string
  category: string
  image?: string
  phone?: string
  email?: string
  address: string
  hours: {
    [key: string]: string
  }
  tags: string[]
  accessibility: {
    wheelchair: boolean
    languages: string[]
    transitFriendly: boolean
  }
  coordinates: {
    lat: number
    lng: number
  }
  processGuide?: string[]
  featured?: boolean
}

export interface Story {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  image?: string
  date: string
  tags: string[]
}

export interface HeatmapData {
  category: string
  coordinates: { lat: number; lng: number }
  intensity: number
  neighborhood: string
}

export const mockResources: Resource[] = [
  {
    id: '1',
    name: 'Community Food Bank',
    description: 'Providing nutritious meals and groceries to families in need. We offer weekly food distributions, emergency food assistance, and nutrition education programs.',
    category: 'Emergency Aid',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800',
    phone: '(555) 123-4567',
    email: 'info@communityfoodbank.org',
    address: '123 Main Street, Alpharetta, GA 30009',
    hours: {
      'Monday': '9:00 AM - 5:00 PM',
      'Tuesday': '9:00 AM - 5:00 PM',
      'Wednesday': '9:00 AM - 5:00 PM',
      'Thursday': '9:00 AM - 5:00 PM',
      'Friday': '9:00 AM - 3:00 PM',
      'Saturday': '10:00 AM - 2:00 PM',
      'Sunday': 'Closed',
    },
    tags: ['food', 'emergency', 'nutrition', 'family'],
    accessibility: {
      wheelchair: true,
      languages: ['English', 'Spanish', 'Mandarin'],
      transitFriendly: true,
    },
    coordinates: { lat: 34.0754, lng: -84.2941 },
    processGuide: [
      'Check our website or call ahead for current hours',
      'Bring a valid ID and proof of address',
      'No appointment needed for walk-ins',
      'Volunteers will help you select items',
      'We serve all community members with dignity and respect',
    ],
    featured: true,
  },
  {
    id: '2',
    name: 'Family Wellness Center',
    description: 'Comprehensive health services including primary care, mental health counseling, and wellness programs for all ages.',
    category: 'Health Support',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800',
    phone: '(555) 234-5678',
    email: 'wellness@familycenter.org',
    address: '456 Oak Avenue, Alpharetta, GA 30009',
    hours: {
      'Monday': '8:00 AM - 6:00 PM',
      'Tuesday': '8:00 AM - 6:00 PM',
      'Wednesday': '8:00 AM - 6:00 PM',
      'Thursday': '8:00 AM - 6:00 PM',
      'Friday': '8:00 AM - 5:00 PM',
      'Saturday': '9:00 AM - 1:00 PM',
      'Sunday': 'Closed',
    },
    tags: ['health', 'mental health', 'counseling', 'wellness'],
    accessibility: {
      wheelchair: true,
      languages: ['English', 'Spanish'],
      transitFriendly: true,
    },
    coordinates: { lat: 34.0854, lng: -84.2841 },
    featured: true,
  },
  {
    id: '3',
    name: 'Youth Education Hub',
    description: 'After-school programs, tutoring, college prep, and mentorship opportunities for students K-12.',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
    phone: '(555) 345-6789',
    email: 'youth@educationhub.org',
    address: '789 Elm Street, Alpharetta, GA 30009',
    hours: {
      'Monday': '2:00 PM - 7:00 PM',
      'Tuesday': '2:00 PM - 7:00 PM',
      'Wednesday': '2:00 PM - 7:00 PM',
      'Thursday': '2:00 PM - 7:00 PM',
      'Friday': '2:00 PM - 6:00 PM',
      'Saturday': '10:00 AM - 3:00 PM',
      'Sunday': 'Closed',
    },
    tags: ['education', 'youth', 'tutoring', 'mentorship'],
    accessibility: {
      wheelchair: true,
      languages: ['English', 'Spanish', 'Vietnamese'],
      transitFriendly: true,
    },
    coordinates: { lat: 34.0654, lng: -84.3041 },
    featured: true,
  },
  {
    id: '4',
    name: 'Housing Assistance Network',
    description: 'Emergency shelter, rental assistance, and housing navigation services for individuals and families experiencing homelessness.',
    category: 'Emergency Aid',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    phone: '(555) 456-7890',
    email: 'housing@assistancenetwork.org',
    address: '321 Pine Street, Alpharetta, GA 30009',
    hours: {
      'Monday': '24/7',
      'Tuesday': '24/7',
      'Wednesday': '24/7',
      'Thursday': '24/7',
      'Friday': '24/7',
      'Saturday': '24/7',
      'Sunday': '24/7',
    },
    tags: ['housing', 'emergency', 'shelter', 'crisis'],
    accessibility: {
      wheelchair: true,
      languages: ['English', 'Spanish'],
      transitFriendly: false,
    },
    coordinates: { lat: 34.0554, lng: -84.3141 },
    processGuide: [
      'Call our 24/7 hotline for immediate assistance',
      'Walk-ins welcome during business hours',
      'Case manager will assess your situation',
      'We provide emergency shelter and long-term housing support',
      'All services are confidential and free',
    ],
  },
  {
    id: '5',
    name: 'Community Garden Collective',
    description: 'Shared garden spaces, workshops, and fresh produce distribution. Building community through sustainable agriculture.',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800',
    phone: '(555) 567-8901',
    email: 'garden@collective.org',
    address: '654 Garden Way, Alpharetta, GA 30009',
    hours: {
      'Monday': '8:00 AM - 6:00 PM',
      'Tuesday': '8:00 AM - 6:00 PM',
      'Wednesday': '8:00 AM - 6:00 PM',
      'Thursday': '8:00 AM - 6:00 PM',
      'Friday': '8:00 AM - 6:00 PM',
      'Saturday': '8:00 AM - 4:00 PM',
      'Sunday': '8:00 AM - 4:00 PM',
    },
    tags: ['garden', 'sustainability', 'community', 'food'],
    accessibility: {
      wheelchair: true,
      languages: ['English', 'Spanish'],
      transitFriendly: true,
    },
    coordinates: { lat: 34.0754, lng: -84.2741 },
  },
]

export const mockStories: Story[] = [
  {
    id: '1',
    title: 'Finding Hope Through Community Support',
    excerpt: 'Maria\'s journey from crisis to stability shows the power of our community resources.',
    content: 'When Maria lost her job during the pandemic, she didn\'t know where to turn. Through the Community Resource Hub, she discovered the Housing Assistance Network, which helped her family find stable housing. Today, Maria volunteers at the Food Bank, giving back to the community that supported her.',
    author: 'Maria Rodriguez',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800',
    date: '2024-01-15',
    tags: ['housing', 'community', 'hope'],
  },
  {
    id: '2',
    title: 'A Second Chance at Education',
    excerpt: 'How the Youth Education Hub transformed a struggling student\'s future.',
    content: 'James was falling behind in school when his family found the Youth Education Hub. With dedicated tutoring and mentorship, he not only caught up but excelled. James is now a college freshman, the first in his family to attend university.',
    author: 'James Chen',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
    date: '2024-01-10',
    tags: ['education', 'youth', 'success'],
  },
  {
    id: '3',
    title: 'Building Bridges Through Food',
    excerpt: 'The Community Food Bank brings neighbors together, one meal at a time.',
    content: 'Every Saturday, volunteers gather at the Community Food Bank to distribute fresh produce and meals. But it\'s more than food—it\'s a place where neighbors connect, share stories, and build lasting friendships. The food bank has become a cornerstone of our community.',
    author: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
    date: '2024-01-05',
    tags: ['food', 'community', 'volunteer'],
  },
]

// Alpharetta, GA coordinates (default center: 34.0754, -84.2941)
export const mockHeatmapData: HeatmapData[] = [
  { category: 'Food Insecurity', coordinates: { lat: 34.0754, lng: -84.2941 }, intensity: 0.8, neighborhood: 'Downtown Alpharetta' },
  { category: 'Food Insecurity', coordinates: { lat: 34.0854, lng: -84.2841 }, intensity: 0.6, neighborhood: 'Eastside' },
  { category: 'Mental Health', coordinates: { lat: 34.0654, lng: -84.3041 }, intensity: 0.7, neighborhood: 'Westside' },
  { category: 'Housing', coordinates: { lat: 34.0554, lng: -84.3141 }, intensity: 0.9, neighborhood: 'Southside' },
  { category: 'Youth Programs', coordinates: { lat: 34.0754, lng: -84.2741 }, intensity: 0.5, neighborhood: 'Northside' },
]

export function getResourceOfTheDay(): Resource {
  const today = new Date().getDate()
  return mockResources[today % mockResources.length]
}

