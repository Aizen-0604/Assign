const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { execFile } = require("child_process");

const app = express();
const port = 10000;

app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON bodies
// OR: app.use(express.json()); // Either works

app.post("/calculate", (req, res) => {
    const { num1, num2, operation } = req.body;

    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        return res.status(400).send('Invalid numbers');
    }

    const operationsMap = {
        average: './average',
        maximum: './maximum',
        minimum: './minimum',
    };

    const executable = operationsMap[operation];
    if (!executable) {
        return res.status(400).send('Invalid operation');
    }

    execFile(executable, [num1.toString(), num2.toString()], (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${stderr}`);
            return res.status(500).send('Error performing operation');
        }
        res.send({ result: parseFloat(stdout.trim()) });
    });
});

app.listen(port,() => {
    console.log(`Server listening on http://localhost:${port}`);
});
