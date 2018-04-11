function extend(src) {
    let arg = arguments;
    if (arg.length >= 2) {
        for (let i = 1, len = arg.length; i < len; i++) {
            for (let key in arg[i]) {
                src[key] = arg[i][key];
            }
        }
    }
    return src;
}


module.exports = {
    extend
}