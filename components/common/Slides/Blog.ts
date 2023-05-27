import { Slide } from '../../../Types';

class Blog {
  public created: Date;
  // public author: { id: string; username: string },

  constructor(
    public title: string = 'untitled',
    public languages: string[] = [],
    public slides: Slide[],
    private metadata: { likes: number; comments: []; views: number } = {
      likes: 0,
      comments: [],
      views: 0,
    }
  ) {
    this.created = new Date();
  }

  like() {
    this.metadata.likes++;
  }

  view() {
    this.metadata.views++;
  }
}

export default Blog;
