import dbConnect from '../../../lib/mongodb.js';
import Email from '../../../schemas/email.schema.js';
import cors from '../../../lib/cors.js';

export default async function handler(req, res) {
  await dbConnect();
  await cors(req, res);
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const email = await Email.findById(id).exec();
      if (!email) {
        return res.status(404).json({ error: 'Email not found' });
      }
      res.status(200).json(email);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch email' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}