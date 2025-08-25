import dbConnect from '../../../lib/mongodb.js';
import Email from '../../../schemas/email.schema.js';
import cors from '../../../lib/cors.js';

export default async function handler(req, res) {
  await cors(req, res);
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const emails = await Email.find().sort({ receivedAt: -1 }).exec();
      res.status(200).json(emails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch emails' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}