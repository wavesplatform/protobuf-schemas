"use strict";

const fs = require('fs');
const path = require('path');

module.exports = {
    walkSync: function* (dir) {
        const files = fs.readdirSync(dir, {withFileTypes: true});
        for (const file of files) {
            if (file.isDirectory()) {
                yield* module.exports.walkSync(path.join(dir, file.name));
            } else {
                yield path.join(dir, file.name);
            }
        }
    },

    filter: function* (iter, predicate) {
        for (let i of iter) {
            if (predicate(i) === true) {
                yield i;
            }
        }
    },

    protosInSubDir: function (dir) {
        return module.exports.filter(module.exports.walkSync(dir), x => x.endsWith('.proto'));
    },

    wavesProtoFiles: function () {
        return [...module.exports.protosInSubDir(path.resolve(__dirname, '../proto'))];
    },

    mkApi(def, channel) {
        return new def(
            '',
            null,
            {
                channelOverride: channel
            }
        )
    }
};
