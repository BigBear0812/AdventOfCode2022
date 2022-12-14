import process from "node:process";
import { open } from "node:fs/promises";

// Puzzle for Day 10: https://adventofcode.com/2022/day/10

// Check that the right number of arguments are present in the command
if (process.argv.length !== 3){
  console.log('Please specify an input file.');
  process.exit(1);
}

// Get the file name from the last argv value
const filename = process.argv[2];

// Open the file and pass it ot our main processing 
open(filename)
.then(async(file) => {
  // Process all of the lines of the file after it has been opened
  let fileContents = []
  for await (const line of file.readLines()) {
    fileContents.push(line);
  }
  return fileContents;
})
.then((fileContents) => {
  // Pointer to keep track of what the next command it
  let cmdIndex = 0;
  // The current cmd being processed
  let currentCmd = "";
  // The key cycle values to keep track of for Part 1
  let keyCycles = [];
  // The output data for each pixel to be rendered in Part 2
  let outputData = [];

  // Current signal value
  let X = 1;
  // Regex for addx command
  const reg = new RegExp(/addx (-*\d+)/)
  for(let cycle = 1; cmdIndex < fileContents.length; cycle++){

    // If this is one of the key cycles add it to the array
    if(cycle === ((keyCycles.length * 40) + 20))
      keyCycles.push(X);

    // Render the output image into the array.
    // This is for a screen that is 40 pixels wide.
    // The math is expecting a 0 based index versus a 1 based cycle count.
    let pos = (cycle - 1) - (Math.floor((cycle - 1)/40) * 40);
    if(pos === X-1 || pos === X || pos === X+1)
      outputData.push('#');
    else
      outputData.push('.')

    // Parse in a new command if necessary
    let newCmd = false;
    if(currentCmd === ""){
      currentCmd = fileContents[cmdIndex];
      cmdIndex++;
      newCmd = true;
    }

    // If this is an addx command and it's on its second cycle
    const matches = currentCmd.match(reg);
    if(matches && !newCmd){
      X += parseInt(matches[1]);
      newCmd = false;
      currentCmd = "";
    }
    // Else if its the noop command 
    else if(!matches){
      newCmd = false;
      currentCmd = "";
    }
  }

  // Compute total signal strength for Part 1
  let runningTotal = 0;
  for(let i = 0; i < keyCycles.length; i++){
    runningTotal += keyCycles[i] * ((i * 40) + 20);
  }

  // Log output
  console.log(`Total signal strength: ${runningTotal}`)
 
  // Output each line of text generated by the commands
  let currentLine = '';
  for(let i = 0; i <= outputData.length; i++){
    if(i % 40 === 0){
      console.log(currentLine);
      currentLine = '';
    }
    if(i < outputData.length)
      currentLine += outputData[i];
  }
});