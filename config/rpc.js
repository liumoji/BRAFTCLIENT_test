'use strict';
const struct = require('./../struct/raft.js');
const raftGroupAddr = new struct.RaftGroupAddr(
    [
        '10.1.1.248:9088',
        '10.1.1.248:9089',
        '10.1.1.248:9090'
    ]
)
exports.raftGroupAddr = raftGroupAddr;
