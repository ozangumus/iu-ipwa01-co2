import React, { useState } from "react";
import UnternehmenGrid from "./UnternehmenGrid";
import axios from "axios";


function Unternehmen() {
  const [name, setName] = useState("");
  const [footprint, setFootprint] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Bitte geben Sie ein Unternehmen ein.";
    }

    if (isNaN(footprint) || footprint <= 0) {
      newErrors.footprint = "Bitte geben Sie einen gültigen CO²-Fußabdruck ein.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      axios
        .post("http://localhost:3000/api/data?type=Unternehmen", {
          name: name,
          footprint: parseFloat(footprint),
        })
        .then((response) => {
          console.log("Daten wurden gespeichert", response.data);
          setName("");
          setFootprint("");

          window.location.reload();
        })
        .catch((error) => {
          console.error("Fehler beim Speichern der Daten:", error);
        });
    }
  };

  return (
    <div>
      <h1>Unternehmen</h1>
      <form onSubmit={handleFormSubmit} className="row">
        <div className="col-6 mb-3">
          <label htmlFor="unternehmen" className="form-label">
            Unternehmen:
          </label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            id="unternehmen"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name}</div>
          )}
        </div>
        <div className="col-6 mb-3">
          <label htmlFor="footprint" className="form-label">
            CO²-Fußabdruck:
          </label>
          <input
            type="number"
            className={`form-control ${errors.footprint ? "is-invalid" : ""}`}
            id="footprint"
            value={footprint}
            onChange={(e) => setFootprint(e.target.value)}
          />
          {errors.footprint && (
            <div className="invalid-feedback">{errors.footprint}</div>
          )}
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Daten speichern
          </button>
        </div>
      </form>
      <div className="mt-3">
        <UnternehmenGrid/>
      </div>
    </div>
  );
}

export default Unternehmen;
