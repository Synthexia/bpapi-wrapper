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
    Function: 'function',
    FunctionList: 'functionList',
    FunctionTagList: 'functionTagList'
});
export const ENDPOINT_PATH = Object.freeze({
    Function: 'function/',
    FunctionList: 'function_list',
    FunctionTagList: 'function_tag_list'
});