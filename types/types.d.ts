export const enum Intents {
    None = 'None',
    Members = 'Members',
    Presence = 'Presence'
}

export const enum RawIntents {
    None = 0,
    Members = 2,
    Presence = 256
}

export const enum FunctionEndpoint {
    Info = 'function',
    List = 'functionList',
    TagList = 'functionTagList',
}

export const enum CallbackEndpoint {
    Info = 'callback',
    List = 'callbackList',
    TagList = 'callbackTagList'
}

export const enum Target {
    Functions = 'function',
    Callbacks = 'callbacks',
    Nodes = 'nodes'
}

export namespace Node {
    interface List {
        name: string;
        stats: Stats[];
    }

    interface Stats {
        nodeId: string;
        /**
         * The stats presented as a text line.
         */
        text: string;
        /**
         * The stats presented as an object.
         */
        rawStats: RawStats;
    }

    interface RawStats {
        botCount: string;
        ping: string;
        status: string;
    }
}

export namespace Function {
    interface Info {
        /**
         * The tag of the function
         */
        tag: string;
        /**
         * The description of the function
         */
        description: string;
        /**
         * The arguments of the function
         */
        args: Arguments[] | null;
        /**
         * The intents of the function
         */
        intents: Intents;
        /**
         * Whether the function requires premium hosting time
         */
        premium: boolean;
    }

    interface Response {
        /**
         * The tag of the function
         */
        tag: string;
        /**
         * The description of the function
         */
        shortDescription: string;
        /**
         * The description of the function?
         * 
         * *It was never used*
         */
        longDescription: string;
        /**
         * The arguments of the function
         */
        arguments: Arguments[] | null;
        /**
         * The intents of the function
         * 
         * 0 = None
         * 
         * 2 = Members
         * 
         * 256 = Presence
         */
        intents: RawIntents;
        /**
         * Whether the function requires premium hosting time
         */
        premium: boolean;
        /**
         * Deprecated key
         * 
         * *No longer is being used*
         */
        color: 0;
    }

    interface Arguments {
        /**
         * The name of the argument
         */
        name: string;
        /**
         * The description of the argument
         */
        description?: string;
        /**
         * The type of the argument
         */
        type: ArgumentType;
        /**
         * Whether the argument is required
         */
        required: boolean;
        /**
         * Whether the argument can be repeated
         */
        repeatable?: boolean;
        /**
         * Whether the argument can be empty
         */
        empty?: boolean;
        /**
         * The Enums of the argument.
         */
        enumData?: any;
    }

    type ArgumentType = (
        'Bool' | 'URL | String' | 'String' | 'Enum' | 'Emoji' | 'Snowflake' | 'URL' | 'Integer' |
        'Float | String | Integer' | 'HowMany' | 'Tuple' | 'Snowflake | String' | 'Permission' |
        'Color' | 'Duration' | 'Integer | Float' | 'String | URL' | 'String | Snowflake' |
        'Float | Bool | Integer | String' | 'Float | Integer | String' |
        'String | Bool | Integer | Float' | 'HowMany | String' | 'Float | Integer' | 'Float'
    );

    namespace ArgumentEnums {
        // ???
        /*
        const enum AddButton {
            Primary = 0,
            Secondary = 1,
            Success = 2,
            Danger = 3,
            Link = 4
        }
        */

        type AddButton = readonly ['primary', 'secondary', 'success', 'danger', 'link'];
        type Modal = readonly ['short', 'paragraph'];
        type Category = readonly ['count', 'name', 'id', 'mention'];
        type Channel = readonly ['text', 'voice', 'category', 'stage', 'forum'];
        type EditButton = readonly ['primary', 'secondary', 'success', 'danger', 'link'];
        type Error = readonly ['row', 'column', 'command', 'source', 'message'];
        type Cooldown = readonly ['normal', 'global', 'server'];
        type EmbedData = readonly ['description', 'footer', 'color', 'image', 'timestamp', 'title'];
        type InviteInfo = readonly ['uses', 'channel', 'creationDate', 'inviter', 'isTemporary'];
        type LeaderboardType = readonly ['user', 'server', 'globalUser'];
        type Sort = readonly ['desc', 'asc'];
        type LeaderboardReturnType = readonly ['id', 'value'];
        type MessageData = readonly ['content', 'authorID', 'username', 'avatar'];
        type Timestamp = readonly ['ns', 'ms', 's'];
        type MembersCount = readonly ['invisible', 'dnd', 'online', 'offline', 'idle'];
        type Url = readonly ['decode', 'encode'];
        type VariablesCount = readonly ['channel', 'user', 'server', 'globaluser'];
    }
}

export namespace Callback {
    interface Info {
        /**
         * The name (tag-name) of the callback
         */
        name: string;
        /**
         * The description of the callback
         */
        description: string;
        /**
         * The arguments of the callback
         */
        args: Arguments[] | [];
        /**
         * The intents of the callback
         */
        intents: Intents;
        /**
         * Whether the callback requires premium hosting time
         */
        premium: boolean;
    }

    interface Response {
        /**
         * The name of the callback
         */
        name: string;
        /**
         * The description of the callback
         */
        description: string;
        /**
         * The arguments of the callback
         */
        arguments: Arguments[] | null;
        /**
         * The intents of the callback
         * 
         * 0 = None
         * 
         * 2 = Members
         * 
         * 256 = Presence
         */
        intents: RawIntents;
        /**
         * Whether the callback requires premium hosting time
         */
        is_premium: boolean;
    }

    interface Arguments {
        /**
         * The name of the argument
         */
        name: string;
        /**
         * The description of the argument
         */
        description: string;
        /**
         * The type of the argument
         */
        type: ArgumentType;
        /**
         * Whether the argument is required
         */
        required: boolean;
    }

    type ArgumentType = 'String' | 'Snowflake';
}

export class Nodes {
    public static list(): Promise<Node.List[]>
}

export class Functions {
    /**
     * Get the information about the function
     * 
     * @param tag The tag of the function. The tag can be written partially (e.g `$addB`)
     * @returns Information about the function or `undefined` if the function wasn't found
     */
    public static info(tag: string): Promise<Function.Info | undefined>
    /**
     * Get the information about all functions
     * 
     * @returns An array of objects containing information about all functions
     */
    public static list(): Promise<Function.Info[]>
    /**
     * Get the tags of all functions
     * 
     * @returns An array of strings containing the tags of all functions
     */
    public static tagList(): Promise<string[]>
}

export class Callbacks {
    /**
     * Get the information about the callback
     * 
     * @param tag The tag of the callback. The tag can be written partially (e.g `$addB`)
     * @returns Information about the callback or `undefined` if the callback wasn't found
     */
    public static info(tag: string): Promise<Callback.Info | undefined>
    /**
     * Get the information about all callbacks
     * 
     * @returns An array of objects containing information about all callbacks
     */
    public static list(): Promise<Callback.Info[]>
    /**
     * Get the tags of all callbacks
     * 
     * @returns An array of strings containing the tags of all callbacks
     */
    public static tagList(): Promise<string[]>
}
