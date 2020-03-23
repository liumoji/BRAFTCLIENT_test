## 回合制对战服务

```
battle_svr
.
├── config  //配置
│   └── rpc.js 
├── cron    //定时任务
│   └── cron.js
├── lib 
│   ├── grammer //语法糖工具
│   ├── log
│   ├── rpc
│   └── tools   //常用工具类代码
├── main.js //入口文件
├── package.json
├── package-lock.json
├── proto   //rpc协议文件
│   ├── center_svr  //与center_svr通信使用
│   └── raft    //与raft通信使用
├── README.md
└── struct //常用数据类型
    └── raft.js

特效三要素
1.出生条件
2.存活条件
3.死亡条件

特效作用阶段
1.场地特效
2.登场前特效
3.登场后特效
4.技能释放前特效
5.技能释放后特效
6.伤害施加前特效
7.伤害施加后特效
8.死亡前特效
9.死亡后特效
10.离场前特效
11.离场后特效


回合处理顺序
1.换精灵
2.

```