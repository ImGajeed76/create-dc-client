require("shelljs-plugin-clear");
const prompt = require('prompt-sync')();
const logos = require('./logos.json');
const dependencies = require('./dependencies.json');
const fs = require('fs');
const shell = require('shelljs');

shell.clear();

console.log(logos[Math.floor(Math.random() * 1000) % logos.length]);

const infos = {}

infos['project_name'] =  prompt('Project name: ');
infos['sharding'] =  prompt('Enable Sharding: (Y/n) ').toLowerCase() !== 'n';
console.log();

const env = {}

env['token'] =  prompt('Bot token: ');
env['guildID'] =  prompt('Guild ID: ');
env['status'] =  "DEVELOPMENT";
env["botStatus"] =  prompt("Bot status: ");
env["enableSharding"] =  false;
console.log();

const newFolder = prompt("Should a new folder be created for the Bot? (Y/n) ").toLowerCase() !== 'n';

let packageManager = prompt("Which package manager should be used? (NPM/yarn/pnpm) ").toLowerCase();
if (packageManager !== 'yarn' && packageManager !== 'pnpm') packageManager = 'npm';

if (newFolder) {
    shell.mkdir('-p', infos['project_name']);
    shell.cd(infos['project_name']);
}

if (packageManager === "npm") {
    const create_npm = require('./create-npm');
    create_npm(infos, env, dependencies);
}
else if (packageManager === "yarn") {
    const create_yarn = require('./create-yarn');
    create_yarn(infos, env, dependencies);
}
else if (packageManager === "pnpm") {
    const create_pnpm = require('./create-pnpm');
    create_pnpm(infos, env, dependencies);
}


