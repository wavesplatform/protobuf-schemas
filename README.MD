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
libraryDependencies += ("com.wavesplatform" % "protobuf-schemas" % "{version}" classifier "proto") % "protobuf"
```
2. Configure ScalaPB to compile external schemas with:
```scala
inConfig(Compile)(Seq(
   PB.protoSources in Compile := Seq(PB.externalIncludePath.value),
   includeFilter in PB.generate := new SimpleFileFilter((f: File) => f.getName.endsWith(".proto") && f.getParent.endsWith("waves")),
   PB.targets += scalapb.gen(flatPackage = true) -> sourceManaged.value
 ))
```

##CSharp
1. Add `App.config`, `packages.config` to your c-sharp solution 
2. Add 
```
  <ItemGroup>
    <Protobuf Include="proto\waves\*.proto" OutputDir="waves\%(RelativePath)" GrpcServices="None" />
    <Protobuf Include="proto\waves\events\*.proto" OutputDir="waves\events\%(RelativePath)" GrpcServices="None" />
    <Protobuf Include="proto\waves\node\grpc\*.proto" OutputDir="waves\node\grpc\%(RelativePath)" GrpcServices="Both" />
  </ItemGroup>
```
to your `.cspoj` file. After this just build your project.

or as alternative you can use util protoc, for example:
``` protoc --csharp_out=RelativePath  --proto_path=RelativePathToProtoDir RelativePathToProtoFile```

# How to compile locally
## Java
Use `mvn package` to create JAR artifacts:
1. `protobuf-schemas-{version}-proto.jar` - raw .proto files
2. `protobuf-schemas-{version}.jar` - protoc-generated Java classes
