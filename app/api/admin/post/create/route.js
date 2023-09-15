import path from 'path';
import fs from 'fs';
import { NextResponse } from 'next/server';
import CONSTANTS from '../../../../../data/constants';
import mongoose from 'mongoose'
import PostSchema from '../../../models/postSchema';

export async function POST(request){
	const requestBody = await request.json();
	const createdDate = new Date().toLocaleString();

	const newPost = { ...requestBody, date: createdDate};
	console.log('newPost:', newPost);

	var PostModel = null;
	try{
		PostModel = mongoose.model('Post');
	}catch(err){
		PostModel = mongoose.model('Post', PostSchema)
	}

	const post = new PostModel(newPost);
	post.save()
    
	return NextResponse.json({
    	status: CONSTANTS.RESPONSE_STATUS.OK,
    	data: {
        	post: newPost
    	}
	})

}
