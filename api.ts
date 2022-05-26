// This file have to be here, because otherwise ProtoGrpcType imports point to a wrong location

import Long from "long";
import * as path from 'path';
import * as g from '@grpc/grpc-js';
import * as p from '@grpc/proto-loader';
import * as utils from './src/utils';

// NOTE: we have to generate types first `npm run build` to have these files
import {ProtoGrpcType as AccountsApiRoot} from "./types/accounts_api";
import {ProtoGrpcType as AssetsApiRoot} from "./types/assets_api";
import {ProtoGrpcType as BlockchainApiRoot} from "./types/blockchain_api";
import {ProtoGrpcType as BlockchainUpdatesApiRoot} from "./types/blockchain_updates";
import {ProtoGrpcType as BlocksApiRoot} from "./types/blocks_api";
import {ProtoGrpcType as TransactionsApiRoot} from "./types/transactions_api";

// Useful FS functionality

export function protoFilesInSubDir(dir: string) {
    return utils.filter(utils.walkSync(dir), (x: string) => x.endsWith('.proto'));
}

export function wavesProtoFiles() {
    return [...protoFilesInSubDir(path.resolve(__dirname, './proto'))];
}

// API definitions

export type Api =
    AccountsApiRoot
    & AssetsApiRoot
    & BlockchainApiRoot
    & BlockchainUpdatesApiRoot
    & BlocksApiRoot
    & TransactionsApiRoot

export const allPackageDefinitions = p.loadSync(
    wavesProtoFiles(),
    {
        longs: Long,
        keepCase: false,
        enums: String,
        defaults: true,
        oneofs: true
    }
);

export const grpcRootObject = (g.loadPackageDefinition(allPackageDefinitions) as any) as Api;

export const apiDefs = grpcRootObject.waves;

// API

export const grpc = {
    defaultChannelCredentials: g.credentials.createInsecure(),
    mkDefaultChannel: (target: string) => {
        return new g.Channel(
            target,
            g.credentials.createInsecure(),
            // https://github.com/grpc/grpc-node/tree/master/packages/grpc-js#supported-channel-options
            {
                'grpc.enable_channelz': 0 // https://github.com/grpc/grpc-node/issues/1941
            }
        );
    }
};

export function mkApi<ConcreteT extends g.Client>(TypeCreator: new(address: string, credentials: g.ChannelCredentials, options: g.ClientOptions) => ConcreteT,
                                                  channel: g.Channel): ConcreteT {
    return new TypeCreator('', grpc.defaultChannelCredentials, {channelOverride: channel});
}

// TypeScript doesn't support curried functions, so we can't write blockchainUpdatesApi: mkApifun(grpc.BlockchainUpdatesApi)
export namespace api.waves {
    export namespace events.grpc {
        export function mkBlockchainUpdatesApi(channel: g.Channel) {
            return mkApi(apiDefs.events.grpc.BlockchainUpdatesApi, channel)
        }
    }
    export namespace node.grpc {
        export function mkAccountsApi(channel: g.Channel) {
            return mkApi(apiDefs.node.grpc.AccountsApi, channel)
        }

        export function mkAssetsApi(channel: g.Channel) {
            return mkApi(apiDefs.node.grpc.AssetsApi, channel)
        }

        export function mkBlockchainApi(channel: g.Channel) {
            return mkApi(apiDefs.node.grpc.BlockchainApi, channel)
        }

        export function mkBlocksApi(channel: g.Channel) {
            return mkApi(apiDefs.node.grpc.BlocksApi, channel)
        }

        export function mkTransactionsApi(channel: g.Channel) {
            return mkApi(apiDefs.node.grpc.TransactionsApi, channel)
        }
    }
}
