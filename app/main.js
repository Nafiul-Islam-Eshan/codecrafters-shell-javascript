const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$ ",
});

rl.prompt();

rl.on("line", (command) => {
  // 1. exit command
  if (command === "exit") {
    rl.close();
    return;
  }

  // 2. echo command
  else if (command.startsWith("echo ")) {
    console.log(command.slice(5));
  } 
  
  
  else {
    console.log(`${command}: command not found`);
  }

  rl.prompt();
});
