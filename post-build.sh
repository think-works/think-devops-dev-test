#!/bin/sh -eux

VAR_BUILD_DIR="dist";

# region 版本

VAR_DATE_NOW="$(date '+%F %T')";
VAR_GIT_COMMIT=`git rev-parse HEAD || echo UNKNOWN`;
VAR_PACKAGE_NAME=`node -p "require('./package.json').name || 'UNKNOWN'"`;
VAR_PACKAGE_VERSION=`node -p "require('./package.json').version || 'UNKNOWN'"`;
VAR_VERSION_FILE="${VAR_BUILD_DIR}/version.txt";

echo "${VAR_PACKAGE_NAME}: ${VAR_PACKAGE_VERSION}" > ${VAR_VERSION_FILE};
echo "BUILD_TIME: ${VAR_DATE_NOW}" >> ${VAR_VERSION_FILE};
echo "BUILD_COMMIT: ${VAR_GIT_COMMIT}" >> ${VAR_VERSION_FILE};

# endregion

# region 文档

# VAR_DOCS_DIR="${VAR_BUILD_DIR}/docs";
# VAR_DOCS_FILE="${VAR_PACKAGE_NAME}-docs.tar.gz";
# VAR_DOCS_URL=`node -p "require('./package.json').buildConfig.docs.archive || 'UNKNOWN'"`;

# mkdir -p ${VAR_DOCS_DIR};
# curl ${VAR_DOCS_URL} -sfo ${VAR_DOCS_FILE} || exit 1;
# tar -xzf ${VAR_DOCS_FILE} -C ${VAR_DOCS_DIR};
# rm -rf ${VAR_DOCS_FILE}

# endregion

VAR_BUILD_ARCHIVE="${VAR_PACKAGE_NAME}-${VAR_PACKAGE_VERSION}.tar.gz";

tar --no-xattrs --no-mac-metadata --exclude=".DS_Store" -czf ${VAR_BUILD_ARCHIVE} -C ${VAR_BUILD_DIR} .;
