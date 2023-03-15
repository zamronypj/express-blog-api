import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    categories: [{
      name: {
        type: String,
        required: false
      },
      slug: {
        type: String,
        required: false
      }
    }]
  },
  { timestamps: true }
);

BlogSchema.plugin(mongoosePaginate);
BlogSchema.plugin(mongooseUniqueValidator);

const Blog = mongoose.model('Blog', BlogSchema);
export default Blog;
