import * as fs from 'fs';
import * as path from 'path';

export function* walkSync(dir: string) {
    const files = fs.readdirSync(dir, {withFileTypes: true});
    for (const file of files) {
        if (file.isDirectory()) {
            yield* module.exports.walkSync(path.join(dir, file.name));
        } else {
            yield path.join(dir, file.name);
        }
    }
}

export function* map<A, B>(iter: Iterable<A>, f: (x: A) => B) {
    for (let x of iter) {
        yield f(x);
    }
}

export function* flatMap<A, B>(iter: Iterable<A>, f: (x: A) => Iterable<B>) {
    for (let x of iter) {
        for (let y of f(x)) {
            yield y;
        }
    }
}

export function* filter<T>(iter: Iterable<T>, predicate: (x: T) => boolean) {
    for (let x of iter) {
        if (predicate(x) === true) {
            yield x;
        }
    }
}
