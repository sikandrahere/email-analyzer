import dbConnect from '../../../lib/mongodb';
import Email from '../../../schemas/email.schema';
import { simpleParser } from 'mailparser';
import axios from 'axios';
import cors from '../../../lib/cors.js';

const TESTMAIL_API_KEY = process.env.TESTMAIL_API_KEY;
const TESTMAIL_NAMESPACE = process.env.TESTMAIL_NAMESPACE;

async function fetchAndProcessEmails() {
  // Fetch latest emails metadata
  const listUrl = await axios.get('https://api.testmail.app/api/json', {
    params: {
      apikey: TESTMAIL_API_KEY,
      namespace: TESTMAIL_NAMESPACE,
      livequery: 'true'
    }
  });
  const emails = listUrl.data.emails;
  if (!emails || emails.length === 0) return [];

  const processedEmails = [];

  for (const email of emails) {
    try {
      const emailId = email.id;
      const downloadUrl = email.downloadUrl;

      // Fetch raw email content from downloadUrl
      const rawEmailResp = await axios.get(downloadUrl, {
        responseType: 'text',
      });
      const rawEmail = rawEmailResp.data;

      // Parse raw email
      const parsed = await simpleParser(rawEmail);

      const messageId = parsed.messageId || emailId;
      const already = await Email.findOne({ 'rawHeaders': rawEmail });
      if (already) {
        processedEmails.push(already);
        continue; // skip duplicate
      }

      // Extract receiving chain
      const receivingChain = [];
      parsed.headers.forEach((value, key) => {
        if (key.toLowerCase() === 'received') {
          receivingChain.push(String(value));
        }
      });

      // Basic ESP detection from headers
      let espType = 'Unknown';
      const returnPath = parsed.headers.get('return-path') || '';
      if (messageId.includes('gmail.com') || returnPath.includes('gmail.com')) espType = 'Gmail';
      else if (messageId.includes('outlook.com') || returnPath.includes('outlook.com')) espType = 'Outlook';
      else if (returnPath.includes('amazonses.com')) espType = 'Amazon SES';
      else if (returnPath.includes('zoho.com')) espType = 'Zoho';

      const emailDoc = new Email({
        subject: parsed.subject || '(No Subject)',
        from: parsed.from?.text || '(Unknown)',
        espType,
        receivingChain,
        rawHeaders: rawEmail,
        receivedAt: parsed.date || new Date(),
      });

      await emailDoc.save();
      processedEmails.push(emailDoc);
    } catch (error) {
      console.error('Error processing email:', error);
    }
  }

  return processedEmails;
}

export default async function handler(req, res) {
  await dbConnect();
  await cors(req, res);

  if (req.method === 'GET') {
    try {
      const emailDocs = await fetchAndProcessEmails();
      if (emailDocs.length > 0) {
        res.status(200).json(emailDocs);
      } else {
        res.status(204).send();
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch and process emails' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
