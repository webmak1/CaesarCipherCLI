const { program } = require('commander');

const { processMessage } = require('./processMessage');

program
  .version("0.0.1", "-v, --version")
  .description("Caesar cipher for the English alphabet");

program
  .requiredOption("-s, --shift <shift>", "a shift")
  .option("-i, --input <input>", "an input file")
  .option("-o, --output <output>", "an output file")
  .requiredOption("-a, --action <action>", "an action encode / decode")
  .action(processMessage);

program.parse(process.argv);
