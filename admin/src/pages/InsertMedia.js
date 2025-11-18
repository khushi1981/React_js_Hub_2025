import React, { useEffect, useState } from 'react';
import { fetchFormats, uploadMedia } from '../api';
import './InsertMedia.css';

export default function InsertMedia() {
  const [formats, setFormats] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [state, setState] = useState({ name: '', description: '', format: '', subject: '' });
  const [logoFile, setLogoFile] = useState(null);
  const [mediaFile, setMediaFile] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchFormats().then(data => {
      if (Array.isArray(data)) setFormats(data);
      else console.error('fetchFormats error', data);
    }).catch(console.error);

    // Use subjects seeded by server; for now keep small local list to avoid extra endpoint
    setSubjects([
      { subject_id: 1, name: 'Math' },
      { subject_id: 2, name: 'Science' },
      { subject_id: 3, name: 'History' }
    ]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!logoFile || !mediaFile) {
      setMsg('Please attach both logo and file.');
      return;
    }

    const fd = new FormData();
    fd.append('name', state.name);
    fd.append('description', state.description);
    fd.append('format', state.format);
    fd.append('subject', state.subject);
    fd.append('logo', logoFile);
    fd.append('file', mediaFile);

    setMsg('Uploading...');
    try {
      const res = await uploadMedia(fd);
      if (res.success) {
        setMsg('Successfully done..!');
        setState({ name: '', description: '', format: '', subject: '' });
        setLogoFile(null);
        setMediaFile(null);
      } else {
        setMsg(res.error || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      setMsg('Upload failed');
    }
  };

  return (
    <div className="media">
      <div className="form-container">
        <h2>Insert Details</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label>Name:</label>
            <input value={state.name} onChange={e => setState({ ...state, name: e.target.value })} required />
          </div>

          <div className="form-group">
            <label>Logo:</label>
            <input type="file" accept="image/*" onChange={e => setLogoFile(e.target.files[0])} required />
          </div>

          <div className="form-group">
            <label>File:</label>
            <input type="file" onChange={e => setMediaFile(e.target.files[0])} required />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea value={state.description} onChange={e => setState({ ...state, description: e.target.value })} rows="4" required />
          </div>

          <div className="form-group">
            <label>Format:</label>
            <select value={state.format} onChange={e => setState({ ...state, format: e.target.value })} required>
              <option value="" disabled>Select Format</option>
              {formats.map(f => <option key={f.format_id} value={f.format_id}>{f.format_name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Subject:</label>
            <select value={state.subject} onChange={e => setState({ ...state, subject: e.target.value })} required>
              <option value="" disabled>Select Subject</option>
              {subjects.map(s => <option key={s.subject_id} value={s.subject_id}>{s.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <button type="submit">Submit</button>
          </div>
        </form>
        {msg && <p className="message">{msg}</p>}
      </div>
    </div>
  );
}
