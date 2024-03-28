import { validateEntityNBT } from "./parsing.ts";

export const Names = [
   "advancement",
   "attribute",
   "ban",
   "ban-ip",
   "banlist",
   "bossbar",
   "clear",
   "clone",
   "damage",
   "data",
   "datapack",
   "debug",
   "defaultgamemode",
   "deop",
   "difficulty",
   "effect",
   "enchant",
   "execute",
   "experience",
   "fill",
   "fillbiome",
   "forceload",
   "function",
   "gamemode",
   "gamerule",
   "give",
   "help",
   "item",
   "jfr",
   "kick",
   "kill",
   "list",
   "locate",
   "loot",
   "me",
   "msg",
   "op",
   "pardon",
   "pardon-ip",
   "particle",
   "perf",
   "place",
   "playsound",
   "publish",
   "random",
   "recipe",
   "reload",
   "return",
   "ride",
   "save-all",
   "save-off",
   "save-on",
   "say",
   "schedule",
   "scoreboard",
   "seed",
   "setblock",
   "setidletimeout",
   "setworldspawn",
   "spawnpoint",
   "spectate",
   "spreadplayers",
   "stop",
   "stopsound",
   "summon",
   "tag",
   "team",
   "teammsg",
   "teleport",
   "tell",
   "tellraw",
   "tick",
   "time",
   "title",
   "tm",
   "tp",
   "transfer",
   "trigger",
   "w",
   "weather",
   "worldborder",
   "xp",
] as const;

export const Selectors = ["a", "e", "r", "p", "s"] as const;

export const ExecuteSubcommands = [
   "align",
   "anchored",
   "as",
   "at",
   "facing",
   "in",
   "on",
   "positioned",
   "rotated",
   "store",
   "summon",
   "if",
   "unless",
   "run",
] as const;

export const SelectorArguments = [
   "x",
   "y",
   "z",
   "distance",
   "dx",
   "dy",
   "dz",
   "x_rotation",
   "y_rotation",
   "scores",
   "tag",
   "team",
   "name",
   "type",
   "predicate",
   "nbt",
   "level",
   "gamemode",
   "advancements",
   "limit",
   "sort",
] as const;

export const CommandDataType = [
   "String",

   "Double",
   "FloatRange",
   "NonNegativeFloat",

   "Integer",
   "NonNegativeInteger",

   "ScoreObject",
   "AdvancementObject",

   "SortingValue",
   "GamemodeValue",

   "EntityIdOrTag",
   "SNBT",
] as const;

export const SelectorArgumentsToArgDataTypeMap = new Map<
   (typeof SelectorArguments)[number],
   (typeof CommandDataType)[number]
>([
   ["advancements", "AdvancementObject"],
   ["distance", "FloatRange"],
   ["dx", "NonNegativeFloat"],
   ["dy", "NonNegativeFloat"],
   ["dz", "NonNegativeFloat"],
   ["gamemode", "GamemodeValue"],
   ["level", "FloatRange"],
   ["limit", "NonNegativeInteger"],
   ["name", "String"],
   ["nbt", "SNBT"],
   ["predicate", "String"],
   ["scores", "ScoreObject"],
   ["sort", "SortingValue"],
   ["tag", "String"],
   ["team", "String"],
   ["type", "EntityIdOrTag"],
   ["x", "Double"],
   ["x_rotation", "FloatRange"],
   ["y", "Double"],
   ["y_rotation", "FloatRange"],
   ["z", "Double"],
]);

export const Entities = [
   "allay",
   "area_effect_cloud",
   "armor_stand",
   "arrow",
   "axolotl",
   "bat",
   "bee",
   "blaze",
   "block_display",
   "boat",
   "camel",
   "cat",
   "cave_spider",
   "chest_boat",
   "chest_minecart",
   "chicken",
   "cod",
   "command_block_minecart",
   "cow",
   "creeper",
   "dolphin",
   "donkey",
   "dragon_fireball",
   "drowned",
   "egg",
   "elder_guardian",
   "end_crystal",
   "ender_dragon",
   "ender_pearl",
   "enderman",
   "endermite",
   "evoker",
   "evoker_fangs",
   "experience_bottle",
   "experience_orb",
   "eye_of_ender",
   "falling_block",
   "fireball",
   "firework_rocket",
   "fox",
   "frog",
   "furnace_minecart",
   "ghast",
   "giant",
   "glow_item_frame",
   "glow_squid",
   "goat",
   "guardian",
   "hoglin",
   "hopper_minecart",
   "horse",
   "husk",
   "illusioner",
   "interaction",
   "iron_golem",
   "item",
   "item_display",
   "item_frame",
   "leash_knot",
   "lightning_bolt",
   "llama",
   "llama_spit",
   "magma_cube",
   "marker",
   "minecart",
   "mooshroom",
   "mule",
   "ocelot",
   "painting",
   "panda",
   "parrot",
   "phantom",
   "pig",
   "piglin",
   "piglin_brute",
   "pillager",
   "polar_bear",
   "potion",
   "pufferfish",
   "rabbit",
   "ravager",
   "salmon",
   "sheep",
   "shulker",
   "shulker_bullet",
   "silverfish",
   "skeleton",
   "skeleton_horse",
   "slime",
   "small_fireball",
   "sniffer",
   "snow_golem",
   "snowball",
   "spawner_minecart",
   "spectral_arrow",
   "spider",
   "squid",
   "stray",
   "strider",
   "tadpole",
   "text_display",
   "tnt",
   "tnt_minecart",
   "trader_llama",
   "trident",
   "tropical_fish",
   "turtle",
   "vex",
   "villager",
   "vindicator",
   "wandering_trader",
   "warden",
   "witch",
   "wither",
   "wither_skeleton",
   "wither_skull",
   "wolf",
   "zoglin",
   "zombie",
   "zombie_horse",
   "zombie_villager",
   "zombified_piglin",
] as const;

export const EntityNBTTags = [
   //All entities
   "Air",
   "CustomName",
   "CustomNameVisible",
   "FallDistance",
   "Fire",
   "Glowing",
   "HasVisualFire",
   "id",
   "Invulnerable",
   "Motion",
   "NoGravity",
   "OnGround",
   "Passengers",
   "PortalCooldown",
   "Pos",
   "Rotation",
   "Silent",
   "Tags",
   "TicksFrozen",
   "UUID",

   //All Mobs
   "AbsorptionAmount",
   "active_effects",
   "ArmorDropChances",
   "ArmorItems",
   "Attributes",
   "body_armor_drop_chance",
   "body_armor_item",
   "Brain",
   "CanPickUpLoot",
   "DeathTime",
   "FallFlying",
   "Health",
   "HurtByTimestamp",
   "HurtTime",
   "HandDropChances",
   "HandItems",
   "Leash",
   "LeftHanded",
   "NoAI",
   "PersistenceRequired",
   "SleepingX",
   "SleepingY",
   "SleepingZ",
   "Team",

   //All ageable mobs
   "Age",
   "ForcedAge",
   "InLove",
   "LoveCause",

   //Allays
   "CanDuplicate",
   "DuplicationCooldown",
   "Inventory",
   "listener",

   //Armadillos
   "state",

   //Armor Stands
   "DisabledSlots",
   "Invisible",
   "Marker",
   "NoBasePlate",
   "Pose",
   "ShowArms",
   "Small",

   //Axolotls
   "FromBucket",
   "Variant",

   //Bats
   "BatFlags",

   //All angerable mobs
   "AngerTime",
   "AngryAt",

   //Bees
   "CannotEnterHiveTicks",
   "CropsGrownSincePollination",
   "FlowerPos",
   "HasNectar",
   "HasStung",
   "HivePos",
   "TicksSincePollination",

   //All tameable entities
   "Owner",
   "Sitting",

   //Cat
   "CollarColor",
   "variant",

   //Chicken
   "EggLayTime",
   "IsChickenJockey",

   //Cod
   "FromBucket",

   //Creeper
   "ExplosionRadius",
   "Fuse",
   "ignited",
   "powered",

   //Dolpin
   "CanFindTreasure",
   "GotFish",
   "TreasurePosX",
   "TreasurePosY",
   "TreasurePosZ",

   //All horses
   "Bred",
   "EatingHaystack",
   "Owner",
   "SaddleItem",
   "Tame",
   "Temper",

   //Donkey
   "ChestedHorse",
   "Items",

   //All zombies
   "CanBreakDoors",
   "DrownedConversionTime",
   "InWaterTime",
   "IsBaby",

   //Ender Dragon
   "DragonPhase",

   //Enderman
   "carriedBlockState",

   //Endermite
   "Lifetime",

   //All raid mobs
   "CanJoinRaid",
   "PatrolLeader",
   "Patrolling",
   "PatrolTarget",
   "RaidId",
   "Wave",

   //Evoker
   "SpellTicks",

   //Fox
   "Crouching",
   "Sitting",
   "Sleeping",
   "Trusted",
   "Type",

   //Frog
   "variant",

   //Ghast
   "ExplosionPower",

   //Glow Squid
   "DarkTicksRemaining",

   //Goat
   "HasLeftHorn",
   "HasRightHorn",
   "IsScreamingGoat",

   //Hoglin
   "CannotBeHunted",
   "IsImmuneToZombification",
   "TimeInOverworld",
   "TimeInOverworld",

   //Horse
   "ArmorItem",
   "Variant",

   //Illusioner
   "SpellTicks",

   //Iron Golem
   "PlayerCreated",

   //Llama
   "Bred",
   "ChestedHorse",
   "DecorItem",
   "DespawnDelay",
   "EatingHaystack",
   "Item",
   "Owner",
   "Variant",
   "Strength",
   "Tame",
   "Temper",

   //Magma Cube
   "Size",
   "wasOnGround",

   //Mooshroom
   "EffectDuration",
   "EffectId",
   "Type",

   //Mule
   "ChestedHorse",
   "Items",

   //Ocelot
   "Trusting",

   //Panda
   "HiddenGene",
   "MainGene",
   "MainGene",

   //Parrot
   "Variant",

   //Phantom
   "AX",
   "AY",
   "AZ",
   "Size",

   //Pig
   "Saddle",

   //Piglin
   "CannotHunt",
   "Inventory",
   "IsBaby",
   "IsImmuneToZombification",
   "TimeInOverworld",

   //Piglin Brute
   "IsImmunteToZombification",
   "TimeInOverworld",

   //Pillager
   "Inventory",

   //Player
   "abilities",
   "DataVersion",
   "Dimension",
   "EnderItems",
   "enteredNetherPosition",
   "foodExhaustionLever",
   "foodLevel",
   "foodSaturationLevel",
   "foodTickTimer",
   "Inventory",
   "LastDeathLocation",
   "playerGameType",
   "previousPlayerGameType",
   "recipeBook",
   "RootVehicle",
   "Score",
   "seenCredits",
   "SelectedItem",
   "SelectedItemSlot",
   "ShoulderEntityLeft",
   "ShoulderEntityRight",
   "SleepTimer",
   "SpawnDimension",
   "SpawnForced",
   "SpawnX",
   "SpawnY",
   "SpawnZ",
   "warden_spawn_tracker",
   "XpLevel",
   "XpP",
   "XpSeed",
   "XpTotal",

   //Pufferfish
   "FromBucket",
   "PuffState",

   //Rabbits
   "MoreCarrotTicks",
   "RabbitType",

   //Ravager
   "AttackTick",
   "RoarTick",
   "StunTick",

   //Salmon
   "FromBucket",

   //Sheep
   "Color",
   "Sheared",

   //Shulker
   "APX",
   "APY",
   "APZ",
   "AttachFace",
   "Color",
   "Peek",

   //Skeleton
   "StrayConversionTime",

   //Skeleton Horse
   "SkeletonTrap",
   "SkeletonTrapTime",

   //Slime
   "Size",
   "wasOnGround",

   //Snow Golem
   "Pumpkin",

   //Strider
   "Saddle",

   //Tadpole
   "Age",
   "FromBucket",

   //Trader Llama
   "Bred",
   "ChestedHorse",
   "DecorItem",
   "DespawnDelay",
   "EatingHaystack",
   "Items",
   "Owner",
   "Variant",
   "Strength",
   "Tame",
   "Temper",

   //Tropical Fish
   "FromBucket",
   "Variant",

   //Turtle
   "HasEgg",
   "HomePosX",
   "HomePosY",
   "HomePosZ",
   "TravelPosX",
   "TravelPosY",
   "TravelPosZ",

   //Vex
   "BoundX",
   "BoundY",
   "BoundZ",
   "LifeTicks",

   //Villager
   "Inventory",
   "LastRestock",
   "LastGossipDecay",
   "RestocksToday",
   "Willing",

   //Vindicator
   "Johnny",

   //Wandering Trader
   "DespawnDelay",
   "Offers",
   "WanderTarget",
   "Inventory",

   //Warden
   "anger",

   //Wither
   "Invul",

   //Wolf
   "CollarColor",
   "Variant",

   //Zoglin
   "IsBaby",

   //Zombie Villager
   "ConversionTime",
   "ConversionPlayer",

   //All projectile
   "HasBeenShot",
   "LeftOwner",
   "Owner",

   //All arrows
   "crit",
   "damage",
   "inBlockState",
   "inGround",
   "life",
   "pickup",
   "PierceLevel",
   "shake",
   "ShotFromCrossbow",
   "SoundEvent",

   //All potion effects (obviously potions but also tipped arrows)
   "custom_potion_effects",
   "Potion",
   "CustomPotionColor",

   //Arrow
   "Color",

   //All hurting projectiles
   "power",

   //All fireballs
   "power",

   //Eggs
   "Item",

   //Ender Pearl
   "Item",

   //Experience Bottle
   "Item",

   //Fireball
   "ExplosionPower",
   "Item",

   //Firework Rocket
   "FireworksItem",
   "Life",
   "LifeTime",
   "ShotAtAngle",

   //Potion
   "Item",

   //Shulker Bullet
   "Steps",
   "Target",
   "TXD",
   "TYD",
   "TZD",

   //Small Fireball
   "Item",

   //Snowball
   "Item",

   //Spectral Arrow
   "Duration",

   //Trident
   "DealtDamage",
   "Item",

   //Wither Skull
   "dangerous",

   //Experience Orbs
   "Age",
   "Count",
   "Health",
   "Value",

   //Item
   "Age",
   "Health",
   "Item",
   "Owner",
   "PickupDelay",
   "Thrower",

   //All boats
   "Type",

   //All container entities
   "Items",
   "LootTable",
   "LootTableSeed",

   //All minecarts
   "CustomDisplayTile",
   "DisplayOffset",
   "DisplayState",

   //Command Block Minecart
   "Command",
   "LastOutput",
   "SuccessCount",
   "TrackOutput",

   //Furnace minecart
   "Fuel",
   "PushX",
   "PushZ",

   //Hopper Minecart
   "Enabled",

   //All Spawners
   "Delay",
   "MaxNearbyEntities",
   "MaxSpawnDelay",
   "MinSpawnDelay",
   "RequiredPlayerRange",
   "SpawnCount",
   "SpawnData",
   "SpawnPotentials",
   "SpawnRange",

   //TNT Minecart
   "TNTFuse",

   //Falling Block
   "BlockState",
   "CancelDrop",
   "FallHurtAmount",
   "FallHurtMax",
   "HurtEntities",
   "TileEntityData",
   "Time",

   //Tnt
   "fuse",
   "block_state",

   //Area Effect CLoud
   "Age",
   "Color",
   "Duration",
   "DurationOnUse",
   "Effects",
   "Owner",
   "Particle",
   "Potion",
   "Radius",
   "RadiusOnUse",
   "RadiusPerTick",
   "ReapplicationDelay",
   "WaitTime",

   //End Crystal
   "BeamTarget",
   "ShowBottom",

   //Evoker Fangs
   "Owner",
   "Warmup",

   //Eye of ender
   "Item",

   //All hangable entities
   "Facing",
   "TileX",
   "TileY",
   "TileZ",

   //Item Frame
   "Fixed",
   "Invisible",
   "Item",
   "ItemDropChance",
   "ItemRotation",

   //Marker
   "data",

   //Painting
   "variant",
] as const;

type MCTagType = { conformsTo: (val: string) => boolean };

export const Short: MCTagType = {
   conformsTo: (val: string): boolean => {
      const num = parseInt(val);
      const type = val.substring(val.length - 1);
      return type == "s" && num <= 32767 && num >= -32768 && !isNaN(num);
   },
};

export const Byte: MCTagType = {
   conformsTo: (val: string): boolean => {
      const num = parseInt(val);
      const type = val.substring(val.length - 1);
      return type == "b" && num <= 7 && num >= 0 && !isNaN(num);
   },
};

export function getNBTTypeFromTag(
   tag: (typeof EntityNBTTags)[number]
): MCTagType {
   switch (tag) {
      case "Air":
         return Short;
      case "NoAI":
      case "Invisible":
         return Byte;
      case "CustomName":
      case "CustomNameVisible":
      case "FallDistance":
      case "Fire":
      case "Glowing":
      case "HasVisualFire":
      case "id":
      case "Invulnerable":
      case "Motion":
      case "NoGravity":
      case "OnGround":
      case "Passengers":
      case "PortalCooldown":
      case "Pos":
      case "Rotation":
      case "Silent":
      case "Tags":
      case "TicksFrozen":
      case "UUID":
      case "AbsorptionAmount":
      case "active_effects":
      case "ArmorDropChances":
      case "ArmorItems":
      case "Attributes":
      case "body_armor_drop_chance":
      case "body_armor_item":
      case "Brain":
      case "CanPickUpLoot":
      case "DeathTime":
      case "FallFlying":
      case "Health":
      case "HurtByTimestamp":
      case "HurtTime":
      case "HandDropChances":
      case "HandItems":
      case "Leash":
      case "LeftHanded":
      case "PersistenceRequired":
      case "SleepingX":
      case "SleepingY":
      case "SleepingZ":
      case "Team":
      case "Age":
      case "ForcedAge":
      case "InLove":
      case "LoveCause":
      case "CanDuplicate":
      case "DuplicationCooldown":
      case "Inventory":
      case "listener":
      case "state":
      case "DisabledSlots":
      case "Marker":
      case "NoBasePlate":
      case "Pose":
      case "ShowArms":
      case "Small":
      case "FromBucket":
      case "Variant":
      case "BatFlags":
      case "AngerTime":
      case "AngryAt":
      case "CannotEnterHiveTicks":
      case "CropsGrownSincePollination":
      case "FlowerPos":
      case "HasNectar":
      case "HasStung":
      case "HivePos":
      case "TicksSincePollination":
      case "Owner":
      case "Sitting":
      case "CollarColor":
      case "variant":
      case "EggLayTime":
      case "IsChickenJockey":
      case "ExplosionRadius":
      case "Fuse":
      case "ignited":
      case "powered":
      case "CanFindTreasure":
      case "GotFish":
      case "TreasurePosX":
      case "TreasurePosY":
      case "TreasurePosZ":
      case "Bred":
      case "EatingHaystack":
      case "SaddleItem":
      case "Tame":
      case "Temper":
      case "ChestedHorse":
      case "Items":
      case "CanBreakDoors":
      case "DrownedConversionTime":
      case "InWaterTime":
      case "IsBaby":
      case "DragonPhase":
      case "carriedBlockState":
      case "Lifetime":
      case "CanJoinRaid":
      case "PatrolLeader":
      case "Patrolling":
      case "PatrolTarget":
      case "RaidId":
      case "Wave":
      case "SpellTicks":
      case "Crouching":
      case "Sleeping":
      case "Trusted":
      case "Type":
      case "ExplosionPower":
      case "DarkTicksRemaining":
      case "HasLeftHorn":
      case "HasRightHorn":
      case "IsScreamingGoat":
      case "CannotBeHunted":
      case "IsImmuneToZombification":
      case "TimeInOverworld":
      case "ArmorItem":
      case "PlayerCreated":
      case "DecorItem":
      case "DespawnDelay":
      case "Item":
      case "Strength":
      case "Size":
      case "wasOnGround":
      case "EffectDuration":
      case "EffectId":
      case "Trusting":
      case "HiddenGene":
      case "MainGene":
      case "AX":
      case "AY":
      case "AZ":
      case "Saddle":
      case "CannotHunt":
      case "IsImmunteToZombification":
      case "abilities":
      case "DataVersion":
      case "Dimension":
      case "EnderItems":
      case "enteredNetherPosition":
      case "foodExhaustionLever":
      case "foodLevel":
      case "foodSaturationLevel":
      case "foodTickTimer":
      case "LastDeathLocation":
      case "playerGameType":
      case "previousPlayerGameType":
      case "recipeBook":
      case "RootVehicle":
      case "Score":
      case "seenCredits":
      case "SelectedItem":
      case "SelectedItemSlot":
      case "ShoulderEntityLeft":
      case "ShoulderEntityRight":
      case "SleepTimer":
      case "SpawnDimension":
      case "SpawnForced":
      case "SpawnX":
      case "SpawnY":
      case "SpawnZ":
      case "warden_spawn_tracker":
      case "XpLevel":
      case "XpP":
      case "XpSeed":
      case "XpTotal":
      case "PuffState":
      case "MoreCarrotTicks":
      case "RabbitType":
      case "AttackTick":
      case "RoarTick":
      case "StunTick":
      case "Color":
      case "Sheared":
      case "APX":
      case "APY":
      case "APZ":
      case "AttachFace":
      case "Peek":
      case "StrayConversionTime":
      case "SkeletonTrap":
      case "SkeletonTrapTime":
      case "Pumpkin":
      case "HasEgg":
      case "HomePosX":
      case "HomePosY":
      case "HomePosZ":
      case "TravelPosX":
      case "TravelPosY":
      case "TravelPosZ":
      case "BoundX":
      case "BoundY":
      case "BoundZ":
      case "LifeTicks":
      case "LastRestock":
      case "LastGossipDecay":
      case "RestocksToday":
      case "Willing":
      case "Johnny":
      case "Offers":
      case "WanderTarget":
      case "anger":
      case "Invul":
      case "ConversionTime":
      case "ConversionPlayer":
      case "HasBeenShot":
      case "LeftOwner":
      case "crit":
      case "damage":
      case "inBlockState":
      case "inGround":
      case "life":
      case "pickup":
      case "PierceLevel":
      case "shake":
      case "ShotFromCrossbow":
      case "SoundEvent":
      case "custom_potion_effects":
      case "Potion":
      case "CustomPotionColor":
      case "power":
      case "FireworksItem":
      case "Life":
      case "LifeTime":
      case "ShotAtAngle":
      case "Steps":
      case "Target":
      case "TXD":
      case "TYD":
      case "TZD":
      case "Duration":
      case "DealtDamage":
      case "dangerous":
      case "Count":
      case "Value":
      case "PickupDelay":
      case "Thrower":
      case "LootTable":
      case "LootTableSeed":
      case "CustomDisplayTile":
      case "DisplayOffset":
      case "DisplayState":
      case "Command":
      case "LastOutput":
      case "SuccessCount":
      case "TrackOutput":
      case "Fuel":
      case "PushX":
      case "PushZ":
      case "Enabled":
      case "Delay":
      case "MaxNearbyEntities":
      case "MaxSpawnDelay":
      case "MinSpawnDelay":
      case "RequiredPlayerRange":
      case "SpawnCount":
      case "SpawnData":
      case "SpawnPotentials":
      case "SpawnRange":
      case "TNTFuse":
      case "BlockState":
      case "CancelDrop":
      case "FallHurtAmount":
      case "FallHurtMax":
      case "HurtEntities":
      case "TileEntityData":
      case "Time":
      case "fuse":
      case "block_state":
      case "DurationOnUse":
      case "Effects":
      case "Particle":
      case "Radius":
      case "RadiusOnUse":
      case "RadiusPerTick":
      case "ReapplicationDelay":
      case "WaitTime":
      case "BeamTarget":
      case "ShowBottom":
      case "Warmup":
      case "Facing":
      case "TileX":
      case "TileY":
      case "TileZ":
      case "Fixed":
      case "ItemDropChance":
      case "ItemRotation":
      case "data":
         throw new Error(`Entity NBT tag ${tag} is not yet implemented`);
   }
}
