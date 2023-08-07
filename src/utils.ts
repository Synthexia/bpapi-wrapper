import { Functions, Callbacks } from ".";
import { Intents, RawIntents, type Callback, type Function, type Node, Target } from "../types/types";

export async function findTag(target: Target, tag: string) {
    let tags: string[];

    switch (target) {
        case Target.Functions:
            tags = ( <string[]> await Functions.tagList() )!;
            break;
        case Target.Callbacks:
            tags = ( <string[]> await Callbacks.tagList() )!;
            break;
    }

    for (const t of tags!) {
        if (t.includes(tag)) return t;
    }
}

export function intentsSwitcher(raw: number) {
    switch (raw) {
        case RawIntents.Presence:
            return Intents.Presence;
        case RawIntents.Members:
            return Intents.Members;
        default:
            return Intents.None;
    }
}

/**
 * 
 * @param target `Target.Nodes` isn't used here. `Target.Callbacks` by default.
 */
export function buildInfo(response: Function.Response | Callback.Response, target?: Target) {
    switch (target) {
        case Target.Functions:
            const { tag, shortDescription, premium, intents: functionIntents, arguments: functionArgs } = <Function.Response> response;

            return <Function.Info> {
                tag,
                description: shortDescription,
                args: functionArgs,
                intents: intentsSwitcher(functionIntents),
                premium
            };
        default:
            const { name, description, is_premium, intents: callbackIntents, arguments: callbackArgs} = <Callback.Response> response;

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

    return {
        nodeId,
        text: `Server #${nodeId} is ${status} (${ping}): ${botCount} bots online`,
        rawStats: { botCount, ping, status }
    };
}
