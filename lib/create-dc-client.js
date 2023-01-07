require("shelljs-plugin-clear");
const prompt = require('prompt-sync')();
const logos = require('./logos.json');
const dependencies = require('./dependencies.json');
const fs = require('fs');
const fse = require("fs-extra");
const shell = require('shelljs');
const ProgressBar = require("progress");
const chalk = require("chalk-advanced");
const path = require("path");
const default_files = "./default_files";

// Console log the logo
shell.clear();
console.log(logos[Math.floor(Math.random() * 1000) % logos.length]);

// Check if the user wants to create a new project folder
const newFolder = prompt(`Should a new folder be created for the Bot? (${chalk.green("Y")}/n) `).toLowerCase() !== 'n';
console.log();

// If not, get the name of the current folder
let folderName = !newFolder ? `(${path.basename(process.cwd())})` : '';

// Ask the user for some infos
const infos = {}
infos['project_name'] = prompt(`Project name: ${folderName}`);
infos['project_name'] = infos['project_name'] === " " ? path.basename(process.cwd()) : infos['project_name'];
infos['sharding'] = prompt(`Add Sharding ${chalk.yellow("(for more than 1500 servers)")}: (${chalk.green("Y")}/n) `).toLowerCase() !== 'n';
console.log();

const env = {}
env['token'] = prompt('Bot token (optional): ');
env['guildID'] = prompt('Guild ID (optional): ');
env['status'] = "DEVELOPMENT";
env["botStatus"] = prompt("Bot status (optional): ");
console.log();

let packageManager = prompt(`Which package manager should be used [${chalk.green("npm")}/yarn/pnpm]? `).toLowerCase();
if (packageManager !== 'yarn' && packageManager !== 'pnpm') packageManager = 'npm';
shell.clear();

// Create progressbar
let bar = new ProgressBar(`[:bar] ${chalk.yellow(`Creating project ${chalk.green("[:step]")}`)} :percent :etas`, {
    complete: "▓",
    incomplete: "░",
    width: 30,
    total: 16,
    renderThrottle: 1
});


bar.tick(1, {step: "Creating folder"});
if (newFolder) {
    shell.mkdir('-p', infos['project_name']);
    shell.cd(infos['project_name']);
}

// init project
bar.tick(1, {step: "Creating package.json"});
console.log();
shell.exec(`${packageManager} init ${packageManager !== "pnpm" ? "-y" : ""}`);
shell.clear();

// add dependencies
bar.tick(1, {step: "Adding dependencies (opening)"});
let file = fs.readFileSync('./package.json', 'utf8');
bar.tick(1, {step: "Adding dependencies (parsing)"});
let packageJSON = JSON.parse(file);
bar.tick(1, {step: "Adding dependencies (script)"});
packageJSON.scripts = dependencies.scripts;
bar.tick(1, {step: "Adding dependencies (dependencies)"});
packageJSON.dependencies = dependencies.dependencies;
bar.tick(1, {step: "Adding dependencies (dev)"});
packageJSON.devDependencies = dependencies.devDependencies;
packageJSON.clientPackageManager = packageManager;

bar.tick(1, {step: "Adding dependencies (saving)"});
fs.writeFileSync('./package.json', JSON.stringify(packageJSON));

// create .env file
bar.tick(1, {step: "Creating .env"});
fs.writeFileSync('./.env', `TOKEN=${env.token}\nGUILD_ID=${env.guildID}\nSTATUS=${env.status}\nBOT_STATUS=${env.botStatus}`);
fs.writeFileSync('./.env.example', `TOKEN=(bot token)\nGUILD_ID=(guild id of testing server)\nSTATUS=("DEVELOPMENT" / "PRODUCTION")\nBOT_STATUS=(bot status [Playing ...])`);

// create src folder
bar.tick(1, {step: "Creating src"});
shell.mkdir('-p', 'src');
shell.cd('src');

// create index.js
bar.tick(1, {step: "Creating index.js"});
if (infos.sharding) {
    fs.copyFileSync(path.resolve(__dirname, `${default_files}/src/index_sharding.js`), './index.js');
    bar.tick(1, {step: "Creating sharder.js"});
    fs.copyFileSync(path.resolve(__dirname, `${default_files}/src/sharder.js`), './sharder.js');
} else {
    fs.copyFileSync(path.resolve(__dirname, `${default_files}/src/index_sharding.js`), './index.js');
    bar.tick(1, {step: "Creating index.js"});
}

// copy default files
bar.tick(1, {step: "Creating commands"});
fse.copySync(path.resolve(__dirname, `${default_files}/commands`), './commands');
bar.tick(1, {step: "Creating events"});
fse.copySync(path.resolve(__dirname, `${default_files}/events`), './events');
bar.tick(1, {step: "Creating structures"});
fse.copySync(path.resolve(__dirname, `${default_files}/structures`), './structures');

// finished
shell.clear();
bar.tick(1, {step: "Finished"});

// install dependencies if prompted
if (prompt("Install dependencies? (y/N) ").toLowerCase() === 'y') {
    console.log();
    shell.exec(`${packageManager} install`);
}

console.log()
console.log(chalk.green("Finished creating project!"));
console.log(`Run "${chalk.yellow("nodemon src/index.js")}" to start the bot in testing mode.`);
console.log(`Run "${chalk.yellow("node src/index.js")}" to start the bot in production mode. (Hint: Enable "PRODUCTION" in .env)`);
if (infos.sharding) console.log(`Run "${chalk.yellow("node src/sharder.js")}" to start the bot with sharding.`);
console.log();
