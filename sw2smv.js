const { Command, Option } = require("commander");
const fs = require("fs");
const smvOutput = require("./processors/smv");

const program = new Command();
program.requiredOption("-f, --file <file>", "Star Wars network file");
program.requiredOption("-t, --threshold <number>", "The network adoption threshold");
program.addOption(new Option("-o, --output <type>", "output type").choices(["smv", "graphviz"]));
program.parse(process.argv);

const { file, threshold, output = "smv" } = program.opts();
if (file) {
  try {
    if (fs.existsSync(file)) {
      const parsed = JSON.parse(fs.readFileSync(file, "utf8"));
      if (output === "smv") {
        const out = smvOutput(parsed, threshold);
        console.log(out);
      } else {
        console.log("Graphviz output not implemented yet");
      }
    } else {
      console.error(`File "${file}" not found`);
    }
  } catch (err) {
    console.error(err);
  }
}
