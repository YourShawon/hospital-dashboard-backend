import { swaggerSpec } from "../src/config/swagger";
import fs from "fs";
import path from "path";

// Export OpenAPI spec to a file (JSON format)
const outputPath = path.join(__dirname, "..", "api-docs.json");

fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2));

console.log(`✅ OpenAPI spec exported to: ${outputPath}`);
console.log(
  `📝 File size: ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`
);
console.log(`\n📚 Next steps:`);
console.log(`1. Review the file: api-docs.json`);
console.log(`2. Deploy to Bump.sh: npm run docs:deploy`);
console.log(
  `   (or manually: bump deploy api-docs.json --doc YOUR_SLUG --token YOUR_TOKEN)`
);
console.log(
  `\n💡 Pro tip: Set BUMP_TOKEN environment variable to avoid typing token each time`
);
