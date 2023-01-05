const {ChalkAdvanced} = require("chalk-advanced");
const {readdirSync, statSync} = require("fs");

class ButtonLoader {
    static async loadButtons(client, path = './src/commands', pathFromSource = '../commands') {

        console.log(
            ChalkAdvanced.white("Loading Buttons Prefabs:")
        )

        readdirSync(path).filter(file => statSync(`${path}/${file}`).isDirectory()).forEach(dir => {
            try {
                readdirSync(`${path}/${dir}/btns`).filter(file => file.endsWith('_.js')).forEach(file => {
                    const prefab = require(`${pathFromSource}/${dir}/btns/${file}`);
                    const name = file.replace('_.js', '');

                    if (prefab.btn !== undefined && prefab.btn !== null) {
                        client.buttonPrefabs.set(prefab.name, prefab);
                        console.log(
                            " -",
                            ChalkAdvanced.green(prefab.name)
                        );
                    } else {
                        console.log(
                            " -",
                            ChalkAdvanced.red(name),
                            ChalkAdvanced.gray("Invalid Export")
                        );
                    }
                });
            } catch (e) {}
        });
    }
}

module.exports = ButtonLoader;
module.exports.loadButtons = ButtonLoader.loadButtons;
