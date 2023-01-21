import mongoose from 'mongoose'
const Schema = mongoose.Schema

const posts = new Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

// @ts-ignore
mongoose.models = {}

const Posts = mongoose.model('posts', posts)

export default Posts
