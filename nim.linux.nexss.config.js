let languageConfig = Object.assign({}, require(`./nim.win32.nexss.config`));

let sudo = "sudo ";
if (process.getuid && process.getuid() === 0) {
  sudo = "";
}

languageConfig.compilers = {
  nim: {
    install: `${sudo} apt-get install nim`,
    command: "nim",
    args: "compile --verbosity:0 --hints:off --run <file>", //&& del <fileNoExt>.exe
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
  case "Alpine Linux":
    languageConfig.compilers.nim.install = `${sudo}apk add g++ curl tar xz nodejs
${sudo}mkdir -p /nim
${sudo}curl -sL "http://nim-lang.org/download/nim-1.2.6.tar.xz"|tar xJ --strip-components=1 -C /nim
${sudo}cd /nim
bash build.sh
${sudo}rm -r c_code tests
${sudo}ln -s /nim/bin/nim /bin/nim`;
    break;
  default:
    languageConfig.compilers.nim.install = replaceCommandByDist(
      languageConfig.compilers.nim.install
    );
    break;
}

module.exports = languageConfig;
