export const SheetsKeys = {
  all: ['sheets'] as const,

  public: {
    categories: ['sheets', 'public', 'categories'] as const,
    set: (slug: string) => ['sheets', 'public', 'sets', slug] as const,
    setAlgorithms: (slug: string) =>
      ['sheets', 'public', 'sets', slug, 'algorithms'] as const,
    case: (setSlug: string, caseSlug: string) =>
      ['sheets', 'public', 'sets', setSlug, caseSlug] as const,
  },

  user: {
    categories: ['sheets', 'user', 'categories'] as const,
    setAlgorithms: (slug: string) =>
      ['sheets', 'user', 'sets', slug, 'algorithms'] as const,
    caseAlgorithm: (slug: string) =>
      ['sheets', 'user', 'cases', slug, 'algorithms'] as const,
  },
};

export const TrainerKeys = {
  all: ['trainer'] as const,

  overview: ['trainer'] as const,
  detail: (slug: string) => ['trainer', slug] as const,
  learn: (slug: string) => ['trainer', slug, 'learn'] as const,
  review: (slug: string) => ['trainer', slug, 'review'] as const,
};

export const ProfileKeys = {
  all: ['profile'] as const,

  settings: ['profile', 'settings'] as const,
};

export const AdminKeys = {
  all: ['admin'] as const,

  shape: (id: number) => ['admin', 'shape', id] as const,
  reports: ['admin', 'reports'] as const,
};
