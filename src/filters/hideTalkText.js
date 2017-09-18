export default function(value) {
    let str = value;
    if(str.length > 108) {
        str = str.substring(0,108) + '…';
    } else {
        return str;
    }
    return str;
}
