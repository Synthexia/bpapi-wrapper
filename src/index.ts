import * as centra from "centra";
import type {
    Endpoint,
    FindFunction,
    FunctionInfo,
    FunctionIntents,
    FunctionTag,
    GetFunctionInfo,
    GetFunctionList,
    GetFunctionTagList,
    PublicAPIRequest,
    PublicAPIResponse
} from "../types/types";
import {
    API,
    ENDPOINT,
    ENDPOINT_PATH,
    INTENTS,
    RAW_INTENTS
} from "./consts";

async function request(endpoint: Endpoint, functionTag?: FunctionTag): PublicAPIRequest {
    let req: centra.Response;
    let data: PublicAPIResponse | PublicAPIResponse[] | string[];
    switch (endpoint) {
        case ENDPOINT.Function:
            const tag = await findFunction(functionTag!);
            if (tag) {
                req = await centra(API + ENDPOINT_PATH.Function + tag).send();
                data = await req.json();
                return <PublicAPIResponse>data;
            } else {
                return;
            }
        case ENDPOINT.FunctionList:
            req = await centra(API + ENDPOINT_PATH.FunctionList).send();
            data = await req.json();
            return <PublicAPIResponse[]>data;
        case ENDPOINT.FunctionTagList:
            req = await centra(API + ENDPOINT_PATH.FunctionTagList).send();
            data = await req.json();
            return <string[]>data;
    }
}

async function findFunction(functionTag: FunctionTag): FindFunction {
    const tags = await functionTagList();
    for (const tag of tags) {
        if (tag.includes(functionTag)) return tag;
    }
}

function intentsSwitcher(functionIntents: number) {
    let intents: FunctionIntents = INTENTS.None;
    switch (functionIntents) {
        case RAW_INTENTS.Presence:
            intents = INTENTS.Presence;
            break;
        case RAW_INTENTS.Members:
            intents = INTENTS.Members;
            break;
    }
    return intents;
}

function buildFunctionInfo(publicAPIResponse: PublicAPIResponse): FunctionInfo {
    return {
        tag: publicAPIResponse.tag,
        description: publicAPIResponse.shortDescription,
        arguments: publicAPIResponse.arguments,
        intents: intentsSwitcher(publicAPIResponse.intents),
        premium: publicAPIResponse.premium
    };
}

/**
 * 
 * @param functionTag A tag (i.e `$addButton[]`, `$nomention`) of the function. Supports non-completed tags (i.e `$addBu` will be represented as `$addButton[]`)
 * @returns A promise containing information about the specified function. If function wasn't found, returns `undefined`.
 */
export async function functionInfo(functionTag: FunctionTag): GetFunctionInfo {
    const data = await request(ENDPOINT.Function, functionTag) as PublicAPIResponse | undefined;
    if (data) {
        return buildFunctionInfo(data);
    } else {
        return;
    }
}
/**
 * 
 * @returns A promise containing an array of functions with their information
 */
export async function functionList(): GetFunctionList {
    const data = await request(ENDPOINT.FunctionList) as PublicAPIResponse[];
    const res: FunctionInfo[] = [];

    for (const functionInfo of data) {
        res.push(buildFunctionInfo(functionInfo));
    }
    return res;
}
/**
 * 
 * @returns A promise containing an array of function tags
 */
export const functionTagList = async (): GetFunctionTagList => await request(ENDPOINT.FunctionTagList) as string[];
