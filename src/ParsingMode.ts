type ParsingModeArgs = { name: string };
class ParsingMode {
   static modes = {
      Command: new ParsingMode({ name: "any command" }),
      CommandExecuteStart: new ParsingMode({
         name: "/execute",
      }),
      CommandExecuteTargetSelector: new ParsingMode({
         name: "/execute target selector",
      }),
      CommandFunction: new ParsingMode({ name: "/function" }),
      CommandSay: new ParsingMode({ name: "/say" }),
      CommandSummon: new ParsingMode({ name: "/summon" }),
   } as const;

   public readonly name: string;

   private constructor(args: ParsingModeArgs) {
      this.name = args.name;
   }
}
export default ParsingMode;
