
import readline from "node:readline";
import path from "node:path";
import fs from "node:fs";
import { spawnSync } from "node:child_process";


const commandLists: Record<string, (cmd: string[]) => void> = {

  exit: () => process.exit(),

  echo: (cmd: string[]) => console.log(cmd.slice(1).join(" ")),

  type: (cmd: string[]) => {

    if(cmd[1] === undefined) return;

    const excecutable = executableFilePath(cmd[1]);
    const builtin = commandLists.hasOwnProperty(cmd[1]);

    if(excecutable || builtin){
      console.log(`${cmd[1]} is ${builtin? "a shell builtin" : excecutable}`);
    }

    else{
      console.log(`${cmd.slice(1).join(" ")}: not found`);
    }
  },

}



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

  const inputCommands: string[] = command.split(" ");
  const directive = inputCommands[0] ?? '';


  // Valid command
  if (commandLists.hasOwnProperty(directive)) {
    commandLists[directive]!(inputCommands)
  }


  else if(executableFilePath(directive)){
    spawnSync(directive, inputCommands.slice(1), { stdio: "inherit" });
  }



  // Invalid Command
  else {
    console.log(`${command}: command not found`);
  }

  rl.prompt();
});


