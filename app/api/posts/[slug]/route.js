import { NextResponse } from "next/server";
import path from "path";

import fs from "fs";
import CONSTANTS from "../../../../data/constants";
import PostSchema from "../../models/postSchema";
import mongoose from 'mongoose'

export async function GET (request, { params }) {
	const slug = params.slug;
	var PostModel = null;
	try{
		PostModel = mongoose.model('Post');
	}catch(err){
		PostModel = mongoose.model('Post', PostSchema)
	}
	const data = await PostModel.find({});
	const post = data.find((p) => p.slug === slug);
	await PostModel.deleteOne({slug: slug}).then(
		result => {
			console.log(result)
		});
	
	return NextResponse.json({

    	status: CONSTANTS.RESPONSE_STATUS.OK,
    	data: {
        	post,
    	},
	});
}
