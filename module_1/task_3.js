import fs from 'fs';
import {pipeline} from 'stream';
import csvtojson from 'csvtojson';

const PATHS = {
  CSV_FILE_PATH: './csv/nodejs-hw1-ex1.csv',
  OUTPUT_FILE_PATH: './csv/output.txt',
};

const onError = (error) => {
  if(error) {
    console.error(error.message);
  }
}

const writeJsonByPipeline = (inputFilePath, outputFilePath) => {
  pipeline(
    fs.createReadStream(inputFilePath),
    csvtojson({
        noheader:false,
    }),
    fs.createWriteStream(outputFilePath),
    (error) => {
      if(error) {
        onError(error);
      }
      console.log('Finished without errors');
    },
  );
}

const writeJson = (inputFilePath, outputFilePath) => {
  const writeStream = fs.createWriteStream(outputFilePath);
  csvtojson({
      noheader: false,
  })
  .fromFile(inputFilePath)
  .on('data', (data) => {
      writeStream.write(data);
  })
  .on('error', onError)
  .on('done', () => console.log('Finished without errors'));
};

console.log('Choose the options. 1 - write json. 2 - write json by pipeline');
const ACTIONS = {
  '1': () => writeJson(PATHS.CSV_FILE_PATH, PATHS.OUTPUT_FILE_PATH),
  '2': () => writeJsonByPipeline(PATHS.CSV_FILE_PATH, PATHS.OUTPUT_FILE_PATH),
};

process.stdin.on('readable', () => {
  const input = process.stdin.read();
  if(input) {
    const option = input.toString().trim();
    ACTIONS[option] && ACTIONS[option]();
  }
});
