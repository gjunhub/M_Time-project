export default function(value, f) {

    const date = new Date(turnType(value));

    let str = f? f: 'y-m-d';

    //源数据给的时间形式是：xx-xx-xx直接new Date的话，return str后在手机端上显示会NAN，所以这里要转换一下



    str = str.replace('y',date.getFullYear());
    str = str.replace('m',date.getMonth() + 1);
    str = str.replace('d',date.getDate());

    return str;

    function turnType(val) {
        return val.replace(/-/g,'/');
    }
}
