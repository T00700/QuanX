// ==UserScript==
// @ScriptName        百度地图净化[墨鱼版]
// @Author            @ddgksf2013
// @ForHelp           若有屏蔽广告的需求，可公众号后台回复APP名称
// @WechatID          公众号墨鱼手记
// @TgChannel         https://t.me/ddgksf2021
// @Contribute        https://t.me/ddgksf2013_bot
// @Feedback          📮 ddgksf2013@163.com 📮
// @UpdateTime        2023-05-03
// @Suitable          自行观看“# > ”注释内容
// @Attention         使用前请卸载百度地图，挂载脚本然后使用
// @Attention         如需引用请注明出处，谢谢合作！
// @Version           V1.0.4
// @ScriptURL         https://gist.githubusercontent.com/ddgksf2013/beec132ca0c3570ffa0cf331bce8f82a/raw/baidumap.adblock.conf
// ==/UserScript==


hostname=180.76.76.200, newclient.map.baidu.com, httpdns.baidubce.com

# > 百度地图_搜索推广@ddgksf2013
^https?:\/\/newclient\.map\.baidu\.com\/client\/phpui.*qt=hw url reject-200
# > 百度地图_开屏广告|首页左上角广告@ddgksf2013
^https?:\/\/newclient\.map\.baidu\.com\/client\/phpui2\/\?qt=ads url reject-200
# > 百度地图_DNS处理@ddgksf2013
^https?:\/\/httpdns\.baidubce\.com url reject-200
# > 百度地图_各种商业推广@ddgksf2013
^https?:\/\/newclient\.map\.baidu\.com\/client\/crossmarketing url reject-200
# > 百度地图_我的页面地图动态@ddgksf2013
^https?:\/\/newclient\.map\.baidu\.com\/client\/usersystem\/home\/dynamic url reject-200
