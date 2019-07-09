function db() {
	this.sj = this.sj || {};
	 this.idus = 0;
	 this.t = 0;   // 
  this.ty=100;// 
  this.t0 = 0;  //   
  this.tjp = 0;// 。
  this.strzm = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  this.gett = function () {//   
    return db.t + (new Date().getTime() - db.t0)+db.ty;
  };
  this.getd = function (h) {//返回服务器的游戏日 格式：2015-01-01,h表示分界小时
    h = h || 0;
    return j().getdatetime(db.gett() - h * 3600000).split(' ')[0];
  };
    this.getrd = function (n) {
    var rad = '', sj = 13;
    for (var i = 0; i < n; i++) {
      if (i == 0) {
        sj = Math.floor(Math.random() * 104) % 52;
      } else {
        sj = Math.floor(Math.random() * 124) % 62;
      }
      rad += db.strzm.substring(sj, sj + 1);
    }
    return rad;
  };
}
function grid() {
  this.curr = 0;
  this.newtoptb = function (id, tdclas, strinner) {
    var w = j().getv('wid', '1200px');
    return '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td>&nbsp;</td><td  id=' + id + '_t>' + '</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td width="' + w + '" class="' + tdclas + '" id=' + id + '>' + strinner + '</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td  id=' + id + '_b>' + '</td><td>&nbsp;</td></tr></table>';
  };
  this.cwin = function (divid, p, bg, w, h, x, y, z, innerh, titl, classn, ww, ifgb, ifzz) {
    getdiv(divid, p, '', w, h, x, y, z, grid.rb(divid + '_d', 0, bg, h, '<div>' + titl + '</div>' + innerh, classn, ww, ifgb), '', '', 0, '');
    if (ifzz) funzhezao();
  };
  this.rb = function (tbid, i, bg, h, strinner, classn, ww, ifgb) {
    var bga = bg.split('-');
    var wb = ww || '9';
    var imgext = imgext || ".png";
    var strgb = '';
    if (ifgb) strgb = '<div style="float:right;margin-top:-15px;height:25px;width:26px">' + buildtb('gb_' + tbid, null, 'x/a26', 26, 25, 0, 0, 0, ' |hideobja("' + tbid.split('_')[0] + '");hideobja("zhezao")', 'xtb', 0, '') + '</div>';
    if (bga[1] == 1) {//只需前后
      return "<table width=100% id=" + tbid + " border=0 cellpadding=0 cellspacing=0><tr><td height=" + h + "px width=" + wb + "px style='background:url(b/" + bga[0] + imgext + ")'></td><td style='background:url(b/" + bga[0] + "1" + imgext + ")' class='" + classn + "'>" + strinner + "</td><td width=" + wb + "px style='background:url(b/" + bga[0] + imgext + ") right'>" + strgb + "</td></tr></table>";
    }
    if (bga[1] == 3) {
      var strt = strb = strr = strl = '';//<img src=css/spacer.gif>
      return "<div id=r3c2" + tbid + "_" + i + " style='background:url(b/" + bga[0] + "1" + imgext + ") top;overflow:hidden;height:" + wb + "px;margin-left:" + wb + "px;margin-right:" + wb + "px'></div><div style='background:url(b/" + bga[0] + imgext + ") left top;overflow:hidden;height:" + wb + "px;width:" + wb + "px;float:left;margin-top:-" + wb + "px'></div><div style='background:url(b/" + bga[0] + imgext + ") right top;overflow:hidden;height:" + wb + "px;width:" + wb + "px;float:right;margin-top:-" + wb + "px'></div>" + "<table width=100%  border=0 cellpadding=0 cellspacing=0><tr><td  width=" + wb + "px style='background:url(b/" + bga[0] + "2" + imgext + ")'>" + strr + "</td><td style='background:url(b/" + bga[0] + "0.png)' " + ((h == 0) ? "" : "height=" + (h - 2 * wb) + "px") + "><div   class='" + classn + "' id=r2c2" + tbid + "_" + i + ">" + strgb + strinner + "</div></td><td style='width:" + wb + "px;background:url(b/" + bga[0] + "2" + imgext + ") right'>" + strl + "</td></tr></table><div id=r3c2" + tbid + "_" + i + " style='background:url(b/" + bga[0] + "1" + imgext + ") bottom;overflow:hidden;height:14px;margin-left:" + wb + "px;margin-right:" + wb + "px'></div><div style='background:url(b/" + bga[0] + imgext + ") left bottom;overflow:hidden;height:14px;width:" + wb + "px;float:left;margin-top:-14px'></div><div style='background:url(b/" + bga[0] + imgext + ") right bottom;overflow:hidden;height:14px;width:" + wb + "px;float:right;margin-top:-14px'></div>" + strb;

    }
  };


  this.newtb = function (id, tdclas, strinner, wtb, strinner1) {
    var wtb = wtb || '100%';
    var strnewtb = '<table class="' + tdclas + '" width="' + wtb + '" border=0 cellpadding=0 cellspacing=0 id=' + id + '><tr>';
    if (strinner1) strnewtb += '<td id=tdleft_' + id + ' valign="top">' + strinner1 + '</td>';
    strnewtb += '<td valign="top" style="border-left:1px solid #333" >' + strinner + '</td>';
    return strnewtb + "</tr></table>";
  };


  this.newhtb = function (id, tdclas, innera, strtr, wtb) {
    var wtb = wtb || '100%';
    var wtbs = wtb;
    if (wtb.indexOf('%') == -1) wtbs = wtb + 'px';
    var strnewtb = '<table width="100%" border="0px" cellpadding="0px" cellspacing="0px" ><tr id=' + id + '>';

    for (var i = 0; i < innera.length; i++) {
      var strw = '';
      if (i < innera.length - 1) {
        strw = 'width:' + (wtb / innera.length) + 'px';
        if (wtb.indexOf('%') > 0) strw = 'width:' + (100 / innera.length) + '%';

      }
      if (i == 0 && innera[i].indexOf('editallr') > 0) strw = 'width:40px';
      strnewtb += '<td class="gridtd ' + tdclas + '" style="' + strw + ';border-left:1px solid #aaa;border-top:1px solid #aaa;" onclick=inivi(this) valign="top">' + innera[i] + '</td>';
    }


    return strnewtb + "</tr>" + strtr + "</table>";
  };

  this.escedit = function (id, t) {

    j('[t="' + t + '"][en="xuhao"][rid="' + id + '"]').uncheckd();

    j('[t="' + t + '"][rid="' + id + '"][begineditf="1"]').css({ 'color': '#000', 'background': '#fff' });

    j('[t="' + t + '"][rid="' + id + '"][begineditf="1"]').attr('begineditf', '0');
  };

  this.editallr = function (obj) {//整个表同步
    if (j(obj).ifcheck()) {
      j('.x_check[id="xh_0_1"]').each(function () {
        grid.editall(j(this).parent().parent().vale('rid'), j(this).parent().parent().vale('t'));
      });
    } else {
      j('.y_check[id="xh_0_1"]').each(function () {
        grid.escedit(j(this).parent().parent().vale('rid'), j(this).parent().parent().vale('t'));
      });

    }

  };
  this.editall = function (id, t) {//单行表同步
    j('[t="' + t + '"][rid="' + id + '"]').css({ 'color': '#000', 'backgroundColor': '#FFFF99' });
    j('[t="' + t + '"][rid="' + id + '"]').attr('begineditf', '1');
    j('[t="' + t + '"][en="xuhao"][rid="' + id + '"]').children().checkd();
    j('[t="' + t + '"][en="xuhao"][rid="' + id + '"]').attr('begineditf', '0');
    j('[t="' + t + '"][en="xuhao"][rid="' + id + '"]').css({ 'backgroundColor': '#fff' });
    if ((t.split('@')[0]) == 'tj') j('[t="' + t + '"][en="id"][rid="' + id + '"]').attr('begineditf', '0');
    if ((t.split('@')[0]) == 'tj') j('[t="' + t + '"][en="id"][rid="' + id + '"]').css({ 'backgroundColor': '#fff' });
  };

  this.save = function (idmn, f, ifnr) { //有f表示跨服保存
    var strt = idmn;
    if (!isNaN(idmn)) {
      strt = db.sj.mn.all[idmn].ct;
      if (db.sj.mn.all[idmn].csq) strt += "|" + db.sj.mn.all[idmn].cq.replace(/,/gi, '|');
    }
    var lurl = (window.location + '');
    if (f) { } else {
      if (lurl.indexOf('http:') == 0)
        domain = window.location.host;
    }

    db.dbajax(strt, '', function (i, json) {
      if (json.upd[0].res == 'ok') {
        if (f) {
          okn = '';
          rida = rid.split(',');
          j.each(json.upd, function (i, n) {
            if (n.cont == 0) okn += ',' + rida[i];
            if (n.id) if (n.id != rida[i]) okn += ',id错位' + n.id + '!=' + rida[i];
          });

          if (okn == '') {
            alert(rid + '保存到：' + domain);
          } else {
            alert('id=' + okn + '没有保存！');
          }
        } else {

          j.each(strt.split('|'), function (i, t) {
            var rid = j('[t="' + t + '"][begineditf="1"]').vale('rid');
            var rida = rid.split(',').unique();

            if (lurl.indexOf('grid') > -1) if (rid.indexOf('nr') > -1) window.location.replace(window.location);

            j.each(rida, function (i, n) { grid.escedit(n, t); });
          });
        }
        if (strt.indexOf('vi') > -1) {
          alert("VI表中如果涉及到新增加字段，需要在各个域名下保存一下，增加的数据，才能够在服务器上生效，数据才能够正常获取");
        }


      }
    }, '&option=01&ifnr=' + (ifnr || ''), 1);
  };

  this.xhclick = function (obj) {
    var rid = j(obj).parent().attr('rid');
    if (j(obj).ifcheck()) {
      this.curr = rid;
    } else {
      grid.escedit(rid, j(obj).parent().attr('t'));
      this.curr = 0;
    }

  };
  this.gettr = function (t, i, n, editm, c1, c2, ifxh, style) {
    var strxh = '', strtr = '';
    if (ifxh) {
      strxh = "<td  t=" + t + " en=xuhao  rid=" + i + ">" + j().ui({ cid: 'xh', class0: 'x_noy', ca: "|grid.xhclick(this)", w: 8, s: 0, h: 22, class1: 'x_check leftm', ncheck: 99 }) + "</td>";
      if (editm == 2) strxh = "<td>" + i + "</td>";
    }
    strtr = grid.gettri(t, i, n, editm, c1, c2, ifxh, style);

    return '<tr t=' + t + ' cd=' + i + '>' + strxh + strtr + '</tr>';
  };
  this.retr = function (t, i, n) {
    j('tr[cd="' + i + '"][t="' + t + '"]').html(grid.gettri(t, i, n, 0, 0, 0, 0, 11));
  };
  this.gettri = function (t, i, n, editm, c1, c2, ifxh, style) {
    var jlmb = '';
    if (style == 0) {

      var s = '';
      var fa = sj[t].f.split(',');
      j.each(fa, function (ii, en) {
        if (ii >= c1 && ii < c2) {
          if (editm == 1) s += '<td ' + (galx == 8 ? "style='border-bottom:1px solid #dbdbdb;border-left:1px solid #dbdbdb;height:32px;text-align:center;'" : "") + '>' + grid.inp(t, en, '', i, n) + '</td>';
          var vl = n[en];
          if (en == 'modifyd' || en == 'created' || en == 'logind' || en == 'shouqud') { vl = j().getdatetime(vl); }
          if (editm == 2) s += '<td  t=' + t + ' en=' + en + ' rid=' + i + ' class=' + (fa.length == (ii + 1) ? "td3" : "td2") + '>' + vl + '</td>';
        }
      });
      return s;
    }
    if (style > 10) {
      if (ifxh == 1) return '';
      if (t == 'co')
        return '<td>' + gettime(n.modifyd).split('月')[1] + code['rco'][n.rco] + ' ' + n.n0 + '币</td><td>' + n.n4 + '</td>';
    }
  };
  this.showrw = function (id) {
    parent.showobja('ltd3');
    parent.j("#bbbc").width(470);
    parent.j('#ltd3').html(getiframe('iltd3', 'w.jsp?t=rw&id=' + id));

  };
  this.inp = function (t, en, zw, rid, n, clsn, cid) {

    var clsn = clsn || "input2";
    var cid = cid || "";
    var v = (n ? (typeof (n) != 'object' ? n : n[en]) : '');
    var vl = v + "";
    var strv = '';
    var h = 22;
    if (clsn.indexOf(' r') > -1) h = 35;
    if (en == 'id' && t == 'vi@2') vl = rid;
    if (en == 'modifyd' || en == 'created' || en == 'logind' || en == 'shouqud') {
      vl = j().getdatetime(vl,1); strv = ' v=' + v;
    }
    if (cid != "") {
      cid = cid + en;
    }

    var str1 = "<input onfocus='grid.fover(this)' " + strv + " value='" + vl + "' type='" + (en.indexOf("cpw") == 0 ? "password" : ((typeof (n) == 'number' && en != 'modifyd' && en != 'created')?"number":"text")) + "' t='" + t + "' en='" + en + "' rid=" + rid + " style='box-sizing: initial;height:" + h + "px; line-height:" + h + "px; padding-left:3px;padding-right:2%;width:95%;" + (h > 30 ? "font-size:20px;" : "") + "' class='" + clsn + "' >";
    if (zw) {
      vl = ((vl + "").indexOf("gzggo.com") > -1 ? "" : vl);
      str1 = '<div style="position: relative;margin: 0 auto;">'
        + '<input ' + (cid == "" ? "" : ("id=" + cid)) + ' type="' + (en.indexOf('cpw') == 0 ? "password" : (en.indexOf('id') == 0 ? "tel" : ((typeof (n) == 'number' && en != 'modifyd' && en != 'created')?"number":"text"))) + '" autocomplete="off" onfocus=grid.fover(this)  onblur=grid.offover(this) ' + strv + ' value="' + vl + '"  type="' + (en.indexOf('cpw') == 0 ? "password" : (typeof (n) == 'number'?"number":"text")) + '" t="' + t + '" en="' + en + '" rid="' + rid + '" class="ui3inputclas" ' + ((zw == 'QQ' || zw == '更改密码' || zw == '昵称(企业名称)') ? 'style="padding: 10px 0px 10px 18px;"' : '') + '>'
        + '<span class="ui3spanclas" ' + sclick + '=grid.foveri(this) ondblclick="grid.dbfoveri(this)" style="color: #' + (vl == "" ? "999" : "12a5f8") + ';top: ' + (vl == "" ? 18 : -4) + 'px;'+(lurl.indexOf('tji')>-1?'font-size:13px':'')+'">' + zw + '</span>'
		// + '<span '+sclick+'='+(en=='_id'?'deleteMap("'+rid+'")':'deleteCol("'+rid+'","'+en+'")')+' style="position: absolute;top: -4px;right: 0px;cursor: pointer;color: #999;">×</span>'
        + '</div>';

    }
    
    if (en == 'cfun' && t == "fn" || (vl + "").indexOf("'") > -1 || (vl + "").indexOf("{") > -1 || (vl + "").indexOf("[") > -1 || (vl + "").indexOf(`"`) > -1) {

      str1 = '<div style="position: relative;margin: 0 auto;"><div contenteditable="true" onfocus="grid.fover(this)" ' + strv + '  t="' + t + '" en="' + en + '" rid="' + rid + '" style="height:' + Math.min(150, (vl.split('<BR>').length * 37)) + 'px; border: 1px solid #999;color: #333;font-size:12px;box-sizing: initial;padding-left:3px;padding-right:2%;width:95%;overflow:auto;margin: 10px 0 2px 0;text-align: left;background:#fff;" class="' + clsn + '" >' + vl.replace(/│/g, '|').replace(/\<BR\>/g, '\n').replace(/＃/g, '#').replace(/``/g, '"') + '</div><span class="ui3spanclas" onclick="grid.foveri(this)" ondblclick="grid.dbfoveri(this)" style="color: #12a5f8;top: -14px;background: url(/g/lining/css/white01.png);'+(lurl.indexOf('tji')>-1?'font-size:13px':'')+'">' + zw + '</span>'//
	  // + '<span '+sclick+'='+(en=='_id'?'deleteMap("'+rid+'")':'deleteCol("'+rid+'","'+en+'")')+' style="position: absolute;top: -14px;right: 0px;cursor: pointer;color: #999;">×</span>'
	  +'</div>';
      if (lurl.indexOf("grid.jsp") > -1) {
        str1 = '<textarea onfocus="grid.fover(this)" ' + strv + '  t="' + t + '" en="' + en + '" rid="' + rid + '" style="height:' + Math.min(150, (vl.split('<BR>').length * 23)) + 'px; border: 1px solid #999;color: #333;font-size:12px;box-sizing: initial;padding-left:3px;padding-right:2%;width:95%;overflow:auto;" class="' + clsn + '" >' + vl.replace(/│/g, '|').replace(/\<BR\>/g, '\n').replace(/＃/g, '#').replace(/``/g, '"') + '</textarea>';
		
      }
    }

    return str1;
  };
  this.beginedit = function (obj) {
    var t = j(obj).attr('t');
    var en = j(obj).attr('en');
    var rid = j(obj).attr('rid');

    j('#btn' + t + '_1').show();
    if (db.sj.mn) {
      j.each(db.sj.mn.all, function (i, n) {
        if ((n.cq + ',').indexOf(t + ',') > -1) j('[onclick*="grid.save(' + i + ')"]').show();
      });
    }

    if (obj.className == 'input4') {
    } else {
      if (obj.style.backgroundColor != '#FFFF7E') {
        obj.style.backgroundColor = '#FFFF7E';
        j(obj).css({ "background": "-webkit-gradient(linear, 0 0, 0 100%, from(#ffffff), to(#FFFF7E))" });
      }
    }
    j(obj).attr('begineditf', '1');

    j('[t="' + t + '"][en="xuhao"][rid="' + rid + '"]').children().checkd();

    return true;
  };
  this.offover = function (obj) {
    var spant = j(obj).next().css('top');
    var inpval = j(obj).val();
    if (spant == '-4px' && inpval == "") {
      j(obj).next().css({ 'top': '18px', 'color': '#999' });
    }
  };
  this.foveri = function (obj) {
    if(j("[t='editt'][en='tw']:input").length>0){ //有这个对象，表示jai项目的data
      //j("[t='editt'][en='tw']:input").val(obj.innerText+":");
	  if(j(obj).html() == "_id"){
		 j("#s_codEBtn_3").html(j(obj).siblings("input").attr("rid")).css('color','#000'); 
	  }
    }else{
      grid.fover(j(obj).siblings("input"));
      j(j(obj).siblings("input")).focus();
    }
  };
  this.dbfoveri = function (obj) {
    if(j("[t='editt'][en='tw']:input").length>0){ //有这个对象，表示jai项目的data
      j("[t='editt'][en='tw']:input").val(obj.innerText+":\/\/");
    }else{
      grid.fover(j(obj).siblings("input"));
      j(j(obj).siblings("input")).focus();
    }
  };
  this.fover = function (obj) {
    var spant = j(obj).next().css('top');
    if (spant == '18px') {
      j(obj).next().css({ 'top': '-4px', 'color': '#12a5f8' });
    }
    crid = j(obj).attr('rid');
    cren = j(obj).attr('en');
    ceditv = j(obj).vale();
    j('#hx').css('top', j(obj).position().top + j(obj).height() + 3).show();
    j('#texta').val(j(obj).val());
    j('#texta').attr('finds', '[t="' + j(obj).attr('t') + '"][en="' + j(obj).attr('en') + '"][rid="' + crid + '"]');

    if (j(obj).attr('en') == 'id' && j(obj).attr('t') == 'pg@1') {
      window.open("grid.jsp?t=cm@1&waa0=idpg=" + j(obj).vale() + "%20order%20by%20modifyd%20desc&ft=&psize=200&idpg=21&editm=1&wid=100%", "_blank")
    }
    if (j("#divjedit").length > 0 && j("#pageTitle").length > 0 && j("#guideemp").css("display") != "none") {
      app.formatterToEditor();
    }
    if (this.curr > 0) {

      j('[t="' + t + '"][rid="' + crid + '"]').each(function () {
        en = j(this).attr('en');
        if (j(this).vale() != j('[t="' + t + '"][en="' + en + '"][rid="' + grid.curr + '"]').vale()) {
          j(this).css('color', 'red');
        }
      });
      j(obj).dblclick(function () {
        j('[t="' + t + '"][rid="' + crid + '"]').each(function () {
          en = j(this).attr('en');
          cv = j('[t="' + t + '"][en="' + en + '"][rid="' + grid.curr + '"]').vale();
          if (j(this).vale() != cv && en != 'id' && en != 'ctn') {
            grid.beginedit(this);
            j(this).val(cv);
          }
        });
      });
    }
    obj.onkeyup = function (e) {
		var sobjval = j(obj).vale();
      if (sobjval && sobjval.indexOf('##') >= 0 || sobjval.indexOf('···') >= 0 || sobjval.indexOf('```') >= 0) {
        grid.pastexls(obj);
      }
	  if(j(obj).vale().indexOf('、、') >= 0)j(obj).val(j(obj).vale().replace('、、','\/\/'));
	  if(j(obj).vale().indexOf('‘') >= 0 || j(obj).vale().indexOf('’') >= 0)j(obj).val(j(obj).vale().replace(/‘/g,'\'').replace(/’/g,'\''));
    };
    obj.onchange = obj.onkeydown = function (e) {

      //hideobja('selediv|zhezao');

      if (j().mye(e).ctrlKey == true && j().mye(e).keyCode == 86 || j().mye(e).ctrlKey == true && j().mye(e).keyCode == 88 || j().mye(e).ctrlKey != true) {
        if (grid.beginedit(this) == false) return false;
      }
      var t = j(obj).attr('t');
      var rid = j(obj).attr('rid');
	  if(t=='editt'&&rid==0){
		   
	  	 if(j().mye(e).keyCode == 13 ||j().mye(e).keyCode == 116){T.searchmogo();}
		 if(j().mye(e).keyCode == 116){  //阻止浏览器事件
				if(window.event){// ie  
					try{j().mye(e).keyCode = 0;}catch(e){}  
					e.returnValue = false;  
				}else{// firefox  
					e.preventDefault();  
				}  
			} 
	  }
 if (j().mye(e).ctrlKey == true && j().mye(e).keyCode == 46) {
	/* if (document.getElementById('duibisave_' + rid + '_1')) {
          document.getElementById('duibisave_' + rid + '_1').click();
        }*/
 }
      if (j().mye(e).ctrlKey == true && j().mye(e).keyCode == 13) {
        if (document.getElementById('save' + t)) {
          navig == "fox" ? document.getElementById('save' + t).onclick() : document.getElementById('save' + t).click();
        }
        if (document.getElementById('duibisave_' + rid + '_0')) {
          document.getElementById('duibisave_' + rid + '_0').click();
        }
      }
      if (j().mye(e).keyCode == 13) j(obj).next().focus();



    }
  };
  this.addr = function (t, n) {
    var rid = 'nr' + (Math.random() + '').substring(0, 6);
    var ss = grid.gettr(t, rid, '', 1, 0, 3, 1, 0);
    j('[id="tabl_' + t + '"]').after(ss);
    j('[id="tab_' + t + '"]').after(grid.gettr(t, rid, '', 1, 3, 99, 0, 0));
  };
  this.cpn = {};
  this.psize = {};
  this.menu = function (t, wid, wy, editm, idmn) {
    var wy = Math.floor(sj[t].a.maxr / parseInt(j().getv('psize', 10)));
    if (wy > 0) {
      if (j('#tableb' + t).length == 0) j('#table' + t).after("<div class='clearfix' id=tableb" + t + "></div>");
      var curPageNo = parseInt(j().getv('curPageNo', 0));
      grid.cpn[t] = grid.cpn[t] || curPageNo;
      j('#tableb' + t + '').html(j().ui({ cid: 'tableb' + t + '', w: 80, h: 26, ca: '首页|grid.nextp(this,0,' + idmn + ')`上页|grid.nextp(this,-1,' + idmn + ')`' + ((grid.cpn[t] + 1) || 1) + "`下页|grid.nextp(this,'+1'," + idmn + ")`" + (wy + 1) + '页|grid.nextp(this,' + wy + ',' + idmn + ')' }));
    }
    if (j('#tablet' + t).length == 0) j('#table' + t).before("<div class='clearfix' id=tablet" + t + "></div>");

    // var str3="<td  class=x_blue onmouseover=j().ccss(this,1) onclick=grid.addr('" + t + "') id=add" + t + "  > 新增</td><td style='display:none;' class=xmtdr onmouseover=chcss(this,1) onclick=tianjia('" + t + "') id=tianjia" + t + "  > 添加</td> <td id=tsinfo" + t + " style='color:red; padding:3px' ></td> <td   class=x_blue onmouseover=j().ccss(this,1) onclick=grid.save('" + t + "') id=save" + t + "    >保存</td><td   class=x_blue onmouseover=j().ccss(this,1) onclick=grid.save('" + t + "',0,'nr') id=newsave" + t + "  style='display:none;'  >保存为新行</td><td   class=x_blue onmouseover=j().ccss(this,1) onclick=grid.del('" + t + "') id=del" + t + " style='display:;'   >删除</td>";
    // var stablebg="<table  border=0   cellspacing=0 cellpadding=4px><tr>"+str3+"</tr></table>";

    var ckey = '';
    if (idmn) {
      ckey = (db.sj.mn.all[idmn] && db.sj.mn.all[idmn].ckey || '');
      editm = (db.sj.mn.all[idmn] && db.sj.mn.all[idmn].editm || 1);
    }
    var stridmn = idmn || t;
    stablebg = j().ui({ cid: 'btn' + t, w: 55, ca: "新增|grid.addr('" + t + "')`保存|grid.save(" + (idmn || ("'" + t + "'")) + ")`<input type=text id=ckey" + stridmn + " value='" + ckey + "' style='height:25px;border:0'>`搜索|grid.soso(" + (idmn || ("'" + t + "'")) + ")" });
    j('#tablet' + t).html(stablebg);
    j('#btn' + t + '_1').hide();
    j('#btn' + t + '_2').css({ "width": "inherit" });
    if (editm != 1) j('#btn' + t + '_0').hide();
    // 

  };

  this.nextp = function (obj, fx, idmn) {
    var cp = fx;
    var t = j(obj).attr('id').split('_')[0].substring(6);
    if ((fx + "").substring(0, 1) == '-' || (fx + "").substring(0, 1) == '+') cp = Math.max(0, eval(grid.cpn[t] + (fx + "")));
    if (lurl.indexOf('grid') > -1) {
      window.location = j().getUrl('curPageNo', cp);
    } else {
      db.sj.mn.all[idmn].curPageNo = cp;
      grid.funmn(idmn)
    }

  };
  this.soso = function (idmn) {
    var aj = db.sj.mn.all[idmn];
    var t = aj.ct || 'cm';
    aj.curPageNo = 0;
    grid.cpn[t] = 0;
    grid.funmn(idmn);
  };
  this.funmn = function (idmn) {   //ct,id,cw,csx,cft,psize
    var aj = db.sj.mn.all[idmn];

    var t = aj.ct || 'cm';
    if (t.indexOf("(") > -1) { db.dofunc(t); return; }
    var qaa = (aj.cq || "all:id") + "|(ccl)all";
    var cgz = aj.cgz || "";
    aj.cw = (aj.cw || "1=1 ");
    var sscw = "";
    var ckey = j('#ckey' + idmn).vale();
    aj.ckey = ckey;


    if (ckey) {
      var fa = [];
      j.each(db.sj[aj.ct].all, function (i, n) {
        j.each(n, function (ii, nn) {
          fa.push(ii);
        });
        db.sj[aj.ct].f = fa.join();
        if (1 == 1) return false;
      });
      var nskey = 0;
      j.each(fa, function (i, n) {
        if (isNaN(ckey)) {//中文
          if (n.indexOf("c") == 0) sscw += " or " + n + " like '{p}" + ckey + "{p}'";
        } else {
          if (n.indexOf("id") == 0) sscw += " or " + n + "=" + ckey + "";
        }
        nskey++;
        if (nskey > 5) return false;
      });
      if (sscw != '') sscw = " and (" + sscw.substring(3) + ")"
    }


    var cpn = aj.curPageNo || parseInt(j().getv('curPageNo', 0));
    grid.cpn[t] = cpn;
    var psize = (aj.psize || 10);
    var cww = aj.cw + sscw + " order by " + (aj.csx || " id desc ") + " limit " + (cpn * psize) + "," + (psize);

    var swvi = "|cta='" + t.split("_")[0] + "' and cgz='" + cgz + "'";
    if (cgz.length == 0) swvi = "|cta='" + t.split("_")[0] + "'";

    var opt = "021";
    if (t.indexOf("vs")) opt = "011";
    if (aj.csq) {

      j().getall(jg_aj.html[idmn].m, aj.div || 'divmain', 'table' + t, {
        sqajax: aj.csq, option: '&option=021', swhe: { whe: cww }, func: function () {
          grid.menu(t, 0, 0, 1, idmn);
          if (jg_aj.html[idmn].t) j('#table' + t).before(jg_aj.html[idmn].t);
        }
      }, aj.ct, aj.cq, aj.csid, '', '', '', false);;
    } else {
      db.sajax(t + "|vi", qaa, (cww) + swvi, '01', function (i, jsn) {
        sj[t] = db.sj[t];
        sj.vi = db.sj.vi;
        grid.build('table' + t, aj.div || 'divmain', t, aj.editm || 1, '', jsn[t]);
      }, '&option=' + opt + '&idpg=' + idpg + '&idcm=' + (jg_aj.idcm || idcm || '') + '&tidcm=' + (jg_aj.tidcm || ''));
    }
    // window.location='grid.jsp?t='+n[0]+'&waa0='+(n[2]||"1=1")+n[3]+'&ft='+n[4]+'&psize='+(n[5]||26)+'&idpg=21&editm=1&wid=100%';

  };
  this.build = function (gridid, divid, t, editm, style, jsn) {
    var gdl = j().getv('gdl', 3);

    var json = jsn || sj[t];

    var dividw = j('#' + divid).width();
    var innera = new Array();
    var innera1 = new Array();
    innera[0] = '<div class=tdtop style="width:100%">&nbsp;信息</div>';
    innera[1] = '<div class=tdtop style="width:40px">&nbsp;</div>';

    innera1[0] = j().ui({ cid: 'xh' + t, ca: "|grid.editallr(this)", w: 8, s: 0, h: 22, class1: 'x_check leftm', ncheck: 99 });
    if (t == 'vi@2') {
      sj[t].f += (',id');
    }
    if (editm > 0) {

      j.each(json.f.split(','), function (ii, nn) {
        var wb = '100%'; var snn = nn;
        if (sj.vi) if (sj.vi.all[nn]) {
          if (sj.vi.all[nn].cwi) wb = (sj.vi.all[nn].cwi) + 'px';
          if (nn != 'sx') snn = sj.vi.all[nn].ctn;
          if (lurl.indexOf("grid.jsp") > -1) snn = nn + snn;
        }
        if (wb != '-1px') {
          if (ii < gdl) {
            innera1[ii + 1] = '<div class=tdtop ccl=' + nn + ' title=' + snn + ' style="width:' + wb + ';text-align:center;overflow:hidden;height:26px">' + snn + '</div>';
          } else {
            innera[ii - gdl] = '<div class=tdtop ccl=' + nn + ' title=' + snn + ' style="width:' + wb + ';text-align:center;overflow:hidden;height:26px">' + snn + '</div>';
          }
        }
      });
    }
    var strtr = ''; strtrl = ''; strxh = '';
    if (json) {
      j.each(json.all, function (i, n) {

        strtrl += grid.gettr(t, i, n, editm, 0, gdl, 1, style);
        strtr += grid.gettr(t, i, n, editm, gdl, 99, 0, style);

      });
    }
    var inners = grid.newhtb('tab_' + t, '', innera, strtr, '100%');
    var innersl = grid.newhtb('tabl_' + t, '', innera1, strtrl, '360');
    var strgrid = grid.newtb('table' + t, 'ccc', '<div id=tdou_' + t + ' style="' + (style > 10 ? '' : 'overflow-x:auto;') + '">' + inners + '</div>', '', innersl);

    document.getElementById(divid).innerHTML = strgrid;
    if (style > 10) j('#tdleft_table' + t).hide();
    var realw = dividw - j('#tdleft_table' + t).width() - 8;
    document.getElementById('tdou_' + t).style.width = (realw + 'px');
    //j('#td'+gridid).children().sortable();;
    grid.menu(t, 'divmain', '', editm);

    if (sj[t].a.maxr == 0) {
      j('.gridtd').css('border-bottom', '#333 1px solid');
      if (j('#datatishi_' + t).length == 0) j('#table' + t).after("<div id=datatishi_" + t + " class='cent div1'>无数据</div>");
    }

    if (j('.tdtop').resizable) {

      j('.tdtop').resizable({
        handles: 'e',
        stop: function (event, ui) {
          db.sajax('vi', "cwi='" + j(ui.element[0]).width() + "'", "cta='" + t.split('@')[0] + "' and ccl='" + j(ui.element[0]).attr('ccl') + "'", "", function () { });
        },
        resize: function (e, ui) {

          j(ui.element[0]).parent().width(j(ui.element[0]).width())

        }
      });
    }
  };


  this.pastexls = function (obj) {
    var en = j(obj).attr('en');
    var t = j(obj).attr('t');
    var rid = j(obj).attr('rid');
    var rv = obj.value.replace('##', '');
    var ra = rv.split('\n');
    var ca = ra[0].split(' ');
    if (ra.length + ca.length > 4)
      //if(confirm('发现'+(ra.length-1)+'行'+ca.length+'列数据,是否自动按表格模式粘帖？\n'+rv)){

      if (j('input[t="' + t + '"][en="' + en + '"]').length < ra.length - 1) { alert('请先新增足够的行。'); return; }
    var n = 0;
    var begf = 0;
    j.each(j('input[t="' + t + '"][en="' + en + '"]'), function () {
      if (j(this).attr('rid') == rid) { begf = 1 }
      if (n < ca.length && begf == 1) {
        if (grid.beginedit(this) == false) return false;
        j(this).val(ca[n]); n++;
      }



    });
    //}
  };
};
var grid = new grid();
var db = new db();
var sj = sj || {};

