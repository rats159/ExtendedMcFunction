import * as Commands from "./Command.ts";
import * as Assert from "./Assert.ts";
import Iterator from "./Iterator.ts";
import ParsingMode from "./ParsingMode.ts";
import {
   validateInlineFunction,
   parseSelector,
   getModeFromSubcommand,
} from "./parsing.ts";

const raw = (await Deno.readTextFile(Deno.args[0])) + "\n";

const file = new Iterator<string>(raw.split(""));

export function setCurrentMode(mode: ParsingMode) {
   currentMode = mode;
}

let currentMode: ParsingMode = ParsingMode.modes.Command;

// let buffer = "";
while (!file.isDone()) {
   switch (currentMode) {
      case ParsingMode.modes.Command: {
         file.skipAny([" ", "\t"]);
         const buffer = file.readUpTo(" ").trim();
         file.next();
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
            default:
               throw new Error(`${buffer} is not a command!`);
         }
         break;
      }
      case ParsingMode.modes.CommandExecuteStart:
         {
            const subcommand = file.readUpTo(" ");
            file.next(); //skip the following space
            Assert.isAmong(subcommand, Commands.ExecuteSubcommands);
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
         file.next();
         break;
      default:
         throw new Error(
            `hit default case while looking for ${currentMode.name}`
         );
   }
}
