let languageConfig = Object.assign({}, require(`./nim.win32.nexss.config`));
let sudo = process.sudo;

languageConfig.compilers = {
  nim: {
    install: `pkg install -y nim`,
    command: "nim",
    args: "compile --verbosity:0 --hints:off --run <file>", //&& del <fileNoExt>.exe
    help: ``,
  },
};

const distro = process.distro;
languageConfig.dist = distro;

module.exports = languageConfig;
