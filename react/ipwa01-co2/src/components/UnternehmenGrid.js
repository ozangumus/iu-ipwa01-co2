import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';

const columns: GridColDef[] = [
  { field: 'Name', headerName: 'Unternehmen', width: 150 },
  { field: 'Footprint', headerName: 'Footprint', width: 150 },
];

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Daten aus dem Server abrufen
    axios.get('http://localhost:3000/api/data?type=Unternehmen') // Beachte, dass dies zur API-Route im Node.js-Server führt
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Fehler beim Abrufen der Daten:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ height: 300, width: '100%' }}>
      {loading ? (
        <p>Lade Daten...</p>
      ) : (
        <DataGrid rows={data} columns={columns} />
      )}
    </div>
  );
}
