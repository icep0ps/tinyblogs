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
  slides: [];
};

export type Slide = {
  type: ISlideType;
  number: number;
  contents: string;
};

export type IStep = 'Set-up' | 'Creation' | 'Preview';
export type ISlideType = 'cover' | 'basic';
