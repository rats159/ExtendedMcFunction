/*
Perhaps this is a bad idea but i think we should do this with regex
*/

// const rawText = Deno.readTextFileSync(Deno.args[0]);
const dir = Deno.args[0];
const files = [...Deno.readDirSync(dir)].map((file) => file.name);
//Step 1: Place macros
// Regex: ^\?!(?<name>[a-zA-Z0-9]*)=(?<value>.*)$
//TODO: this lol

//Step 2: evaluate math
//TODO: this lol

//Step 3: Separate anonymous functions
// Regex: /\((?<args>(?:[a-z0-9]+:[^,)]*,?)*)\) ?-> ?{\r?\n(?<code>(?:[ \t]*[^} \t].*\r?\n)*)}/gm
const inlineFunctionRegex =
   /\((?<args>(?:[a-z0-9]+:[^,)]*,?)*)\) ?-> ?{\r?\n(?<code>(?:[ \t]*[^} \t].*\r?\n)*)}/gm;

Deno.removeSync("./output", { recursive: true });
Deno.mkdirSync("output");

for (const fileName of files) {
   const fileText = Deno.readTextFileSync(`${dir}/${fileName}`);
   console.log(
      `------- ${fileName} -------
${fileText}
------------------------
`
   );
   let testResults;
   let anonIndex = 0;
   while ((testResults = inlineFunctionRegex.exec(fileText)) !== null) {
      if (testResults.index === inlineFunctionRegex.lastIndex) {
         inlineFunctionRegex.lastIndex++;
      }

      console.log(`${testResults!.groups!.args}`);
      console.log(`${testResults!.groups!.code}`);
      Deno.writeTextFileSync(
         `output/${fileName.replace(".xmf", "")}_anon${anonIndex++}.mcfunction`,
         testResults.groups.code
      );
   }
}
