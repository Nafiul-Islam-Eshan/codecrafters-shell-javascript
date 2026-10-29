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


  // 3. type command
  else if(command.startsWith("type ")){

    const commandAfterType = command.slice(5);

    if(commandAfterType === "echo" || "type" || "exit" ){
      console.log(`${commandAfterType} is a shell builtin`);
    }
    else{
      console.log(`${commandAfterType}: not found`);
    }
  }
  
  
  else {
    console.log(`${command}: command not found`);
  }

  rl.prompt();
});
