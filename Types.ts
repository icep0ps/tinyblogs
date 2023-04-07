export type PostType = {
  id: number;
  title: String;
  body: String;
  userId: { id: number; firstName: String };
  tags: string[];
  reactions: number;
};

export type User = {
  id: number;
  firstName: String;
  lastName: String;
  image: string;
  email: String;
};
