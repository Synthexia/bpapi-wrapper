export const API = 'https://botdesignerdiscord.com/public/api/';
export const NODES = 'https://botdesignerdiscord.com/status';

export const ENDPOINT_PATH = {
    FUNCTION: {
        INFO: 'function/',
        LIST: 'function_list',
        TAG_LIST: 'function_tag_list'
    },
    CALLBACK: {
        INFO: 'callback/',
        LIST: 'callback_list',
        TAG_LIST: 'callback_tag_list'
    }
} as const;
