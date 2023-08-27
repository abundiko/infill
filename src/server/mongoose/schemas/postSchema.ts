import mongoose from "mongoose";

export type PostDocument = {
  _id?: string;
  title: string;
  subtitle: string;
  createdAt?: string;
  author:string;
  body: string;
  img: string;
  tags: string[];
  impressions: {
    likes: string[];
    comments: string[];
    views: string[];
  };
  
};

let PostModel = mongoose.Model<PostDocument>;

if (mongoose.models.Post) {
  PostModel = mongoose.models.Post;
} else {
  const postSchema = new mongoose.Schema({
    body: String,
    title: String,
    subtitle: String,
    createdAt: {
      type:Date,
      default:Date.now
    },
    author: String,
    img: String,
    tags: [String],
    impressions: {
      likes: {type:[String],default:[]},
      comments: {type:[String],default:[]},
      views: {type:[String],default:[]},
    },
  }, { collection: "posts" });
  PostModel = mongoose.connection.useDb('quilly').model("Post", postSchema, "posts");
}

export default PostModel;