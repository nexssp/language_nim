let languageConfig = Object.assign({}, require(`./nim.win32.nexss.config`));
languageConfig.compilers = {
  nim: {
    install: "brew install nim",
    command: "nim",
    args: "compile --verbosity:0 --showAllMismatches:on --run <file>", //&& del <fileNoExt>.exe
    help: ``,
  },
};

module.exports = languageConfig;
