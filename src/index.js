#!/usr/bin/env node
const inquirer = require('inquirer');
const mabl = require('@mablhq/mabl-cli');
const { exec } = require('child_process');
//const MABL_AUTH = process.env.MABL_AUTH;
//const MABL_WORKSPACE = process.env.MABL_WORKSPACE;

function listTests() {
  exec('mabl tests list', (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  })
};

inquirer
  .prompt([
    {
      type: 'rawlist',
      name: 'main',
      message: 'Select an Option',
      choices: [
        'List Tests',
        'Run a Test',
        new inquirer.Separator(),
        'Set Workspace',
        'Set Mabl Login',
        'Set Mabl AUTH Token'
      ]
    }
  ])
  .then((answers) => {
    switch(answers.main) {
      case 'List Tests':
        console.log(`Running command:  mabl tests list`);
        listTests();
        break;
      default:
        console.log(`You answered with something else...`);
    };
  });