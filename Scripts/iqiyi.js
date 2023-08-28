// 2023-08-28 11:45

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("iqiyi.com/control/3.0/init_proxy")) {
  if (obj?.content?.weather) {
    delete obj.content.weather;
  }
} else if (url.includes("iqiyi.com/mixer")) {
  if (obj) {
    const item = ["adSlots", "splashLottieFile", "splashUiConfig"];
    for (let i of item) {
      if (obj?.[i])
        delete obj[i];
    }
  }
} else if (url.includes("iqiyi.com/views_home/")) {
  if (obj?.cards?.length > 0) {
    obj.cards = obj.cards.filter((i) =>
      ![
        "ad_mobile_flow", // 信息流广告
        "ad_trueview", //信息流广告
        "focus", // 顶部横版广告
        "qy_home_vip_opr_banner" // 会员营销banner
      ].includes(i?.alias_name)
    );
  }
} else if (url.includes("iqiyi.com/waterfall/")) {
  if (obj?.cards?.length > 0) {
    let card = obj.cards[0];
    if (card?.blocks?.length > 0) {
      card.blocks = card.blocks.filter(
        (i) => !i.hasOwnProperty("block_class")
      );
    }
  }
} else if (url.includes("search.video.iqiyi.com/")) {
  if (obj?.cache_expired_sec) {
    obj.cache_expired_sec = 1;
  }
  if (obj?.data) {
    obj.data = [{ "query": "搜索电影、电视剧" }]
  }
  if (obj?.show_style?.roll_period) {
    obj.show_style.roll_period = 1000;
  }
}

$done({ body: JSON.stringify(obj) });
