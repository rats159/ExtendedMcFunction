import * as Commands from "./Command.ts";
import * as Assert from "./Assert.ts";
import Iterator from "./Iterator.ts";
import ParsingMode from "./ParsingMode.ts";

const raw = (await Deno.readTextFile(Deno.args[0])) + "\n";

const file = new Iterator<string>(raw.split(""));

let currentMode: ParsingMode = ParsingMode.modes.Command;

let buffer = "";
while (!file.isDone()) {
   const currentChar = file.next();
   if (currentChar != currentMode.separator && currentMode.separator != "") {
      buffer += currentChar;
   } else {
      switch (currentMode) {
         case ParsingMode.modes.Command:
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
         case ParsingMode.modes.CommandExecuteStart:
            Assert.isAmong(buffer, Commands.ExecuteSubcommands);
            switch (buffer as (typeof Commands.ExecuteSubcommands)[number]) {
               case "as":
               case "at":
                  currentMode = ParsingMode.modes.CommandExecuteTargetSelector;
                  break;
               case "run":
                  currentMode = ParsingMode.modes.Command;
                  break;
               case "align":
               case "anchored":
               case "facing":
               case "in":
               case "on":
               case "positioned":
               case "rotated":
               case "store":
               case "summon":
               case "if":
               case "unless":
                  throw new Error("soon!");
            }
            break;
         case ParsingMode.modes.CommandExecuteTargetSelector: {
            buffer += currentChar;
            Assert.equals(buffer, "@");
            const selector = file.next();
            Assert.isAmong(selector, Commands.Selectors);
            buffer += selector;
            const nextChar = file.next();
            if (nextChar == " ") {
               currentMode = ParsingMode.modes.CommandExecuteStart;
               break;
            }

            Assert.equals(nextChar, "[");
            while (true) {
               buffer = "";

               while (file.current() != "=") {
                  buffer += file.current();
                  file.next();
               }

               Assert.isAmong(buffer, Commands.SelectorArguments);
               Assert.equals(file.next(), "=");
               const argType = Commands.SelectorArgumentsToArgDataTypeMap.get(
                  buffer as (typeof Commands.SelectorArguments)[number]
               ) as (typeof Commands.CommandDataType)[number];

               switch (argType) {
                  case "String":
                     {
                        //For unquoted strings, spaces, commas, and brackets will stop parsing.
                        const strictStop = file.peek() !== '"';

                        if (!strictStop) {
                           while (file.peek() !== '"') {
                              file.next();
                           }
                        } else {
                           let next = file.peek();
                           while (
                              next !== " " &&
                              next !== "," &&
                              next !== "]"
                           ) {
                              next = file.peek();
                              file.next();
                           }
                        }
                     }
                     break;
                  case "Double":
                  case "FloatRange":
                  case "NonNegativeFloat":
                  case "Integer":
                  case "NonNegativeInteger":
                  case "ScoreObject":
                  case "AdvancementObject":
                  case "SortingValue":
                  case "GamemodeValue":
                  case "EntityIdOrTag":
                  case "SNBT":
                     throw new Error("soon!");
               }

               if (file.current() != ",") break;
            }

            Assert.equals(file.next(), "]");
            Assert.equals(file.next(), " ");
            currentMode = ParsingMode.modes.CommandExecuteStart;
            break;
         }
         case ParsingMode.modes.CommandFunction:
            {
               buffer += currentChar;
               if (buffer == "(") {
                  buffer = "";
                  while (true) {
                     let name = "";
                     let value = "";
                     while (file.current() !== ":") {
                        // console.log(file.current());
                        name += file.current();
                        file.next();
                     }
                     file.next();
                     while (file.current() !== "," && file.current() !== ")") {
                        value += file.current();
                        file.next();
                     }
                     if (file.current() != ",") {
                        break;
                     }
                     file.next();
                  }
                  while (file.current() !== "{") {
                     file.next();
                  }

                  currentMode = ParsingMode.modes.Command;
               } else {
                  while (file.next() !== "\n") {
                     continue;
                  }
                  currentMode = ParsingMode.modes.Command;
               }
            }
            break;
         case ParsingMode.modes.CommandSay:
            //we dont do anything, because /say is a really basic command that needs no validation
            currentMode = ParsingMode.modes.Command;
            break;
         case ParsingMode.modes.CommandSummon:
            break;
         default:
            throw new Error(
               `hit default case while looking for ${currentMode.name}`
            );
      }
      buffer = "";
   }
}
