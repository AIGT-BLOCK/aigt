if(j&&!window.$j)$j=j;
// 合约常量配置
const CONFIG = {
    PID: "5",
    DEPLOYER: "aigt11112222",
    SYMBOL: "AIGT"
};
sj.account = sj.account || {  };
sj.info = sj.info || {  };
sj.records = {};
sj.todayd = Math.floor(db.gett() / 24 / 3600000);
sj.rankList = {};
// mainnet
var chainId = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906';

//var endpoint = 'http://eosnode.b1.run:9876';
var endpoint = 'https://mainnet.eoscannon.io';

// kylin
// var chainId = '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191';
// var endpoint = 'https://api-kylin.eosasia.one';

var eos = Eos({
    keyProvider: '',
    httpEndpoint: endpoint,
    chainId: chainId,
});
 

var network = null;
 

function checkoutNetworks() {
    var httpEndpoint = endpoint.split('://');
    var host = httpEndpoint[1].split(':');
    network = {
        blockchain: 'eos',
        host: host[0],
        port: host.length > 1 ? host[1] : (httpEndpoint[0].toLowerCase() == 'https' ? 443 : 80),
        chainId: chainId,
        protocol: httpEndpoint[0],
        httpEndpoint: endpoint,
    };

    console.log('网络参数：' + JSON.stringify(network));
}

function hasScatter() {
    return scatter !== undefined;
}

async function scatteropen(successCallback, errorCallbak) {
    let that = this;
    if (!hasScatter()) {
        errorCallbak("scatter required");
        return;
    }
    checkoutNetworks();
    scatter.suggestNetwork(network).then(async () => { 
 
        let account = await getIdentity();
         sj.account = account;
		
		    try {
			  eos.getAccount({ account_name: sj.identity == null || sj.identity.accounts == null || sj.identity.accounts[0].name }).then(res => {
				  var cb = res.core_liquid_balance;
				  sj.account.balance=cb;
				  balance = res.length == 0 ? 0 : new Number(cb.split(' ')[0]).valueOf();
				 
	  
				  var cl = res.cpu_limit;
				  cpuAvailable = new Number((cl.available * 100 / cl.max)).toFixed(2) + '%';
				  console.log(cpuAvailable);
				  hasCPU = cl.available > 0 && ((cl.available / cl.max) >= 0.1);
	  
				  ramAvailable = new Number((res.ram_usage * 100 / res.ram_quota)).toFixed(2) + '%';
				  console.log(ramAvailable);
	  
	  
				  getAccountInfo(successCallback());
	  
			  }).catch(err => {
				  console.log(`检查账号出错：${JSON.stringify(err)}`);
	  
			  });
		  } catch (error) {
			  console.log(`检查账号出错：${JSON.stringify(error)}`);
	  
		  }
      
        
       
    }).catch(error => {
        errorCallbak(error);
    });
}

function logout() {
    if (sj.identity) {
        sj.identity = null;
        if (hasScatter()) {
            scatter.forgetIdentity().then(() => {
                console.log('logout success');
				 $j().jalert('已退出');
            });
        }
    }
}

 
function cleanscatter() {
    if (hasScatter()) {
        scatter.connect('SAMPLE').then(connected => {
            scatter.forgetIdentity().then(() => {
                console.log('logout success');
            });
        });
    }
}

// 转账
async function transfer(asset, actType, memo, competitionId, competitorId,sid){
  if (sj.account == null) {
	  alert('请先登录');
  }

    eos = scatter.eos(network, Eos);
  
  
    // 从缓存中查询该用户是否已有投票记录
    if (competitorId) {
        let record = sj.records[`${competitionId}_${competitorId}`];
        let voteHistory = record.voters ? record.voters.find(v => v.from == sj.account.name) : record.competitors ? record.competitors.find(v => v.from == sj.account.name) : false;
		voteHistory=voteHistory||{};
        // 拼装memo
        memo = `${competitionId}:${competitorId}:${sid||voteHistory.id||0}|${memo}`;
    }
    let contract = CONFIG.DEPLOYER;

    asset = asset || '0.0200 ' + CONFIG.SYMBOL;
    if (asset.split(' ')[1] == 'EOS') contract = "eosio.token";
    memo=actType + "|" + memo;
    console.log("=========memo:"+memo);
    let ret= await _invokeEosContractApi(contract, 'transfer', null, sj.account.name, CONFIG.DEPLOYER, asset, memo);
	setTimeout(function(){jQuery().cls('ggk')},200);
	return ret;
	

}

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
    
    return contract[apiName].apply(contract, params.concat(options));
}

window.getIdentity = async () => {
    const requiredFields = { accounts: [network] };
    try {
        await scatter.getIdentity(requiredFields);
        if (scatter.identity) {
            sj.identity = scatter.identity;
            return scatter.identity.accounts.find(x => x.blockchain === 'eos');
        } else {
            return { name: "" };
        }

    } catch (err) {
        return { name: JSON.stringify(err) };
    }

};

// 获取用户数据
async function getAccountInfo(func) {

    let accountname = sj.account.name;
    $j('.accountName').html(accountname);
	$j('.publicKey').html(sj.account.publicKey);
	if(accountname)
    sj.info = (await eos.getTableRows({
        json: true,              // Get the response as json
        code: CONFIG.DEPLOYER,    // Contract that we target
        scope: accountname,   // Account that owns the data
        table: 'accounts',          // Table name
        limit: 10,               // Maximum number of rows that we want to get
        reverse: false,          // Optional: Get reversed data
        show_payer: false,       // Optional: Show ram payer
    })).rows[0];
   // let b = await funbalance(accountname);
   // sj.balance = b || {};
   sj.info=sj.info||{};
   $j('.div_EOS').html( (sj.account.balance||'0.0000 EOS') + "<div ></div>" );//+ (rate ? `≈${(_asset.value / rate.rate).toFixed(2)}$` : ''
   let aigtnum=(parseFloat(sj.info.balance||0)-(sj.info.locked||0)).toFixed(4);
   $j('.div_AIGT').html( aigtnum + " AIGT<div ></div>" );
	$j('#div_AIGT').html(' &nbsp; 您有：'+aigtnum.split('.')[0]+' '+CONFIG.SYMBOL);	
	$j('.accountName').html(accountname+' ['+ aigtnum.split('.')[0]+ " <img src='http://www.aigt.club/a/css/a.png' style='width:20px;margin-bottom:-4px;'>]");

    let lock = (sj.info.locked || 0);
    $j('.locked').html('原矿:' + lock + '  <div ></div>' );//+ `≈${(lock / (10000 - parseInt(parseInt(sj.st.eosprize) * 0.1) * 10) / sj.rates['EOS']).toFixed(2)}$`
 
  
       $j().ui({ z: -1, s: 0, marg: 3, w: -95, h: 32, padd: 9, cid: 'refnum', ca: [' 一级伙伴数(' + (sj.info.refnum || 0) + '人)<span style="float:right;color:#ddd"> ' + (sj.info.refnum?'已奖励：'+sj.info.award :"奖励EOS：20%*原矿比") + '</span>', '二级伙伴数(' + (sj.info.ref2num || 0) + '人)<span style="float:right;color:#ddd"> ' +(sj.info.ref2num?'已奖励：'+sj.info.award2 :"奖励EOS：10%*原矿比") + '</span>'], class0: 'x_b_444_444_c7a780 _r_10 _f_18', ncheck: 1 });

   if(func)func();
   
   //计算市场价格
//   	 let rates = sj.rates;
//
//    if (!rates) {
//        rates = (await getRates()).data.rates;
//        sj.rates = rates;
//    }

   // resps.forEach(resp => {
//        if (resp[0]) {
//            let symbol = resp[0].split(' ')[1]
//            result[symbol] = resp[0];
//
//            let _asset = new asset(result[symbol]);
//
//            let rate = rates.find(d => d.currency == symbol);
//            if (rate) sj.rates[symbol] = rate.rate;
//            $j(`#div_${symbol}`).children(".value").html(result[symbol] + "<br>" + (rate ? `≈${(_asset.value / rate.rate).toFixed(2)}$` : ''));
//
//        }
//
//    });
    
}



async function AIGTsetAccount(func) {


        
     		$j('.accountName').html('正在连接钱包');
            scatter.connect('AIGT').then(connected => {

                console.log('2、connected', connected);
                sj.connected = connected;
                if (!sj.connected) {

                    $j('.accountName').html($j().isMobile() ? "<a href='https://www.meet.one/download'>下载EOS钱包</a>" : "<a href=https://get-scatter.com>请下载scatter</a>");

                  
                    if ( $j().isMobile()) {
                        $j().jaler('<br><br>连接钱包失败<br><br>推荐下载安装EOS钱包：meetone<br><br>', 295, "安装EOS钱包|local('https://www.meet.one/download')", 1);
                    }
					getAccountInfo();
            		getrank('lockedmine', null, 1 );
                } else {
                    $j('.accountName').html('已连接钱包');
                    scatteropen(function () {
                        if(func)func();
                    }, function (error) {
                        console.log(`登陆出错：${JSON.stringify(error)}，请关闭重新打开或者刷新本页面`);
                    });

                }
            });

       
  
}



function _local(url,id) {
	if(id){
		url=sj.records[url+'_'+id].content
	}
    if (url.indexOf('@@') == -1) url = '@@' + url;
    funcopy({
        text: url, ssfun: function () {
            let urltext = '';
            if (url.split('@@')[1]) urltext = '<br><br>您已经复制详细内容的连接：<br>' + url.split('@@')[1];
            
            $j().jaler('<br><br><div style="text-align:left;padding:10px;font-size:22px;color:#111">' + url.split('@@')[0] + '</div>' + urltext, 200, url.split('@@')[1]?'直接打开|local(\'' + url.split('@@')[1] + '\',1)`立刻跳转|local(\'' + url.split('@@')[1] + '\')':'', 1);
        }
    });
}

function local(url, f) {

    url = url || $j().getUrl('id', $j('[en="account"]').vale() || CONFIG.DEPLOYER);
    if (f) {
        $j('#iframediv').show();
        $j().ui({ cid: "iframemenu", s: 0, z: -2, marg: 0, w: -23, h:40, ca: "关闭|closeimg();$j('#minepool').show()", class0: 'x_b_C7A780_C7A780_000 _f_25 cent _r_9 shadow' })
        $j('#iframed').html('<iframe  id=theiframe marginwidth="0" marginheight="0" scrolling=auto style="width:100%;height:100%;background:white" src=' + url + ' ></iframe>');
        jQuery().cls('ggk');
    } else {
        window.location = url;
    }


}


function copy() {
    // 由于该库必须由点击某个dom触发，这里创建一个临时的dom
    funcopy({ text: $j().getUrl('tid', sj.account.name || CONFIG.DEPLOYER, $j().getUrl('id', '')) });
}

// 复制用户名
function funcopy(a) {
    a = a || { ssfun: "" };
    var e = e || window.event;
    // 复制
    // 由于该库必须由点击某个dom触发，这里创建一个临时的dom
    let dom = document.createElement('div');
    let tttt = a.text || $j(e.srcElement).html();
    if (a.id) tttt = $j('#' + a.id).text();
    dom.setAttribute('data-clipboard-text', tttt);
    let clipboard = new ClipboardJS(dom);
    clipboard.on('success', function (e) {
        if (!a.ssfun) {
            $j().jaler(a.sm || "您已成功复制：<div style='word-break:break-all;'>" + tttt+"</div>");
            console.log(e);
        } else {
            a.ssfun();
        }
    });
    clipboard.on('error', function (e) {
        //
        if (a.ssfun == "") {
            $j().jaler('复制到剪切板失败');
        } else {
            a.ssfun();
        }
        console.log(e);
        //alert(JSON.stringify(e))
    });
    $j(dom).click();
    setTimeout(function () { // 销毁
        clipboard.destroy();

    }, 100);
}

 


async function capture(id) {
    $j('#capturediv').show();
    let canvas = await html2canvas(document.getElementById(id || "sharediv"));

    let img = new Image;
    img.setAttribute('crossOrigin', 'anonymous');
    img.style.position = 'absolute';
    img.src = canvas.toDataURL("image/png");
    img.onload = function () {
        let W = $j().getcw(), H = $j().getch();
        let expect = this.naturalWidth / this.naturalHeight;
        let bodypect = W / H;
        if (expect >= bodypect) {
            img.style.width = W + 'px';
            //img.style.top = ((H - W / expect) * 0.5) + "px";
            img.style.top = "0.5px";
        } else {
            img.style.height = H + 'px';
            img.style.left = ((W - H * expect) * 0.5) + "px";
        }
        $j('#capturediv').append(img);
    };
}

function qrcode(id, content) {
    let elem = document.getElementById(id || "divqrcode");
	$j(elem).html('');
    new QRCode(elem, {
        text: content,
        width: $j(elem).width(),
        height: $j(elem).height(),
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.L
    });
}

//function logout() {
//    scatter.forgetIdentity();
//    scatter.logout();
//    $j().jalert('已退出');
//    setTimeout(function () {
//        window.location = location.href;
//    }, 1000)
//}

/************************************* EOS 接口相关 *************************************/
 
 

 
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
//window.initEOSWithScatter = async () => {
//    ScatterJS.plugins(new ScatterEOS());
//    // First we need to connect to the user's Scatter.
//    const scatter = window.scatter = ScatterJS.scatter;
//    window.eos = ScatterJS.scatter.eos(network, Eos, { expireInSeconds: 60 });
//    return scatter.connect('AIGT');
//};
//
// 
 

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

 
/**
 * 更新账号权限
 */
async function updatePermission() {
    
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
	
	sj.formulastr='1 EOS = 实时汇率*1%(AIGT) +  实时汇率*99%(原矿) <br>实时汇率 = (10000-EOS奖金池/10) ≈ '+(10000-(parseInt(parseInt(sj.st.eosprize) * 0.1) ).toFixed(0));
	$j('#formula').html(sj.formulastr)

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
async function getCompetitions(typ) {
	if(typ){
		
	}
    let result = [];
    let records = await eos.getTableRows({ // 获取所有比赛
        json: true,              // Get the response as json
        code: CONFIG.DEPLOYER,    // Contract that we target
        scope: CONFIG.PID,   // Account that owns the data
        table: 'records',          // Table name
        limit: 20,               // Maximum number of rows that we want to get
        reverse: true,          // Optional: Get reversed data
        show_payer: false,       // Optional: Show ram payer
    });
	records.rows.splice(records.rows.length-2)
    // 缓存查询结果
	if(typ) records.rows=records.rows.filter(i=>i.prize.split(' ')[1]==typ);
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