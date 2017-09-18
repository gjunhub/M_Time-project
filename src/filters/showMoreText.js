export default function(value) {
    let str = value;
    if(str.length <= 45) {
        return str;
    } else {
        str = str.substring(0,48) + '…';
        return str;
    }

}
