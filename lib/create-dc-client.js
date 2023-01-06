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


const addDependencies = (dependencies, bar) => {
    bar.tick(1, {step: "Adding dependencies (opening)"});
    let file = fs.readFileSync('./package.json', 'utf8');

    bar.tick(1, {step: "Adding dependencies (parsing)"});
    let packageJSON = JSON.parse(file);

    bar.tick(1, {step: "Adding dependencies (dependencies)"});
    packageJSON.dependencies = dependencies.dependencies;

    bar.tick(1, {step: "Adding dependencies (dev)"});
    packageJSON.devDependencies = dependencies.devDependencies;

    bar.tick(1, {step: "Adding dependencies (script)"});
    packageJSON.scripts = dependencies.scripts;

    bar.tick(1, {step: "Adding dependencies (saving)"});
    fs.writeFileSync('./package.json', JSON.stringify(packageJSON));
}


shell.clear();
console.log(logos[Math.floor(Math.random() * 1000) % logos.length]);

const newFolder = prompt("Should a new folder be created for the Bot? (Y/n) ").toLowerCase() !== 'n';
console.log();

const infos = {}
infos['project_name'] = prompt('Project name: ');
infos['sharding'] = prompt('Add Sharding (for more than 1500 servers): (Y/n) ').toLowerCase() !== 'n';
console.log();

const env = {}
env['token'] = prompt('Bot token (optional): ');
env['guildID'] = prompt('Guild ID (optional): ');
env['status'] = "DEVELOPMENT";
env["botStatus"] = prompt("Bot status (optional): ");
env["enableSharding"] = false;
console.log();

let packageManager = prompt("Which package manager should be used? (NPM/yarn/pnpm) ").toLowerCase();
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
    shell.exec(`npm init -y`);
    shell.clear();

    addDependencies(dependencies, bar);

    bar.tick(1, {step: "Installing dependencies"});
    shell.exec(`npm install`);
    shell.clear();
}
else if (packageManager === "yarn") {
    bar.tick(1, {step: "Creating package.json"});
    shell.exec(`yarn init -y`);
    shell.clear();

    addDependencies(dependencies, bar);

    bar.tick(1, {step: "Installing dependencies"});
    shell.exec(`yarn`);
    shell.clear();
}
else if (packageManager === "pnpm") {
    bar.tick(1, {step: "Creating package.json"});
    shell.exec(`pnpm init`);
    shell.clear();

    addDependencies(dependencies, bar);

    bar.tick(1, {step: "Installing dependencies"});
    shell.exec(`pnpm install`);
    shell.clear();
}

bar.tick(1, {step: "Creating .env"});
fs.writeFileSync('./.env', `TOKEN=${env.token}\nGUILD_ID=${env.guildID}\nSTATUS=${env.status}\nBOT_STATUS=${env.botStatus}\nENABLE_SHARDING=${env.enableSharding}`);
fs.writeFileSync('./example.env', `TOKEN=(bot token)\nGUILD_ID=(guild id of testing server)\nSTATUS=("DEVELOPMENT" / "PRODUCTION")\nBOT_STATUS=(bot status [Playing ...])\nENABLE_SHARDING=("true"/"false")`);

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

if (infos["sharding"]) {
    console.log(
        '--------------------------------------------------\n' +
        '| Hint:                                          |\n' +
        '| If you want to start the bot in sharding mode, |\n' +
        '| activate the sharding mode in the .env file    |\n' +
        '| and run "node src/sharder.js".                 |\n' +
        '--------------------------------------------------'
    );
}

console.log();
