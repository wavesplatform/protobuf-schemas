#!/bin/bash
version_regex='v([0-9]+)\.([0-9]+)\.?([0-9]*)-([0-9]+)-g([0-9|a-z]+)'
version_msg_regex='([0-9]+)\.([0-9]+)\.?([0-9]*)'
git_string=$(git describe --tags --long)
commit_message=$1

if [[ $commit_message =~ $version_msg_regex ]]; then
  major_version="${BASH_REMATCH[1]}"
  minor_version="${BASH_REMATCH[2]}"
  patch_version="${BASH_REMATCH[3]}"
  version_string=$major_version.$minor_version.$patch_version
elif [[ $git_string =~ $version_regex ]]; then
  major_version="${BASH_REMATCH[1]}"
  minor_version="${BASH_REMATCH[2]}"
  patch_version="${BASH_REMATCH[3]}"
  commits_ahead="${BASH_REMATCH[4]}"
  if [[ $commits_ahead != 0 ]]; then
    version_string=$major_version.$minor_version.$((patch_version + 1))-SNAPSHOT
  else
    version_string=$major_version.$minor_version.$patch_version
  fi
else
  echo "Error: git describe did not output a valid version string. Unable to update version" >&2
  exit 1
fi

mvn_ver_regex="<version>([0-9]+)\.([0-9]+)\.?([0-9]*)(-SNAPSHOT)?<\/version>"
orig_ver_regex="([0-9]+)\.([0-9]+)\.?([0-9]*)(-SNAPSHOT)?"
if [ "$(uname)" == "Darwin" ]; then
  SED="gsed -i -E -e" # brew install gnu-sed
else
  SED="sed -i -E -e"
fi

$SED "0,/$mvn_ver_regex/s//<version>$version_string<\/version>/" pom.xml
$SED "0,/$orig_ver_regex/s//$version_string/" Cargo.toml
$SED "0,/$orig_ver_regex/s//$version_string/" package.json
$SED "0,/$orig_ver_regex/s//$version_string/" package-lock.json
echo $version_string
