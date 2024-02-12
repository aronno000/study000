// pages/api/users/index.js
import dbConnect from '../../../utils/dbConnect';
import StudyModel from '../../../models/StudyModel';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
            // pages/api/users/index.js
        case 'GET':
          // Implement READ operation
          try {
            const studies = await StudyModel.find({}); // Update variable name to 'studies'
            res.status(200).json({ success: true, data: studies });
          } catch (error) {
            res.status(500).json({ success: false, error: 'Server Error' });
          }
          break;


    case 'POST':
      // Implement CREATE operation
      try {
        const newStudy = new StudyModel(req.body);
        const savedStudy = await newStudy.save();
        res.status(201).json({ success: true, data: savedStudy });
      } catch (error) {
        console.error('Error creating Study:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;      

    // case 'PUT':
    //   // Implement UPDATE operation
    //   try {
    //     const { id } = req.body;
    //     const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body, { new: true });
    //     if (!updatedProduct) {
    //       return res.status(404).json({ success: false, error: 'User not found' });
    //     }
    //     res.status(200).json({ success: true, data: updatedProduct });
    //   } catch (error) {
    //     res.status(400).json({ success: false, error: error.message });
    //   }
    //   break;

    default:
      res.status(405).json({ success: false, error: 'Method Not Allowed' });
      break;
  }
}
