import { connectDatabase, insertDocument } from "../../helpers/db-util";

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email format' });
      return;
    }

    // Connects to MongoDB, saves the email to the database and closes the connection.
    let client;
    try {
      client = await connectDatabase();
    } catch (err) {
      res.status(500).json({ message: 'Failed to connect to the database!' });
      return;
    }
    
    try {
      await insertDocument(client, 'email', {email: email});
      client.close();
    } catch (err) {
      res.status(500).json({ message: 'Failed to insert data into the database!' });
      return;
    }

    res.status(201).json({ message: 'You successfully signed up for our newsletter!' });
  }
}

export default handler;
