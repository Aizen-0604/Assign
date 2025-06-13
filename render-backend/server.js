const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { execFile } = require("child_process");

const app = express();
const port = process.env.PORT || 10000; // Use Render's PORT or default

app.use(cors());
app.use(bodyParser.json());

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
            console.error(error);
            return res.status(500).send('Error performing operation');
        }
        res.send({ result: parseFloat(stdout.trim()) });
    });
});

// Listen on 0.0.0.0 for cloud hosting, or omit for localhost dev
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
