import {
    type Function,
    type Callback,
    type Node,
    Functions,
    Callbacks
} from ".";
import { Intents, RawIntents, Target } from "./enums";

export async function findTag(target: Target.Functions | Target.Callbacks, tag: string): Promise<string | undefined> {
    let tags: string[];

    switch (target) {
        case Target.Functions:
            tags = await Functions.tagList();
            break;
        case Target.Callbacks:
            tags = await Callbacks.tagList();
            break;
    }

    for (const t of tags) {
        if (t.includes(tag)) return t;
    }
}

export function intentsSwitcher(raw: RawIntents): Intents {
    switch (raw) {
        case RawIntents.Presence:
            return Intents.Presence;
        case RawIntents.Members:
            return Intents.Members;
        default:
            return Intents.None;
    }
}

export function buildInfo(params: {
    target: Target.Functions,
    response: Function.Response
}): Function.Info;
export function buildInfo(params: {
    target: Target.Callbacks,
    response: Callback.Response
}): Callback.Info;

export function buildInfo(
    params:
        | { target: Target.Functions, response: Function.Response }
        | { target: Target.Callbacks, response: Callback.Response }
) {
    switch (params.target) {
        case Target.Functions:
            const {
                tag,
                shortDescription,
                premium,
                intents: functionIntents,
                arguments: functionArgs
            } = params.response;

            return <Function.Info> {
                tag,
                description: shortDescription,
                args: functionArgs,
                intents: intentsSwitcher(functionIntents),
                premium
            };
        case Target.Callbacks:
            const {
                name,
                description,
                is_premium,
                intents: callbackIntents,
                arguments: callbackArgs
            } = params.response;

            return <Callback.Info> {
                name,
                description,
                args: callbackArgs,
                intents: intentsSwitcher(callbackIntents),
                premium: is_premium
            };
    }
}

export function parseBody(bodyElementChildren: HTMLCollection): Node.Stats {
    const [serverIdElement, botCountElement, pingElement, statusElement] = bodyElementChildren;

    const nodeId = serverIdElement.textContent!;
    const botCount = botCountElement.textContent!;
    const ping = pingElement.textContent!;
    const status = statusElement.textContent!
        .replaceAll('\n', '')
        .replaceAll('\t', '')
        .replaceAll(' ', '');

    return <Node.Stats> {
        nodeId,
        text: `Server #${nodeId} is ${status} (${ping}): ${botCount} bots online`,
        rawStats: { botCount, ping, status }
    };
}
