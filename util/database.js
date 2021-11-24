import mongoose from 'mongoose';

//const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_URI =
  'mongodb+srv://lockAdmin:lock2021@lock.6q6fl.mongodb.net/lock?retryWrites=true&w=majority';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //bufferCommands: false,
      //useCreateIndex: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
