import React, { useState } from "react";
import LaenderGrid from "./LaenderGrid";
import axios from "axios";

function Laender() {
  const [land, setLand] = useState("");
  const [footprint, setFootprint] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Sende die Daten an den Server
    axios
      .post("http://localhost:3000/api/data?type=Laender", {
        land: land,
        footprint: parseFloat(footprint), // Wandele den Fußabdruck in eine Dezimalzahl um
      })
      .then((response) => {
        // Daten erfolgreich gespeichert
        console.log("Daten wurden gespeichert", response.data);

        // Setze die Eingabefelder zurück
        setLand("");
        setFootprint("");
      })
      .catch((error) => {
        // Fehler beim Speichern der Daten
        console.error("Fehler beim Speichern der Daten:", error);
      });
  };

  return (
    <div>
      <h1>Länder</h1>
      <form onSubmit={handleFormSubmit} className="row">
        <div className="col-6 mb-3">
          <label htmlFor="land" className="form-label">
            Land:
          </label>
          <input
            type="text"
            className="form-control"
            id="land"
            value={land}
            onChange={(e) => setLand(e.target.value)}
          />
        </div>
        <div className="col-6 mb-3">
          <label htmlFor="footprint" className="form-label">
            CO²-Fußabdruck:
          </label>
          <input
            type="number"
            className="form-control"
            id="footprint"
            value={footprint}
            onChange={(e) => setFootprint(e.target.value)}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Daten speichern
          </button>
        </div>
      </form>
      <div className="mt-3">
        <LaenderGrid />
      </div>
    </div>
  );
}

export default Laender;
