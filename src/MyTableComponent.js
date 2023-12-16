// MyTableComponent.js

import React, { useState, useEffect } from 'react';

const MyTableComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
  try {
    const response = await fetch('https://wi1bzsmyub.execute-api.ap-south-1.amazonaws.com/Dev/login');
    const jsonData = await response.json();

    if (Array.isArray(jsonData.body)) {
      // Update the property names to match the correct case
      const formattedData = jsonData.body.map(item => ({
        id: item.id,
        Name: item.Name,
      }));

      setData(formattedData);
      setLoading(false);
    } else {
      console.error('Invalid API response:', jsonData);
      setLoading(false);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    setLoading(false);
  }
};

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    fetchData();
  };

  return (
    <div>
      <center><h1 style={{ color: 'red' }}>Data Table</h1></center>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
	  <center>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.Name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleRefresh}>Refresh</button>
	  </center>
        </>
      )}
    </div>
  );
};

export default MyTableComponent;
