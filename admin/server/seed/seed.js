// seed.js
const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const dbName = process.env.MONGO_DB || 'admin';

async function run() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  const formats = [
    { format_id: 1, format_name: 'PDF', format_description: 'PDF Documents', format_logo: '/uploads/logo/sample_pdf.png', t1: 'pdf', t2: 'doc' },
    { format_id: 2, format_name: 'Video', format_description: 'MP4 & Video Files', format_logo: '/uploads/logo/sample_video.png', t1: 'mp4', t2: 'mkv' },
    { format_id: 3, format_name: 'Image', format_description: 'Images', format_logo: '/uploads/logo/sample_image.png', t1: 'jpg', t2: 'png' }
  ];

  const subjects = [
    { subject_id: 1, name: 'Math' },
    { subject_id: 2, name: 'Science' },
    { subject_id: 3, name: 'History' }
  ];

  const fmtCount = await db.collection('format').countDocuments({});
  if (fmtCount === 0) await db.collection('format').insertMany(formats);

  const subCount = await db.collection('subject').countDocuments({});
  if (subCount === 0) await db.collection('subject').insertMany(subjects);

  console.log('Seed complete');
  await client.close();
}

run().catch(console.error);
