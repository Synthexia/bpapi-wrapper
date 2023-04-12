export const API = 'https://botdesignerdiscord.com/public/api/';
export const INTENTS = Object.freeze({
    Members: 'Members',
    Presence: 'Presence',
    None: 'None'
});
export const RAW_INTENTS = Object.freeze({
    Members: 2,
    Presence: 256,
    None: 0
});
export const ENDPOINT = Object.freeze({
    Functions: {
        Info: 'function' as 'function',
        List: 'functionList' as 'functionList',
        TagList: 'functionTagList' as 'functionTagList'
    },
    Callbacks: {
        Info: 'callback' as 'callback',
        List: 'callbackList' as 'callbackList',
        TagList: 'callbackTagList' as 'callbackTagList'
    }
});
export const ENDPOINT_PATH = Object.freeze({
    Functions: {
        Info: 'function/',
        List: 'function_list',
        TagList: 'function_tag_list'
    },
    Callbacks: {
        Info: 'callback/',
        List: 'callback_list',
        TagList: 'callback_tag_list'
    }
});
export const REQUEST_TYPE = Object.freeze({
    Functions: 'functions',
    Callbacks: 'callbacks'
});