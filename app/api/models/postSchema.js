import mongoose from 'mongoose'
import connectDB from '../utils/db-connect';
const Schema = mongoose.Schema;


const PostSchema = new Schema({
	slug: {type:String},
	title: {type: String},
	excerpt: {type: String},
	content: {type: String},
	date: {type: Date, default: Date.now }
})
export default PostSchema;
