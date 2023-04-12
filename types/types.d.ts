type Endpoint = 'function' | 'functionList' | 'functionTagList' | 'callback' | 'callbackList' | 'callbackTagList';
type RequestType = 'functions' | 'callbacks';

export type Intents = 'None' | 'Members' | 'Presence';
export type RawIntents = 0 | 2 | 256;

export interface FunctionInfo {
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
    args: FunctionArguments[] | null;
    /**
     * The intents of the function
     */
    intents: Intents;
    /**
     * Whether the function requires premium hosting time
     */
    premium: boolean;
}

export interface CallbackInfo {
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
    args: CallbackArguments[] | [];
    /**
     * The intents of the callback
     */
    intents: Intents;
    /**
     * Whether the callback requires premium hosting time
     */
    premium: boolean;
}

export type FunctionsArgumentType =
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
export type CallbacksArgumentType =
    'String' |
    'Snowflake';

export type AddButtonEnums = readonly ['primary', 'secondary', 'success', 'danger', 'link'];
export type ModalEnums = readonly ['short', 'paragraph'];
export type CategoryEnums = readonly ['count', 'name', 'id', 'mention'];
export type ChannelEnums = readonly ['text', 'voice', 'category', 'stage', 'forum'];
export type EditButtonEnums = readonly ['primary', 'secondary', 'success', 'danger', 'link'];
export type ErrorEnums = readonly ['row', 'column', 'command', 'source', 'message'];
export type CooldownEnums = readonly ['normal', 'global', 'server'];
export type EmbedDataEnums = readonly ['description', 'footer', 'color', 'image', 'timestamp', 'title'];
export type InviteInfoEnums = readonly ['uses', 'channel', 'creationDate', 'inviter', 'isTemporary'];
export type LeaderboardTypeEnums = readonly ['user', 'server', 'globalUser'];
export type SortEnums = readonly ['desc', 'asc'];
export type LeaderboardReturnTypeEnums = readonly ['id', 'value'];
export type MessageDataEnums = readonly ['content', 'authorID', 'username', 'avatar'];
export type TimestampEnums = readonly ['ns', 'ms', 's'];
export type MembersCountEnums = readonly ['invisible', 'dnd', 'online', 'offline', 'idle'];
export type UrlEnums = readonly ['decode', 'encode'];
export type VariablesCountEnums = readonly ['channel', 'user', 'server', 'globaluser'];

export interface FunctionArguments {
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
    type: FunctionsArgumentType;
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
     * The Enums of the argument. If it's TypeScript, the special types can be used
     * @example
     * ```ts
     *  import {
     *      functionInfo,
     *      type AddButtonEnums
     *  } from "@nightnutsky/bpapi";
     *
     *  functionInfo('$addB').then(info => {
     *      if (info && info.args) {
     *          for (const arg of info.args) {
     *              if (arg.enumData) {
     *                  const enums: AddButtonEnums = arg.enumData;
     *                  // ^ ["primary", "secondary", "success", "danger", "link"]
     *                  }
     *          }
     *      }
     *  });
     *```
     */
    enumData?: any;
}

export interface CallbackArguments {
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
    type: CallbacksArgumentType; 
    /**
     * Whether the argument is required
     */
    required: boolean;
}

type GetFunctionInfo = Promise<FunctionInfo | undefined>;
type GetFunctionList = Promise<FunctionInfo[]>;
type GetFunctionTagList = Promise<string[]>;


type GetCallbackInfo = Promise<CallbackInfo | undefined>;
type GetCallbackList = Promise<CallbackInfo[]>;
type GetCallbackTagList = Promise<string[]>;

export interface FunctionsResponse {
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
    arguments: FunctionArguments[] | null;
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
     * Unknown
     * 
     * *It was never used*
     */
    color: 0;
}

export interface CallbacksResponse {
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
    arguments: CallbackArguments[] | [];
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

/**
 * 
 * @param functionTag A tag (i.e `$addButton[]`, `$nomention`) of the function. Supports non-completed tags (i.e `$addBu` will be represented as `$addButton[]`)
 * @returns A promise containing information about the specified function. If could't find the function, `undefined` is returned.
 */
export declare function functionInfo(functionTag: string): GetFunctionInfo;
/**
 * 
 * @returns A promise containing an array of functions with their information
 */
export declare function functionList(): GetFunctionList;
/**
 * 
 * @returns A promise containing an array of function tags
 */
export declare const functionTagList: () => GetFunctionTagList;

/**
 * 
 * @param callbackTag A tag (i.e `$onJoined[]`, `$onLeave[]`) of the callback. Supports non-completed tags (i.e `$onJo` will be represented as `$onJoined[]`)
 * @returns A promise containing information about the specified callback. If could't find the callback, `undefined` is returned.
 */
export declare function callbackInfo(callbackTag: string): GetCallbackInfo;
/**
 * 
 * @returns A promise containing an array of callback with their information
 */
export declare function callbackList(): GetCallbackList;
/**
 * 
 * @returns A promise containing an array of callback tags
 */
export declare const callbackTagList: () => GetCallbackTagList;

type PublicAPIRequest<ResponseType> = Promise<
    ResponseType extends FunctionsResponse ? FunctionsResponse | undefined :
    ResponseType extends FunctionsResponse[] ? FunctionsResponse[] :
    ResponseType extends CallbacksResponse ? CallbacksResponse | undefined :
    ResponseType extends CallbacksResponse[] ? CallbacksResponse[] :
    string[]>;
type FindTag = Promise<string | undefined>;
