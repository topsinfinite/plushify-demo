export interface MockGeneration {
  id: string;
  userId: string;
  originalImage: string;
  plushieImage: string;
  style: "classic" | "kawaii" | "realistic";
  createdAt: Date;
  isFavorite: boolean;
  category: "people" | "pets";
  metadata?: {
    originalImageSize?: string;
    processingTime?: number;
    creditsUsed?: number;
  };
}

export interface MockTestimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar: string;
  content: string;
  rating: 5;
  createdAt: Date;
}

// Mock generation data - Diverse representation with 20+ high-quality examples
export const mockGenerations: MockGeneration[] = [
  // Recent generations
  {
    id: "gen-001",
    userId: "mock-user-123",
    originalImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    plushieImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    style: "kawaii",
    createdAt: new Date("2024-11-19"),
    isFavorite: true,
    category: "people",
    metadata: {
      originalImageSize: "2.1 MB",
      processingTime: 3.2,
      creditsUsed: 1,
    },
  },
  {
    id: "gen-002",
    userId: "mock-user-123",
    originalImage: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop&crop=face",
    plushieImage: "https://images.unsplash.com/photo-1527736947477-2790e28f3443?w=400&h=400&fit=crop",
    style: "realistic",
    createdAt: new Date("2024-11-18"),
    isFavorite: false,
    category: "pets",
    metadata: {
      originalImageSize: "1.8 MB",
      processingTime: 2.9,
      creditsUsed: 1,
    },
  },
  {
    id: "gen-003",
    userId: "mock-user-123",
    originalImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    plushieImage: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=400&h=400&fit=crop",
    style: "classic",
    createdAt: new Date("2024-11-17"),
    isFavorite: true,
    category: "people",
    metadata: {
      originalImageSize: "2.4 MB",
      processingTime: 4.1,
      creditsUsed: 1,
    },
  },
  {
    id: "gen-004",
    userId: "mock-user-123",
    originalImage: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=crop&crop=face",
    plushieImage: "https://images.unsplash.com/photo-1563460716037-460a3ad24ba9?w=400&h=400&fit=crop",
    style: "kawaii",
    createdAt: new Date("2024-11-16"),
    isFavorite: false,
    category: "pets",
    metadata: {
      originalImageSize: "1.9 MB",
      processingTime: 3.7,
      creditsUsed: 1,
    },
  },
  {
    id: "gen-005",
    userId: "mock-user-123",
    originalImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    plushieImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    style: "realistic",
    createdAt: new Date("2024-11-15"),
    isFavorite: true,
    category: "people",
    metadata: {
      originalImageSize: "2.2 MB",
      processingTime: 3.5,
      creditsUsed: 1,
    },
  },
  {
    id: "gen-006",
    userId: "mock-user-123",
    originalImage: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop&crop=face",
    plushieImage: "https://images.unsplash.com/photo-1527736947477-2790e28f3443?w=400&h=400&fit=crop",
    style: "classic",
    createdAt: new Date("2024-11-14"),
    isFavorite: false,
    category: "pets",
    metadata: {
      originalImageSize: "1.7 MB",
      processingTime: 2.8,
      creditsUsed: 1,
    },
  },
  // Additional diverse generations
  {
    id: "gen-007",
    userId: "mock-user-123",
    originalImage: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=400&h=400&fit=crop&crop=face",
    plushieImage: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
    style: "kawaii",
    createdAt: new Date("2024-11-13"),
    isFavorite: true,
    category: "people",
    metadata: {
      originalImageSize: "2.0 MB",
      processingTime: 3.1,
      creditsUsed: 1,
    },
  },
  {
    id: "gen-008",
    userId: "mock-user-123",
    originalImage: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop&crop=face",
    plushieImage: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop",
    style: "realistic",
    createdAt: new Date("2024-11-12"),
    isFavorite: false,
    category: "pets",
    metadata: {
      originalImageSize: "1.6 MB",
      processingTime: 2.7,
      creditsUsed: 1,
    },
  },
  {
    id: "gen-009",
    userId: "mock-user-123",
    originalImage: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face",
    plushieImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    style: "classic",
    createdAt: new Date("2024-11-11"),
    isFavorite: true,
    category: "people",
    metadata: {
      originalImageSize: "2.3 MB",
      processingTime: 3.8,
      creditsUsed: 1,
    },
  },
  {
    id: "gen-010",
    userId: "mock-user-123",
    originalImage: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop&crop=face",
    plushieImage: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=400&fit=crop",
    style: "kawaii",
    createdAt: new Date("2024-11-10"),
    isFavorite: false,
    category: "pets",
    metadata: {
      originalImageSize: "1.9 MB",
      processingTime: 3.4,
      creditsUsed: 1,
    },
  },
  {
    id: "gen-011",
    userId: "mock-user-123",
    originalImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    plushieImage: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    style: "realistic",
    createdAt: new Date("2024-11-09"),
    isFavorite: true,
    category: "people",
    metadata: {
      originalImageSize: "2.5 MB",
      processingTime: 4.0,
      creditsUsed: 1,
    },
  },
  {
    id: "gen-012",
    userId: "mock-user-123",
    originalImage: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&h=400&fit=crop&crop=face",
    plushieImage: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=400&fit=crop",
    style: "classic",
    createdAt: new Date("2024-11-08"),
    isFavorite: false,
    category: "pets",
    metadata: {
      originalImageSize: "1.7 MB",
      processingTime: 2.9,
      creditsUsed: 1,
    },
  },
  {
    id: "gen-013",
    userId: "mock-user-123",
    originalImage: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=400&h=400&fit=crop&crop=face",
    plushieImage: "https://images.unsplash.com/photo-1529256782402-b8cd511df6fd?w=400&h=400&fit=crop",
    style: "kawaii",
    createdAt: new Date("2024-11-07"),
    isFavorite: true,
    category: "people",
    metadata: {
      originalImageSize: "2.2 MB",
      processingTime: 3.6,
      creditsUsed: 1,
    },
  },
  {
    id: "gen-014",
    userId: "mock-user-123",
    originalImage: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=400&fit=crop&crop=face",
    plushieImage: "https://images.unsplash.com/photo-1601758124277-f0086d69c517?w=400&h=400&fit=crop",
    style: "realistic",
    createdAt: new Date("2024-11-06"),
    isFavorite: false,
    category: "pets",
    metadata: {
      originalImageSize: "1.8 MB",
      processingTime: 3.1,
      creditsUsed: 1,
    },
  },
  {
    id: "gen-015",
    userId: "mock-user-123",
    originalImage: "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400&h=400&fit=crop&crop=face",
    plushieImage: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&h=400&fit=crop",
    style: "classic",
    createdAt: new Date("2024-11-05"),
    isFavorite: true,
    category: "people",
    metadata: {
      originalImageSize: "2.1 MB",
      processingTime: 3.3,
      creditsUsed: 1,
    },
  },
  {
    id: "gen-016",
    userId: "mock-user-123",
    originalImage: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=400&fit=crop&crop=face",
    plushieImage: "https://images.unsplash.com/photo-1583512603806-077998240c7a?w=400&h=400&fit=crop",
    style: "kawaii",
    createdAt: new Date("2024-11-04"),
    isFavorite: false,
    category: "pets",
    metadata: {
      originalImageSize: "1.9 MB",
      processingTime: 3.5,
      creditsUsed: 1,
    },
  },
  {
    id: "gen-017",
    userId: "mock-user-123",
    originalImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
    plushieImage: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=400&fit=crop",
    style: "realistic",
    createdAt: new Date("2024-11-03"),
    isFavorite: true,
    category: "people",
    metadata: {
      originalImageSize: "2.4 MB",
      processingTime: 3.9,
      creditsUsed: 1,
    },
  },
  {
    id: "gen-018",
    userId: "mock-user-123",
    originalImage: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop&crop=face",
    plushieImage: "https://images.unsplash.com/photo-1601758063890-1d78217d827c?w=400&h=400&fit=crop",
    style: "classic",
    createdAt: new Date("2024-11-02"),
    isFavorite: false,
    category: "pets",
    metadata: {
      originalImageSize: "1.6 MB",
      processingTime: 2.6,
      creditsUsed: 1,
    },
  },
  {
    id: "gen-019",
    userId: "mock-user-123",
    originalImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    plushieImage: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    style: "kawaii",
    createdAt: new Date("2024-11-01"),
    isFavorite: true,
    category: "people",
    metadata: {
      originalImageSize: "2.3 MB",
      processingTime: 3.7,
      creditsUsed: 1,
    },
  },
  {
    id: "gen-020",
    userId: "mock-user-123",
    originalImage: "https://images.unsplash.com/photo-1601758064155-16da0b1bcca7?w=400&h=400&fit=crop&crop=face",
    plushieImage: "https://images.unsplash.com/photo-1556909114-1a8e82d13f3d?w=400&h=400&fit=crop",
    style: "realistic",
    createdAt: new Date("2024-10-31"),
    isFavorite: false,
    category: "pets",
    metadata: {
      originalImageSize: "1.7 MB",
      processingTime: 2.8,
      creditsUsed: 1,
    },
  },
  // Additional entries for comprehensive gallery
  {
    id: "gen-021",
    userId: "mock-user-123",
    originalImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
    plushieImage: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&h=400&fit=crop",
    style: "classic",
    createdAt: new Date("2024-10-30"),
    isFavorite: true,
    category: "people",
    metadata: {
      originalImageSize: "2.0 MB",
      processingTime: 3.2,
      creditsUsed: 1,
    },
  },
  {
    id: "gen-022",
    userId: "mock-user-123",
    originalImage: "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=400&h=400&fit=crop&crop=face",
    plushieImage: "https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?w=400&h=400&fit=crop",
    style: "kawaii",
    createdAt: new Date("2024-10-29"),
    isFavorite: false,
    category: "pets",
    metadata: {
      originalImageSize: "1.8 MB",
      processingTime: 3.0,
      creditsUsed: 1,
    },
  },
  {
    id: "gen-023",
    userId: "mock-user-123",
    originalImage: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face",
    plushieImage: "https://images.unsplash.com/photo-1529256782402-b8cd511df6fd?w=400&h=400&fit=crop",
    style: "realistic",
    createdAt: new Date("2024-10-28"),
    isFavorite: true,
    category: "people",
    metadata: {
      originalImageSize: "2.2 MB",
      processingTime: 3.4,
      creditsUsed: 1,
    },
  },
];

// Mock testimonials - Diverse customer personas with realistic reviews
export const mockTestimonials: MockTestimonial[] = [
  {
    id: "test-001",
    name: "Sarah Chen",
    role: "Graphic Designer",
    company: "Creative Studio",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    content: "Plushify transformed my daughter's photo into the most adorable plushie! The quality is incredible and she carries it everywhere now. The AI really captured her personality perfectly.",
    rating: 5,
    createdAt: new Date("2024-11-10"),
  },
  {
    id: "test-002",
    name: "Marcus Thompson",
    role: "Pet Owner",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    content: "My golden retriever passed away last year, and Plushify helped me create a beautiful plushie from his favorite photo. It's a wonderful way to keep his memory alive. Thank you!",
    rating: 5,
    createdAt: new Date("2024-11-08"),
  },
  {
    id: "test-003",
    name: "Emily Rodriguez",
    role: "Elementary Teacher",
    avatar: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=100&h=100&fit=crop&crop=face",
    content: "I created plushies of all my students for the end-of-year gifts. They were absolutely thrilled! The kawaii style made each one unique and special. Best teacher gift ever!",
    rating: 5,
    createdAt: new Date("2024-11-05"),
  },
  {
    id: "test-004",
    name: "David Kim",
    role: "Father of Three",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    content: "My kids love their personalized plushies! It's amazing how the AI captured each of their unique features. Now they have bedtime buddies that look just like them.",
    rating: 5,
    createdAt: new Date("2024-11-03"),
  },
  {
    id: "test-005",
    name: "Jessica Park",
    role: "Gift Shop Owner",
    company: "Memories & More",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    content: "I use Plushify to create custom items for my customers. The quality is consistent and the turnaround time is incredible. My customers are always amazed by the results!",
    rating: 5,
    createdAt: new Date("2024-10-30"),
  },
  {
    id: "test-006",
    name: "Alex Johnson",
    role: "College Student",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
    content: "Made a plushie of my girlfriend for her birthday - she cried happy tears! The realistic style looked exactly like her. Definitely using this for more gifts.",
    rating: 5,
    createdAt: new Date("2024-10-28"),
  },
];

// Mock statistics for social proof
export const mockStats = {
  totalPlushiesCreated: 127453,
  happyCustomers: 23891,
  averageRating: 4.9,
  monthlyGrowth: 156,
};

// Helper functions
export function getMockUserGenerations(filter?: "all" | "people" | "pets" | "favorites"): MockGeneration[] {
  let filtered = [...mockGenerations];

  if (filter === "people") {
    filtered = filtered.filter(gen => gen.category === "people");
  } else if (filter === "pets") {
    filtered = filtered.filter(gen => gen.category === "pets");
  } else if (filter === "favorites") {
    filtered = filtered.filter(gen => gen.isFavorite);
  }

  return filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function createGeneration(generation: Omit<MockGeneration, "userId">) {
  const newGeneration: MockGeneration = {
    ...generation,
    userId: "demo-user",
  };

  mockGenerations.unshift(newGeneration);

  return newGeneration;
}