export type IPost = {
  id: number;
  title: String;
  body: String;
  userId: { id: number; firstName: String };
  tags: string[];
  reactions: number;
};

export type IUser = {
  id: string;
  name: string;
  image: string;
  email: string;
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
  likes: [];
  coverImage: string;
  views: number;
  languages: Language[];
  author: { id: string; name: string; image: string; email: string };
}

export interface Language {
  name: string;
  blogId: string;
}

export interface Slides {
  slides: Slide[];
}

export type IStep = 'Set-up' | 'Creation' | 'Preview';
export type ISlideType = 'cover' | 'basic';
