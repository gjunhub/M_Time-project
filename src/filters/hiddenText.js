export default function (val) {
    let str = val;
    if(str.length > 52) {
        str = str.substring(0,53) + '…';
    } else if(str.length < 26) {
        return str;
    }
    return str;
}
