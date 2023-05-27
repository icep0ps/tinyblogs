import { Slide } from '../../../Types';

class Blog {
  public created: Date;

  constructor(
    public title: string = 'untitled',
    public coverImage: string = '',
    public languages: string[] = [],
    public slides: Slide[]
  ) {
    this.created = new Date();
  }

  like() {}

  view() {}
}

export default Blog;
