// models/AdminLogin.js
import mongoose from 'mongoose';

const studySchema = new mongoose.Schema({
  subjectName: { type: String, required: true },
  chapterName: { type: String },
  pDFLink: { type: String },
  chapterDate: { type: Date, required: true },
  classLink: { type: String },
  arrayInput: { type: [String] }, 
});

const StudyModel = mongoose.models.StudyModel || mongoose.model('StudyModel', studySchema);

export default StudyModel;
