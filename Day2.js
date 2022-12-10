import process from "node:process";
import { open } from "node:fs/promises";

// Puzzle for Day 2: https://adventofcode.com/2022/day/2

// Check that the right number of arguments are present in the command
if (process.argv.length !== 3){
  console.log('Please specify an input file.');
  process.exit(1);
}

// Get the file name from the last argv value
const filename = process.argv[2];

// Open the file and pass it ot our main processing 
open(filename)
.then(file => {
  processLines(file)
});

// Process all of the lines of the file after it has been opened
const processLines = async(file) => {

  // OP
  // A: Rock
  // B: Paper
  // C: Scissors

  // You
  // X: Rock:    1
  // Y: Paper    2
  // Z: Scissors 3

  // Win  6
  // Tie  3
  // Lose 0
  const games1 = [
    "B X", // OP: Paper    You: Rock     1 Lose 0
    "C Y", // OP: Scissors You: Paper    2 Lose 0
    "A Z", // OP: Rock     You: Scissors 3 Lose 0
    "A X", // OP: Rock     You: Rock     1 Tie  3
    "B Y", // OP: Paper    You: Paper    2 Tie  3
    "C Z", // OP: Scissors You: Scissors 3 Tie  3
    "C X", // OP: Scissors You: Rock     1 Win  6
    "A Y", // OP: Rock     You: Paper    2 Win  6
    "B Z", // OP: Paper    You: Scissors 3 Win  6
  ]

  // OP
  // A: Rock
  // B: Paper
  // C: Scissors

  // You
  // Rock:    1
  // Paper    2
  // Scissors 3

  // X: Lose 0
  // Y: Tie  3
  // Z: Win  6
  const games2 = [
    "B X", // OP: Paper    Lose 0 You: Rock     1
    "C X", // OP: Scissors Lose 0 You: Paper    2
    "A X", // OP: Rock     Lose 0 You: Scissors 3
    "A Y", // OP: Rock     Tie  3 You: Rock     1
    "B Y", // OP: Paper    Tie  3 You: Paper    2
    "C Y", // OP: Scissors Tie  3 You: Scissors 3
    "C Z", // OP: Scissors Win  6 You: Rock     1
    "A Z", // OP: Rock     Win  6 You: Paper    2
    "B Z", // OP: Paper    Win  6 You: Scissors 3
  ]

  let runningTotal1 = 0;
  let runningTotal2 = 0;

  // Read in all of the lines one at a time
  for await (const line of file.readLines()) {
    // need to add one since the index is 0 based instead of 1 based
    runningTotal1 += games1.indexOf(line) + 1;
    runningTotal2 += games2.indexOf(line) + 1;
  }

  // Log output
  console.log(`Part 1 Total Points: ${runningTotal1}`);
  console.log(`Part 2 Total Points: ${runningTotal2}`);
}