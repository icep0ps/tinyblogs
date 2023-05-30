import axios from 'axios';
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

  async like(blogId: string, userId: string) {
    await axios.put('/api/blogs', {
      data: { blogId, userId },
    });
  }

  view(userId: string) {}
}

export default Blog;
