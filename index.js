const fs = require("fs");
const inquirer = require("inquirer");

const userResponse = () =>
  inquirer.prompt([
    {
      type: "input",
      message: "What is your project title?",
      name: "title",
    },
    {
      type: "input",
      message: "Enter a concise description about your project.",
      name: "description",
    },
    {
      type: "input",
      message: "Give brief instructions on installation.",
      name: "installation",
    },
    {
      type: "input",
      message: "Enter a brief description on the usage of the project.",
      name: "usage",
    },
    {
      type: "input",
      message:
        "State if you are open to contributions and what your requirements are for accepting them.",
      name: "contribution",
    },
    {
      type: "input",
      message: "Briefly explain any instructions for running tests.",
      name: "tests",
    },
    {
      type: "list",
      message: "Please select a license for your project from the list:",
      choices: ["MIT", "ISC", "Creative Commons", "Apache License 2.0", "GNU GPLv2", "GNU GPLv3 f","No License"],
      default: "No License",
      name: "license",
    },
    {
      type: "input",
      message: "Please enter your github username (without spaces)",
      name: "username",
    },
  ]);

const buildReadme = (answers) =>
  `![](https://img.shields.io/badge/license-${answers.license}-Green)

# ${answers.title}

### Description
${answers.description}

## Table of Contents
- [Installation](Installation)
- [Usage](Usage)
- [Contributing](Contributing)
- [Test](Test)
- [License](License)
- [Questions](Questions)

### Installation
Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.
${answers.installation}

### Usage
${answers.usage}

### Contributing
${answers.contribution}

### Test
${answers.test}

### License
${answers.license}

### Questions
Please contact me on GitHub.

[GitHub: ${answers.username}](https://github.com/${answers.username})
`;

userResponse()
  .then((answers) => {
    const md = buildReadme(answers);
    fs.writeFileSync("output.md", md);
  })
  .then(() => console.log("successfully wrote to markdown"))
  .catch(() => console.error(err));
