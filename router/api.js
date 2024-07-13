import express from 'express';
import mongoose from 'mongoose'
const app = express();

const url = 'mongodb+srv://pradeeakumar:pradeep123@cluster0.mmzujul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const router = express.Router()
const { Schema, Types } = mongoose;
//for getting and for posting
const fullStackSchema = new mongoose.Schema({
  name: String,
  age: Number
})
const something = mongoose.model('FullStack57F', fullStackSchema);


mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB');

    // Access the FullStack57f collection
    // Now you can perform operations on FullStack57f collection
    // For example, find documents:

  })
  .catch(err => console.error('Error connecting to MongoDB:', err));


//Route to put the data in db
router.post('/', (req, res) => {
  const data = req.body;

  // Log the request body to debug
  console.log('Request Body:', data);

  if (!data) {
    return res.status(400).send('No data received');
  }

  const newDocument = new something({
    name: data.name,
    age: data.age
  })

  try {
    const savedDocument = newDocument.save();
    console.log(`Data saved`, savedDocument);
    res.json({ message: 'Data Saved Succesfully', document: savedDocument })
  }
  catch (err) {
    console.error('Error saving document:', err);
    res.status(500).send('Error saving document');
  }

});

router.put('/edit', async (req, res) => {
  const data = req.body;

  console.log(`Data PUT%%%%% Checking ${data.id}`)
  if (!data || !data.id) {
    return res.status(400).send('No data received or ID missing');
  }

  if (!Types.ObjectId.isValid(data.id)) {
    return res.status(400).send('Invalid ObjectId');
  }

  try {
    const updatedDocument = await something.findByIdAndUpdate(
      data.id,
      { name: data.name, age: data.age },
      { new: true }
    );

    if (!updatedDocument) {
      return res.status(404).send('Document not found');
    }

    res.json({ message: 'Document updated successfully', document: updatedDocument });
  } catch (err) {
    console.error('Error updating document:', err);
    res.status(500).send('Error updating document');
  }
});
router.delete("/delete", async (req, res) => {
  const data = req.body
  try{
  const deletedDocument = await something.findByIdAndDelete(data.id, { new: true });
  if (!deletedDocument) {
    return res.status(404).send('Document not found');
  }

  res.json({ message: "Document Deleted Succesfully", document: deletedDocument });
  }
  catch(err){
    console.error('Error Deleting document:', err);
    res.status(500).send('Error Deleting document');
  }
})
router.get("/all", async (req, res) => {
  const allDocuments = await something.find({});
  res.json(allDocuments)
})
export default router;