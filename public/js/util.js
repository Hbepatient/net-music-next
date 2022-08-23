export function numberFormat(value) {
    var param = {};
    var k = 10000,
        sizes = ['', '万', '亿'],
        i;
    if (value < k) {
        param.value = value
        param.unit = ''
    } else {
        i = Math.floor(Math.log(value) / Math.log(k));
        param.value = ((value / Math.pow(k, i))).toFixed(1);
        param.unit = sizes[i];
    }
    return `${param.value}${param.unit}`;
}

export function singerNameFormat(name, index, arr){
    let singerName = '';
    if (index > 0 && index < arr.length) {
        singerName += ' / ';
    }
    singerName += name;
    return singerName;
}