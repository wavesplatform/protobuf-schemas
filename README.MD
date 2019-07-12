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
    `libraryDependencies += ("com.wavesplatform" % "protobuf-schemas" % "{version}" classifier "proto") % "protobuf"`
2. Configure ScalaPB to compile external schemas with:
```scala
inConfig(Compile)(Seq(
   PB.protoSources in Compile := Seq(PB.externalIncludePath.value),
   includeFilter in PB.generate := new SimpleFileFilter((f: File) => f.getName.endsWith(".proto") && f.getParent.endsWith("waves")),
   PB.targets += scalapb.gen(flatPackage = true) -> sourceManaged.value
 ))		 
```

# How to compile locally
## Java
Use `mvn package` to create JAR artifacts:
1. `protobuf-schemas-{version}-proto.jar` - raw .proto files
2. `protobuf-schemas-{version}.jar` - protoc-generated Java classes
