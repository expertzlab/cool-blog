import mongoose from 'mongoose'
var connected = false;


const connectDB = (async () => {
	await mongoose.connect('mongodb://localhost:27017/cool_blog');
	mongoose.connection.on('open', function() {
    	console.log('Mongoose connected.');    	});
    });
if(connected== false){	
    console.log('connection not defined')
   await connectDB()
   connected = true
} else {	
    console.log('mongoose.connection exists:')
}
export default connectDB;
