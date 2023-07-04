import { z } from 'zod';
import { Blog as PBlog, User as PUser, Comment, Like, Language } from '@prisma/client';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}

export type SlideType = 'cover' | 'basic';
export type Step = 'Set-up' | 'Creation' | 'Preview';

export type User = PUser & {
  likes?: string[];
  posts?: Blog[];
  followers?: string[];
  following?: string[];
};

export type Blog = PBlog & {
  likes?: Like[];
  comments?: Comment[];
  languages?: Language[];
  author?: string | PUser;
};

export const blogSetupData = z.object({
  title: z.string().default('untitled'),
  languages: z.string().array(),
  coverImage: z.string().optional(),
});

export const slide = z.object({
  type: z.literal('cover').or(z.literal('basic')),
  number: z.number(),
  contents: z.string(),
});

const authedUser = z.object({
  name: z.string(),
  email: z.string(),
  image: z.string(),
});

export type Slide = z.infer<typeof slide>;
export type AuthedUser = z.infer<typeof authedUser>;
export type BlogSetupData = z.infer<typeof blogSetupData>;
