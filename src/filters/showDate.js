export default function(value, f) {
    const date = new Date(value);

    let str = f? f: 'y-m-d';

    str = str.replace('y',date.getFullYear());
    str = str.replace('m',date.getMonth() + 1);
    str = str.replace('d',date.getDate());

    return str;
}
