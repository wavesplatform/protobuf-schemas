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
## JavaScript
Npm package: `@waves/protobuf-serialization`.

It contains generated JavaScript classes, TypeScript definitions as well as raw proto files. The default build uses CommonJS and includes all of the proto files. We used `pbjs` to build JavaScript and `pbts` to build TypeScript definitions.

You could also make your own custom build from raw `.proto` files, for example, if you want to use only a subset of proto schemas or gRPC services. They can be found in `@waves/protobuf-serialization/proto` directory.

`long.js` is used for 64-bit integers: `int64`, `uint64`, etc.

Example:
1. `npm install --save @waves/protobuf-serialization`
2. Default build usage
```javascript
import { waves } from '@waves/protobuf-serialization';

const block = new waves.Block();
block.header = // ... set necessary fields

const buffer = waves.Block.encode(block);

const blockDecoded = waves.Block.decode(buffer);
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
python -m grpc_tools.protoc --proto_path=./protobuf-schemas/proto --python_out=. --grpc_python_out=. `find ./protobuf-schemas/proto -type f`
```
Tweak `--python_out` and `--grpc_python_out` parameters to generate files elsewhere. Target path should likely be absolute. Now you can use generated classes:
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