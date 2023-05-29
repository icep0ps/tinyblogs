import { Slide, IUser } from '../../../Types';

class Blog {
  public created: Date;

  constructor(
    public title: string = 'untitled',
    public coverImage: string = '',
    public languages: string[] = [],
    public slides: Slide[],
    public author: IUser
  ) {
    this.created = new Date();
  }

  like() {}

  view() {}
}

export default Blog;
