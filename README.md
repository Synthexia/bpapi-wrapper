
<div align="center">

# BPAPI

[![NPM: Version](https://img.shields.io/npm/v/@nightnutsky/bpapi?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@nightnutsky/bpapi)
[![GitHub: Stars](https://img.shields.io/github/stars/NightNutSky/bpapi?logo=github&style=for-the-badge)](https://github.com/NightNutSky/bpapi/stargazers)
[![GitHub: Source Code](https://img.shields.io/badge/Source%20Code-GitHub-green?logo=github&style=for-the-badge)](https://github.com/NightNutSky/bpapi)

BPAPI allows you to work with [BDFD](https://botdesignerdiscord.com) [Public API](https://nilpointer-software.github.io/bdfd-wiki/nightly/resources/api.html) more easier and pretty!

</div>


# Install
```sh
npm i @nightnutsky/bpapi
```

# Get Started
To get started, you should import/require BPAPI:
- JavaScript
    - Require all functions:
        ```js
        const bpapi = require("@nightnutsky/bpapi");
        ```
    - Require particular function(s):
        ```js
        const { functionInfo } = require("@nightnutsky/bpapi");
        ```
- TypeScript (Recommended to use)
    - Import all functions:
        ```ts
        import * as bpapi from "@nightnutsky/bpapi";
        ```
    - Import particular function(s):
        ```ts
        import { functionInfo } from "@nightnutsky/bpapi";
        ```
## Some Code Examples

### BDFD Functions

```ts
functionInfo('$replaceT').then(info => {
    if (info) {
        const {
            description,
            intents,
            tag
        } = info;
        someFunction(RESPONSE.Success, `The function with the \`${tag}\` tag has the following description: \`${description}\` and requires ${intents} intents.`);
    } else {
        someFunction(RESPONSE.Fail, 'Could not find the function!');
    }
});
```

### BDFD Callbacks

```ts
callbackInfo('$onJ').then(info => {
    if (info) {
        const {
            name
        } = info;
        const premium = info.premium ? 'requires' : "doesn't require";
        someFunction(RESPONSE.Success, `The callback with the \`${name}\` name ${premium} premium hosting time.`);
    } else {
        someFunction(RESPONSE.Fail, 'Could not find the callback!');
    }
});
```

## TypeScript Specials
If you ever worked with TypeScript, then you know that you can (and sometimes must) assign types for your consts, etc.

### Types For BDFD Public API
If you want to work with plain BDFD Public API, for example, do request to endpoints  yourself, BPAPI can help you using types.

Currently, BPAPI has types for request's responses - `FunctionsResponse` and `CallbacksResponse`.

#### `FunctionsResponse`

![FunctionsResponse](https://user-images.githubusercontent.com/70456337/231560564-e590a2e4-5b40-4ee3-a39d-f41362c98e1f.png)

#### `CallbacksResponse`

![CallbacksResponse](https://user-images.githubusercontent.com/70456337/231560588-3c6fd4c7-e0da-4818-89c1-d99b5b8d4a2b.png)

### Types For Enums

As you should know, some BDScript functions have arguments and these arguments have enums.\
BPAPI will help to work with them as well. While retrieving the argument's enums, you can assign one of the [types](#types) to it.

```ts
functionInfo('$addB').then(info => {
    if (info && info.args) {
        for (const arg of info.args) {
            if (arg.enumData) {
                const enums: AddButtonEnums = arg.enumData;
                // ^ ["primary", "secondary", "success", "danger", "link"]
            }
        }
    }
});
```

#### Types
|           Name             |        Example Function     |
| :------------------------: | :-------------------------: |
| AddButtonEnums             | `$addButton[]`              |
| ModalEnums                 | `$addTextInput[]`           |
| CategoryEnums              | `$categoryChannels[]`       |
| ChannelEnums               | `$createChannel[]`          |
| EditButtonEnums            | `$editButton[]`             |
| ErrorEnums                 | `$error[]`                  |
| CooldownEnums              | `$getCooldown[]`            |
| EmbedDataEnums             | `$getEmbedData[]`           |
| InviteInfoEnums            | `$getInviteInfo[]`          |
| LeaderboardTypeEnums       | `$getLeaderboardValue[]`*   |
| SortEnums                  | `$getLeaderboardValue[]`**  |
| LeaderboardReturnTypeEnums | `$getLeaderboardValue[]`*** |
| MessageDataEnums           | `$getMessage[]`             |
| TimestampEnums             | `$getTimestamp[]`           |
| MembersCountEnums          | `$membersCount[]`           |
| UrlEnums                   | `$url[]`                    |
| VariablesCountEnums        | `$variablesCount[]`         |

> \* - The `Variable type` argument of the function.\
> \*\* - The `Sort` argument of the function.\
> \*\*\* - The `Return type` argument of the function.
