let languageConfig = Object.assign(
  {},
  require(`../config.${process.platform}`)
);
languageConfig.title = "Nim";
languageConfig.description =
  "Nim is a statically typed compiled systems programming language. It combines successful concepts from mature languages like Python, Ada and Modula.";
languageConfig.url = "https://nim-lang.org";
languageConfig.founders = ["Andreas Rumpf"];
languageConfig.developers = [""];
languageConfig.years = ["2008"];
languageConfig.extensions = [".nim"];
languageConfig.executeCommandLine = "nim";
languageConfig.printCommandLine = ""; //no console.log() needed to display result eg node -p "4+6"
languageConfig.checkSyntax = "";
languageConfig.interactiveShell = "nim";
languageConfig.builders = {};
languageConfig.compilers = {
  nim: {
    install: "scoop install nim",
    command: "nim",
    args:
      "compile --verbosity:0 --showAllMismatches:on --hints:off --run <file>", //&& del <fileNoExt>.exe
    help: ``,
  },
};
languageConfig.errors = require("./nexss.nim.errors");
languageConfig.languagePackageManagers = {
  nimble: {
    installation: "installed.",
    messageAfterInstallation: null, // sometimes there is need of add something to the files can be add here eg php for composer.
    installed: "nimble list",
    search: "nimble search",
    install: "nimble install",
    uninstall: "nimble uninstall",
    help: "nimble help",
    version: "nimble --version",
    init: () => {
      // if (
      //   !require("fs").existsSync(
      //     require("path").join(process.cwd(), "package.json")
      //   )
      // ) {
      //   require("child_process").execSync("nimble init", { stdio: "inherit" });
      //   console.log("initialized npm project.");
      // } else {
      //   console.log("npm already initialized.");
      // }
    },
    // if command not found in specification
    // run directly on package manager
    else: "nimble",
  },
};

module.exports = languageConfig;
