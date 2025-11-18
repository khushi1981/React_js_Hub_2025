import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMediaByFormat } from '../api';
import './AccessMedia.css';

export default function AccessMedia() {
  const { id } = useParams();
  const [media, setMedia] = useState([]);

  useEffect(() => {
    if (!id) return;
    fetchMediaByFormat(id).then(data => {
      if (Array.isArray(data)) setMedia(data);
      else console.error('media fetch error', data);
    }).catch(console.error);
  }, [id]);

  return (
    <div>
      <h2>Access Media</h2>
      {media.length === 0 ? (
        <p>No media details found for the selected format.</p>
      ) : (
        <table id="example">
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Name</th>
              <th>Description</th>
              <th>Logo</th>
              <th>File</th>
            </tr>
          </thead>
          <tbody>
            {media.map((m, idx) => (
              <tr key={m._id}>
                <td>{idx + 1}</td>
                <td>{m.name}</td>
                <td>{m.desc}</td>
                <td><img src={m.logo} width="50" alt={m.name} /></td>
                <td><a href={m['media-file']} target="_blank" rel="noreferrer">Download</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
