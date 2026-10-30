const readline = require("readline");
const path = require("path");
const fs = require('fs')


const executableFilePath = (command) => {

  const directories = process.env.PATH.split(path.delimiter);

  for (const directory of directories) {
    const fullPath = path.join(directory, command);

    try {
      
      fs.accessSync(fullPath,fs.constants.X_OK);
      return fullPath;
      
    } 
    catch (error) {
      
      continue;
      
    }
  }

  return null;
};

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

  // 3. type command
  else if (command.startsWith("type ")) {

    const commandAfterType = command.slice(5).trim();
    const buildins = ["echo", "type", "exit"];
    const isExecutable = executableFilePath(commandAfterType)

    // buildin command type
    if (buildins.includes(commandAfterType)) {
      console.log(`${commandAfterType} is a shell builtin`);
    } 
    // Executable command type
    else if (isExecutable) {
      console.log(`${commandAfterType} is ${isExecutable}`);
    }
    else {
      console.log(`${commandAfterType}: not found`);
    }
  } 
  
  
  
  // Invalid Command
  else {
    console.log(`${command}: command not found`);
  }

  rl.prompt();
});
