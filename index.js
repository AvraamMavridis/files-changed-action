const core = require('@actions/core');
const github = require('@actions/github');

const targetBranch = core.getInput('target_branch') || 'master';

const exec = require('child_process').exec;
const {issueCommand, toCommandValue} = require('./commands');

function execute(command, callback = () => null) {
  exec(command, function (error, stdout, stderr) {
    callback(stdout);
  });
};

function getFileExtension(fileName) {
  return fileName.substr(fileName.lastIndexOf('.') + 1);
}

function getList(stdout) {
  return stdout.split("\n").filter(Boolean);
}

function exportVariable(name, val) {
  const convertedVal = toCommandValue(val)
  process.env[name] = convertedVal
  issueCommand('set-env', {name}, convertedVal)
  core.setOutput(name, val);
}

try {
  execute(`git fetch origin ${targetBranch}:${targetBranch} && git diff --name-only ${targetBranch}`, stdout => {
    const files = getList(stdout);
    const fileExtensions = files.map(getFileExtension);
    exportVariable('CHANGED_FILES', files);
    exportVariable('CHANGED_FILES_EXTENSIONS', fileExtensions);
  });

  execute(`git fetch origin && git diff HEAD^ HEAD`, stdout => {
    const files = getList(stdout);
    const fileExtensions = files.map(getFileExtension);
    exportVariable('CHANGED_FILES_FROM_PREVIOUS_COMMIT', files);
    exportVariable('CHANGED_FILES_EXTENSIONS_FROM_PREVIOUS_COMMIT', fileExtensions);
  });
} catch (error) {
  core.setFailed(error.message);
}
