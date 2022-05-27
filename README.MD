# About
Waves protobuf schemas repository

# How to use
## Java
Add dependency to your `pom.xml`
```xml
<dependency>
    <groupId>com.wavesplatform</groupId>
    <artifactId>protobuf-schemas</artifactId>
    <version>{version}</version>
</dependency>
```
## ScalaPB
1. Add dependency to your `build.sbt`: 
```scala
libraryDependencies += "com.wavesplatform" % "protobuf-schemas" % "{version}" % "protobuf-src" intransitive()
```
2. Configure ScalaPB to compile external schemas with:
```scala
inConfig(Compile)(Seq(
   PB.protoSources in Compile := Seq(PB.externalIncludePath.value),
   includeFilter in PB.generate := new SimpleFileFilter((f: File) => f.getName.endsWith(".proto") && f.getParent.endsWith("waves")),
   PB.targets += scalapb.gen(flatPackage = true) -> sourceManaged.value
 ))
```
3. If you use SNAPSHOT version, add this line
```scala
resolvers += Resolver.sonatypeRepo("snapshots")
```
See [ScalaPB docs](https://scalapb.github.io/docs/third-party-protos) for more info.
## TypeScript / JavaScript

Npm package: `@waves/protobuf-serialization`.

It contains generated JavaScript classes, TypeScript definitions as well as raw proto files. 
We use:
* `@grpc/proto-loader` to load proto-files and the embedded app `proto-loader-gen-types` to generate definitions;
* `@grpc/grpc-js` to request the data from Waves Node gRPC API;
* `long.js` to represent 64-bit integers: `int64`, `uint64`, etc.

You could also make your own custom build from raw `.proto` files, for example, if you want to use only a subset of proto schemas or gRPC services. 
They can be found in `@waves/protobuf-serialization/proto` directory.

### Example

1. `npm install --save @wavesplatform/protobuf-schemas bs58`
2. Default build usage with TypeScript:
    ```typescript
    import * as w from '@waves/protobuf-serialization'
    import b58 from 'bs58'
    
    const channel = w.grpc.mkDefaultChannel('grpc.wavesnodes.com:6870')
    
    const transactionsApi = w.api.waves.node.grpc.mkTransactionsApi(channel)
    const txnId = '287XcMXPDY7pnw2tECbV86TZetPi2x9JBg9BVUsGaSJx';
    transactionsApi
        .getTransactions({transactionIds: [b58.decode(txnId)]})
        .on("data", (item: w.api.waves.node.grpc.TransactionResponse) => console.log(`[getTransactions] The transaction '${txnId}' was on height of ${item.height}`))
        .on("end", () => console.log("[getTransactions] Stream ended"))
        .on("error", (e: Error) => console.error("[getTransactions] Failed", e))
    
    const accountsApi = w.api.waves.node.grpc.mkAccountsApi(channel)
    const alias = 'likli'
    accountsApi.resolveAlias(
        {value: alias},
        (error, response) => {
            if (error === null) {
                const addressBytes = response?.value || new Buffer(0);
                console.log(`[resolveAlias] The address of '${alias}' is ${b58.encode(addressBytes)}`)
            } else console.error(`[resolveAlias] Can't determine address of '${alias}'`, error)
        }
    )
    
    const blocksApi = w.api.waves.node.grpc.mkBlocksApi(channel)
    blocksApi.getBlock(
        {height: 1},
        (error, response) => {
            if (error === null) {
                const signatureBytes = response?.block?.signature || new Buffer(0);
                console.log(`[getBlock] The signature of block 1 is ${b58.encode(signatureBytes)}`)
            } else console.error("[getBlock] Can't get a block 1", error)
        }
    )
    ```
    
    With JavaScript looks similar:
    ```javascript
    const w = require('@waves/protobuf-serialization');
    const b58 = require('bs58');
    
    const channel = w.grpc.mkDefaultChannel('grpc.wavesnodes.com:6870')
    
    const transactionsApi = w.api.waves.node.grpc.mkTransactionsApi(channel)
    const txnId = '287XcMXPDY7pnw2tECbV86TZetPi2x9JBg9BVUsGaSJx';
    transactionsApi
        .getTransactions({transactionIds: [b58.decode(txnId)]})
        .on("data", (item) => console.log(`[getTransactions] The transaction '${txnId}' was on height of ${item.height}`))
        .on("end", () => console.log("[getTransactions] Stream ended"))
        .on("error", (e) => console.error("[getTransactions] Failed", e))
    ```

## C#
1. Add `App.config`, `packages.config` to your C# solution 
2. Add 
```
  <ItemGroup>
    <Protobuf Include="proto\waves\*.proto" OutputDir="waves\%(RelativePath)" GrpcServices="None" />
    <Protobuf Include="proto\waves\events\*.proto" OutputDir="waves\events\%(RelativePath)" GrpcServices="None" />
    <Protobuf Include="proto\waves\node\grpc\*.proto" OutputDir="waves\node\grpc\%(RelativePath)" GrpcServices="Both" />
  </ItemGroup>
```
to your `.csproj` file. After this just build your project.

or as alternative you can use util protoc, for example:
``` protoc --csharp_out=RelativePath  --proto_path=RelativePathToProtoDir RelativePathToProtoFile```

Also there is a NuGet package WavesPlatform.ProtobufSchema with this project.

## Rust
Add dependency to your `Cargo.toml`
```toml
[dependencies]
waves-protobuf-schemas = { git = "https://github.com/wavesplatform/protobuf-schemas" }
```

# How to generate sources locally

## Java
Use `mvn package` to create JAR artifacts:
1. `protobuf-schemas-{version}-protobuf-src.jar` - raw .proto files
2. `protobuf-schemas-{version}.jar` - protoc-generated Java classes

## Python
Generating python sources requires python 3 or later. Run the following commands from the root of this repository to generate python sources in `/target/python`:
```
python3 -m venv .venv
. .venv/bin/activate
pip install grpcio grpcio-tools base58
git clone https://github.com/wavesplatform/protobuf-schemas.git
python -m grpc_tools.protoc --proto_path=./protobuf-schemas/proto --python_out=. --python_grpc_out=. `find ./protobuf-schemas/proto -type f`
```
Tweak `--python_out` and `--python_grpc_out` parameters to generate files elsewhere. Target path should likely be absolute. Now you can use generated classes:
```python
import grpc
from waves.events.grpc.blockchain_updates_pb2_grpc import BlockchainUpdatesApiStub
from waves.events.grpc.blockchain_updates_pb2 import SubscribeRequest
from base58 import b58encode, b58decode

def asset_id(asset_id_bytes):
    return len(asset_id_bytes) > 0 and b58encode(asset_id_bytes) or 'WAVES'

def print_update(update):
    update_id = b58encode(update.id)
    print(f'block {update_id}:')
    for (tx_id, tx_state_update) in zip(update.append.transaction_ids, update.append.transaction_state_updates):
        print(f'  tx {b58encode(tx_id)}:')
        for balance in tx_state_update.balances:
            print(f'    {b58encode(balance.address)}: {balance.amount_before} -> {balance.amount_after.amount} [{asset_id(balance.amount_after.asset_id)}]')

with grpc.insecure_channel('grpc.wavesnodes.com:6881') as channel:
    for block in BlockchainUpdatesApiStub(channel).Subscribe(SubscribeRequest(from_height=3135450, to_height=3135470)):
        print_update(block.update)
```