type ParsingModeArgs = { separator: string; name: string };
class ParsingMode {
   static modes = {
      Command: new ParsingMode({ separator: " ", name: "any command" }),
      CommandExecuteStart: new ParsingMode({
         separator: " ",
         name: "/execute",
      }),
      CommandExecuteTargetSelector: new ParsingMode({
         separator: "",
         name: "/execute target selector",
      }),
      CommandFunction: new ParsingMode({ separator: "", name: "/function" }),
      CommandSay: new ParsingMode({ separator: "\n", name: "/say" }),
      CommandSummon: new ParsingMode({ separator: " ", name: "/summon" }),
   } as const;

   public readonly separator: string;
   public readonly name: string;

   private constructor(args: ParsingModeArgs) {
      this.separator = args.separator;
      this.name = args.name;
   }
}
export default ParsingMode;
