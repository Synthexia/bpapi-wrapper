export type Endpoint = 'function' | 'functionList' | 'functionTagList';

export type FunctionTag = string;
export type FunctionDescription = string;
export type FunctionIntents = 'None' | 'Members' | 'Presence';
export type FunctionPremium = boolean;

export interface FunctionInfo {
    /**
     * The tag of the function
     */
    tag: FunctionTag;
    /**
     * The description of the function
     */
    description: FunctionDescription;
    /**
     * The arguments of the function
     */
    arguments: FunctionArguments | null;
    /**
     * The intents of the function
     */
    intents: FunctionIntents;
    /**
     * Whether the function requires premium hosting time
     */
    premium: FunctionPremium;
}

export type ArgumentName = string;
export type ArgumentDescription = string;
export type ArgumentType =
    'Bool' |
    'URL | String' |
    'String' |
    'Enum' |
    'Emoji' |
    'Snowflake' |
    'URL' |
    'Integer' |
    'Float | String | Integer' |
    'HowMany' |
    'Tuple' |
    'Snowflake | String' |
    'Permission' |
    'Color' |
    'Duration' |
    'Integer | Float' |
    'String | URL' |
    'String | Snowflake' |
    'Float | Bool | Integer | String' |
    'Float | Integer | String' |
    'String | Bool | Integer | Float' |
    'HowMany | String' |
    'Float | Integer' |
    'Float';
export type ArgumentRequirement = boolean;
export type ArgumentRepeatability = boolean;
export type ArgumentEmptiness = boolean;
export type ArgumentEnumData = string[];

export interface FunctionArguments {
    /**
     * The name of the argument
     */
    name: ArgumentName;
    /**
     * The description of the argument
     */
    description?: ArgumentDescription;
    /**
     * The type of the argument
     */
    type: ArgumentType;
    /**
     * Whether the argument is required
     */
    required: ArgumentRequirement;
    /**
     * Whether the argument can be repeated
     */
    repeatable?: ArgumentRepeatability;
    /**
     * Whether the argument can be empty
     */
    empty?: ArgumentEmptiness;
    /**
     * Possible Enums:
     * 1. `success`, `danger`, `link`, `primary`, `secondary`
     * 2. `short`, `paragraph`
     * 3. `name`, `id`, `mention`, `count`
     * 4. `text`, `voice`, `category`, `stage`, `forum`
     * 5. `primary`, `secondary`, `success`, `danger`, `link`
     * 6. `row`, `column`, `command`, `source`, `message`
     * 7. `normal`, `global`, `server`
     * 8. `title`, `description`, `footer`, `color`, `image`, `timestamp`
     * 9. `inviter`, `isTemporary`, `uses`, `channel`, `creationDate`
     * 10. `user`, `server`, `globalUser`
     * 11. `desc`, `asc`
     * 12. `value`, `id`
     * 13. `content`, `authorID`, `username`, `avatar`
     * 14. `ns`, `ms`, `s`
     * 15. `desc`, `asc`
     * 16. `offline`, `idle`, `invisible`, `dnd`, `online`
     * 17. `desc`, `asc`
     * 18. `encode`, `decode`
     * 19. `desc`, `asc`
     * 20. `user`, `server`, `globaluser`, `channel`
     */
    enumData: ArgumentEnumData;
}

export type GetFunctionInfo = Promise<FunctionInfo | undefined>;
export type GetFunctionList = Promise<FunctionInfo[]>;
export type GetFunctionTagList = Promise<string[]>;

/**
 * 
 * @param functionTag A tag (i.e `$addButton[]`, `$nomention`) of the function. Supports non-completed tags (i.e `$addBu` will be represented as `$addButton[]`)
 * @returns A promise containing information about the specified function. If could't find the function, `undefined` is returned.
 */
export declare function functionInfo(functionTag: FunctionTag): GetFunctionInfo;
/**
 * 
 * @returns A promise containing an array of functions with their information
 */
export declare function functionList(): GetFunctionList;
/**
 * 
 * @returns A promise containing an array of function tags
 */
export declare function functionTagList(): GetFunctionTagList;