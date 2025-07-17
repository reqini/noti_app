export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface News {
  id: string;
  title: string;
  content: string;
  image?: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string[];
}

export interface NewsFilter {
  category?: string;
  search?: string;
  tags?: string[];
}

// Component types are now in their respective component folders
// Import them from: src/components/atoms/[ComponentName]/types.ts 