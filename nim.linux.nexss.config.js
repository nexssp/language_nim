let languageConfig = Object.assign({}, require(`./nim.win32.nexss.config`));
let sudo = process.sudo;

languageConfig.compilers = {
  nim: {
    install: `${sudo}apt-get install -y nim`,
    command: "nim",
    args: "compile --verbosity:0 --hints:off --run <file>", //&& del <fileNoExt>.exe
    help: ``,
  },
};

// languageConfig.builders = {
//   nim: {
//     install: `${sudo}apt-get install -y nim`,
//     command: "nimble",
//     args: "build --verbosity:0 --hints:off --run <file>", //&& del <fileNoExt>.exe
//     help: ``,
//   },
// };

const distName = process.distro;
languageConfig.dist = distName;

// TODO: Later to cleanup this config file !!
switch (distName) {
  case process.distros.DEBIAN:
  case process.distros.UBUNTU:
    languageConfig.compilers.nim.install = process.replacePMByDistro(`${sudo}apt-get install -y gcc g++ curl tar nodejs
${sudo}mkdir -p /nim
${sudo}curl -sL "http://nim-lang.org/download/nim-1.2.6.tar.xz"|tar xJ --strip-components=1 -C /nim
cd /nim
${sudo}bash build.sh
${sudo}rm -r c_code tests
${sudo}ln -sf /nim/bin/nim /bin/nim`);
    break;
  default:
    languageConfig.compilers.nim.install = process.replacePMByDistro(`${sudo}apt-get install -y gcc g++ curl tar xz nodejs
${sudo}mkdir -p /nim
${sudo}curl -sL "http://nim-lang.org/download/nim-1.2.6.tar.xz"|tar xJ --strip-components=1 -C /nim
cd /nim
${sudo}bash build.sh
${sudo}rm -r c_code tests
${sudo}ln -sf /nim/bin/nim /bin/nim`);
    break;
}

module.exports = languageConfig;
