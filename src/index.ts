import express from 'express';
import { promises as fsPromises } from 'fs';
import csv from 'csvtojson';


const app = express();
const port = 3000;


const inputFile = './nftrees_b2.csv';
const outputFile = 'b2_nfTree.json';

app.get('/convert', (req, res) => {
  res.send('converting in process!');
    csv({flatKeys:true})
    .fromFile(inputFile)
    .then((data) => {
      console.log(data);
      let newData = data.map( (item: {
        capture_id: string;
        time_created: string;
        estimated_geometric_location: string;
        morphology: string;
        age: string; }) => {
          let id = item.capture_id;
          let time = item.time_created;
          let location = item.estimated_geometric_location;
          let morphology = item.morphology;
          let age = item.age;
          return {id , time, location, morphology, age};
        });
        fsPromises.writeFile(outputFile, JSON.stringify(newData));

      });
});

// express server
app.listen(port, ()=> {
  console.log('server started at http://localhost:${port}');
});
