import * as centra from "centra";
import type {
    Endpoint,
    FunctionInfo,
    Intents,
    GetFunctionInfo,
    GetFunctionList,
    GetFunctionTagList,
    FunctionsResponse,
    FindTag,
    RequestType,
    CallbacksResponse,
    GetCallbackTagList,
    FunctionArguments,
    CallbackArguments,
    RawIntents,
    CallbackInfo,
    GetCallbackList,
    GetCallbackInfo,
    PublicAPIRequest
} from "../types/types";
import {
    API,
    ENDPOINT,
    ENDPOINT_PATH,
    INTENTS,
    RAW_INTENTS,
    REQUEST_TYPE
} from "./consts";



async function request<ResponseType>(requestType: RequestType, endpoint: Endpoint, tag?: string): PublicAPIRequest<ResponseType>  {
    let req: centra.Response;
    let data;
    switch (requestType) {
        case REQUEST_TYPE.Functions:
            switch (endpoint) {
                case ENDPOINT.Functions.Info:
                    const functionTag = await findTag(requestType, tag!);
                    if (functionTag) {
                        req = await centra(API + ENDPOINT_PATH.Functions.Info + functionTag).send();
                        data = await req.json();
                    } else {
                        data = undefined;
                    }
                    break;
                case ENDPOINT.Functions.List:
                    req = await centra(API + ENDPOINT_PATH.Functions.List).send();
                    data = await req.json();
                    break;
                case ENDPOINT.Functions.TagList:
                    req = await centra(API + ENDPOINT_PATH.Functions.TagList).send();
                    data = await req.json();
                    break;
            }
            break;
        case REQUEST_TYPE.Callbacks:
            switch (endpoint) {
                case ENDPOINT.Callbacks.Info:
                    const callbackTag = await findTag(requestType, tag!);
                    if (callbackTag) {
                        req = await centra(API + ENDPOINT_PATH.Callbacks.Info + callbackTag).send();
                        data = await req.json();
                    } else {
                        data = undefined;
                    }
                    break;
                case ENDPOINT.Callbacks.List:
                    req = await centra(API + ENDPOINT_PATH.Callbacks.List).send();
                    data = await req.json();
                    break;
                case ENDPOINT.Callbacks.TagList:
                    req = await centra(API + ENDPOINT_PATH.Callbacks.TagList).send();
                    data = await req.json();
                    break;
            }
            break;
    }

    return data;
}

async function findTag(requestType: RequestType, tag: string): FindTag {
    let tags: string[];
    switch (requestType) {
        case REQUEST_TYPE.Functions:
            tags = await functionTagList();
            break;
        case REQUEST_TYPE.Callbacks:
            tags = await callbackTagList();
            break;
    }

    for (const t of tags) {
        if (t.includes(tag)) return t;
    }
}

function intentsSwitcher(functionIntents: number) {
    let intents: Intents = INTENTS.None;
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

function buildInfo(requestType: RequestType, publicAPIResponse: FunctionsResponse | CallbacksResponse): FunctionInfo | CallbackInfo {
    let intents: RawIntents;
    let args: FunctionArguments[] | CallbackArguments[];
    
    switch (requestType) {
        case REQUEST_TYPE.Functions:
            const {
                tag,
                shortDescription,
                premium
            } = publicAPIResponse as FunctionsResponse;
            intents = publicAPIResponse.intents;
            args = <FunctionArguments[]> publicAPIResponse.arguments;
            return <FunctionInfo> {
                tag: tag,
                description: shortDescription,
                args: args,
                intents: intentsSwitcher(intents),
                premium: premium
            };
        case REQUEST_TYPE.Callbacks:
            const {
                name,
                description,
                is_premium
            } = publicAPIResponse as CallbacksResponse;
            intents = publicAPIResponse.intents;
            args = <CallbackArguments[]> publicAPIResponse.arguments;
            return <CallbackInfo> {
                name: name,
                description: description,
                args: args,
                intents: intentsSwitcher(intents),
                premium: is_premium
            };
    }
}

/**
 * 
 * @param functionTag A tag (i.e `$addButton[]`, `$nomention`) of the function. Supports non-completed tags (i.e `$addBu` will be represented as `$addButton[]`)
 * @returns A promise containing information about the specified function. If function wasn't found, returns `undefined`.
 */
export async function functionInfo(functionTag: string): GetFunctionInfo {
    const data = await request<FunctionsResponse>(REQUEST_TYPE.Functions, ENDPOINT.Functions.Info, functionTag);
    if (data) {
        return <FunctionInfo> buildInfo(REQUEST_TYPE.Functions, data);
    } else {
        return;
    }
}
/**
 * 
 * @returns A promise containing an array of functions with their information
 */
export async function functionList(): GetFunctionList {
    const data = await request<FunctionsResponse[]>(REQUEST_TYPE.Functions, ENDPOINT.Functions.List);
    const res: FunctionInfo[] = [];

    for (const functionInfo of data) {
        res.push(<FunctionInfo> buildInfo(REQUEST_TYPE.Functions, functionInfo));
    }
    return res;
}
/**
 * 
 * @returns A promise containing an array of function tags
 */
export const functionTagList = async (): GetFunctionTagList => await request(REQUEST_TYPE.Functions, ENDPOINT.Functions.TagList);

/**
 * 
 * @param callbackTag A tag (i.e `$onJoined[]`, `$onLeave[]`) of the callback. Supports non-completed tags (i.e `$onJo` will be represented as `$onJoined[]`)
 * @returns A promise containing information about the specified callback. If callback wasn't found, returns `undefined`.
 */
export async function callbackInfo(callbackTag: string): GetCallbackInfo {
    const data = await request<CallbacksResponse>(REQUEST_TYPE.Callbacks, ENDPOINT.Callbacks.Info, callbackTag);
    if (data) {
        return <CallbackInfo> buildInfo(REQUEST_TYPE.Callbacks, data);
    } else {
        return;
    }
}
/**
 * 
 * @returns A promise containing an array of callbacks with their information
 */
export async function callbackList(): GetCallbackList {
    const data = await request<CallbacksResponse[]>(REQUEST_TYPE.Callbacks, ENDPOINT.Callbacks.List);
    const res: CallbackInfo[] = [];

    for (const callbackInfo of data) {
        res.push(<CallbackInfo> buildInfo(REQUEST_TYPE.Callbacks, callbackInfo));
    }
    return res;
}
/**
 * 
 * @returns A promise containing an array of callback tags
 */
export const callbackTagList = async (): GetCallbackTagList => await request(REQUEST_TYPE.Callbacks, ENDPOINT.Callbacks.TagList);
