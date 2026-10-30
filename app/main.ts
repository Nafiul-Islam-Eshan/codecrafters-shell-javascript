
import readline from "node:readline";
import path from "node:path";
import fs from "node:fs";



const executableFilePath = (command: string): string | null => {

  const directories = process.env.PATH?.split(path.delimiter) ?? [];

  for (const directory of directories) {
    const fullPath = path.join(directory, command);

    try {

      fs.accessSync(fullPath, fs.constants.X_OK);
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

rl.on("line", (command: string) => {

  const inputCommands = command.split(" ");

  // 1. exit command
  if (inputCommands[0] === "exit") {
    process.exit();
    return;
  }

  // 2. echo command
  else if (inputCommands[0] === "echo") {
    console.log(inputCommands.slice(1).join(" "));
  }

  // 3. type command
  else if (command.startsWith("type ")) {

    const commandAfterType = command.slice(5).trim();
    const builtins = ["echo", "type", "exit"];

    const isExecutable = executableFilePath(commandAfterType);

    // builtin command type
    if (builtins.includes(commandAfterType)) {
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