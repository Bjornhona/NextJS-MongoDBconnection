import { connectDatabase, insertDocument, getAllDocuments } from "../../../helpers/db-util";

const handler = async (req, res) => {
  const { eventId } = req.query;

  let client;
  try {
    client = await connectDatabase();
  } catch (err) {
    res.status(500).json({ message: 'Failed to connect to the database!' });
    return;
  }

  if (req.method === 'GET') {
    try {
      const comments = await getAllDocuments(client, 'comments', {_id: -1}, {eventId: eventId});
      res.status(200).json({ comments: comments});
    } catch (err) {
      res.status(500).json({ message: 'Failed to get all comments'});
    }
  }
  
  if (req.method === 'POST') {
    const {email, name, text} = req.body;

    if(
      !email || 
      !email.includes('@') || 
      !name || 
      name.trim() === '' || 
      !text || 
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Please provide all required fields'});
      client.close();
      return;
    }

    // MongoDB will create an id automatically for me.
    const newComment = {
      email,
      name,
      text,
      eventId
    }

    try {
      const result = await insertDocument(client, 'comments', newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: 'Your comment was saved successfully', comment: newComment});
    } catch (err) {
      res.status(500).json({ message: 'Failed to save your comment!' });
    }
  }
  client.close();
}

export default handler;
