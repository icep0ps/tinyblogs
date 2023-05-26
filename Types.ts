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

export type IStep = 'Set-up' | 'Creation';
export type ISlideType = 'cover' | 'basic';
