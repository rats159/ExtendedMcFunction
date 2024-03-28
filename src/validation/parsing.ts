import Iterator from "./Iterator.ts";
import ParsingMode from "./ParsingMode.ts";
import * as Assert from "./Assert.ts";
import * as Commands from "./Command.ts";

export function validateEntityNBT(NBT: Iterator<string>) {
   Assert.equals(NBT.current(), "{");
   NBT.next();

   //quoted or unquoted makes no difference afaik
   while (1) {
      let quoted = false;
      if (NBT.current() == '"') {
         quoted = true;
         NBT.next();
      }

      const tag = quoted ? NBT.readUpTo('"') : NBT.readUpTo(":");

      if (quoted) NBT.next(); //skip the "
      NBT.next(); //skip the :

      Assert.contains(tag, Commands.EntityNBTTags);
      const dataType = Commands.getNBTTypeFromTag(
         tag as (typeof Commands.EntityNBTTags)[number]
      );

      const data = NBT.readUpToAny([",", "}"]);
      Assert.equals(dataType.conformsTo(data), true);
      if (NBT.current() !== ",") {
         break;
      }
      NBT.next();
   }
   Assert.equals(NBT.current(), "}");
   NBT.next();
   Assert.equals(NBT.next(), "\n");
}

export function parseSelector(file: Iterator<string>) {
   let buffer = file.next();
   Assert.equals(buffer, "@");
   const selector = file.next();
   Assert.contains(selector, Commands.Selectors);
   buffer += selector;
   const nextChar = file.next();
   if (nextChar == " ") {
      return;
   }

   Assert.equals(nextChar, "[");

   while (true) {
      buffer = file.readUpTo("=");

      Assert.contains(buffer, Commands.SelectorArguments);

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
                  file.readUpTo('"');
               } else {
                  let next = file.peek();
                  while (next !== " " && next !== "," && next !== "]") {
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
            throw new Error(
               `Selector data type ${argType} is not yet implemented!`
            );
      }

      if (file.current() != ",") break;
   }

   Assert.equals(file.next(), "]");
   Assert.equals(file.next(), " ");
}

export function getModeFromSubcommand(buffer: string) {
   switch (buffer as (typeof Commands.ExecuteSubcommands)[number]) {
      case "as":
      case "at":
         return ParsingMode.modes.CommandExecuteTargetSelector;

      case "run":
         return ParsingMode.modes.Command;

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
         throw new Error(`Execute subcommand ${buffer} is not yet implemented`);
   }
}

export function validateInlineFunction(file: Iterator<string>) {
   if (file.next() === "(") {
      while (true) {
         let name = "";
         let value = "";
         while (file.current() !== ":") {
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
      file.readUpTo("{");
      file.readUpTo("\n");
      file.next();
   }
}
