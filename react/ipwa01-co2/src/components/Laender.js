import React, { useState } from "react";
import LaenderGrid from "./LaenderGrid";
import axios from "axios";

function Laender() {
  const [land, setLand] = useState("");
  const [footprint, setFootprint] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!land.trim()) {
      newErrors.land = "Bitte geben Sie ein Land ein.";
    }

    if (isNaN(footprint) || footprint <= 0) {
      newErrors.footprint = "Bitte geben Sie einen gültigen CO²-Fußabdruck ein.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const translateCountryName = (germanCountryName) => {
    const translations = {
      "Deutschland": "Germany",
      "Spanien": "Spain",
      "Italien": "Italy",
      "Türkei": "Turkey",
      "Portugal": "Portugal",
      "Griechenland": "Greece",
      "Norwegen": "Norway",
      "Schweden": "Sweden",
      "China": "China",
      "India": "India",
      "Mexiko": "Mexico",
      "Südafrika": "South Africa" 
    };
    return translations[germanCountryName] || germanCountryName;
  };


  const checkCountryExistence = async (countryName) => {
    try {
      const englishCountryName = translateCountryName(countryName);

      const response = await axios.get(`https://restcountries.com/v3.1/name/${englishCountryName}`);
      const countries = response.data;
      return countries.length > 0;
    } catch (error) {
      console.error('Fehler beim Überprüfen des Landes:', error);
      return false;
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const countryExists = await checkCountryExistence(land);
      if (countryExists) {
        axios
          .post("http://localhost:3000/api/data?type=Laender", {
            land: land,
            footprint: parseFloat(footprint),
          })
          .then((response) => {
            console.log("Daten wurden gespeichert", response.data);
            setLand("");
            setFootprint("");

            window.location.reload();
          })
          .catch((error) => {
            console.error("Fehler beim Speichern der Daten:", error);
          });
      } else {
        alert('Dieses Land existiert nicht.');
      }
    }
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
            className={`form-control ${errors.land ? "is-invalid" : ""}`}
            id="land"
            value={land}
            onChange={(e) => setLand(e.target.value)}
          />
          {errors.land && (
            <div className="invalid-feedback">{errors.land}</div>
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
        <LaenderGrid />
      </div>
    </div>
  );
}

export default Laender;
