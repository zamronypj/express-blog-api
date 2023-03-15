import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const BlogSchema = new Schema(
  {
    field: {
      type: String,
      required: true
    },
    field2: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

BlogSchema.plugin(mongoosePaginate);
BlogSchema.plugin(mongooseUniqueValidator);

const Blog = mongoose.model('Blog', BlogSchema);
export default Blog;
