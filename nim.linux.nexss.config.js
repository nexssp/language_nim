let languageConfig = Object.assign({}, require(`./nim.win32.nexss.config`));
const os = require(`${process.env.NEXSS_SRC_PATH}/node_modules/@nexssp/os/`);
let sudo = os.sudo();

languageConfig.compilers = {
  nim: {
    install: `${sudo}apt-get install -y nim`,
    command: "nim",
    args: "compile --verbosity:0 --hints:off --run <file>", //&& del <fileNoExt>.exe
    help: ``,
  },
};

const distName = os.name();
languageConfig.dist = distName;

// TODO: Later to cleanup this config file !!
switch (distName) {
  case os.distros.DEBIAN:
  case os.distros.UBUNTU:
    languageConfig.compilers.nim.install = os.replacePMByDistro(
      languageConfig.compilers.nim.install
    );
    break;
  default:
    languageConfig.compilers.nim.install = os.replacePMByDistro(`${sudo}apt-get install -y gcc g++ curl tar xz nodejs
${sudo}mkdir -p /nim
${sudo}curl -sL "http://nim-lang.org/download/nim-1.2.6.tar.xz"|tar xJ --strip-components=1 -C /nim
cd /nim
${sudo}bash build.sh
${sudo}rm -r c_code tests
${sudo}ln -sf /nim/bin/nim /bin/nim`);
    break;
}

module.exports = languageConfig;
