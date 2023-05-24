class Blog {
  static type: 'basic';
  public slides: Basic[];

  constructor(
    private id: string,
    public title: string,
    public tags: string[],
    public created: Date = new Date(),
    public author: { id: string; username: string },
    private metadata: { likes: number; comments: number; views: number }
  ) {
    this.slides = [];
  }

  public createSlide(title: string, contents: string) {
    const number = this.slides.length + 1;
    this.slides.push(new Basic(number, title, contents));
  }
}

class Basic {
  constructor(public number: number, public title: string, public contents: string) {}
}

export default Blog;
