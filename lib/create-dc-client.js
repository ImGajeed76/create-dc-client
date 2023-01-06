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


const addDependencies = (dependencies, bar, packageManager) => {
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

    packageJSON.packageManager = packageManager;

    bar.tick(1, {step: "Adding dependencies (saving)"});
    fs.writeFileSync('./package.json', JSON.stringify(packageJSON));
}


shell.clear();
console.log(logos[Math.floor(Math.random() * 1000) % logos.length]);

const newFolder = prompt(`Should a new folder be created for the Bot? (${chalk.green("Y")}/n) `).toLowerCase() !== 'n';
console.log();

const infos = {}
infos['project_name'] = prompt('Project name: ');
infos['sharding'] = prompt(`Add Sharding (for more than 1500 servers): (${chalk.green("Y")}/n) `).toLowerCase() !== 'n';
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

let bar = new ProgressBar(`[:bar] ${chalk.yellow(`Creating project ${chalk.green("[:step]")}`)} :percent :etas`, {
    complete: "▓",
    incomplete: "░",
    width: 30,
    total: 17,
    renderThrottle: 1
});

bar.tick(1, {step: "Creating folder"});
if (newFolder) {
    shell.mkdir('-p', infos['project_name']);
    shell.cd(infos['project_name']);
}

if (packageManager === "npm") {
    bar.tick(1, {step: "Creating package.json"});
    console.log();
    shell.exec(`npm init -y`);
    shell.clear();

    addDependencies(dependencies, bar, packageManager);

    bar.tick(1, {step: "Installing dependencies"});
    console.log();
    shell.exec(`npm install`);
    shell.clear();
}
else if (packageManager === "yarn") {
    bar.tick(1, {step: "Creating package.json"});
    console.log();
    shell.exec(`yarn init -y`);
    shell.clear();

    addDependencies(dependencies, bar, packageManager);

    bar.tick(1, {step: "Installing dependencies"});
    console.log();
    shell.exec(`yarn`);
    shell.clear();
}
else if (packageManager === "pnpm") {
    bar.tick(1, {step: "Creating package.json"});
    console.log();
    shell.exec(`pnpm init`);
    shell.clear();

    addDependencies(dependencies, bar, packageManager);

    bar.tick(1, {step: "Installing dependencies"});
    console.log();
    shell.exec(`pnpm install`);
    shell.clear();
}

bar.tick(1, {step: "Creating .env"});
fs.writeFileSync('./.env', `TOKEN=${env.token}\nGUILD_ID=${env.guildID}\nSTATUS=${env.status}\nBOT_STATUS=${env.botStatus}`);
fs.writeFileSync('./.env.example', `TOKEN=(bot token)\nGUILD_ID=(guild id of testing server)\nSTATUS=("DEVELOPMENT" / "PRODUCTION")\nBOT_STATUS=(bot status [Playing ...])`);

bar.tick(1, {step: "Creating src"});
shell.mkdir('-p', 'src');
shell.cd('src');

bar.tick(1, {step: "Creating index.js"});
if (infos.sharding) {
    fs.copyFileSync(path.resolve(__dirname, `${default_files}/src/index_sharding.js`), './index.js');
    bar.tick(1, {step: "Creating sharder.js"});
    fs.copyFileSync(path.resolve(__dirname, `${default_files}/src/sharder.js`), './sharder.js');
} else {
    fs.copyFileSync(path.resolve(__dirname, `${default_files}/src/index_sharding.js`), './index.js');
    bar.tick(1, {step: "Creating index.js"});
}

bar.tick(1, {step: "Creating commands"});
fse.copySync(path.resolve(__dirname, `${default_files}/commands`), './commands');

bar.tick(1, {step: "Creating events"});
fse.copySync(path.resolve(__dirname, `${default_files}/events`), './events');

bar.tick(1, {step: "Creating structures"});
fse.copySync(path.resolve(__dirname, `${default_files}/structures`), './structures');

shell.clear();
bar.tick(1, {step: "Finished"});
console.log("\nFinished creating project!");
console.log(`Run "nodemon src/index.js" to start the bot in testing mode.`);

console.log();
