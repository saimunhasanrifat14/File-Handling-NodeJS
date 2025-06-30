const fs = require("fs");
const { log, error } = require("console");
const path = require("path");

const command = process.argv[2];
const folderName = process.argv[3];
const filename = process.argv[4];
const fileValue = process.argv[5];

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
    const targetPath = path.join(__dirname, folderName, filename);
    const isFileAvailable = fs.existsSync(targetPath);
    if (isFileAvailable) {
      fs.readFile(targetPath, "utf-8", (error, data) => {
        if (error) {
          console.log("fail to read file", error);
        } else {
          console.log("file read successfully");
          console.log(data);
        }
      });
    } else {
      console.log("file not found");
    }
    break;
  }
  case "list": {
    const targetPath = path.join(__dirname, folderName);
    const isFolderAvailable = fs.existsSync(targetPath);
    if (isFolderAvailable) {
      fs.readdir(targetPath, (error, files) => {
        if (error) {
          console.log("fail to read folder", error);
        } else {
          console.log("folder read successfully");
          files.forEach((file) => {
            console.log(file);
          });
        }
      });
    } else {
      console.log("folder not found");
    }
    break;
  }
  case "remove": {
    const targetFilePath = path.join(__dirname, folderName, filename);
    const isFileAvailable = fs.existsSync(targetFilePath);

    if (isFileAvailable) {
      fs.unlink(targetFilePath, (error) => {
        if (error) {
          console.log("fail to delete file", error);
        } else {
          console.log("file deleted successfully");
        }
      });
    } else {
      console.log("file not found");
    }
    break;
  }
  case "update": {
    const targetFilePath = path.join(__dirname, folderName, filename);
    const isFileAvailable = fs.existsSync(targetFilePath);
    if (isFileAvailable) {
      fs.writeFile(targetFilePath, fileValue, (error) => {
        if (error) {
          console.log("fail to update file", error);
        } else {
          console.log("file updated successfully");
        }
      });
    } else {
      console.log("file not found");
    }
    break;
  }
  case "addNewValue": {
    const targetFilePath = path.join(__dirname, folderName, filename);
    const isFileAvailable = fs.existsSync(targetFilePath);
    if (isFileAvailable) {
      fs.appendFile(
        targetFilePath,
        `\nAdd At : ${new Date().toLocaleDateString()} --> ${fileValue}`,
        (error) => {
          if (error) {
            console.log("fail to add new value to file", error);
          } else {
            console.log("new value added successfully");
          }
        }
      );
    } else {
      console.log("file not found");
    }
    break;
  }
  case "rename": {
    const oldFilePath = path.join(__dirname, folderName, filename);
    const newFilePath = path.join(__dirname, folderName, fileValue);
    const isFileAvailable = fs.existsSync(oldFilePath);

    if (isFileAvailable) {
      fs.rename(oldFilePath, newFilePath, (error) => {
        if (error) {
          console.log("fail to rename file", error);
        } else {
          console.log("file renamed successfully");
        }
      });
    } else {
      console.log("file not found");
    }
    break;
  }
  default: {
    console.log("❗ Unknown command");
    console.log("Try: write, read, list, remove, update, addNewValue, rename");
    break;
  }
}
