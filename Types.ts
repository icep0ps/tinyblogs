export type IPost = {
  id: number;
  title: String;
  body: String;
  userId: { id: number; firstName: String };
  tags: string[];
  reactions: number;
};

export type IUser = {
  id: number;
  firstName: String;
  lastName: String;
  image: string;
  email: String;
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
  likes: number;
  coverImage: string;
  views: number;
  languages: Language[];
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
