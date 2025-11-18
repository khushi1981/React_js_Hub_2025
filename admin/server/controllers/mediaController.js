// mediaController.js
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const { getDb } = require('../database');

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
const LOGO_DIR = path.join(UPLOAD_DIR, 'logo');
const FILE_DIR = path.join(UPLOAD_DIR, 'file');

function ensureDirs() {
  if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);
  if (!fs.existsSync(LOGO_DIR)) fs.mkdirSync(LOGO_DIR);
  if (!fs.existsSync(FILE_DIR)) fs.mkdirSync(FILE_DIR);
}
ensureDirs();

function sendJSON(res, status, obj) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify(obj));
}

function sanitizeFilename(name) {
  return (name || '').replace(/[^a-z0-9.\-_\s]/gi, '_');
}

async function getMediaByFormat(req, res, query) {
  try {
    const formatId = parseInt(query.formatId);
    const db = getDb();
    const media = await db.collection('media').find({ format_id: formatId }).toArray();
    sendJSON(res, 200, media);
  } catch (err) {
    console.error(err);
    sendJSON(res, 500, { error: 'Failed to fetch media' });
  }
}

async function handleUpload(req, res) {
  if (req.method !== 'POST') return sendJSON(res, 405, { error: 'Method not allowed' });

  const form = formidable({
    multiples: false,
    keepExtensions: true,
    uploadDir: FILE_DIR,
    maxFileSize: 200 * 1024 * 1024
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parse error', err);
      return sendJSON(res, 400, { error: 'Invalid form data' });
    }

    try {
      const name = fields.name || '';
      const description = fields.description || '';
      const format = parseInt(fields.format || '0');
      const subject = parseInt(fields.subject || '0');

      if (!files.logo || !files.file) {
        return sendJSON(res, 400, { error: 'logo and file are required' });
      }

      const db = getDb();
      // Optional: validate allowed extensions from format.t1/t2 if present
      const fmt = await db.collection('format').findOne({ format_id: format });
      const allowed = fmt ? [fmt.t1, fmt.t2].filter(Boolean).map(x => x.toLowerCase()) : null;

      const mediaFile = files.file;
      const fileExt = (path.extname(mediaFile.originalFilename || mediaFile.newFilename) || '').replace('.', '').toLowerCase();

      if (allowed && allowed.length && !allowed.includes(fileExt)) {
        return sendJSON(res, 400, { error: `Invalid file type. Allowed: ${allowed.join(', ')}` });
      }

      // Move logo and file to target dirs
      const logoFile = files.logo;
      const logoName = Date.now() + '_' + sanitizeFilename(logoFile.originalFilename || logoFile.newFilename);
      const fileName = Date.now() + '_' + sanitizeFilename(mediaFile.originalFilename || mediaFile.newFilename);

      const logoTarget = path.join(LOGO_DIR, logoName);
      const fileTarget = path.join(FILE_DIR, fileName);

      fs.renameSync(logoFile.filepath || logoFile.file, logoTarget);
      fs.renameSync(mediaFile.filepath || mediaFile.file, fileTarget);

      const logoUrl = `/uploads/logo/${logoName}`;
      const fileUrl = `/uploads/file/${fileName}`;

      const doc = {
        name,
        desc: description,
        logo: logoUrl,
        'media-file': fileUrl,
        format_id: format,
        subject_id: subject,
        dop: new Date()
      };

      const result = await db.collection('media').insertOne(doc);
      sendJSON(res, 200, { success: true, id: result.insertedId, doc });
    } catch (e) {
      console.error(e);
      sendJSON(res, 500, { error: 'Upload failed' });
    }
  });
}

module.exports = { getMediaByFormat, handleUpload };
