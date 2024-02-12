
import mongoose from 'mongoose';

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return mongoose.connect("mongodb+srv://ghosharonno000:ghosharonno000@cluster0.mlftuai.mongodb.net/study_zero_zero_zero", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default dbConnect;