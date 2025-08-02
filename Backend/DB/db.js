import { connect } from 'mongoose';

const connectDB = async () => {
    try{
        await connect(process.env.MONGO_URI);
        console.log('Connected to Database');
    }catch(error){
        console.log(error);
        
    }
}

export default connectDB;
