// 1. Generates a source with namespaces and types
// 2. Merges it with api.ts (see why below)
// 3. Creates index.ts in the root directory

import * as fs from 'fs';
import * as path from 'path';
import * as utils from "./utils";

const tsTypesDir = path.resolve(__dirname, '../types');
const apiFilePath = path.resolve(__dirname, '../api.ts');
const outputFilePath = path.resolve(__dirname, '../index.ts');

function getTsFiles() {
    return utils.filter(utils.walkSync(tsTypesDir), (x: string) => x.endsWith('.ts'));
}

const interfaceRegExp = /export interface ([\w_]+) /mg;

function getStructs(tsFileContent: string) {
    return [...
        utils.filter(
            utils.map(tsFileContent.matchAll(interfaceRegExp), x => x[1]),
            x => !(x == 'ProtoGrpcType' || x.endsWith('__Output'))
        )
    ];
}

function getStructDefinitions(tsFiles: Iterable<string>): Iterable<[string, string, string[]]> {
    return utils.flatMap(
        tsFiles,
        (file) => {
            const fileContent = fs.readFileSync(file, {encoding: 'utf-8'});
            const structs = getStructs(fileContent);

            if (structs.length === 0) return [];

            const importFile = file
                .replace(tsTypesDir, '.') // Generated file will be in the "ts-types" dir
                .slice(0, -3); // Remove ".ts" suffix

            // [waves, events]
            const namespacePath: string[] = importFile
                .slice(2) // Remove starting './'
                .split('/')
                .slice(0, -1); // The last is the file name

            // _waves_events_BlockchainUpdated_Append as _waves_events_BlockchainUpdated_Append_imported
            const importedTypeWithAliases = structs.map(x => `${x} as ${x}_imported`).join(', ');

            // import {Amount as Amount_imported, ...} from 'waves/Amount';
            const importStr: string = `import {${importedTypeWithAliases}} from './types/${importFile}'`;

            // See waves/events/BlockchainUpdated.ts: _waves_events_BlockchainUpdated_Append -> BlockchainUpdated_Append
            const parasitePrefix = `_${namespacePath.join('_')}_`;
            const clearName = (x: string) => x.startsWith(parasitePrefix) ? x.substring(parasitePrefix.length) : x;

            // export type BlockchainUpdated_Append = _waves_events_BlockchainUpdated_Append_imported
            const exports: string[] = structs.map(x => `export type ${clearName(x)} = ${x}_imported;`);

            return [[importStr, namespacePath.join('.'), exports]];
        }
    );
}

function mkTypesFileContent(structDefinitions: Iterable<[string, string, string[]]>) {
    let content = '';
    let accNamespaces = new Map<string, string[]>();
    for (let [imports, namespace_, exports_] of structDefinitions) {
        content += `\n${imports}`;

        let currExports = accNamespaces.get(namespace_) || [];
        currExports.push(...exports_);
        accNamespaces.set(namespace_, currExports);
    }

    // We generate namespaces, because this is the only way we can write: let x: api.waves.node.grpc.TransactionResponse
    content += '\nexport namespace api {';
    for (let ns of accNamespaces.keys()) {
        const exports = accNamespaces.get(ns) || [];
        const nss = ns.split('.');
        content += '\n' + [...utils.map(nss, x => `export namespace ${x} {`)].join('\n') + exports.join('\n') + '\n}'.repeat(nss.length);
    }

    return content + '}\n';
}

// We have to merge two files, because TypeScript can't merge namespaces: https://github.com/microsoft/TypeScript/issues/447
let apiContent = fs.readFileSync(apiFilePath, {encoding: 'utf-8'});
let content = `// WARNING: this file is generated, do not modify it!\n${apiContent}\n${mkTypesFileContent(getStructDefinitions(getTsFiles()))}`;
fs.writeFileSync(outputFilePath, content);

console.log('Generated index.ts');
