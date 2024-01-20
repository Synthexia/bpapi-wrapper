import * as centra from "centra";
import { JSDOM } from "jsdom";

import { API, ENDPOINT_PATH, NODES } from "./consts";
import { buildInfo, findTag, parseBody } from "./utils";

import { CallbackEndpoint, FunctionEndpoint, Intents, RawIntents, Target } from "./enums";

export declare namespace Node {
    interface Info {
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

export declare namespace Function {
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

export declare namespace Callback {
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

class Request {
    public static async functions(params: {
        endpoint: FunctionEndpoint.Info,
        tag: string
    }): Promise<Function.Response | undefined>;
    public static async functions(params: {
        endpoint: FunctionEndpoint.List
    }): Promise<Function.Response[]>;
    public static async functions(params: {
        endpoint: FunctionEndpoint.TagList
    }): Promise<string[]>;

    public static async functions(
        params:
            | { endpoint: FunctionEndpoint.List | FunctionEndpoint.TagList }
            | { endpoint: FunctionEndpoint.Info, tag: string }
    ) {
        switch (params.endpoint) {
            case FunctionEndpoint.Info:
                const tag = await findTag(Target.Functions, params.tag!);
                if (!tag) return;

                return <Function.Response | undefined> await (
                    await centra(API + ENDPOINT_PATH.FUNCTION.INFO + tag).send()
                ).json();
            case FunctionEndpoint.List:
                return <Function.Response[]> await (
                    await centra(API + ENDPOINT_PATH.FUNCTION.LIST).send()
                ).json();
            case FunctionEndpoint.TagList:
                return <string[]> await (
                    await centra(API + ENDPOINT_PATH.FUNCTION.TAG_LIST).send()
                ).json();
        }
    }

    public static async callbacks(params: {
        endpoint: CallbackEndpoint.Info,
        tag: string
    }): Promise<Callback.Response | undefined>;
    public static async callbacks(params: {
        endpoint: CallbackEndpoint.List
    }): Promise<Callback.Response[]>;
    public static async callbacks(params: {
        endpoint: CallbackEndpoint.TagList
    }): Promise<string[]>;

    public static async callbacks(
        params:
            | { endpoint: CallbackEndpoint.List | CallbackEndpoint.TagList }
            | { endpoint: CallbackEndpoint.Info, tag: string }
    ) {
        switch (params.endpoint) {
            case CallbackEndpoint.Info:
                const tag = await findTag(Target.Callbacks, params.tag!);
                if (!tag) return;

                return <Callback.Response | undefined> await (
                    await centra(API + ENDPOINT_PATH.CALLBACK.INFO + tag).send()
                ).json();
            case CallbackEndpoint.List:
                return <Callback.Response[]> await (
                    await centra(API + ENDPOINT_PATH.CALLBACK.LIST).send()
                ).json();
            case CallbackEndpoint.TagList:
                return <string[]> await (
                    await centra(API + ENDPOINT_PATH.CALLBACK.TAG_LIST).send()
                ).json();
        }
    }

    public static async nodes() {
        return await (
            await centra(NODES).send()
        ).text();
    }
}

export class Nodes {
    /**
     * 
     * @returns An array containing info about nodes
     */
    public static async list(): Promise<Node.Info[]> {
        const html = await Request.nodes();
        const document = new JSDOM(html).window.document;

        const [defaultTable, highPerfTable] = document.getElementsByClassName('uk-table');

        if (!defaultTable)
            throw new Error('Failed to parse the Default table, please try again later.');
        if (!highPerfTable)
            throw new Error('Failed to parse the High Perfomance table, please try again later.');

        const [dtCaptionElement, _dtTHeadElement, dtTBodyElement] = defaultTable.children;
        const [hptCaptionElement, _hptTHeadElement, hptTBodyElement] = highPerfTable.children;

        const dtCaption = dtCaptionElement.textContent!;
        const hptCaption = hptCaptionElement.textContent!;

        const dtBody = [];
        const hptBody = [];

        for (const element of dtTBodyElement.children)
            dtBody.push( parseBody(element.children) );
        for (const element of hptTBodyElement.children)
            hptBody.push( parseBody(element.children) );

        return [
            {
                name: dtCaption,
                stats: dtBody
            },
            {
                name: hptCaption,
                stats: hptBody
            }
        ];
    }
}

export class Functions {
    /**
     * Get the information about the function
     * 
     * @param tag The tag of the function. The tag can be written partially (e.g `$addB`)
     * @returns Information about the function or `undefined` if the function wasn't found
     */
    public static async info(tag: string): Promise<Function.Info | undefined> {
        const data = await Request.functions({ endpoint: FunctionEndpoint.Info, tag });
        if (!data) return;

        return buildInfo({ target: Target.Functions, response: data});
    }

    /**
     * Get the information about all functions
     * 
     * @returns An array of objects containing information about all functions
     */
    public static async list(): Promise<Function.Info[]> {
        const data = await Request.functions({ endpoint: FunctionEndpoint.List });
        const functionList: Function.Info[] = [];

        for (const f of data)
            functionList.push(buildInfo({ target: Target.Functions, response: f }));

        return functionList;
    }

    /**
     * Get the tags of all functions
     * 
     * @returns An array of strings containing the tags of all functions
     */
    public static async tagList(): Promise<string[]> {
        return await Request.functions({ endpoint: FunctionEndpoint.TagList });
    }
}

export class Callbacks {
    /**
     * Get the information about the callback
     * 
     * @param tag The tag of the callback. The tag can be written partially (e.g `$addB`)
     * @returns Information about the callback or `undefined` if the callback wasn't found
     */
    public static async info(tag: string): Promise<Callback.Info | undefined> {
        const data = await Request.callbacks({ endpoint: CallbackEndpoint.Info , tag });
        if (!data) return;

        return buildInfo({ target: Target.Callbacks, response: data });
    }

    /**
     * Get the information about all callbacks
     * 
     * @returns An array of objects containing information about all callbacks
     */
    public static async list(): Promise<Callback.Info[]> {
        const data = await Request.callbacks({ endpoint: CallbackEndpoint.List });
        const callbackList: Callback.Info[] = [];

        for (const c of data)
            callbackList.push(buildInfo({ target: Target.Callbacks, response: c }));

        return callbackList;
    }

    /**
     * Get the tags of all callbacks
     * 
     * @returns An array of strings containing the tags of all callbacks
     */
    public static async tagList(): Promise<string[]> {
        return await Request.callbacks({ endpoint: CallbackEndpoint.TagList });
    }
}
