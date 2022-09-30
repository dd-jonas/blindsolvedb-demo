import { defaultPreferences } from '#config/settings';

import { CubeLocation, Face } from './cube';
import { Flashcard } from './trainer';

export type Category = {
  name: string;
  display_scramble: string;
  sets: { name: string; slug: string }[];
};

export type Set = {
  name: string;
  slug: string;
  buffers?: string;
  headers: string;
  size: number;
  cases: SetCase[];
};

export type SetCase = {
  id: number;
  name: string;
  slug: string;
  sort: number;
};

export type SetAlgorithm = {
  case_id: number;
  algorithm: string;
};

export type Case = {
  id: number;
  name: string;
  slug: string;
  inverse_name: string | null;
  inverse_slug: string | null;
  scramble: string;
  buffers?: string;
  algorithms: {
    id: number;
    users: number;
    shapes: { id: number; text: string; users: number }[];
  }[];
};

export type UserAlgorithm = {
  shape_id: number | null;
};

export type Shape = {
  id: number;
  algorithm_id: number;
  text: string;
  base: string;
  users: number;
  created_at: string;
  created_by: string;
};

export type TrainerOverview = {
  name: string;
  slug: string;
  size: number;
  used: number;
  results: number;
  learned: number;
  review: number;
};

export type TrainerDetail = TrainerOverview & {
  buffers?: string;
  subsets: string[] | null;
  cases: {
    name: string;
    slug: string;
    algorithm: string | null;
    average: number | null;
  }[];
};

export type TrainerSession = {
  name: string;
  buffers?: string;
  pool: (Flashcard & { new?: boolean })[];
};

export type Settings = {
  lettering_scheme: Record<CubeLocation, string>;
  color_scheme: Record<Face, string>;
  preferences: typeof defaultPreferences;
};

export type Report = {
  id: number;
  shape: string;
  shape_id: number;
  algorithm_id: number;
  case_slug: string;
  set_slug: string;
  user_id: string;
  message: string;
  created_at: string;
};
