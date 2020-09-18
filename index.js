const core = require('@actions/core');
const github = require('@actions/github');

const exec = require('child_process').exec;
const  { issueCommand, toCommandValue } = require('./commands');

function execute(command, callback = () => null){
   exec(command, function(error, stdout, stderr){ callback(stdout); });
};

function getList(stdout){
   return stdout.split("\n").filter(Boolean);
}

function exportVariable(name, val) {
  const convertedVal = toCommandValue(val)
  process.env[name] = convertedVal
  issueCommand('set-env', {name}, convertedVal)
  core.setOutput(name, val);
}

// git difftool origin/master... --name-only

execute('ls', stdout => {
   const files = getList(stdout);
   exportVariable('CHANGED_FILES', files);
});

// try {
//   // `who-to-greet` input defined in action metadata file
//   const nameToGreet = core.getInput('who-to-greet');
//   console.log(`Hello ${nameToGreet}!`);
//   const time = (new Date()).toTimeString();
//   core.setOutput("time", time);
//   // Get the JSON webhook payload for the event that triggered the workflow
//   const payload = JSON.stringify(github.context.payload, undefined, 2)
//   console.log(`The event payload: ${payload}`);
// } catch (error) {
//   core.setFailed(error.message);
// }
