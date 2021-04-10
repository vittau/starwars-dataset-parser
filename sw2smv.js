const { Command, Option } = require("commander");
const fs = require("fs");
const smvOutput = require("./processors/smv");

const program = new Command();
program.requiredOption("-f, --file <file>", "Star Wars network file");
program.requiredOption("-t, --threshold <number>", "The network adoption threshold");
program.addOption(new Option("-o, --output <type>", "output type").choices(["smv", "graphviz"]));
program.parse(process.argv);

const { file, threshold, output = "smv" } = program.opts();

try {
  if (fs.existsSync(file)) {
    const network = JSON.parse(fs.readFileSync(file, "utf8"));
    switch (output) {
      case "smv":
        const out = smvOutput(network, threshold);
        console.log(out);
        break;
      case "graphviz":
        console.info("Graphviz output not implemented yet");
        break;
      default:
        console.error("Invalid output type");
    }
  } else {
    console.error(`File "${file}" not found`);
  }
} catch (err) {
  console.error(err);
}
