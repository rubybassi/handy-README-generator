const fs = require("fs");
const inquirer = require("inquirer");
const emoji = require('node-emoji')

const welcomeMessage =
  `Welcome to the Handy READme Generator! 
  You will be asked a series of nine questions to help build your markdown file. 
  To create a new line use <br>`;
  
console.log(emoji.get('pizza'), welcomeMessage);

const userResponse = () =>
  inquirer.prompt([
    {
      type: "input",
      message: "What is your project title?",
      name: "title",
    },
    {
      type: "input",
      message: "Enter a concise description about your project:",
      name: "description",
    },
    {
      type: "input",
      message: "Give brief instructions on installation:",
      name: "installation",
    },
    {
      type: "input",
      message: "Enter a brief description on the usage of the project:",
      name: "usage",
    },
    {
      type: "input",
      message:
        "State if you are open to contributions and what your requirements are for accepting them:",
      name: "contribution",
    },
    {
      type: "input",
      message: "Briefly explain any instructions for running tests;",
      name: "tests",
    },
    {
      type: "list",
      message: "Please select a license for your project from the list:",
      choices: ["MIT", "ISC", "CC", "Apache", "GNU", "None"],
      default: "None",
      name: "license",
    },
    {
      type: "input",
      message: "Please enter your github username:",
      name: "username",
    },
    {
      type: "input",
      message: "Please enter your email address:",
      name: "email",
    },
  ]);

const buildReadme = (answers) =>
  `![](https://img.shields.io/badge/license-${answers.license}-Green)

# ${answers.title}

## Description
${answers.description}

## Table of Contents
- [Installation](Installation)
- [Usage](Usage)
- [Contributing](Contributing)
- [Test](Test)
- [License](License)
- [Questions](Questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## Contributing
${answers.contribution}

## Test
${answers.test}

## License
${answers.license}

## Questions
Follow me on [GitHub: ${answers.username}](https://github.com/${answers.username})

If you have any additional questions, simply email me at <${answers.email}> and i'll respond as soon as possible.`;

userResponse()
  .then((answers) => {
    const md = buildReadme(answers);
    fs.writeFileSync("output.md", md);
  })
  .then(() => console.log(emoji.get('white_check_mark'),"Great news! Your README markdown file has been succesfully created!"))
  .catch(() => console.error(err));
