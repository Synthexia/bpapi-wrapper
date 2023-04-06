import fetch from "node-fetch";
import type {
    Endpoint,
    FunctionInfo,
    FunctionIntents,
    FunctionTag,
    GetFunctionInfo,
    GetFunctionList,
    GetFunctionTagList
} from "../types/types";

async function request(endpoint: Endpoint, functionTag?: FunctionTag) {
    const api = 'https://botdesignerdiscord.com/public/api/';

    if (endpoint == 'function') {
        const tag = await findFunction(functionTag as FunctionTag);
        if (tag) {
            return fetch(api + `function/${tag}`);
        } else {
            return undefined;
        }
    } else if (endpoint == 'functionList') {
        return fetch(api + 'function_list');
    } else {
        return fetch(api + 'function_tag_list');
    }
}
async function findFunction(functionTag: FunctionTag) {
    const tags = await functionTagList();
    for (const tag of tags) {
        if (tag.includes(functionTag)) return tag as FunctionTag;
    }
}

/**
 * 
 * @param functionTag A tag (i.e `$addButton[]`, `$nomention`) of the function. Supports non-completed tags (i.e `$addBu` will be represented as `$addButton[]`)
 * @returns A promise containing information about the specified function. If function wasn't found, returns `undefined`.
 */
export async function functionInfo(functionTag: FunctionTag): GetFunctionInfo {
    const data = (await request('function', functionTag));
    if (data) {
        const functionInfo = await data.json();

        let intents: FunctionIntents;
        if (functionInfo.intents == 256) {
            intents = 'Presence'
        } else if (functionInfo.intents == 2) {
            intents = 'Members'
        } else {
            intents = 'None'
        }

        const res = {
            tag: functionInfo.tag,
            description: functionInfo.shortDescription,
            arguments: functionInfo.arguments,
            intents: intents,
            premium: functionInfo.premium
        } as FunctionInfo;
        return res;
    } else {
        return undefined;
    }
}
/**
 * 
 * @returns A promise containing an array of functions with their information
 */
export async function functionList(): GetFunctionList {
    const data = (await (await request('functionList'))?.json());
    const res = [] as FunctionInfo[];

    for (const functionInfo of data) {
        let intents: FunctionIntents;
        if (functionInfo.intents == 256) {
            intents = 'Presence'
        } else if (functionInfo.intents == 2) {
            intents = 'Members'
        } else {
            intents = 'None'
        }

        res.push({
            tag: functionInfo.tag,
            description: functionInfo.shortDescription,
            arguments: functionInfo.arguments,
            intents: intents,
            premium: functionInfo.premium,
        });
    }
    return res;
}
/**
 * 
 * @returns A promise containing an array of function tags
 */
export async function functionTagList(): GetFunctionTagList {
    const data = (await (await request('functionTagList'))?.json()) as string[];
    return data;
}
