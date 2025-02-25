const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// SQL Server Configuration
const config = {
    user: "Vishwa",
    password: "1234",
    server: "DESKTOP-N6QQHD7\\SQLEXPRESS",
    database: "springbootdb",
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};

const config1 = {
    user: "Vishwa",
    password: "1234",
    server: "DESKTOP-N6QQHD7\\SQLEXPRESS",
    database: "App",
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};


// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});



app.post("/addevent", async (req, res) => {
    const { eventName, eventDescription, eventDate, eventLocation, eventOrganizer, maxSeats } = req.body;
    try {
        await sql.connect(config);
        await sql.query`INSERT INTO Events (EventName, EventDescription, EventDate, EventLocation, EventOrganizer, MaxSeats) 
VALUES (${eventName}, ${eventDescription}, ${eventDate}, ${eventLocation}, ${eventOrganizer}, ${maxSeats})`;

        res.json({ message: "Event added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



app.get("/events", async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query("SELECT * FROM Events");
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/events/:id", async (req, res) => {
    const { id } = req.params; // Get event ID from the URL
    const { eventName, eventDescription, eventDate, eventLocation, eventOrganizer, maxSeats } = req.body;
    try {
        await sql.connect(config);

        // Update the event using the provided parameters
        await sql.query`
            UPDATE Events 
            SET 
                EventName = ${eventName}, 
                EventDescription = ${eventDescription}, 
                EventDate = ${eventDate}, 
                EventLocation = ${eventLocation}, 
                EventOrganizer = ${eventOrganizer}, 
                MaxSeats = ${maxSeats}
            WHERE EventID = ${id}`;

        res.json({ message: "Event updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// GET request for fetching an event by its ID
app.get("/events/:id", async (req, res) => {
    const { id } = req.params; // Get event ID from the URL
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT * FROM Events WHERE EventID = ${id}`;
        
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "Event not found" });
        }
        
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



