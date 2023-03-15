import { Service } from '../../helpers/common';
import Blog from './blog.model';


class BlogService extends Service {
  constructor() {
    super(Blog);
  }
}

export default new BlogService();
