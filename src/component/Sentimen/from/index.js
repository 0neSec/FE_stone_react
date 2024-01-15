import React, { useState } from 'react';
import axios from 'axios';

const TambahReviewForm = () => {
  const [nama, setNama] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [review, setReview] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://4.145.90.55:8000/tambah_review', {
        nama,
        tanggal,
        review,
      });

      console.log(response.data);
      // Handle response, mungkin menampilkan pesan sukses atau redirect ke halaman lain
    } catch (error) {
      console.error('Error adding review:', error);
      // Handle error, mungkin menampilkan pesan error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nama:
        <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} />
      </label>
      <br />
      <label>
        Tanggal:
        <input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
      </label>
      <br />
      <label>
        Review:
        <textarea value={review} onChange={(e) => setReview(e.target.value)} />
      </label>
      <br />
      <button type="submit">Tambahkan Review</button>
    </form>
  );
};

export default TambahReviewForm;
