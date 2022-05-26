// WARNING: this file is generated, do not modify it!
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
    return [...protoFilesInSubDir(path.resolve(__dirname, '../proto'))];
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


import {BoolValue as BoolValue_imported} from './types/./google/protobuf/BoolValue'
import {BytesValue as BytesValue_imported} from './types/./google/protobuf/BytesValue'
import {DoubleValue as DoubleValue_imported} from './types/./google/protobuf/DoubleValue'
import {Empty as Empty_imported} from './types/./google/protobuf/Empty'
import {FloatValue as FloatValue_imported} from './types/./google/protobuf/FloatValue'
import {Int32Value as Int32Value_imported} from './types/./google/protobuf/Int32Value'
import {Int64Value as Int64Value_imported} from './types/./google/protobuf/Int64Value'
import {StringValue as StringValue_imported} from './types/./google/protobuf/StringValue'
import {UInt32Value as UInt32Value_imported} from './types/./google/protobuf/UInt32Value'
import {UInt64Value as UInt64Value_imported} from './types/./google/protobuf/UInt64Value'
import {Amount as Amount_imported} from './types/./waves/Amount'
import {AssetPair as AssetPair_imported} from './types/./waves/AssetPair'
import {_waves_Block_Header as _waves_Block_Header_imported, Block as Block_imported} from './types/./waves/Block'
import {BurnTransactionData as BurnTransactionData_imported} from './types/./waves/BurnTransactionData'
import {CreateAliasTransactionData as CreateAliasTransactionData_imported} from './types/./waves/CreateAliasTransactionData'
import {_waves_DAppMeta_CallableFuncSignature as _waves_DAppMeta_CallableFuncSignature_imported, _waves_DAppMeta_CompactNameAndOriginalNamePair as _waves_DAppMeta_CompactNameAndOriginalNamePair_imported, DAppMeta as DAppMeta_imported} from './types/./waves/DAppMeta'
import {_waves_DataTransactionData_DataEntry as _waves_DataTransactionData_DataEntry_imported, DataTransactionData as DataTransactionData_imported} from './types/./waves/DataTransactionData'
import {ExchangeTransactionData as ExchangeTransactionData_imported} from './types/./waves/ExchangeTransactionData'
import {GenesisTransactionData as GenesisTransactionData_imported} from './types/./waves/GenesisTransactionData'
import {InvokeExpressionTransactionData as InvokeExpressionTransactionData_imported} from './types/./waves/InvokeExpressionTransactionData'
import {_waves_InvokeScriptResult_Call_Argument as _waves_InvokeScriptResult_Call_Argument_imported, _waves_InvokeScriptResult_Burn as _waves_InvokeScriptResult_Burn_imported, _waves_InvokeScriptResult_Call as _waves_InvokeScriptResult_Call_imported, _waves_InvokeScriptResult_ErrorMessage as _waves_InvokeScriptResult_ErrorMessage_imported, _waves_InvokeScriptResult_Invocation as _waves_InvokeScriptResult_Invocation_imported, _waves_InvokeScriptResult_Issue as _waves_InvokeScriptResult_Issue_imported, _waves_InvokeScriptResult_Lease as _waves_InvokeScriptResult_Lease_imported, _waves_InvokeScriptResult_LeaseCancel as _waves_InvokeScriptResult_LeaseCancel_imported, _waves_InvokeScriptResult_Call_Argument_List as _waves_InvokeScriptResult_Call_Argument_List_imported, _waves_InvokeScriptResult_Payment as _waves_InvokeScriptResult_Payment_imported, _waves_InvokeScriptResult_Reissue as _waves_InvokeScriptResult_Reissue_imported, _waves_InvokeScriptResult_SponsorFee as _waves_InvokeScriptResult_SponsorFee_imported, InvokeScriptResult as InvokeScriptResult_imported} from './types/./waves/InvokeScriptResult'
import {InvokeScriptTransactionData as InvokeScriptTransactionData_imported} from './types/./waves/InvokeScriptTransactionData'
import {IssueTransactionData as IssueTransactionData_imported} from './types/./waves/IssueTransactionData'
import {LeaseCancelTransactionData as LeaseCancelTransactionData_imported} from './types/./waves/LeaseCancelTransactionData'
import {LeaseTransactionData as LeaseTransactionData_imported} from './types/./waves/LeaseTransactionData'
import {_waves_MassTransferTransactionData_Transfer as _waves_MassTransferTransactionData_Transfer_imported, MassTransferTransactionData as MassTransferTransactionData_imported} from './types/./waves/MassTransferTransactionData'
import {MicroBlock as MicroBlock_imported} from './types/./waves/MicroBlock'
import {Order as Order_imported} from './types/./waves/Order'
import {PaymentTransactionData as PaymentTransactionData_imported} from './types/./waves/PaymentTransactionData'
import {Recipient as Recipient_imported} from './types/./waves/Recipient'
import {ReissueTransactionData as ReissueTransactionData_imported} from './types/./waves/ReissueTransactionData'
import {SetAssetScriptTransactionData as SetAssetScriptTransactionData_imported} from './types/./waves/SetAssetScriptTransactionData'
import {SetScriptTransactionData as SetScriptTransactionData_imported} from './types/./waves/SetScriptTransactionData'
import {SignedMicroBlock as SignedMicroBlock_imported} from './types/./waves/SignedMicroBlock'
import {SignedTransaction as SignedTransaction_imported} from './types/./waves/SignedTransaction'
import {SponsorFeeTransactionData as SponsorFeeTransactionData_imported} from './types/./waves/SponsorFeeTransactionData'
import {Transaction as Transaction_imported} from './types/./waves/Transaction'
import {TransferTransactionData as TransferTransactionData_imported} from './types/./waves/TransferTransactionData'
import {UpdateAssetInfoTransactionData as UpdateAssetInfoTransactionData_imported} from './types/./waves/UpdateAssetInfoTransactionData'
import {_waves_events_BlockchainUpdated_Append as _waves_events_BlockchainUpdated_Append_imported, _waves_events_BlockchainUpdated_Append_BlockAppend as _waves_events_BlockchainUpdated_Append_BlockAppend_imported, _waves_events_BlockchainUpdated_Append_MicroBlockAppend as _waves_events_BlockchainUpdated_Append_MicroBlockAppend_imported, _waves_events_BlockchainUpdated_Rollback as _waves_events_BlockchainUpdated_Rollback_imported, BlockchainUpdated as BlockchainUpdated_imported} from './types/./waves/events/BlockchainUpdated'
import {_waves_events_StateUpdate_AssetDetails as _waves_events_StateUpdate_AssetDetails_imported, _waves_events_StateUpdate_AssetInfo as _waves_events_StateUpdate_AssetInfo_imported, _waves_events_StateUpdate_AssetDetails_AssetScriptInfo as _waves_events_StateUpdate_AssetDetails_AssetScriptInfo_imported, _waves_events_StateUpdate_AssetStateUpdate as _waves_events_StateUpdate_AssetStateUpdate_imported, _waves_events_StateUpdate_BalanceUpdate as _waves_events_StateUpdate_BalanceUpdate_imported, _waves_events_StateUpdate_DataEntryUpdate as _waves_events_StateUpdate_DataEntryUpdate_imported, _waves_events_StateUpdate_LeaseUpdate as _waves_events_StateUpdate_LeaseUpdate_imported, _waves_events_StateUpdate_LeasingUpdate as _waves_events_StateUpdate_LeasingUpdate_imported, StateUpdate as StateUpdate_imported} from './types/./waves/events/StateUpdate'
import {_waves_events_TransactionMetadata_InvokeScriptMetadata_Argument as _waves_events_TransactionMetadata_InvokeScriptMetadata_Argument_imported, _waves_events_TransactionMetadata_EthereumMetadata as _waves_events_TransactionMetadata_EthereumMetadata_imported, _waves_events_TransactionMetadata_ExchangeMetadata as _waves_events_TransactionMetadata_ExchangeMetadata_imported, _waves_events_TransactionMetadata_InvokeScriptMetadata as _waves_events_TransactionMetadata_InvokeScriptMetadata_imported, _waves_events_TransactionMetadata_LeaseMetadata as _waves_events_TransactionMetadata_LeaseMetadata_imported, _waves_events_TransactionMetadata_InvokeScriptMetadata_Argument_List as _waves_events_TransactionMetadata_InvokeScriptMetadata_Argument_List_imported, _waves_events_TransactionMetadata_MassTransferMetadata as _waves_events_TransactionMetadata_MassTransferMetadata_imported, _waves_events_TransactionMetadata_TransferMetadata as _waves_events_TransactionMetadata_TransferMetadata_imported, TransactionMetadata as TransactionMetadata_imported} from './types/./waves/events/TransactionMetadata'
import {BlockchainUpdatesApiClient as BlockchainUpdatesApiClient_imported, BlockchainUpdatesApiHandlers as BlockchainUpdatesApiHandlers_imported, BlockchainUpdatesApiDefinition as BlockchainUpdatesApiDefinition_imported} from './types/./waves/events/grpc/BlockchainUpdatesApi'
import {GetBlockUpdateRequest as GetBlockUpdateRequest_imported} from './types/./waves/events/grpc/GetBlockUpdateRequest'
import {GetBlockUpdateResponse as GetBlockUpdateResponse_imported} from './types/./waves/events/grpc/GetBlockUpdateResponse'
import {GetBlockUpdatesRangeRequest as GetBlockUpdatesRangeRequest_imported} from './types/./waves/events/grpc/GetBlockUpdatesRangeRequest'
import {GetBlockUpdatesRangeResponse as GetBlockUpdatesRangeResponse_imported} from './types/./waves/events/grpc/GetBlockUpdatesRangeResponse'
import {SubscribeEvent as SubscribeEvent_imported} from './types/./waves/events/grpc/SubscribeEvent'
import {SubscribeRequest as SubscribeRequest_imported} from './types/./waves/events/grpc/SubscribeRequest'
import {AccountRequest as AccountRequest_imported} from './types/./waves/node/grpc/AccountRequest'
import {AccountsApiClient as AccountsApiClient_imported, AccountsApiHandlers as AccountsApiHandlers_imported, AccountsApiDefinition as AccountsApiDefinition_imported} from './types/./waves/node/grpc/AccountsApi'
import {ActivationStatusRequest as ActivationStatusRequest_imported} from './types/./waves/node/grpc/ActivationStatusRequest'
import {ActivationStatusResponse as ActivationStatusResponse_imported} from './types/./waves/node/grpc/ActivationStatusResponse'
import {AssetInfoResponse as AssetInfoResponse_imported} from './types/./waves/node/grpc/AssetInfoResponse'
import {AssetRequest as AssetRequest_imported} from './types/./waves/node/grpc/AssetRequest'
import {AssetsApiClient as AssetsApiClient_imported, AssetsApiHandlers as AssetsApiHandlers_imported, AssetsApiDefinition as AssetsApiDefinition_imported} from './types/./waves/node/grpc/AssetsApi'
import {_waves_node_grpc_BalanceResponse_WavesBalances as _waves_node_grpc_BalanceResponse_WavesBalances_imported, BalanceResponse as BalanceResponse_imported} from './types/./waves/node/grpc/BalanceResponse'
import {BalancesRequest as BalancesRequest_imported} from './types/./waves/node/grpc/BalancesRequest'
import {BaseTargetResponse as BaseTargetResponse_imported} from './types/./waves/node/grpc/BaseTargetResponse'
import {BlockRangeRequest as BlockRangeRequest_imported} from './types/./waves/node/grpc/BlockRangeRequest'
import {BlockRequest as BlockRequest_imported} from './types/./waves/node/grpc/BlockRequest'
import {BlockWithHeight as BlockWithHeight_imported} from './types/./waves/node/grpc/BlockWithHeight'
import {BlockchainApiClient as BlockchainApiClient_imported, BlockchainApiHandlers as BlockchainApiHandlers_imported, BlockchainApiDefinition as BlockchainApiDefinition_imported} from './types/./waves/node/grpc/BlockchainApi'
import {BlocksApiClient as BlocksApiClient_imported, BlocksApiHandlers as BlocksApiHandlers_imported, BlocksApiDefinition as BlocksApiDefinition_imported} from './types/./waves/node/grpc/BlocksApi'
import {CalculateFeeResponse as CalculateFeeResponse_imported} from './types/./waves/node/grpc/CalculateFeeResponse'
import {DataEntryResponse as DataEntryResponse_imported} from './types/./waves/node/grpc/DataEntryResponse'
import {DataRequest as DataRequest_imported} from './types/./waves/node/grpc/DataRequest'
import {FeatureActivationStatus as FeatureActivationStatus_imported} from './types/./waves/node/grpc/FeatureActivationStatus'
import {InvokeScriptResultResponse as InvokeScriptResultResponse_imported} from './types/./waves/node/grpc/InvokeScriptResultResponse'
import {LeaseResponse as LeaseResponse_imported} from './types/./waves/node/grpc/LeaseResponse'
import {NFTRequest as NFTRequest_imported} from './types/./waves/node/grpc/NFTRequest'
import {NFTResponse as NFTResponse_imported} from './types/./waves/node/grpc/NFTResponse'
import {ScoreResponse as ScoreResponse_imported} from './types/./waves/node/grpc/ScoreResponse'
import {ScriptData as ScriptData_imported} from './types/./waves/node/grpc/ScriptData'
import {SignRequest as SignRequest_imported} from './types/./waves/node/grpc/SignRequest'
import {TransactionResponse as TransactionResponse_imported} from './types/./waves/node/grpc/TransactionResponse'
import {TransactionStatus as TransactionStatus_imported} from './types/./waves/node/grpc/TransactionStatus'
import {TransactionsApiClient as TransactionsApiClient_imported, TransactionsApiHandlers as TransactionsApiHandlers_imported, TransactionsApiDefinition as TransactionsApiDefinition_imported} from './types/./waves/node/grpc/TransactionsApi'
import {TransactionsByIdRequest as TransactionsByIdRequest_imported} from './types/./waves/node/grpc/TransactionsByIdRequest'
import {TransactionsRequest as TransactionsRequest_imported} from './types/./waves/node/grpc/TransactionsRequest'
export namespace api {
export namespace google {
export namespace protobuf {export type BoolValue = BoolValue_imported;
export type BytesValue = BytesValue_imported;
export type DoubleValue = DoubleValue_imported;
export type Empty = Empty_imported;
export type FloatValue = FloatValue_imported;
export type Int32Value = Int32Value_imported;
export type Int64Value = Int64Value_imported;
export type StringValue = StringValue_imported;
export type UInt32Value = UInt32Value_imported;
export type UInt64Value = UInt64Value_imported;
}
}
export namespace waves {export type Amount = Amount_imported;
export type AssetPair = AssetPair_imported;
export type Block_Header = _waves_Block_Header_imported;
export type Block = Block_imported;
export type BurnTransactionData = BurnTransactionData_imported;
export type CreateAliasTransactionData = CreateAliasTransactionData_imported;
export type DAppMeta_CallableFuncSignature = _waves_DAppMeta_CallableFuncSignature_imported;
export type DAppMeta_CompactNameAndOriginalNamePair = _waves_DAppMeta_CompactNameAndOriginalNamePair_imported;
export type DAppMeta = DAppMeta_imported;
export type DataTransactionData_DataEntry = _waves_DataTransactionData_DataEntry_imported;
export type DataTransactionData = DataTransactionData_imported;
export type ExchangeTransactionData = ExchangeTransactionData_imported;
export type GenesisTransactionData = GenesisTransactionData_imported;
export type InvokeExpressionTransactionData = InvokeExpressionTransactionData_imported;
export type InvokeScriptResult_Call_Argument = _waves_InvokeScriptResult_Call_Argument_imported;
export type InvokeScriptResult_Burn = _waves_InvokeScriptResult_Burn_imported;
export type InvokeScriptResult_Call = _waves_InvokeScriptResult_Call_imported;
export type InvokeScriptResult_ErrorMessage = _waves_InvokeScriptResult_ErrorMessage_imported;
export type InvokeScriptResult_Invocation = _waves_InvokeScriptResult_Invocation_imported;
export type InvokeScriptResult_Issue = _waves_InvokeScriptResult_Issue_imported;
export type InvokeScriptResult_Lease = _waves_InvokeScriptResult_Lease_imported;
export type InvokeScriptResult_LeaseCancel = _waves_InvokeScriptResult_LeaseCancel_imported;
export type InvokeScriptResult_Call_Argument_List = _waves_InvokeScriptResult_Call_Argument_List_imported;
export type InvokeScriptResult_Payment = _waves_InvokeScriptResult_Payment_imported;
export type InvokeScriptResult_Reissue = _waves_InvokeScriptResult_Reissue_imported;
export type InvokeScriptResult_SponsorFee = _waves_InvokeScriptResult_SponsorFee_imported;
export type InvokeScriptResult = InvokeScriptResult_imported;
export type InvokeScriptTransactionData = InvokeScriptTransactionData_imported;
export type IssueTransactionData = IssueTransactionData_imported;
export type LeaseCancelTransactionData = LeaseCancelTransactionData_imported;
export type LeaseTransactionData = LeaseTransactionData_imported;
export type MassTransferTransactionData_Transfer = _waves_MassTransferTransactionData_Transfer_imported;
export type MassTransferTransactionData = MassTransferTransactionData_imported;
export type MicroBlock = MicroBlock_imported;
export type Order = Order_imported;
export type PaymentTransactionData = PaymentTransactionData_imported;
export type Recipient = Recipient_imported;
export type ReissueTransactionData = ReissueTransactionData_imported;
export type SetAssetScriptTransactionData = SetAssetScriptTransactionData_imported;
export type SetScriptTransactionData = SetScriptTransactionData_imported;
export type SignedMicroBlock = SignedMicroBlock_imported;
export type SignedTransaction = SignedTransaction_imported;
export type SponsorFeeTransactionData = SponsorFeeTransactionData_imported;
export type Transaction = Transaction_imported;
export type TransferTransactionData = TransferTransactionData_imported;
export type UpdateAssetInfoTransactionData = UpdateAssetInfoTransactionData_imported;
}
export namespace waves {
export namespace events {export type BlockchainUpdated_Append = _waves_events_BlockchainUpdated_Append_imported;
export type BlockchainUpdated_Append_BlockAppend = _waves_events_BlockchainUpdated_Append_BlockAppend_imported;
export type BlockchainUpdated_Append_MicroBlockAppend = _waves_events_BlockchainUpdated_Append_MicroBlockAppend_imported;
export type BlockchainUpdated_Rollback = _waves_events_BlockchainUpdated_Rollback_imported;
export type BlockchainUpdated = BlockchainUpdated_imported;
export type StateUpdate_AssetDetails = _waves_events_StateUpdate_AssetDetails_imported;
export type StateUpdate_AssetInfo = _waves_events_StateUpdate_AssetInfo_imported;
export type StateUpdate_AssetDetails_AssetScriptInfo = _waves_events_StateUpdate_AssetDetails_AssetScriptInfo_imported;
export type StateUpdate_AssetStateUpdate = _waves_events_StateUpdate_AssetStateUpdate_imported;
export type StateUpdate_BalanceUpdate = _waves_events_StateUpdate_BalanceUpdate_imported;
export type StateUpdate_DataEntryUpdate = _waves_events_StateUpdate_DataEntryUpdate_imported;
export type StateUpdate_LeaseUpdate = _waves_events_StateUpdate_LeaseUpdate_imported;
export type StateUpdate_LeasingUpdate = _waves_events_StateUpdate_LeasingUpdate_imported;
export type StateUpdate = StateUpdate_imported;
export type TransactionMetadata_InvokeScriptMetadata_Argument = _waves_events_TransactionMetadata_InvokeScriptMetadata_Argument_imported;
export type TransactionMetadata_EthereumMetadata = _waves_events_TransactionMetadata_EthereumMetadata_imported;
export type TransactionMetadata_ExchangeMetadata = _waves_events_TransactionMetadata_ExchangeMetadata_imported;
export type TransactionMetadata_InvokeScriptMetadata = _waves_events_TransactionMetadata_InvokeScriptMetadata_imported;
export type TransactionMetadata_LeaseMetadata = _waves_events_TransactionMetadata_LeaseMetadata_imported;
export type TransactionMetadata_InvokeScriptMetadata_Argument_List = _waves_events_TransactionMetadata_InvokeScriptMetadata_Argument_List_imported;
export type TransactionMetadata_MassTransferMetadata = _waves_events_TransactionMetadata_MassTransferMetadata_imported;
export type TransactionMetadata_TransferMetadata = _waves_events_TransactionMetadata_TransferMetadata_imported;
export type TransactionMetadata = TransactionMetadata_imported;
}
}
export namespace waves {
export namespace events {
export namespace grpc {export type BlockchainUpdatesApiClient = BlockchainUpdatesApiClient_imported;
export type BlockchainUpdatesApiHandlers = BlockchainUpdatesApiHandlers_imported;
export type BlockchainUpdatesApiDefinition = BlockchainUpdatesApiDefinition_imported;
export type GetBlockUpdateRequest = GetBlockUpdateRequest_imported;
export type GetBlockUpdateResponse = GetBlockUpdateResponse_imported;
export type GetBlockUpdatesRangeRequest = GetBlockUpdatesRangeRequest_imported;
export type GetBlockUpdatesRangeResponse = GetBlockUpdatesRangeResponse_imported;
export type SubscribeEvent = SubscribeEvent_imported;
export type SubscribeRequest = SubscribeRequest_imported;
}
}
}
export namespace waves {
export namespace node {
export namespace grpc {export type AccountRequest = AccountRequest_imported;
export type AccountsApiClient = AccountsApiClient_imported;
export type AccountsApiHandlers = AccountsApiHandlers_imported;
export type AccountsApiDefinition = AccountsApiDefinition_imported;
export type ActivationStatusRequest = ActivationStatusRequest_imported;
export type ActivationStatusResponse = ActivationStatusResponse_imported;
export type AssetInfoResponse = AssetInfoResponse_imported;
export type AssetRequest = AssetRequest_imported;
export type AssetsApiClient = AssetsApiClient_imported;
export type AssetsApiHandlers = AssetsApiHandlers_imported;
export type AssetsApiDefinition = AssetsApiDefinition_imported;
export type BalanceResponse_WavesBalances = _waves_node_grpc_BalanceResponse_WavesBalances_imported;
export type BalanceResponse = BalanceResponse_imported;
export type BalancesRequest = BalancesRequest_imported;
export type BaseTargetResponse = BaseTargetResponse_imported;
export type BlockRangeRequest = BlockRangeRequest_imported;
export type BlockRequest = BlockRequest_imported;
export type BlockWithHeight = BlockWithHeight_imported;
export type BlockchainApiClient = BlockchainApiClient_imported;
export type BlockchainApiHandlers = BlockchainApiHandlers_imported;
export type BlockchainApiDefinition = BlockchainApiDefinition_imported;
export type BlocksApiClient = BlocksApiClient_imported;
export type BlocksApiHandlers = BlocksApiHandlers_imported;
export type BlocksApiDefinition = BlocksApiDefinition_imported;
export type CalculateFeeResponse = CalculateFeeResponse_imported;
export type DataEntryResponse = DataEntryResponse_imported;
export type DataRequest = DataRequest_imported;
export type FeatureActivationStatus = FeatureActivationStatus_imported;
export type InvokeScriptResultResponse = InvokeScriptResultResponse_imported;
export type LeaseResponse = LeaseResponse_imported;
export type NFTRequest = NFTRequest_imported;
export type NFTResponse = NFTResponse_imported;
export type ScoreResponse = ScoreResponse_imported;
export type ScriptData = ScriptData_imported;
export type SignRequest = SignRequest_imported;
export type TransactionResponse = TransactionResponse_imported;
export type TransactionStatus = TransactionStatus_imported;
export type TransactionsApiClient = TransactionsApiClient_imported;
export type TransactionsApiHandlers = TransactionsApiHandlers_imported;
export type TransactionsApiDefinition = TransactionsApiDefinition_imported;
export type TransactionsByIdRequest = TransactionsByIdRequest_imported;
export type TransactionsRequest = TransactionsRequest_imported;
}
}
}}
