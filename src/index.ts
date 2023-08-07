import * as centra from "centra";
import { JSDOM } from "jsdom";

import { API, ENDPOINT_PATH, NODES } from "./consts";
import { buildInfo, findTag, parseBody } from "./utils";
import { CallbackEndpoint, FunctionEndpoint, Target, type Callback, type Function, type Node } from "../types/types";

class Request {
    public static async functions(params: {
        endpoint: FunctionEndpoint,
        tag?: string
    }) {
        switch (params.endpoint) {
            case FunctionEndpoint.Info:
                const tag = await findTag(Target.Functions, params.tag!);
                if (!tag) return;

                return await (
                    await centra(API + ENDPOINT_PATH.Function.Info + tag).send()
                ).json();
            case FunctionEndpoint.List:
                return await (
                    await centra(API + ENDPOINT_PATH.Function.List).send()
                ).json();
            case FunctionEndpoint.TagList:
                return await (
                    await centra(API + ENDPOINT_PATH.Function.TagList).send()
                ).json();
        }
    }

    public static async callbacks(params: {
        endpoint: CallbackEndpoint,
        tag?: string
    }) {
        switch (params.endpoint) {
            case CallbackEndpoint.Info:
                const tag = await findTag(Target.Callbacks, params.tag!);
                if (!tag) return;

                return await (
                    await centra(API + ENDPOINT_PATH.Callback.Info + tag).send()
                ).json();
            case CallbackEndpoint.List:
                return await (
                    await centra(API + ENDPOINT_PATH.Callback.List).send()
                ).json();
            case CallbackEndpoint.TagList:
                return await (
                    await centra(API + ENDPOINT_PATH.Callback.TagList).send()
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
    public static async list(): Promise<Node.List[]> {
        const html = await Request.nodes();
        const document = new JSDOM(html).window.document;

        const [defaultTable, highPerfTable] = document.getElementsByClassName('uk-table');

        const [dtCaptionElement, _dtTHeadElement, dtTBodyElement] = defaultTable.children;
        const [hptCaptionElement, _hptTHeadElement, hptTBodyElement] = highPerfTable.children;

        const dtCaption = dtCaptionElement.textContent!;
        const hptCaption = hptCaptionElement.textContent!;

        const dtBody = [];
        const hptBody = [];

        for (const element of dtTBodyElement.children) dtBody.push( parseBody(element.children) );
        for (const element of hptTBodyElement.children) hptBody.push( parseBody(element.children) );

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
        const data = <Function.Response | undefined> await Request.functions({ endpoint: FunctionEndpoint.Info, tag });
        if (!data) return;

        return <Function.Info> buildInfo(data, Target.Functions);
    }

    /**
     * Get the information about all functions
     * 
     * @returns An array of objects containing information about all functions
     */
    public static async list(): Promise<Function.Info[]> {
        const data = <Function.Response[]> await Request.functions({ endpoint: FunctionEndpoint.List });
        const functionList: Function.Info[] = [];

        for (const f of data) functionList.push( <Function.Info> buildInfo(f, Target.Functions));

        return functionList;
    }

    /**
     * Get the tags of all functions
     * 
     * @returns An array of strings containing the tags of all functions
     */
    public static async tagList(): Promise<string[]> {
        return <string[]> await Request.functions({ endpoint: FunctionEndpoint.TagList });
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
        const data = <Callback.Response | undefined> await Request.callbacks({ endpoint: CallbackEndpoint.Info , tag });
        if (!data) return;

        return <Callback.Info> buildInfo(data);
    }

    /**
     * Get the information about all callbacks
     * 
     * @returns An array of objects containing information about all callbacks
     */
    public static async list(): Promise<Callback.Info[]> {
        const data = <Callback.Response[]> await Request.callbacks({ endpoint: CallbackEndpoint.List });
        const callbackList: Callback.Info[] = [];

        for (const c of data) callbackList.push( <Callback.Info> buildInfo(c));

        return callbackList;
    }

    /**
     * Get the tags of all callbacks
     * 
     * @returns An array of strings containing the tags of all callbacks
     */
    public static async tagList(): Promise<string[]> {
        return <string[]> await Request.callbacks({ endpoint: CallbackEndpoint.TagList });
    }
}
