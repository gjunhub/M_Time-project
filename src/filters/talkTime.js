export default function(value) {

    let str;

    const date = new Date(value * 1000);
    var nowValue = new Date() - value;
    var nowTime;
    if (nowValue < 60000) {
        nowValue = '刚刚';
        return nowValue;
    } else if (60000 < nowValue && nowValue < 3600000) {
        nowTime = Math.round(nowValue / 60000) + "分钟前";
        return nowTime;
    } else if (nowValue > 3600000 && date.getDate() == (new Date().getDate())) {
        str = 'H:i:s'
        str = str.replace('y', date.getFullYear());
        str = str.replace('m', date.getMonth() + 1);
        str = str.replace('d', date.getDate());
        str = str.replace('H', date.getHours());
        str = str.replace('i', date.getMinutes());
        str = str.replace('s', date.getSeconds());
        return str;
    } else if (date.getDate() != (new Date().getDate())) {
        str = 'm月d日 H:i:s'
        str = str.replace('y', date.getFullYear());
        str = str.replace('m', date.getMonth() + 1);
        str = str.replace('d', date.getDate());
        str = str.replace('H', date.getHours());
        str = str.replace('i', date.getMinutes());
        str = str.replace('s', date.getSeconds());
        return str;
    }


}
