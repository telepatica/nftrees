"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const csvtojson_1 = __importDefault(require("csvtojson"));
const app = (0, express_1.default)();
const port = 3000;
const inputFile = './nftrees_b2.csv';
const outputFile = 'b2_nfTree.json';
app.get('/convert', (req, res) => {
    res.send('converting in process!');
    (0, csvtojson_1.default)()
        .fromFile(inputFile)
        .then((data) => {
        let newData = data.map((item) => {
            let id = item.capture_id;
            let time = item.time_created;
            let location = item.estimated_geometric_location;
            let morphology = item.morphology;
            let age = item.age;
            return { id, time, location, morphology, age };
        });
        fs_1.promises.writeFile(outputFile, JSON.stringify(newData));
    });
});
// express server
app.listen(port, () => {
    console.log('server started at http://localhost:${port}');
});
