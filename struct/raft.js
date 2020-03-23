'use strict';
class RaftGroupAddr {
    constructor(addrArr) {
        this.addrList = [];
        this.idx = 0;
        this.len = addrArr.length;
        for (let addr of addrArr) {
            this.addrList.push(addr);
        }
    }
    getNextAddr() {
        if (this.idx >= this.len) {
            this.idx = 0;
        }
        return this.addrList[this.idx++];
    }
}

exports.RaftGroupAddr = RaftGroupAddr;