import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import image from '../../assest/iconcamera-removebg-preview.png';
import { fetchArtikel } from '../../config/action';

const Camera = ({ artikelData }) => {
  const [inputValue, setInputValue] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [predictedImageName, setPredictedImageName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { JudulArtikel } = useParams();
  
  useEffect(() => {
    dispatch(fetchArtikel());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      getBase64(file);
    }
  }

  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      const base64String = reader.result.split(',')[1];
      setUploadedImage(reader.result);  // Simpan gambar yang diunggah dalam format base64
      setInputValue(base64String);
      console.log('Gambar dalam format base64:', base64String);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://4.145.90.55:8000/predict', {
        message: inputValue
      });
      console.log(response);
      const predictionResult = response.data;

      setPredictedImageName(predictionResult.nama);  // Simpan nama gambar hasil prediksi

      if (artikelData && artikelData.length > 0) {
        const artikel = artikelData.find((item) => item.JudulArtikel === predictionResult.nama);

        if (artikel) {
          navigate(`/artikel/${artikel.JudulArtikel}`);
        } else {
          console.log('Data hasil prediksi tidak valid');
        }
      } else {
        console.log('Data artikel tidak tersedia atau kosong');
      }
    } catch (error) {
      console.log('Gagal terkirim:', error);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        console.log('Pesan Kesalahan:', errorMessage);
      }
    }
  };

  return (
    <div>
      <div className='camera'>
        <div className="bg-cover min-h-screen flex items-center justify-center">
          <div className="bg-sky-400 rounded-lg border-8 md:w-1/3 w-4/6 border-black h-4/5 relative">
            <div className="border-2 m-auto top-6 md:top-12 border-dashed border-black w-4/6 sm:w-3/4 h-48 sm:h-64 relative">
              <div className="border-dashed border-black h-full p-4">
                {/* Tampilkan gambar yang diunggah atau gambar default */}
                <img src={uploadedImage || image} alt="" className="w-4/5 h-full object-cover mx-auto" />
              </div>
            </div>
            <form onSubmit={handleSubmit}>
  <div className="flex flex-col items-center relative mt-16 p-10">
    <label htmlFor="imageInput" className="mb-4 p-2 border border-gray-300 rounded-lg w-full sm:w-3/4 cursor-pointer">
      Ambil Gambar dari Kamera
      <input type="file" accept="image/*" capture="camera" id="imageInput" className="hidden" onChange={handleInputChange} />
    </label>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Submit
    </button>
  </div>
</form>

            <div className="text-center mt-4">
              {/* Tampilkan nama gambar hasil prediksi */}
              {predictedImageName && (
                <p className="text-lg font-bold">Nama Gambar: {predictedImageName}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  artikelData: state.artikelData,
});

export default connect(mapStateToProps)(Camera);
