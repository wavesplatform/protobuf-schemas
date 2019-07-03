inThisBuild(Seq(
  organization := "com.wavesplatform",
  name := "waves-proto",
  version := "1.0.0-SNAPSHOT",
  isSnapshot := version.value.endsWith("SNAPSHOT")
))

lazy val `waves-proto` = (project in file("."))
  .settings(
    autoScalaLibrary := false, // scalaVersion := "2.13.0"
    crossPaths := false,
    libraryDependencies ++= Seq(
      "com.google.protobuf" % "protobuf-java" % "3.4.0" % Provided,
      "com.google.api.grpc" % "proto-google-common-protos" % "1.12.0" % Provided
    ),
    publishSettings
  )

lazy val publishSettings = Seq(
  publishMavenStyle := true,
  publishTo := {
    val nexus = "https://oss.sonatype.org/"
    if (isSnapshot.value)
      Some("snapshots" at nexus + "content/repositories/snapshots")
    else
      Some("releases" at nexus + "service/local/staging/deploy/maven2")
  },
  publishArtifact in Test := false,
  pomIncludeRepository := { _ ⇒ false },
  licenses := Seq("The MIT License" → url("http://opensource.org/licenses/MIT")),
  homepage := Some(url("https://github.com/wavesplatform/waves-proto")),
  pomExtra :=
    <developers>
      <developer>
        <id>karasiq</id>
        <name>Valeriy</name>
        <url>https://github.com/Karasiq</url>
        <email>yoba123@yandex.ru</email>
        <organization>Waves</organization>
        <organizationUrl>https://wavesplatform.com</organizationUrl>
        <roles>
          <role>Developer</role>
        </roles>
        <timezone>+3</timezone>
      </developer>
    </developers>
)

lazy val noPublishSettings = Seq(
  publishArtifact := false,
  publishArtifact in makePom := false,
  publishTo := Some(Resolver.file("Repo", file("target/repo")))
)
