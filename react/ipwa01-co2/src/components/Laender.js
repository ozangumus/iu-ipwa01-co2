import React from "react";
import { Laender as AgGridLaender } from './LaenderGrid';

function Laender() {
  return (
    <div>
      <h1>Länder</h1>
      <AgGridLaender />
    </div>
  );
}

export default Laender;