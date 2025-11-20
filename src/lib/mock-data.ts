export interface MockUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  joinDate: Date;
  createdAt: Date;
  emailVerified: boolean;
  credits: number;
  totalGenerations: number;
  creditsUsed: number;
  favoriteCount: number;
}

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

export interface MockSession {
  user: MockUser;
  session: {
    token: string;
    expiresAt: Date;
  };
}

// Mock user data
export const mockUser: MockUser = {
  id: "mock-user-123",
  name: "Alex Johnson",
  email: "alex@example.com",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  joinDate: new Date("2024-01-15"),
  createdAt: new Date("2024-01-15"),
  emailVerified: true,
  credits: 50,
  totalGenerations: 23,
  creditsUsed: 73,
  favoriteCount: 8,
};

// Mock generation data
export const mockGenerations: MockGeneration[] = [
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
];

// Mock session
export const mockSession: MockSession = {
  user: mockUser,
  session: {
    token: "mock-token-xyz789",
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  },
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

export function getMockUserStats() {
  return {
    totalGenerations: mockUser.totalGenerations,
    creditsUsed: mockUser.creditsUsed,
    creditsRemaining: mockUser.credits,
    favoriteCount: mockUser.favoriteCount,
    joinDate: mockUser.joinDate,
    recentGenerations: getMockUserGenerations().slice(0, 6),
  };
}

export function updateMockUserCredits(amount: number) {
  mockUser.credits = Math.max(0, mockUser.credits + amount);
}

export function spendMockCredits(amount: number): boolean {
  if (mockUser.credits >= amount) {
    mockUser.credits -= amount;
    mockUser.creditsUsed += amount;
    return true;
  }
  return false;
}