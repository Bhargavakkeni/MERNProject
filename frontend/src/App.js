// App.js

import React, { useState } from 'react';
import './App.css';
import './styling.css';

function App() {
  const [url, setUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [size, setSize] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://backend-2o26.onrender.com/take-screenshot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      });

      if (!response.ok) {
        throw new Error('Failed to take screenshot');
      }

      const data = await response.json();
      setThumbnail(data.thumbnail);
      setCreatedAt(data.createdAt);
      setSize(data.size);
    } catch (error) {
      setError('Failed to take screenshot');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Website Screenshot</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
        />
        <button type="submit" disabled={loading}>Take Screenshot</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {thumbnail && <img src={thumbnail} alt="Website Thumbnail" />}
      {createdAt && <p>Created At: {createdAt}</p>}
      {size && <p>Size: {size} Bytes</p>}

    </div>
  );
}

export default App;
