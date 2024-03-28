/* 
   \((?<args>(?:[a-z0-9]+:[^,)],?)*)\) ?-> ?{\n(?<code>(?:.*\n)*)}
   i made this regex and i wanna use it later but im not gonna use it rn bc i still need to do more work
   it matches arrow functions and extracts the code and args
*/
import * as Commands from "./Command.ts";
import * as Assert from "./Assert.ts";
import Iterator from "./Iterator.ts";
import ParsingMode from "./ParsingMode.ts";
import {
   validateInlineFunction,
   parseSelector,
   getModeFromSubcommand,
   validateEntityNBT,
} from "./parsing.ts";

export function validate() {
   const raw = Deno.readTextFileSync(Deno.args[0]) + "\n";

   const file = new Iterator<string>(raw.split(""));

   let currentMode: ParsingMode = ParsingMode.modes.Command;

   // let buffer = "";
   while (!file.isDone()) {
      switch (currentMode) {
         case ParsingMode.modes.Command: {
            file.skipAny([" ", "\t"]);
            const buffer = file.readUpTo(" ").trim();
            console.log("Buffer is " + buffer);
            file.next();
            Assert.contains(buffer, Commands.Names);
            switch (buffer as (typeof Commands.Names)[number]) {
               case "execute":
                  currentMode = ParsingMode.modes.CommandExecuteStart;
                  break;
               case "function":
                  currentMode = ParsingMode.modes.CommandFunction;
                  break;
               case "say":
                  currentMode = ParsingMode.modes.CommandSay;
                  break;
               case "summon":
                  currentMode = ParsingMode.modes.CommandSummon;
                  break;
               case "advancement":
               case "attribute":
               case "ban":
               case "ban-ip":
               case "banlist":
               case "bossbar":
               case "clear":
               case "clone":
               case "damage":
               case "data":
               case "datapack":
               case "debug":
               case "defaultgamemode":
               case "deop":
               case "difficulty":
               case "effect":
               case "enchant":
               case "experience":
               case "fill":
               case "fillbiome":
               case "forceload":
               case "gamemode":
               case "gamerule":
               case "give":
               case "help":
               case "item":
               case "jfr":
               case "kick":
               case "kill":
               case "list":
               case "locate":
               case "loot":
               case "me":
               case "msg":
               case "op":
               case "pardon":
               case "pardon-ip":
               case "particle":
               case "perf":
               case "place":
               case "playsound":
               case "publish":
               case "random":
               case "recipe":
               case "reload":
               case "return":
               case "ride":
               case "save-all":
               case "save-off":
               case "save-on":
               case "schedule":
               case "scoreboard":
               case "seed":
               case "setblock":
               case "setidletimeout":
               case "setworldspawn":
               case "spawnpoint":
               case "spectate":
               case "spreadplayers":
               case "stop":
               case "stopsound":
               case "tag":
               case "team":
               case "teammsg":
               case "teleport":
               case "tell":
               case "tellraw":
               case "tick":
               case "time":
               case "title":
               case "tm":
               case "tp":
               case "transfer":
               case "trigger":
               case "w":
               case "weather":
               case "worldborder":
               case "xp":
                  throw new Error(`/${buffer} is not yet implemented`);
            }
            break;
         }
         case ParsingMode.modes.CommandExecuteStart:
            {
               const subcommand = file.readUpTo(" ");
               file.next(); //skip the following space
               Assert.contains(subcommand, Commands.ExecuteSubcommands);
               currentMode = getModeFromSubcommand(subcommand);
            }
            break;
         case ParsingMode.modes.CommandExecuteTargetSelector: {
            parseSelector(file);
            currentMode = ParsingMode.modes.CommandExecuteStart;
            break;
         }
         case ParsingMode.modes.CommandFunction:
            {
               if (file.current() === "(") {
                  validateInlineFunction(file);
                  currentMode = ParsingMode.modes.Command;
               } else {
                  file.skipAny([" "]);
                  currentMode = ParsingMode.modes.Command;
               }
            }
            break;
         case ParsingMode.modes.CommandSay:
            file.readUpTo("\n");
            file.next();
            currentMode = ParsingMode.modes.Command;
            break;
         case ParsingMode.modes.CommandSummon:
            {
               const entityName = file.readUpTo(" ");
               Assert.contains(entityName, Commands.Entities);
               file.next();
               const x = file.readUpTo(" ");
               file.next();
               const y = file.readUpTo(" ");
               file.next();
               const z = file.readUpTo(" ");
               file.next();

               let relativeMode = "";
               for (const coord of [x, y, z]) {
                  if (coord.startsWith("^") || coord.startsWith("~")) {
                     if (coord[0] != relativeMode && relativeMode != "") {
                        throw new Error(
                           `Found ${coord[0]} relativity when ${relativeMode} was previously established`
                        );
                     } else {
                        relativeMode = coord[0];
                     }

                     if (coord.length > 1) {
                        Assert.equals(isNaN(+coord.substring(1)), false);
                     }
                  } else {
                     Assert.equals(isNaN(+coord), false);
                  }
               }

               if (file.current() === "{") {
                  validateEntityNBT(file);
               }
               file.next();
               currentMode = ParsingMode.modes.Command;
            }
            break;
         default:
            throw new Error(
               `hit default case while looking for ${currentMode.name}`
            );
      }
   }
}
