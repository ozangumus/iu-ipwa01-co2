const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON-Anfragen

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('co2-backend.db'); // Erstelle oder öffne die Datenbankdatei

db.serialize(() => {
  // Lösche die Tabellen, wenn sie existieren
  db.run("DROP TABLE IF EXISTS Laender");
  db.run("DROP TABLE IF EXISTS Unternehmen");

  // Erstelle die Tabelle "Laender" mit "Footprint"
  db.run("CREATE TABLE Laender (id INTEGER PRIMARY KEY, Land TEXT, Footprint REAL)");
  const stmtLaender = db.prepare("INSERT INTO Laender (Land, Footprint) VALUES (?, ?)");
  stmtLaender.run('Deutschland', 83019200);
  stmtLaender.run('Frankreich', 66991000);
  stmtLaender.finalize();

  // Erstelle die Tabelle "Unternehmen"
  db.run("CREATE TABLE Unternehmen (id INTEGER PRIMARY KEY, Name TEXT, Footprint REAL)");
  const stmtUnternehmen = db.prepare("INSERT INTO Unternehmen (Name, Footprint) VALUES (?, ?)");
  stmtUnternehmen.run('VW', 150000);
  stmtUnternehmen.run('BMW', 2500);
  stmtUnternehmen.run('Suzuki', 15500);
  stmtUnternehmen.finalize();
});

app.post('/api/data', (req, res) => {
  const type = req.query.type;

  if (type === 'Laender') {
    const { id, land, footprint } = req.body;
    db.run("INSERT INTO Laender (Land, Footprint) VALUES (?, ?)", [ land, footprint], (err) => {
      if (err) {
        console.error('Fehler beim Speichern der Länderdaten:', err);
        res.status(500).json({ error: 'Interner Serverfehler' });
      } else {
        res.status(200).send('Daten erfolgreich gespeichert');
      }
    });
  } else if (type === 'Unternehmen') {
    const { name, footprint } = req.body;
    db.run("INSERT INTO Unternehmen (Name, Footprint) VALUES (?, ?)", [name, footprint], (err) => {
      if (err) {
        console.error('Fehler beim Speichern der Unternehmensdaten:', err);
        res.status(500).json({ error: 'Interner Serverfehler' });
      } else {
        res.status(200).send('Daten erfolgreich gespeichert');
      }
    });
  } else {
    res.status(400).json({ error: 'Ungültiger Anfragetyp' });
  }
});

app.get('/api/data', (req, res) => {
  const type = req.query.type;

  if (type === 'Laender') {
    db.all("SELECT * FROM Laender", (err, rows) => {
      if (err) {
        console.error('Fehler beim Abrufen der Länderdaten:', err);
        res.status(500).json({ error: 'Interner Serverfehler' });
      } else {
        res.json(rows);
      }
    });
  } else if (type === 'Unternehmen') {
    db.all("SELECT * FROM Unternehmen", (err, rows) => {
      if (err) {
        console.error('Fehler beim Abrufen der Unternehmensdaten:', err);
        res.status(500).json({ error: 'Interner Serverfehler' });
      } else {
        res.json(rows);
      }
    });
  } else {
    res.status(400).json({ error: 'Ungültiger Anfragetyp' });
  }
});

app.listen(3000, () => {
  console.log('Server läuft auf Port 3000');
});
