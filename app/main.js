const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$ ",
});

rl.prompt();

r1.on('line' , (command) => {
  console.log(`${command}: command not found`);
});
