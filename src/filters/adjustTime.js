export default function (val) {
    let date = new Date(val);

    let str = 'y-m-d h:M:s';

    function addZero(value) {
       return value = value < 10? '0' + value: value;
    }


    str = str.replace('y',date.getFullYear());
    str = str.replace('m',addZero(date.getMonth()));
    str = str.replace('d',addZero(date.getDate()));
    str = str.replace('h',addZero(date.getHours()));
    str = str.replace('M',addZero(date.getMinutes()));
    str = str.replace('s',addZero(date.getSeconds()));

    return str;
}
