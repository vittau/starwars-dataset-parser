const commander = require("commander");
const program = new commander.Command();
const fs = require("fs");
const parser = require("./parser");

program.requiredOption("-f, --file <file>", "Star Wars network file");
program.requiredOption("-t, --threshold <number>", "The network adoption threshold");
program.parse(process.argv);

const { file, threshold } = program.opts();
if (file) {
  try {
    if (fs.existsSync(file)) {
      const parsed = JSON.parse(fs.readFileSync(file, "utf8"));
      const output = parser(parsed, threshold);
      console.log(output);
    } else {
      console.error(`File "${file}" not found`);
    }
  } catch (err) {
    console.error(err);
  }
}
