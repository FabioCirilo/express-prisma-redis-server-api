function createLogFile() {
  fs.createWriteStream("logs/express-app.log", { flags: "a" });
  return true;
}

module.exports = createLogFile;
