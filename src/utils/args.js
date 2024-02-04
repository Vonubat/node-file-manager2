export function getUsername() {
    const KEY = '--username=';
    let username = 'Anonymous';

    const args = process.argv.slice(2);
    const name = args.find((it) => it.includes(KEY));

    if (name) {
        const parsed = name.replace(KEY, '').trim();
        username = parsed ? parsed : username;
    }

    return username;
}

export function parseInput(input) {
    let args = input.split(' ');
    const quoteRegExp = /"|'/g;

    if (quoteRegExp.test(args)) {
        const quotesRegExp = /["'] | ["']/;
        args = args
            .join(' ')
            .split(quotesRegExp)
            .map((arg) => arg.replace(quoteRegExp, ''));
    }

    return args;
}
