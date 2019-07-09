/************************************* EOS 接口相关 *************************************/
// Networks are used to reference certain blockchains.
// They let you get accounts and help you build signature providers.
// 阿里云配置
// const network = {
//     blockchain:'eos',
//     protocol:'http',
//     host:'39.106.159.160',
//     port:8888,
//     chainId:'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'
// };

// 公网配置
const network = {
    blockchain:'eos',
    protocol:'https',
    host:'nodes.get-scatter.com',
    port:443,
    chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
};

// jungle配置
// const network = {
//     blockchain: 'eos',
//     protocol: 'http',
//     host: 'jungle2.cryptolions.io',
//     port: 80,
//     chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473'
// };

// 合约常量配置
const CONFIG = {
    PID: "5",
    DEPLOYER: "aigt11112222",
    SYMBOL: "AIGT"
};

// 从eos获取的数据的缓存
const eosdata = {
    st: {},
    competitions: {},
    followers: {}
};

// 便于使用eos中的asset类型
function asset(strAsset) {
    let stra = strAsset.split(" ");
    if (stra.length != 2 || !stra[0] || !stra[1]) console.error("strAsset不符合格式", strAsset);
    this.value = parseFloat(stra[0]);
    this.symbol = stra[1];
}
asset.prototype.toString = function () { return (this.value * 1).toFixed(4) + " " + this.symbol; };
asset.prototype.clone = function () { return new asset(this.toString()); }

/**
 * 初始化scatter
 */
window.initEOSWithScatter = async () => {
    ScatterJS.plugins(new ScatterEOS());
    // First we need to connect to the user's Scatter.
    const scatter = window.scatter = ScatterJS.scatter;
    window.eos = ScatterJS.scatter.eos(network, Eos, { expireInSeconds: 60 });
    return scatter.connect('AIGAC');
};

/**
 * 转账（test）
 */
window.transferEOS = async () => {
    // Always use the accounts you got back from Scatter. Never hardcode them even if you are prompting
    // the user for their account name beforehand. They could still give you a different account.
    const account = await getIdentity();

    // ----------------------------
    // Now that we have an identity,
    // an EOSIO account, and a reference
    // to an eosjs object we can send a transaction.
    // ----------------------------

    // Never assume the account's permission/authority. Always take it from the returned account.
    const transactionOptions = { authorization: [`${account.name}@${account.authority}`] };

    eos.transfer(account.name, 'gaceostester', '0.0001 EOS', 'memo', transactionOptions).then(trx => {
        // That's it!
        console.log(`Transaction ID: ${trx.transaction_id}`);
    }).catch(error => {
        console.error(error);
    });
};

 
 



/**
 * 获取用户历史操作记录，返回用户account下从第pos到pos+offset条action记录回来
 * 具体参考https://developers.eos.io/eosio-nodeos/reference#get_actions-1
 * @param {String} accountName - 用户名
 * @param {Number} [pos=0] - 最近的第几条
 * @param {Number} [offset=20] - 偏移量
 */
async function getAccountActions(accountName, pos = 0, offset = 20) {
    accountName = accountName || (scatter.identity.accounts.find(x => x.blockchain === 'eos')).name;
    return eos.getActions(accountName, pos, offset);
}

// 测试调用aigac transfer 接口
async function aigacTransfer(from, to, amount, memo) {
    const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
    return _invokeEosContractApi('liuwufengeos', 'transfer', null, from || account.name, to || 'gaceostester', amount || '0.0001 SYYS', memo || 'memo');
}

/**
 * 更新账号权限
 */
async function updatePermission() {
    // let account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
    let account = await getIdentity();
    let resp = await _invokeEosContractApi('eosio', 'updateauth', null, account.name, account.authority, account.authority == 'owner' ? '' : 'owner', {
        "threshold": 1,
        "keys": [{
            "key": "EOS7uwP2PP78gmxNDT76SwKA5ZprtR3XyY4Fgb2z2qarC9ueRmzdw",//"EOS4ydvmi6CTEgJ8EAjuYLusVR3pc2Y9NN3sVzKVtsD4T1nRFSmrc",
            "weight": 1
        }],
        "accounts": [{
            "permission": {
                "actor": "gaceostester",
                "permission": "eosio.code"
            },
            "weight": 1
        }],
        waits: [{
            "wait_sec": 3600,
            "weight": 1
        }]
    });
    console.log("updateauth", resp);
}

async function onVote(competitionId, competitorId) {
    let amount = j("#voteAmount").val() * 1;
    let _asset = new asset("0.0200 AGC");
    let voteType = ({ "0": "unlock", "1": "exchange", "2": "vote" })[(j("#voteradi").attr('touchid') || "voteradi_2").split('_')[1]];
    let memo = `|0|1|0|0|${amount}`;
    try {
        let resp = await transfer(_asset.toString(), voteType, memo, competitionId, competitorId);
        console.log("onVote", resp);
        votebtn(competitionId, competitorId); // 刷新界面
        // votebackbtn(competitionId, competitorId); // 刷新界面
    } catch (err) {
        j().jalert(JSON.parse(err).error.details[0].message);
        console.error("onVote报错", err);
    }
}

/********start******** 调用api接口 ********start********/


/**
 * 投票接口
 * @param {String} asset - 转账金额，形如 "1.0000 EOS"
 * @param {String} actType - 投票类型（vote|unlock|exchange）
 * @param {String} memo - 
 * @param {Number} competitionId - 比赛id
 * @param {Number} competitorId - 参赛者id
 */
function transfer(asset, actType, memo, competitionId, competitorId,sid) {
    const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
    // 从缓存中查询该用户是否已有投票记录
    if (competitorId) {
        let record = sj.records[`${competitionId}_${competitorId}`];
        let voteHistory = record.voters ? record.voters.find(v => v.from == account.name) : record.competitors ? record.competitors.find(v => v.from == account.name) : false;
		voteHistory=voteHistory||{};
        // 拼装memo
        memo = `${competitionId}:${competitorId}:${sid||voteHistory.id||0}|${memo}`;
    }
    let contract = CONFIG.DEPLOYER;

    asset = asset || '0.0200 ' + CONFIG.SYMBOL;
    if (asset.split(' ')[1] == 'EOS') contract = "eosio.token";
    memo=actType + "|" + memo;
    console.log("=========memo:"+memo);
    return _invokeEosContractApi(contract, 'transfer', null, account.name, CONFIG.DEPLOYER, asset, memo);
}
/********end******** 调用api接口 ********end********/

/********start******** 获取数据接口 ********start********/


// 获取池子数据
async function getPoolInfo() {
     sj.st= (await eos.getTableRows({
        json: true,              // Get the response as json
        code: CONFIG.DEPLOYER,    // Contract that we target
        scope: CONFIG.SYMBOL,   // Account that owns the data
        table: 'stat',          // Table name
        limit: 10,               // Maximum number of rows that we want to get
        reverse: false,          // Optional: Get reversed data
        show_payer: false,       // Optional: Show ram payer
    })).rows[0];

     return sj.st;
}



// 获取排行榜数据
async function getRankList(account, receiver, limit) {
    let history = await searcheos(account, receiver, "transfer", limit||100);
    sj.rankList[`${account}_${receiver}`] = history.data.searchTransactionsBackward.results.map(i => i.trace.matchingActions[0].json);
    console.log("getRankList", sj.rankList[`${account}_${receiver}`]);
    return sj.rankList[`${account}_${receiver}`];
    // let trxs = await getAccountActions(CONFIG.DEPLOYER);
    // console.log("getAccountActions", trxs);
    // return trxs.actions.filter(a=>a.action_trace.act.data.memo&&a.action_trace.act.data.memo.includes("lockedmine"));
}

// 获取比赛数据
// 返回数据结构形如：
/*
[
    {
        "from": "gaceostester", // 发布人帐号名
        "id": 1560491940, // 创建时间（10位时间戳（秒））
        "content": "最佳社群评选", // 比赛主题
        "minamount": 10000, // 参赛金额限制（AGC）
        "endtime": 1560591940, // 截至时间（10位时间戳（秒））
        "competitors": [ // 参赛者数组
            {
                "from": "alice", // 参赛人帐号名
                "vote": 4, // 得票数
                "reward": "10000.0000 AGC" // 预估可得红包，不一定存在该变量（只有前winners名参赛者可得奖励）
            }
        ]
    }
]
*/
async function getCompetitions() {
    let result = [];
    let records = await eos.getTableRows({ // 获取所有比赛
        json: true,              // Get the response as json
        code: CONFIG.DEPLOYER,    // Contract that we target
        scope: CONFIG.PID,   // Account that owns the data
        table: 'records',          // Table name
        limit: 10,               // Maximum number of rows that we want to get
        reverse: true,          // Optional: Get reversed data
        show_payer: false,       // Optional: Show ram payer
    });
    // 缓存查询结果
    result = sj.records[`0_${CONFIG.PID}`] = records.rows;
    let proms = [];
    for (let competition of result) { // 分别查找每个比赛的参赛者（并发查询）
        proms.push(eos.getTableRows({ // 获取参赛者
            json: true,              // Get the response as json
            code: CONFIG.DEPLOYER,    // Contract that we target
            scope: competition.id + "",   // Account that owns the data
            table: 'records',          // Table name
            limit: 100,               // Maximum number of rows that we want to get
            reverse: false,          // Optional: Get reversed data
            show_payer: false,       // Optional: Show ram payer
        }));
    }
    let recordsGroup = await Promise.all(proms);
    let poolStat = await getPoolInfo();
    recordsGroup.forEach((records, idx) => {
        let competition = result[idx];
        // 缓存比赛数据
        sj.records[`${CONFIG.PID}_${competition.id}`] = competition;
        competition.competitors = records.rows;
        // 对参赛者按照得票数逆序排序
        competition.competitors.sort((c1, c2) => c2.vote - c1.vote);
        // 对参赛者，计算预估可得奖励
        _calculateReward(poolStat, competition, competition.competitors);
    });

    console.log("getCompetitions", result);
    sj.vote=result;
    return result;
}

// 获取投票者数据
// 返回数据结构形如：
/*
[
    {
        "from": "gaceostester", // 投票人帐号名
        "id": 1560491940, // 创建时间（10位时间戳（秒））
        "vote": 3, // 投票数
    }
]
*/
async function getVoters(competitionId, competitorId) {
    let result = [];
    let records = await eos.getTableRows({ // 获取参赛者的所有投票人
        json: true,              // Get the response as json
        code: CONFIG.DEPLOYER,    // Contract that we target
        scope: competitorId,   // Account that owns the data
        table: 'records',          // Table name
        limit: 10,               // Maximum number of rows that we want to get
        reverse: true,          // Optional: Get reversed data
        show_payer: false,       // Optional: Show ram payer
    });
    // 对投票者按投票数逆序排序
    result = records.rows;
    result.sort((v1, v2) => v2.vote - v1.vote);
    // 从缓存中读取参赛者数据
    let competitor = sj.records[`${competitionId}_${competitorId}`];
    if (!competitor) {
        console.error(`缓存中找不到sj.records[${competitionId}_${competitorId}] in getVoters`);
        return [];
    }
    competitor.voters = result;
    // 计算预估奖励
    let poolStat = await getPoolInfo();
    _calculateReward(poolStat, competitor, result);
    console.log("getVoters", result);
    return result;
}
/********end******** 获取数据接口 ********end********/

/********start******** 内部方法 ********start********/
/**
 * 调用eos合约的api
 * @param {String} contract - 合约发布用户名
 * @param {String} apiName - 接口名
 * @param {Object} options.account - 用户对象，默认取scatter中找到的第一个用户信息
 * @param  {...any} params - 该接口所需参数
 * @return {Promise}
 */
async function _invokeEosContractApi(contract, apiName, options, ...params) {
    j().jaler("调用钱包中....");
    if (!contract || !apiName) return { error: true, msg: "没传contract或apiName in _invokeEosContractApi" };
    options = options || {};
    const account = options.account || scatter.identity.accounts.find(x => x.blockchain === 'eos');
    options = { authorization: [{ actor: account.name, permission: account.authority }] };
    contract = await eos.contract(contract);
    if (!contract[apiName]) return { error: true, msg: `合约${contract}中不存在api${apiName} in _invokeEosContractApi` };
    setTimeout(function(){jQuery().cls('ggk')},2000);
    return contract[apiName].apply(contract, params.concat(options));
}

/**
 * 计算预计可得奖励，奖励值直接赋值在children中每个元素的reward属性上（用于计算参赛者、投票者的预计可得奖励，二者逻辑一致）
 * @param {Object} poolStat - 池子状态数据（可用getPoolInfo获取）
 * @param {Object} parentData - 父数据（指records表中的上级）
 * @param {Array.<Object>} children - 子数据数组（指records表中的下级）
 */
function _calculateReward(poolStat, parentData, children) {
    let type = [11, 12].includes(parentData.times) ? 0 : 1; //  
    let winners = parentData.winners; // 前winners个人可获得奖励
    let allotment =  parentData.allotment / 10000; // 计算领奖数/百分比
    let remain = new asset(poolStat[parentData.times == 12 ? "eosprize" : "prize"]), len = children.length;
    for (let i = 0; i < len; i++) {
        let childData = children[i];
        // 缓存数据
        sj.records[`${parentData.id}_${childData.id}`] = childData;
        // 对于前winners个参赛者，计算其预计可获得奖励
        let reward = new asset(parentData.prize);
        if (i < winners) {
            if (allotment>1) { // 数额领奖，allotment就是奖励
               
                reward.value = allotment;
               
            } else { // 对于百分比领奖，计算预计可得奖励
                if(type==0){ 
                 reward = remain.clone();
                
                reward.value *= allotment;
                remain.value -= reward.value;
                 
                }else{
                   
                    reward.value *= allotment;
                    
                }
            }
            childData.reward = reward.toString();
        }
    }
}
/********end******** 内部方法 ********end********/
/************************************* EOS 接口相关 *************************************/