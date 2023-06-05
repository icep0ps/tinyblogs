export type IUser = {
  id: string;
  name: string;
  image: string;
  email: string;
  followers: string[];
  following: string[];
  likes: string[];
  posts?: DBblog[];
};

export type IBlog = {
  data: {
    title: string | undefined;
    languages: string[] | undefined;
    coverImage: string | undefined;
  };
  slides: Slide[];
};

export type Slide = {
  type: ISlideType;
  number: number;
  contents: string;
};

export interface DBblog {
  id: string;
  createdAt: Date;
  title: string;
  slides: Slides;
  published: boolean;
  likes: { userId: string; blogId: string }[];
  coverImage: string;
  views: number;
  languages: Language[];
  comments: IComment[];
  author: { id: string; name: string; image: string; email: string };
}

export interface Language {
  name: string;
  blogId: string;
}

export type IComment = {
  id: string;
  comment: string;
  author: DBblog['author'];
  blogId: string;
  authorId: string;
};

export interface Slides {
  slides: Slide[];
}

export type ISlideType = 'cover' | 'basic';
export type IStep = 'Set-up' | 'Creation' | 'Preview';
