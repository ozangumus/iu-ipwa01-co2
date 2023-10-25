import React, { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';

const LaenderData = [
  {
    land: {
      name: 'Deutschland',
      population: '83019200',
    },
  },
  {
    land: {
      name: 'Frankreich',
      population: '66991000',
    },
  },
  // Weitere Länderdaten
];

const Laender = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'land.name',
        header: 'Land',
        size: 150,
      },
      {
        accessorKey: 'land.population',
        header: 'Bevölkerung',
        size: 150,
      },
    ],
    [],
  );

  return <MaterialReactTable columns={columns} data={LaenderData} />;
};

export { Laender };