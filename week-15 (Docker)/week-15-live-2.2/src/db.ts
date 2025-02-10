import mongoose, { Schema, model } from 'mongoose';

const mongoUrl: string = 'mongodb://mongo_network_test:27017/myDatabase';//mongo_network_test  <-- this name comes from the shared network process of slide 21 (for more clarity of docker https://projects.100xdevs.com/tracks/docker-2/docker-2-21)

// Connect to MongoDB
mongoose.connect(mongoUrl)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a User schema
interface IUser {
  name: string;
  age: number;
  email: string;
}

const UserSchema: Schema = new Schema<IUser>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true }
});

// Create a User model
export const User = model<IUser>('User', UserSchema);