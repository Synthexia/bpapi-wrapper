export const API = 'https://botdesignerdiscord.com/public/api/';
export const NODES = 'https://botdesignerdiscord.com/status';

export const ENDPOINT_PATH = {
    Function: {
        Info: 'function/',
        List: 'function_list',
        TagList: 'function_tag_list'
    },
    Callback: {
        Info: 'callback/',
        List: 'callback_list',
        TagList: 'callback_tag_list'
    }
} as const;
