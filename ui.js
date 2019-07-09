var data = {
	"level":["青铜","白银","黄金","铂金","钻石","星耀","王者"],
    "vote": [
        { "logo": "1", "name": "Gates", "aigac": "100 AIGT", "time": "89:10:10" },
        { "logo": "2", "name": "Bush", "aigac": "200 AIGT", "time": "90:11:11" },
        { "logo": "3", "name": "Carter", "aigac": "300 AIGT", "time": "91:12:12" }
    ],
    "fname": [
        { "name": "休闲游戏", "ticket": 800, "people": 1000 }
    ],
    "row": [
        { "prologo": "01.png", "title": "手机端游", "game": "王者" },
        { "prologo": "02.png", "title": "PC端游", "game": "LOL" },
        { "prologo": "03.png", "title": "PC端游2", "game": "DOTA2" },
        { "prologo": "04.png", "title": "手机端游", "game": "王者" },
        { "prologo": "03.png", "title": "PC端游", "game": "LOL" },
        { "prologo": "02.png", "title": "PC端游2", "game": "DOTA2" },
        { "prologo": "01.png", "title": "手机端游", "game": "王者" },
        { "prologo": "02.png", "title": "PC端游", "game": "LOL" },
        { "prologo": "03.png", "title": "PC端游2", "game": "DOTA2" },
        { "prologo": "04.png", "title": "手机端游", "game": "王者" },
        { "prologo": "03.png", "title": "PC端游", "game": "LOL" },
        { "prologo": "02.png", "title": "PC端游2", "game": "DOTA2" },
        { "prologo": "01.png", "title": "手机端游", "game": "王者" },
        { "prologo": "02.png", "title": "PC端游", "game": "LOL" },
    ],
	"lang":{
		"e1":["invalid quantity","非法的数量"],
		"e2":["symbol precision mismatch","符号精度不匹配"],
		"e3":["must transfer 0.01~20000000","必须转移0.01~20000000"],
		"e4":["memo has more than 256 bytes","备忘录超过256个字节"],
		"e5":["eos_quant symbol must be EOS","eos_quant符号必须EOS"],
		"e6":["must transfer 1~300 EOS","必须转1〜300EOS"],
		"e7":["quantity exceeds available mine_supply","数量超过可用矿池总量"],
		"e8":[" referrer  must be properly designated. ","推荐人必须正确指定。"],
		"e9":[" can not >1000 in 24 hours","24小时内不能超过1000"],
		"e10":["quantity exceeds available supply","数量超过可用供应量"],
		"e11":["must to==_self","必须== _ self"],
		"e12":["You need to pay at least 80,000 to launch.","您需要支付至少80,000才能启动。"],
		"e13":["does not exist","不存在"],
		"e14":["vote not enough","投票不够"],
		"e15":["must point id","必须指向id"],
		"e16":["It's not time to receive the prize yet!","现在还不是获奖的时候！"],
		"e17":["prize is not enough!","赞助的奖金还不够！"],
		"e18":["prize is not enough!","赞助的奖金还不够！"],
		"e19":["The voting time has come to an end!","投票时间已经结束！"],
		"e20":["The amount must be between 10 and 100000","金额必须介于10到100000之间"],
		"e21":["No more unlocking or exchange today!","今天不再解锁或交换！"],
		"e22":["The voting time has come to an end!","投票时间已经结束！"],
		"e23":["Have no right to modify someone else's","没有权利修改别人的"],
		"e24":["Can't Receive Award Repeatedly!","不能反复获奖！"],
		"e25":[" overdrawn balance  locked :","透支平衡锁定："]
	}
}
sj.account = sj.account || { info: {} };
sj.records = {};
sj.todayd= Math.floor(db.gett()/24/3600000);
sj.rankList = {};

/**
 * 获取用户信息
 * TODO: 是否必要每次都调用接口取回账号数据？考虑缓存起来，过时更新？
 */
window.getIdentity = async () => {
    const requiredFields = { accounts: [network] };
    try { await scatter.getIdentity(requiredFields); } catch (err) { }
    if (scatter.identity) {
        return scatter.identity.accounts.find(x => x.blockchain === 'eos');
    } else {
        return { name: "" };
    }
};

// 获取用户余额
async function balance(account) {
    let result = {};
    let eosBalance = eos.getCurrencyBalance("eosio.token", account, "EOS");
    let agcBalance = eos.getCurrencyBalance(CONFIG.DEPLOYER, account, "AIGT");
    let resps = await Promise.all([eosBalance, agcBalance]);
    let rates = sj.rates;

    if (!rates){
        rates = (await getRates()).data.rates;
        sj.rates=rates;
    } 

    resps.forEach(resp => {
        if (resp[0]) {
            let symbol = resp[0].split(' ')[1]
            result[symbol] = resp[0];
            
            let jToken = j(`#div_${symbol}`);
            let _asset = new asset(result[symbol]);
           
            let rate = rates.find(d => d.currency == symbol); 
            if(rate)sj.rates[symbol]=rate.rate;
            jToken.children(".value").html(result[symbol] +"<br>"+(rate ? `≈${(_asset.value / rate.rate).toFixed(2)}$` : ''));
          
        }

    });
    return result;
}
//社群信息
function message(){
	//j('#urlbox').show()
	funcopy({
        text: 'Telegram', ssfun: function () {
			j().jaler( j().ui({ cid: "guideggk", s: 10, z: 0, marg: 0, w: -89, h: 38, padd: 12, ca: "Telegram|_local('https://web.telegram.org')`Github|_local('https://github.com/AIGT-BLOCK')`Discord|_local('https://discordapp.com/login')`AIGT官网|_local('http://www.aigt.club')`Medium|_local('https://medium.com/')`简书|_local('https://www.jianshu.com/')", class0: 'x_b_fff_fff_C7A780 _f_18', class1: '', ncheck: 1 }), 200, '', 1);
        }
    });
}
function _local(url) {
    window.location = url;
}

// 获取用户数据
async function getAccount(accountname) {
    if (!accountname) {
        let account = await getIdentity();
        sj.account = account;
        accountname = account.name;
        j('#accountName').html(accountname);
    }
    let a = (await eos.getTableRows({
        json: true,              // Get the response as json
        code: CONFIG.DEPLOYER,    // Contract that we target
        scope: accountname,   // Account that owns the data
        table: 'accounts',          // Table name
        limit: 10,               // Maximum number of rows that we want to get
        reverse: false,          // Optional: Get reversed data
        show_payer: false,       // Optional: Show ram payer
    })).rows[0];
    let b = await balance(accountname);
    sj.account.balance = b || {};
    sj.account.info = a || {};
    console.log(JSON.stringify(sj.account));
    let lock=(sj.account.info.locked || 0);
    j('.locked').html('原矿:' + lock + 'AIGT <br>'+ `≈${(lock / (10000- parseInt(parseInt(sj.st.eosprize) * 0.1) * 10) / sj.rates['EOS']).toFixed(2)}$` );
    if(sj.account.balance[CONFIG.SYMBOL]){

    
    let bala=(parseFloat(sj.account.balance[CONFIG.SYMBOL])-sj.account.info.locked).toFixed(4) ;
    j(`#div_${CONFIG.SYMBOL}`).children(".value").html(bala+" "+CONFIG.SYMBOL+"<br>"+ ( `≈${(bala / (10000- parseInt(parseInt(sj.st.eosprize) * 0.1) * 10) / sj.rates['EOS']).toFixed(2)}$` ) );
    }


    return a
}

//社群信息
function fejo(){ 
	//j('#urlbox').show()
	funcopy({
        text: 'Telegram', ssfun: function () {
			let ul=['https://web.telegram.org','https://github.com/','https://discordapp.com/login']
			let ca=[];
			ca.push('<div onclick="_local(\"web.telegram.org\")" style="text-align:left;padding:10px;font-size:22px">Telegram</div><div onclick="_local(\"github.com\")" style="text-align:left;padding:10px;font-size:22px">Github</div><div onclick="_local(\"github.com\")" style="text-align:left;padding:10px;font-size:22px">Discord</div><div onclick="_local(\"medium.com\")" style="text-align:left;padding:10px;font-size:22px">Medium</div>')
            for(let i=0;i<ul.length;i++){
				j().jaler( ca, 200, '直接跳转|_local('+ul[i]+')', 1);
			}
        }
    });
}
function closeurl(){
	j('#urlbox').hide()	
	}


async function setAccount(aler) {
    let accountname = j().getv("id", "");
    let conn = initEOSWithScatter();

    getPoolInfo().then(poolData => {
        for (let argn in poolData) { // 将数据更新到对应的div
            let jPool = j(`[argn=${argn}]`);
            jPool.text(`${jPool.attr('prefix')}${(poolData[argn]+'').replace('.0000','')}`);
        }
        // 特殊处理已采字段（需要计算）
        // let team = new asset(poolData.mine);
        // team.value = 5000000000 - team.value;
        // let jPool = j(`[argn=mined]`);
        // jPool.text(`${jPool.attr('prefix')}${team.toString().replace('.0000','')}`);
       
    });
    if (accountname) {
        j('.accountName').html(accountname);
        sj.account.name = accountname;
        getAccount(accountname);
    }
    if (!accountname || !j().isMobile()) { //没有帐号或者pc端口
        conn.then(connected => {
            sj.connected = connected;
            if (!sj.connected) {
                
                j('.accountstate').html(j().isMobile()?"请下载钱包：<a href=https://meet.one/>meetone</a>":"下载PC端钱包：<a href=https://get-scatter.com>scatter</a>");
                
                console.error("连接钱包失败");
                if (aler) {
                    j().jaler('<br>' + grid.inp('tx', 'account', '请输入您的EOS帐号:'), 295, '确定|local()', 1);
                }
            } else {
                j('.accountstate').html('已成功连接钱包');
                getAccount();
            }
        });

    }
    if (!accountname && j().isMobile() || aler) {
        j().jaler('<br>' + grid.inp('tx', 'account', '请输入您的EOS帐号:'), 295, '确定|local()', 1);
    }


}

(async () => {
    init();
    setAccount();
    setTimeout(() => {

        console.log("ddddfsdfs");;
    
    	getrank('lockedmine',null,1,function(newa){
            console.log("===",newa);
    	let ca =[];
         for(let i=0;i<newa.length;i++){
             ca.push(' <div class="leaderText"><span style="width:60px;display:block;float:left">'+data.level[(newa[i].ma1+'').length-4]+'</span> <span style="margin-left:30px;width:180px;display:block;float:left">'+newa[i].to+'</span> <span class="aigac">'+newa[i].ma1+'</span> </div>')
         }
         j().ui({ cid: "rankdiv", s: 2, w: -99, h: 33, ca,class0:""});
		
     })
    }, 4000);
})();



// 下拉框
var selectHead = document.getElementsByClassName('select-head')[0];
var selectHeadCont = document.getElementsByClassName('select-head-cont');
var Option = document.getElementsByClassName('option')[0];
var optionItem = document.getElementsByClassName('option-item');

/*默认是第一个选项*/
selectHeadCont[0].innerHTML = optionItem[0].innerHTML;

/*点击后出现下拉框*/
var bl = true;
selectHead.addEventListener('click', function () {
    if (bl) {
        Option.style.display = 'block';
        bl = false;
    } else {
        Option.style.display = 'none';
        bl = true;
    }
}, false);
/*点击选项后出现在下拉框*/
var len = optionItem.length;
for (var i = 0; i < len; i++) {
    optionItem[i].index = i;
    optionItem[i].addEventListener('click', function () {
        selectHeadCont[0].innerHTML = optionItem[this.index].innerHTML;
        Option.style.display = 'none';
        bl = true;
    }, false);
}
/*点击其他地方时，select会收起来*/
document.body.addEventListener('click', function () {
    Option.style.display = 'none';
}.false);
 

function content(url) {
    funcopy({
        text: url, ssfun: function () {
            let urltext='';
            if(url.split('@@')[1])urltext='<br><br>您已经复制详细内容的连接：<br>' + url.split('@@')[1];
            iframemenu
            j().jaler( '<br><br><div style="text-align:left;padding:10px;font-size:22px">'+url.split('@@')[0]+'</div>'+urltext, 200, '直接打开|local(\'' + url.split('@@')[1] + '\',1)`直接跳转|local(\'' + url.split('@@')[1] + '\')', 1);
        }
    });
}
function local(url,f) {
   
    url=url||j().getUrl('id', j('[en="account"]').vale() || CONFIG.DEPLOYER);
    if(f){
        j('#iframediv').show();
        j().ui({ cid: "iframemenu", s: 0, z: -2, marg: 0, w: -33, h: 70, ca: '关闭|closeimg()', class0: 'x_b_C7A780_C7A780_000 _f_25 cent' })
        j('#iframed').html('<iframe  id=theiframe marginwidth="0" marginheight="0" scrolling=auto style="width:100%;height:100%;background:white" src='+url+' ></iframe>');
        jQuery().cls('ggk');
    }else{
        window.location =url;
    }
   
   
}
async function init() {
    // 动态构建ui
    let ca = [];
    let WW = j().getcw(), WH = j().getch(); // window width & height
    let BMH = 70; // bottom menu height
    j('.maindiv,#iframediv').css('height', WH + 'px');
    j('#votelist').css('height', (WH - 150) + 'px');
    j('.pages-container').css('height', (WH - BMH) + 'px');
   
    
    j().ui({ cid: "topmenu", z: -1, s: 10, marg: 0, w: 40, h: 23, ca: ' <div class="copy-button" style="background: url(css/copy_btn_common.png) no-repeat; height: 26px; background-size: 52%;">  </div>|funcopy({id:\'accountName\'})`<div class="qrcode-button" style="background: url(css/qrcode_btn_common.png) no-repeat; height: 42px; background-size: 70%;"> </div>|funpromotion()' , class0: '' });

    // 底部菜单按钮
    
     j().ui({ z: -1, s: 30, marg: 0, padd: 10,  w: 40, h: 50, cid: 'menu', ca: '<img src="css/mine_btn.png" style="width:100%;height:50px">|menu1()`<img src="css/vote_btn.png" style="width:100%;height:50px">|menu2()`<img src="css/discovery_btn.png" style="width:100%;height:50px">|menu3()`<img src="css/me_btn.png" style="width:100%;height:50px">|menu4()', class0: 'x_botbtn',ncheck: 1 })
    
    j('#menu_0').checkd();

    j().ui({ cid: "votemenu", z: -1, s: 10, marg: 8, w: 80, h: 23, ca: '投票|funvote()`提炼|fununlock()`推广|funpromotion()' + (j().getv('admin', '') ? '`发起|funinput(0,' + CONFIG.PID + ',0,1,\'add\')' : ''), class0: 'x_hjh _f_22 cent' });

    ca = [];
    for (let i in data.row) {
        ca.push('<div style="width: 100%; height: 60px;background:#dab17e"><img src="css/' + data.row[i].prologo + '" style="width:40px;height:40px;border-radius:10px;float:left;margin:2px;"><span id="voteBox_name" style="width: 109px; height: 45px; color: #000000; text-align: left; float: left; line-height: 45px; font-size: 19px;margin-left:25px;">' + data.row[i].title + '</span><span id="findbox_name" style="width: 154px; height: 45px; color: #000000;    font-size:13px;">' + data.row[i].game + '</span></div>');
    }
    // 游戏容器
    j().ui({ cid: "findbox", s: 10, z: 0, marg: 0, w: -98, h: 770, ca: ['<div style=" height:24px; font-size: 15px;color: white; ">游戏专区</div><div id="gamearea" style="height:256px;font-size: 25px; color: #c7a780;overflow:auto">投票结束后的优胜者在此列出</div><div style=" height:24px; font-size:15px;color: white; ">社群专区</div><div style="height:256px;font-size: 25px; color: #c7a780;overflow:auto" id="communityarea">投票结束后的优胜者在此列出</div><div style="height:24px; font-size:15px;color: white;">媒体专区</div><div style="height:256px;font-size: 25px; color: #c7a780;overflow:auto" id="mediaarea">投票结束后的优胜者在此列出</div>'], class0: 'x_b_3C3C3C_3C3C3C cent', ncheck: 1 })
    // 游戏容器
    // j().ui({ cid: "findbox", s: 10, z: 0, marg: 0, w: -98, h: 770, ca: ['<div id="gamearea" style="height:256px;font-size: 25px; color: #c7a780;overflow:auto">投票结束后的优胜者在此列出</div>'], class0: 'x_b_3C3C3C_3C3C3C cent', ncheck: 1 })





    // 解锁
    j().ui({ cid: "unlockCoeff", s: 10, z: 0, marg: 0, w: -82, h: 33, ca: ['<p style="background:#3C3C3C;color:#C1A27D;font-size:17px">用户参与投票且支付至少10 '+CONFIG.SYMBOL+',则完成转换<br>温馨提示:前往投票完成将原矿转为"'+CONFIG.SYMBOL+'"</p><input style="width: 370px; height: 35px; background: none; border: 1.5px solid #86745D; color: #C1A27D; font-size: 22px; text-indent: 14px;border-radius:7px"  id="unlockb" value="转换系数：0.01" onfocus="this.blur()">'], class0: 'x_b_3C3C3C_3C3C3C _f_22 cent', ncheck: 1 })
    // 推广
    j().ui({ cid: "invitebox", s: 10, z: 0, marg: 0, w: -82, h: 33, ca: ['<p style="background:#3C3C3C;color:#C1A27D;font-size:28px">邀请好友，瓜分海量EOS</p><p id="invitebox_xs" style="background:#3C3C3C;color:#B1B1B1;font-size:15px">推广系数=您的原矿数/被推荐人的原矿数 （不超过1）</p>'], class0: 'x_b_3C3C3C_3C3C3C _f_22 cent', ncheck: 1 })
    //j().ui({cid:"fribox",s:10,z:0,marg:0, w:-90, h:150, ca:[''],class0:'x_hji _f_22 cent' ,ncheck:1})
    
    j().ui({ cid: "BalanceBox", s: 10, z: 0, marg: 0, w: -100, h: 53, ca: ['<div id="avatar" style="width: 45px;height: 45px;background: #535353; border-radius: 45px; float: left; margin: 4px;"></div><p id="eostitle" style="width: 120px;height: 25px;float: left; margin: 4px;line-height:25px;color:#C7A780">EOS 101.9</p><p id="timetitle" style="width: 145px; height: 25px; float: left; margin-left: -117px; line-height: 25px; color: #B1B1B1; margin-top: 27px;font-size:14px">14/05/2019   14:35:12</p><p id="num" style="width: 133px; height: 25px; float: left; line-height: 25px; color: #07F1C2; margin: 4px; margin-left: 45px;">+200 AIGAC</p><p id="operating" style="width: 100px; height: 25px; float: left; margin-left: -100px; line-height: 25px; color: #B1B1B1; margin-top: 27px;font-size:16px">转入</p>'], class0: 'x_b_404040_404040 _f_22 _r_8 cent _s_000__0px_5px_10px' })

    // 地址簿
    j().ui({ cid: "dzbbox", s: 10, z: 0, marg: 0, w: -100, h: 80, ca: ['<div id="minelogo" style="width: 50px;height: 50px;background: #535353; border-radius: 50px; float: left; margin: 15px;"></div><p id="eoscate" style="width: 120px; height: 25px; float: left; text-align: left; margin-top: 15px; margin-left: 8px; line-height: 25px; color: #C7A780;">EOS</p><p id="mineeosaddress" style="width: 145px; height: 25px; float: left; margin-left: -126px; line-height: 25px; color: #B1B1B1; margin-top: 45px; font-size: 14px; text-align: left;">jfaljlef32jo23j2o3</p><p style="width: 133px; height: 25px; float: left; line-height: 25px; color: #867979; margin: 14px; margin-left: -65px;">我的收款地址</p> <button style="width: 418px; height: 60px; background: #b3966f; border: none; color: #020202; font-size: 22px; border-radius: 7px;    position: absolute;top: 613px;left: 21px;" id="add_btn" onclick="add_btn()">添加地址</button>'], class0: 'x_b_404040_404040 _f_22 cent _s_000__0px_5px_10px' })

    
    
    j().ui({ z: -1, s: 50, marg: 8, w: 110, h: 37, cid: 'Balancbtn', ca: '收款|sk()`转账|zz()', class0: 'x_b_C7A780_C7A780_000 _f_20 _r_8 cent' })
    j('#votemenu_0').checkd();
    j('#findtitle_0').checkd();




    // console.log(j("#menu_0")) 
    
   
}
function getrank(type,to,sortkey,func){

	getRankList(CONFIG.DEPLOYER, 'aigt11112222').then(resp => {
        let caa=[];
        for(let item of resp){
            let ma=item.memo.split('|');
            if(ma[0]==type && item.to ==  (to||item.to) ){
                caa.push({to:item.to,ma1:parseInt(ma[1])});
            } 
         }
         let newa=j(caa).jsort('ma'+sortkey,1);
         func(newa)

    });
}
 
async function mining() {
    j('#miningbox').show();
  
    let ca = [];    
    ca.push(grid.inp("tx", "refer", "推荐人", 0, { refer: j().getv('tid', CONFIG.DEPLOYER) }, sj.account.info.referrer ? "disabled":""));
    ca.push(grid.inp("tx", "voamount", "采矿额(EOS)", 0, { voamount: '10' }, ""));
    j().ui({ cid: "refeBox", s: 20, z: 0, marg: 0, w: -98, h: 46, ca, class0: '' });
    j('[en="voamount"]').keyup(function () {
		let todaysum=(sj.account.info.todaysum || 0)
        if(sj.todayd!=sj.account.info.paydate)todaysum=0;
        let num=j('[en="voamount"]').vale() * (10000 - parseInt(parseInt(sj.st.eosprize) * 0.1) * 10);
        j('#miningitem').html('<span style="line-height:25px">可得:' + num*0.01 + 'AIGT + '+ num*0.99 +'原矿<br>(今天已采矿：' + todaysum + 'EOS) </span> ');

    });
    j('[en="voamount"]').keyup();
	
	getrank('lockedmine',sj.account.name||CONFIG.DEPLOYER,1,function(newa){
    	let ca =[];
         for(let i=0;i<newa.length;i++){
             ca.push(' <div class="leaderText"><span style="width:60px;display:block;float:left">'+data.level[(newa[i].ma1+'').length-4]+'</span> <span style="margin-left:30px;width:180px;display:block;float:left">'+newa[i].to+'</span> <span class="aigac">'+newa[i].ma1+'</span> </div>')
         }
         j().ui({ cid: "mydigminediv", s: 2, w: -98, h: 33, ca,class0:""});
		
	 })
}

function closeimg(){
	j('[crossorigin="anonymous"]').hide();
    j('#promotion').hide();
	j('#votemenu_0').trigger("click");
}
 
async function miningbox_back() {
    j('#miningbox').hide();
    // 刷新数据
    setAccount()
}

function add_btn() {
    j('#tjdzb').show();
}

 
j('.back').mouseup(function () {
    j('.scrollView,.token-container,.account-address,.leader-board').show();
    j('#ait,.back').hide();
})
/*j('#addressbok').mouseup(function () {
    j('#dzb').show();
})*/
j('#dzbback').mouseup(function () {
    j('#dzb').hide();
})
j('.transferbtn').mouseup(function () {
    j('#transfer').hide();
})
j('#tjdzbback').mouseup(function () {
    j('#tjdzb').hide();
})

async function menu1() {
    j('#votepage,#miningbox,#mine,#dzb,#find,#transfer').hide();
    j('#minepool').show();
    // 刷新数据
    setAccount()
}
async function menu2() {
    j('#votepage').show();
    j('#minepool,#mine,#dzb,#find,#transfer,#inputtable').hide();

    let data = await getCompetitions();
    let caa = [];
    data.forEach(competition => {

        // 参赛者列表
        let ca = [];
        let indx=0;
        for (let i in competition.competitors) {
            var item = competition.competitors[i];
            if (item.from != CONFIG.DEPLOYER) {
                indx++;
				var strbtn=` <span class=title style="color:${item.endtime>Math.floor(db.gett()/1000)?'gray':'white'}" onclick="okbtn(${ CONFIG.PID},${competition.id},${item.id},'0.1000 AIGT','prize','')"> 领奖 </span> ` + parseFloat(item.reward).toFixed(0) + ' <img src=css/' + (competition.times == 12 ? 'eos_icon' : 'a') + '.png  style="width:20px;margin-bottom:-4px;" >' ;
				if(item.times==1)strbtn="已领奖"; 
				
                ca.push('<span style="background: #AE977B; width: 35px; height: 35px; line-height: 35px; text-align: center; color: #fff; font-size: 18px; border-radius: 35px; position: absolute; top: 7px; left: 8px;">' + parseInt(indx)  + '</span><span style="width: 105px; height: 30px; float: left; color: #CDAD86; font-size: 15px; position: absolute; left: 10px; top: 44px;">' + item.vote + ' <img src=css/a.png  style="width:20px;margin-bottom:-4px;" ></span><span style="width: 290px; height: 37px; color: #cdad86; cursor:point; position: absolute; top: 6px; font-size:20px; left:67px; overflow: hidden; text-overflow: ellipsis;cursor: pointer;" onclick=content(\'' + item.content + '\') >' + item.content.split('@@')[0] + ' </span><span style="width: 120px; height: 30px; color: #B1B1B1; position: absolute;text-align:right; font-size: 15px; right: 3px; ">' + item.from + '</span>' + j().ui({ w: 79, h: 35, z: 2,x:-2,y:-2, marg: 5, ca: '投票|votebtn(' + competition.id + ',' + item.id + ')', class0: 'x_b_C7A780_C7A780_000 cent _f_22 _r_10' }) + '<span style="width: 230px; height: 30px; color: #B1B1B1; position: absolute; left: 120px; font-size: 15px; top: 44px;">' + (item.reward?(j().getdatetime((item.endtime + i * 60) * 1000)).substring(5) + strbtn +' </span> ':""));
            }
        }
        let itemhtml = j().ui({ s: 0, w: -100, h: 75, ca, class0: 'x_b_3C3C3C_3C3C3C _r_1_b_5f5f5f_1', class2: '' });
        caa.push(j().ui({ w: 79, h: 35, z: -2, marg: 5, ca: '参赛|funinput(' + CONFIG.PID + ',' + competition.id + ',0,' + competition.minamount + ',\'vote\',\'报名费\')', class0: 'x_b_7ACDC8_7ACDC8_000 cent _f_22 _r_10' }) + '<div id="votetitle' + competition.id + '" style="height:35px;font-size:22px;text-indent:20px;color:#C3A47E">' + competition.content.split('@@')[0] + ' <span style="font-size:15px;cursor: pointer;" onclick=content(\'' + competition.content.split('@@')[1] + '\')>查看详细</span></div><div style="font-size: 15px;height:55px;padding-left: 20px;color:#B1B1B1;border-bottom:1px solid #5f5f5f">截止：' + (j().getdatetime((competition.endtime) * 1000)).substring(5) + ' &nbsp; &nbsp; 报名费：' + competition.minamount + ' <img style="position:relative;top:3px;width:20px;" src="css/a.png">   <br>奖金：前'+competition.winners+'名，每人可得：' + (competition.allotment>10000?(competition.allotment*0.0001+" "+CONFIG.SYMBOL):competition.allotment*0.01+ '%×')  + (competition.times == 11 ? ' 原矿奖金池' : (competition.times == 12?" EOS奖金池":" 赞助奖金总额："+ competition.prize.replace('.0000 ',''))) + ' &nbsp; &nbsp;  </div><div style="width: 100%; height: 400px; overflow-y: auto;">' + itemhtml + '</div>')


    });

    j().ui({ cid: "votelist", s: 10, z: 0, marg: 0, w: -98, h: 500, ca: caa, class0: 'x_vote _r_5__795a34_1 x_b_222_222_fff _f_22' });

}
async function votebtn(ppid, pid) {
    j('#votedetail').show();
    var item=sj.records[ppid + '_' + pid];
       
    if(item.from==sj.account.name){
        j().ui({ z: -2,  marg: 8, w: 110, h: 37, cid: 'votemenus', ca: [`编辑|funinput(${CONFIG.PID},${ppid},${pid},'0.1000 AIGT','vote','报名费')`], class0: 'x_b_C7A780_C7A780_000 _f_20 _r_8 cent' })
    }else{
        j('#votemenus').html("");
    }
    let allots=(item.allotment);
    if(allots<100){
       allots="剩余总额×"+allots+"%";
    }else{
       allots=allots*0.0001+CONFIG.SYMBOL;
    }
    j('#votefrom').html('投票给' + item.from );
  
    j().ui({ cid: "voteradi", s: 10, z: 0, marg: 0, w: -89, h: 38, padd: 12, ca: "投票并提炼，可转换原矿总量的1% =" + sj.account.info.locked * 0.01 +" "+CONFIG.SYMBOL+ "|checktype('unlock')`投票并兑换EOS <span id=exeos>兑率=(EOS基金池+原矿数/10000)/1000</span> |checktype('exchange')`仅投票，系统将会自动将" + CONFIG.SYMBOL + "转账给被投票者|checktype('vote')", class0: 'x_b_383838_383838_C7A780 _f_18', class1: 'x_radio leftm', ncheck: 1 })
    j('#voteradi_2').checkd();
    j('#voteradi_1_0').css("white-space", "normal");
    j('#voteradi_0_0').css("white-space", "normal");
    j('#voteradi_2_0').css("white-space", "normal");
    j('#vote').keyup(function () {
        j('#memodiv').html('您将向' + CONFIG.DEPLOYER + '转账手续费 0.1 GAC,且备注memo 会包含了投票数' + j('#vote').vale());
        j('#exeos').html((j('#vote').vale() * (parseInt(sj.st.eosfund) + sj.account.info.locked / 10000) / 10000000).toFixed(4));

    })
    j().ui({ cid: 'voteSubmit', s: 0, h: 40, w:120,z:-2, ca: `确定投票|okbtn(${ppid},${pid},0,'0.1000 AIGT','','vote')`, class0: 'x_b_b3966f_b3966f_000 _f_25 cent _r_6_b_aaa_1' });

    let data = await getVoters(ppid, pid);
    let ca = [];
    let votesum=0;
    data.forEach((sitem, i) => {
        // 投票者列表
        ca.push('<span style="width: 36px; height: 40px; float: left; line-height: 40px; text-align: center; color: #CDAD86; font-size: 18px;">' + (parseInt(i) + 1) + '</span><span style="width: 90px; height: 30px; color: #CDAD86; font-size: 20px; position: absolute; left: 90px; top: 8px;">' + sitem.vote + '</span> <span style="width: 79px; height: 30px; color: #B1B1B1; position: absolute; top: 10px; font-size: 19px; right: 120px;">' + sitem.from + '</span>');
        votesum+=sitem.vote;

    });
    if(!item.bmf)item.bmf=(item.vote-votesum);

    j('#voteinfo').html( "总票数："+(item.bmf?(item.bmf+votesum):item.vote)+" "+CONFIG.SYMBOL+" 其中包括" + item.from +"已支付报名费："+item.bmf+" "+CONFIG.SYMBOL +"。  红包总额"+item.prize.replace('.0000 ','')+"，"+j().getdatetime(item.endtime*1000).substring(5) +"起先到先得" + '，前'+(item.winners)+'名可得红包：'+allots+" " )
    j().ui({ cid: 'votes', s: 0, w: -100, h: 40, ca, class0: 'x_b_3C3C3C_3C3C3C _r_10p10p0p0p_b_aaa_1', class2: '' });

}

// 填表
async function funinput(ppid, pid,sid, v, type,subtype) { //发起主题

    let ca = [];
    let str = "请仔细填写表单：";
    let pitem=sj.records[ppid + '_' + pid];
    if(!sid && pitem.competitors){
        let competitor=pitem.competitors.find(v => v.from == sj.account.name);
        if(competitor)sid=competitor.id; 
       if(sid)str = "您已成功参赛, 现在可以修改部分内容：";
    } 
    let item=sj.records[pid + '_' + sid]||{content:""};
	if(type == 'vote' || sj.account.name == CONFIG.DEPLOYER )ca.push(grid.inp("tx", "vote", (type == 'add' ? '奖金类型(1:从赞助中出奖金，11:AIGT奖池,  12:EOS奖池)' : (sid?"增加":"")+ (subtype) + "(" + CONFIG.SYMBOL + ")"), 0, { vote: type == 'add' ? 1 : pitem.minamount }, ""));
    if (type == 'vote' || type == 'add') ca.push(grid.inp("tx", "memo", "参赛信息 [可修改]", 0, { memo: item.content.split('@@')[0]||(type == 'add' ? '月最佳社群评选' : '请支持我') }, ""));
    if (type == 'vote' || type == 'add') ca.push(grid.inp("tx", "url", "详细信息的url [可修改]", 0, { url: item.content.split('@@')[1]||'' }, ""));
    
    if (type == 'vote'|| type == 'add') ca.push(grid.inp("tx", "quantity", (sid?"增加":"")+(type == 'add'?"赞助金额":"红包金额(发给投票者)")+"", 0, { quantity: type == 'add'?'80000.0000 AIGT':'1000.0000 AIGT' }, ""));
    ca.push(grid.inp("tx", "allotment", "单个金额("+ CONFIG.SYMBOL+") [小于1表示：按余额百分比分配，不可修改]" , 0, { allotment:  10  }, (sid?"disabled":"")));
    ca.push(grid.inp("tx", "winners", "限制领奖人数 [不可修改,必须<256]", 0, { winners: 200 }, (sid?"disabled":"")));
    if (type == 'add') ca.push(grid.inp("tx", "endtime", "结束时间", 0, { endtime: j().getdatetime(new Date(db.getd()).getTime() + 7 * 24 * 3600000 + 4 * 3600000) }, ""));
    if (type == 'add') ca.push(grid.inp("tx", "minamount", "报名费(" + CONFIG.SYMBOL+")", 0, { minamount: '100' }, ""));
 	let va = '';
    if (type == 'digmine') {
        va = '10.0000 EOS';
    }
     str += j().ui({ cid: 'inputtable', padd: 20, s: 0, w: -90, h: 52, ca, class0: '' });
    j().jaler(str, 50, `确定|okbtn(${ppid},${pid},${sid},'${va}','${type}')`, 1);

}

//参赛弹窗确定
async function okbtn(ppid, pid,sid, v, type, subtype) {
    v = (v || j('[en="quantity"]').vale()||'1.0000') + '';
    if (v.indexOf(' ') == -1) v = parseFloat(v).toFixed(4) + ' ' + CONFIG.SYMBOL;
    
    var otype = type;
    type = type || j('#voteradi').attr('v') || "vote";
     
    let vo = subtype ? j('#vote').val() : j('[en="vote"]').val();
    let memo = `|${(j('[en="allotment"]').val() || 1) * 10000}|${j('[en="winners"]').val() || 1}|${new Date(j('[en="endtime"]').vale()).getTime() / 1000 || 0}|${j('[en="minamount"]').vale() || 1}|${vo || 10}|${(j('[en="memo"]').val() || '') + "@@" + (j('[en="url"]').val() || '')}`;
    if (type == 'digmine') memo = `${j('[en="refer"]').val() || CONFIG.DEPLOYER}|`;
   
    if (!sj.connected) {
        let jtb = type + "|" + memo;
        if(type!='digmine')  jtb = type + "|" + ppid + ":" + pid + ":" + (sid||0) + "|" + memo;
        
        j().jaler("<br><br>由于未连接你的钱包，请在钱包中向 " + CONFIG.DEPLOYER + " 转账" + v + "，<br>并粘帖以下备注/memo(已复制在剪切板)<br><br>" + jtb + "<br><br>",160);

        // 复制
        // 由于该库必须由点击某个dom触发，这里创建一个临时的dom
        let dom = document.createElement('div');
        dom.setAttribute('data-clipboard-text', jtb);
        let clipboard = new ClipboardJS(dom);
        clipboard.on('success', function (e) {
             
        });
         
        j(dom).click();
        setTimeout(function () { // 销毁
            clipboard.destroy();
        }, 100);


        return;
    }

    if (v.indexOf(CONFIG.SYMBOL) > -1) {
        if (!sj.account.balance[CONFIG.SYMBOL]) { j().jaler('余额不足，您需要先挖矿！'); return }
    }
    try {
        let resp = await transfer(v || '10.0000 EOS', type, memo, ppid, pid,sid);
        
        if (type == "digmine") {
            menu1();
        } else if (type == "add") {
			j('#guideggk').hide();
			j('#divzhezao').hide();
            menu2();
        } else if (otype == "" && subtype) {
            votebtn(ppid, pid);	
        } else {
            menu2();
			j('#guideggk').hide();
			j('#divzhezao').hide();
        }
        console.log("okbtn", resp);
    } catch (err) {
        console.error("inputbtn报错", err);
        err = eval('(' + err + ')');
        let msg=err.error.details[0].message+'ee';
        for(let n=25;n>0;n--){
            msg=msg.replace(" e"+n+'ee',data.lang["e"+n][1]);
        }
        if (err.error.details && err.error.details[0].message) j().jaler('' + msg );

    }
}

function menu3() {
    j('#votepage,#minepool,#mine,#dzb,#transfer').hide();
    j('#find').show();
}
function menu4() {
    j('#votepage,#minepool,#dzb,#find,#transfer,.pages-container').hide();
    j('#mine').show();
    // 我的顶部栏
    j('#records').html('<p style="font-size:17px;color:#c7a780" id="name" onclick="funcopy()">' + sj.account.name + '</p><p style="color:#c7a780;line-height:6px;font-size:14px" id="chainId" onclick="funcopy()">' + sj.account.publicKey + '</p>');
}

// 复制用户名
function funcopy(a) {
    a=a||{ssfun:""};
    var e = e || window.event;
    // 复制
    // 由于该库必须由点击某个dom触发，这里创建一个临时的dom
    let dom = document.createElement('div');
    let tttt=a.text || j(e.srcElement).html();
    if(a.id)tttt=j('#'+a.id).text();
    dom.setAttribute('data-clipboard-text', tttt);
    let clipboard = new ClipboardJS(dom);
    clipboard.on('success', function (e) {
        if (!a.ssfun   ) {
            j().jaler(a.sm||"您已成功复制："+tttt);
            console.log(e);
        } else {
            a.ssfun();
        }
    });
    clipboard.on('error', function (e) {
        //
        if (a.ssfun == "") {
            j().jaler('复制到剪切板失败');
        } else {
            a.ssfun();
        }
        console.log(e);
        //alert(JSON.stringify(e))
    });
    j(dom).click();
    setTimeout(function () { // 销毁
        clipboard.destroy();

    }, 100);
}

function funvote() {
    j('#votelist,#voteitem').show();
    j('#unlock,#promotion').hide();
}
function fununlock() {
    j('#votelist,#voteitem,#promotion').hide();
    j('#unlock').show();
}
function funpromotion() {
    j('#votelist,#voteitem,#unlock,#voteremark').hide();
    j('#promotion').show();
  // 顶部栏
  j().ui({ cid: "topti", s: 0, z: -1, marg: 0, w: -33, h: 70, ca: '长按下图保存|`复制链接|copy()`关闭|closeimg()', class0: 'x_b_C7A780_C7A780_000 _f_25 cent' })

  qrcode('', j().getUrl('tid', sj.account, j().getUrl('id', '')));
   
    // 邀请人数
    j().ui({ z: -1, s: 0, marg: 5, w: -98, h: 38,padd:6, cid: 'refnum', ca: [' 一级伙伴数(' + (sj.account.info.refnum || 0) + '人)<span style="float:right;color:#B1B1B1"> ' + (sj.account.info.award || 0) + '</span>', '二级伙伴数(' + (sj.account.info.ref2num || 0) + '人)<span style="float:right;color:#B1B1B1">' + (sj.account.info.award2 || 0) + '</span>'], class0: 'x_b_F3D2A3_F3D2A3 _r_10 _f_22', ncheck: 1 });
    capture('sharediv');
}
function zz() {
    j('#transfer').show();
}
function checktype(v) {
    j('#voteradi').attr('v', v);
}
async function digmine() {
    // let resp = await transfer('10.0000 EOS',"digmine",j().getv("refer")||CONFIG.DEPLOYER);
    // console.log("digmine", resp)
    okbtn(0, 0, 0, (parseFloat(j('[en="voamount"]').vale()).toFixed(4) + ' EOS') || '10.0000 EOS', "digmine");

}

function copy() {
    // 由于该库必须由点击某个dom触发，这里创建一个临时的dom
    let dom = document.createElement('div');
    dom.setAttribute('data-clipboard-text', j().getUrl('tid', sj.account, j().getUrl('id', '')));
    let clipboard = new ClipboardJS(dom);
    clipboard.on('success', function (e) {
        if (a.ssfun == "") {
            j().jaler(a.sm);
            console.log(e);
        } else {
            eval(a.ssfun);
        }
    });
    clipboard.on('error', function (e) {
        //
        if (a.ssfun == "") {
            j().jaler('复制到剪切板失败');
        } else {
            eval(a.ssfun);
        }
        console.log(e);
        //alert(JSON.stringify(e))
    });
    j(dom).click();
    setTimeout(function () { // 销毁
        clipboard.destroy();
        j().jaler('已复制好，可贴粘');
    }, 100);
}




function votebackbtn() {
    j('#votedetail').hide();
    menu2();
}

// 下拉框
j('select').mouseup(function () {
    var flag = this.value;
    j("#tjimg").attr("src", flag);
});


async function capture(id) {
    let canvas = await html2canvas(document.getElementById(id || "sharediv"));

    let img = new Image;
    img.setAttribute('crossOrigin', 'anonymous');
    img.style.position = 'absolute';
    img.src = canvas.toDataURL("image/png");
    img.onload = function () {
        let W = j('body').width(), H = j('body').height();
        let expect = this.naturalWidth / this.naturalHeight;
        let bodypect = W / H;
        if (expect >= bodypect) {
            img.style.width = W + 'px';
            img.style.top = ((H - W / expect) * 0.5) + "px";
        } else {
            img.style.height = H + 'px';
            img.style.left = ((W - H * expect) * 0.5) + "px";
        }
        j('body').append(img);
    };
}

function qrcode(id, content) {
    let elem = document.getElementById(id || "divqrcode");
    new QRCode(elem, {
        text: content,
        width: j(elem).width(),
        height: j(elem).height(),
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.L
    });
}

function logout() {
    scatter.forgetIdentity();
    scatter.logout();
    j().jalert('已退出');
    setTimeout(function () {
        window.location = location.href;
    }, 1000)
}