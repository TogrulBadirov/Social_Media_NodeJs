import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  imageName: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  isAuthor: {
    type: String,
  },
  isSaved: {
    type: String,
  },
  timeAgo: {
    type: String,
  },
  caption: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  likesCount: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

export default Post;
