export enum Intents {
    None = 'None',
    Members = 'Members',
    Presence = 'Presence'
}

export enum RawIntents {
    None = 0,
    Members = 2,
    Presence = 256
}

export enum FunctionEndpoint {
    Info = 'FunctionInfo',
    List = 'FunctionList',
    TagList = 'FunctionTagList',
}

export enum CallbackEndpoint {
    Info = 'CallbackInfo',
    List = 'CallbackList',
    TagList = 'CallbackTagList'
}

export enum Target {
    Functions = 'Functions',
    Callbacks = 'Callbacks',
    Nodes = 'Nodes'
}
