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
pip install grpcio grpcio-tools
python -m grpc_tools.protoc --proto_path=./proto  --python_out=./target/python  `find ./proto -type f`
```
Tweak `--python_out` parameter to generate files elsewhere. Target path should likely be absolute. 
