const { Command, Option } = require("commander");
const fs = require("fs");

const program = new Command();
program.requiredOption("-f, --file <file>", "Star Wars network file");
program.addOption(new Option("-o, --output <type>", "output type").choices(["smv", "graphviz"]));
program.option("-tn, --threshold_num <number>", "The network adoption threshold numerator");
program.option("-td, --threshold_den <number>", "The network adoption threshold denominator");
program.option("-l, --ltlspec <string>", "LTL specification for the nuXmv model checker");
program.option("-s, --symmetric", "Relationships will be considered symmetric");
program.parse(process.argv);

const { file, threshold_num, threshold_den, output = "smv", ltlspec, symmetric = false } = program.opts();

try {
  if (fs.existsSync(file)) {
    const network = JSON.parse(fs.readFileSync(file, "utf8"));
    switch (output) {
      case "smv":
        if (!threshold_num || !threshold_den) {
          throw new Error("Threshold is required for the SMV output");
        }
        const smvOutput = require("./processors/smv");
        const smvOutputStr = smvOutput(network, threshold_num, threshold_den, !!symmetric, ltlspec);
        console.log(smvOutputStr);
        break;
      case "graphviz":
        const graphvizOutput = require("./processors/graphviz");
        const graphvizOutputStr = graphvizOutput(network, !!symmetric);
        console.log(graphvizOutputStr);
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
