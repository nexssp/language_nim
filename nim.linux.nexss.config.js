let languageConfig = Object.assign({}, require(`./nim.win32.nexss.config`));

let sudo = "sudo ";
if (process.getuid && process.getuid() === 0) {
  sudo = "";
}

languageConfig.compilers = {
  nim: {
    install: `${sudo} apt-get install nim`,
    command: "nim",
    args:
      "compile --verbosity:0 --showAllMismatches:on --hints:off --run <file>", //&& del <fileNoExt>.exe
    help: ``,
  },
};

const {
  replaceCommandByDist,
  dist,
} = require(`${process.env.NEXSS_SRC_PATH}/lib/osys`);

const distName = dist();
languageConfig.dist = distName;

// TODO: Later to cleanup this config file !!
switch (distName) {
  default:
    languageConfig.compilers.nim.install = replaceCommandByDist(
      languageConfig.compilers.nim.install
    );
    break;
}

module.exports = languageConfig;
