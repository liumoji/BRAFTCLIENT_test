'use strict';
/**
 * 将callback风格的函数转换为promise风格的函数
 * @param {function} func callback风格的函数,
 *                        最后一个参数必须是error-first格式的callback
 *                        func.__param_len为自定义形参列表长度
 *                        func.__param_len为空则使用实际形参列表长度
 * @param {object} self   调用者的this指针
 * 
 * @param {Array} return  返回callback函数除第一个参数外的其余参数
 *                        若长度为1,则直接返回该参数, 否则返回一个包含所有参数的数组
 */
const cb2promise = (func, self) => {
    self = self || null;
    return function () {
        let callArgs = Array.prototype.slice.call(arguments);
        let originArgsLen = func.__param_len || func.length;
        if (callArgs.length >= originArgsLen) {
            console.log(arguments, originArgsLen)
            throw new Error('cb2promise param length mismatch');
        }
        return new Promise((resolve, reject) => {
            callArgs[originArgsLen - 1] = function () {
                let retArgs = Array.prototype.slice.call(arguments);
                let err = retArgs.shift();
                let ret = retArgs;
                if (err) return reject(err);
                return resolve(ret.length === 1 ? ret[0] : ret);
            }
            func.apply(self, callArgs);
        });
    }
};

module.exports = cb2promise;
