require("shelljs-plugin-clear");

const fs = require('fs');
const fse = require('fs-extra');
const shell = require('shelljs');
const ProgressBar = require('progress');
const path = require('path');

const default_files = "./default_files";

const create = (infos, env, dependencies) => {
    shell.clear();

    let bar = new ProgressBar("Creating project (:step) [:bar] :percent :etas", {
        complete: "=",
        incomplete: " ",
        width: 30,
        total: 16
    });

    bar.tick(1, {step: "Creating package.json"});
    shell.exec(`npm init --silent -y`);
    shell.clear();

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

    bar.tick(1, {step: "Installing dependencies"});
    shell.exec(`npm install --silent`);

    bar.tick(1, {step: "Creating .env"});
    fs.writeFileSync('./.env', `TOKEN=${env.token}\nGUILD_ID=${env.guildID}\nSTATUS=${env.status}\nBOT_STATUS=${env.botStatus}\nENABLE_SHARDING=${env.enableSharding}`);

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
    console.log(`Run "nodemon src/index.js" to start the bot in testing mode.\n`);
}

module.exports = create;