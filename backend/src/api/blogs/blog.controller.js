import { Controller } from '../../helpers/common';
import blogService from './blog.service';
import { handleResponse as Response } from '../../helpers';

class BlogController extends Controller {
  constructor(service, name) {
    super(service, name);
  }
}

export default new BlogController(blogService, 'Blog');
