export default function (value) {
    let val = value;
    // console.dir(val.toString());
    // return val = val < 10&& val != 0? val + '.0': val;
    if(val < 10 && val != 0) {
        if(val.toString().includes('.')) {//判断传进来的参数中是否已经包含了 '.',包含了就直接返回
            return val;
        } else {
            return val + '.0';
        }
    } else {
        return val;
    }
}

