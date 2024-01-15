import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function SentimenComponent() {
  const [sentimenData, setSentimenData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://4.145.90.55:8000/sentimen');
        setSentimenData(response.data);
      } catch (error) {
        console.error('Error fetching sentimen data:', error);
      }
    };

    fetchData();
  }, []);

  const data = [
    { name: 'Positif', value: sentimenData?.jumlah_positif || 0 },
    { name: 'Netral', value: sentimenData?.jumlah_netral || 0 },
    { name: 'Negatif', value: sentimenData?.jumlah_negatif || 0 },
  ];

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold mb-4'>Analisis Sentimen</h1>
        {sentimenData && (
          <div>
            <BarChart width={600} height={600} data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </div>
        )}
      </div>
    </div>
  );
}

export default SentimenComponent;
