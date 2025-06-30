const fs = require("fs");
const { log, error } = require("console");
const path = require("path");

const command = process.argv[2];
const folderName = process.argv[3];
const filename = process.argv[4];
const fileValue = process.argv[5];
// log("command:", command, "folderName:", folderName, "filename:", filename, "fileValue:", fileValue);

switch (command) {
  case "write": {
    const ourpath = path.join(__dirname, folderName);
    const isFolderAvailable = fs.existsSync(ourpath);
    const fileNamePath = path.join(ourpath, `${filename}`);
    const isFileAvailable = fs.existsSync(fileNamePath);
    if (!isFolderAvailable) {
      fs.mkdir(ourpath, (error) => {
        if (error) {
          console.log("fail to create mern folder");
        } else {
          console.log("folder created");
        }
      });
    } else {
      if (!isFileAvailable) {
        fs.writeFile(fileNamePath, "", (error) => {
          if (error) {
            console.log("fail to create file", error);
          } else {
            console.log("file created");
          }
        });
      } else {
        fs.appendFile(fileNamePath, fileValue, (error) => {
          if (error) {
            console.log("fail to write in file", error);
          } else {
            console.log("file written");
          }
        });
      }
    }

    break;
  }
  case "read": {
    console.log("Read done");
    break;
  }
  case "list": {
    console.log("list done");
    break;
  }
  case "remove": {
    console.log("remove done");
    break;
  }
  default: {
    console.log("something is wrong");
    break;
  }
}
