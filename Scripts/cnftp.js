// 2023-09-02 17:35

const url = $request.url;
if (!$response.body) $done({});
const isIQY = url.includes("iqiyi.com/");
const isMG = url.includes("mgtv.com/");
const isYK = url.includes("youku.com/");
let obj = JSON.parse($response.body);

if (isIQY) {
  if (url.includes("/bottom_theme?")) {
    // 底部菜单
    if (obj?.cards?.length > 0) {
      let card = obj.cards[0];
      if (card?.items?.length > 0) {
        // 29首页 31会员中心 34我的 35发现 184随刻视频
        card.items = card.items.filter((i) =>
          ["29", "31", "34"]?.includes(i?._id)
        );
        // 修复位置
        for (let i = 0; i < card.items.length; i++) {
          card.items[i].show_order = i + 1;
        }
      }
    }
  } else if (url.includes("/common_switch?")) {
    // 通用配置
    if (obj?.content?.resource) {
      const item = [
        "activities",
        "cast_device_ad",
        "member",
        "second_floor_guide",
        "speed_ad",
        "vr"
      ];
      for (let i of item) {
        delete obj.content.resource[i];
      }
    }
  } else if (url.includes("/control/")) {
    // 左上角天气图标
    if (obj?.content?.weather) {
      delete obj.content.weather;
    }
  } else if (url.includes("/getMyMenus?")) {
    // 我的页面
    if (obj?.data?.length > 0) {
      obj.data = obj.data.filter((i) =>
        !["wd_liebiao_2", "wd_liebiao_3", "wd_liebiao_4"]?.includes(i?.statistic?.block)
      );
    }
  } else if (url.includes("/home_top_menu?")) {
    // 顶部菜单
    if (obj?.cards?.length > 0) {
      let card = obj.cards[0];
      if (card?.items?.length > 0) {
        // 1017直播 8196热点 4525518866820370中国梦
        card.items = card.items.filter((i) =>
          !["1017", "8196", "4525518866820370"]?.includes(i?._id)
        );
        for (let i = 0; i < card.items.length; i++) {
          card.items[i].show_order = i + 1;
        }
      }
    } else if (obj?.nav_group_data?.length > 0) {
      // 右上角版块 仅保留我的频道
      // 好像不生效
      obj.nav_group_data = obj.nav_group_data.filter(
        (i) => i?.group_key === "default_group"
      );
    }
  } else if (url.includes("/mixer?")) {
    // 开屏页 播放页
    if (obj) {
      const item = ["adSlots", "splashLottieFile", "splashUiConfig"];
      for (let i of item) {
        delete obj[i];
      }
    }
  } else if (url.includes("/search.video.iqiyi.com/")) {
    // 搜索框填充
    if (obj?.cache_expired_sec) {
      obj.cache_expired_sec = 1;
    }
    if (obj?.data) {
      obj.data = [{ query: "搜索内容" }];
    }
    if (obj?.show_style?.roll_period) {
      obj.show_style.roll_period = 1000;
    }
  } else if (url.includes("/views_category/")) {
    // 电视剧版块
    if (obj?.cards?.length > 0) {
      obj.cards = obj.cards.filter((i) =>
        ![
          "ad_mobile_flow",
          "ad_trueview",
          "tv-jiaodiantu"
        ]?.includes(i?.alias_name)
      );
    }
  } else if (url.includes("/views_comment/")) {
    // 播放页评论区
    if (obj?.cards?.length > 0) {
      // 评论资源位
      obj.cards = obj.cards.filter((i) =>
        ![
          "comment_resource_card",
          "comment_resource_convention_card"
        ]?.includes(i?.alias_name)
      );
    }
  } else if (url.includes("/views_home/")) {
    // 首页信息流样式1
    if (obj?.cards?.length > 0) {
      obj.cards = obj.cards.filter((i) =>
        ![
          "ad_mobile_flow", // 信息流广告
          "ad_trueview", //信息流广告
          "focus", // 顶部横版广告
          "qy_home_vip_opr_banner" // 会员营销banner
        ]?.includes(i?.alias_name)
      );
    }
  } else if (url.includes("/views_plt/")) {
    // 播放详情页
    if (obj?.kv_pair) {
      // 云影院卡片 vip优惠购买卡片
      const item = ["cloud_cinema", "vip_fixed_card"];
      for (let i of item) {
        delete obj.kv_pair[i];
      }
    }
    if (obj?.cards?.length > 0) {
      obj.cards = obj.cards.filter((i) =>
        ![
          // "cloud_cinema_detail_character", // 云影院演员列表
          // "cloud_cinema_detail_synopsis", // 云影院详情简介
          // "cloud_cinema_play_detail_tag", // 云影院详情标签
          "cloud_cinema_play_privilege", // 云影院底部文字
          "cloud_cinema_playlist", // 云影院播单
          "cloud_cinema_playlist_1", // 云影院播单2
          "cloud_cinema_playlist_2", // 云影院播单3
          // "cloud_cinema_preview_collection", // 云影院预告片选集
          "cloud_cinema_privilege_icon", // 云影院内容权益
          "cloud_cinema_star_activities", // 云影院推广横幅
          "play_ad_no_vip", // 视频关联广告
          "play_around", // 周边视频 短视频
          // "play_collection", // 选集
          "play_custom_card", // 偶像练习生定制卡片
          // "play_detail_tag", // 详情标签
          // "play_rap_custom", // 综艺 svip舞台纯享
          // "play_series_collection", // 综艺 选集 看点
          "play_splendid_collection", // 综艺 合集 正片没有的都在这里
          "play_type_topical_card_3", // 综艺 幕后花絮
          "play_type_topical_card_4", // 综艺 精彩二创
          "play_variety_custom_2", // 综艺 精彩看点
          "play_vertical", // 综艺 竖屏内容
          "play_vip_promotion", // 会员推广
          "play_water_fall_like", // 猜你喜欢
          "play_water_fall_like_title", // 猜你喜欢标题
          "plt_cloud_cinema_photo", // 云影院剧照 清晰度低
          // "plt_cloud_cinema_short1", // 云影院官方短视频
          "plt_cloud_cinema_short2", // 云影院短视频剪辑
          "plt_playlist", // 播单
          "plt_playlist_1", // 播单2
          "plt_playlist_2", // 播单3
          "funny_short_video" // 精彩短视频
        ]?.includes(i?.alias_name)
      );
    }
  } else if (url.includes("/views_search/")) {
    // 搜索页
    if (obj?.cards?.length > 0) {
      let newCards = [];
      for (let card of obj.cards) {
        if (
          [
            "ad_mobile_flow", // 信息流广告
            "hot_query_search_top_ad", //顶部广告
            "hot_query_bottom", // 底部图标
            "search_com_related_query", // 相关搜索
            "search_intent_detail_onesearch", // 为你推荐信息流
            "search_mid_text_ad", // 底部广告
            "search_small_card_ad", // 搜索短视频小图广告
            "search_topbanner_text", // 为你推荐标题
            "search_vip_banner" // vip营销
          ]?.includes(card?.strategy_com_id)
        ) {
          continue;
        } else {
          if (card?.strategy_com_id === "search_related_rec_album_gallery") {
            // 相关内容推荐
            if (card?.blocks?.length > 0) {
              let newBlocks = [];
              for (let i of card.blocks) {
                if (i.hasOwnProperty("block_name")) {
                  newBlocks.push(i);
                }
              }
              card.blocks = newBlocks;
            }
            newCards.push(card);
          } else if (card?.strategy_com_id === "search_related_rec_video_v") {
            // 相关短视频
            if (card?.blocks?.length > 0) {
              let newBlocks = [];
              for (let i of card.blocks) {
                if (i.hasOwnProperty("block_name")) {
                  newBlocks.push(i);
                }
              }
              card.blocks = newBlocks;
            }
            newCards.push(card);
          } else {
            newCards.push(card);
          }
        }
      }
      obj.cards = newCards;
    }
  } else if (url.includes("/waterfall/")) {
    // 首页信息流样式2
    if (obj?.cards?.length > 0) {
      let card = obj.cards[0];
      if (card?.blocks?.length > 0) {
        card.blocks = card.blocks.filter(
          (i) => !i.hasOwnProperty("block_class")
        );
      }
    }
  }
} else if (isMG) {
  if (url.includes("/dynamic/v1/channel/index/")) {
    // 首页信息流
    if (obj?.adInfo) {
      delete obj.adInfo;
    }
    if (obj?.data?.length > 0) {
      let newItems = [];
      for (let item of obj.data) {
        // 908热剧轮播
        // 2237节目周边 抓娃娃 芒果卡
        if (item?.moduleEntityId === "91") {
          // 首页正在追模块
          if (item?.DSLList?.length > 0) {
            for (let i of item.DSLList) {
              if (i?.data?.items?.length > 0) {
                let newItems = [];
                for (let item of i.data.items) {
                  if (item?.id === 0) {
                    // 正在追模块下的商品推广
                    continue;
                  }
                  newItems.push(item);
                }
                i.data.items = newItems;
              }
            }
          }
        } else if (item?.moduleEntityId === "2237") {
          continue;
        }
        newItems.push(item);
      }
      obj.data = newItems;
    }
    if (obj?.moduleIDS?.length > 0) {
      obj.moduleIDS = obj.moduleIDS.filter(
        (i) => !i?.moduleEntityId !== "2237"
      );
    }
  } else if (url.includes("/dynamic/v1/channel/vrsList/")) {
    // 首页顶部菜单
    if (obj?.data?.length > 0) {
      let newItems = [];
      for (let item of obj.data) {
        if (item?.vclassType === "15") {
          // 短视频
          continue;
        }
        newItems.push(item);
      }
      obj.data = newItems;
    }
  } else if (url.includes("/mobile/recommend/v2?")) {
    if (obj?.data?.default) {
      obj.data.default = { 0: ["搜索内容"] };
    }
    if (obj?.data?.recommend) {
      obj.data.recommend = [];
    }
    if (obj?.data?.interval) {
      obj.data.interval = 1000;
    }
  } else if (url.includes("/odin/c1/channel/index?")) {
    // 首页信息流
    if (obj?.data?.length > 0) {
      let newItems = [];
      for (let item of obj.data) {
        if (item?.moduleType === "childslideicon") {
          // 节目周边 抓娃娃 芒果卡
          continue;
        }
        newItems.push(item);
      }
      obj.data = newItems;
    }
  } else if (url.includes("/v3/module/list?")) {
    // 我的页面组件
    if (obj?.data?.list?.length > 0) {
      let newList = [];
      for (let item of obj.data.list) {
        // 1顶部模块 扫一扫 消息 搜索 设置
        // 2用户信息模块 芒果卡 个人信息
        // 3推荐位模块 购买会员 会员周边
        // 4用户内容模块 播放记录 追更
        // 5大芒计划 创作中心 热门作品 征稿活动
        // 5我的小芒 电商 订单
        // 6banner图模块 广告轮播图
        // 7我的服务 客服 皮肤 意见反馈
        // 8运营商专区 芒果卡 免流
        // 8兴趣中心 抓娃娃
        // 8推荐功能 钱包 福袋 芒果公益
        if ([3, 5, 6, 8]?.includes(item?.moduleType)) {
          // 推广模块
          continue;
        } else if (item?.moduleType === 2 && item?.title === "用户信息模块") {
          // 用户信息
          if (item?.data?.length > 0) {
            let newItems = [];
            for (let i of item.data) {
              if (["领取芒果卡权益", "签到赢积分"]?.includes(i?.title)) {
                continue;
              }
              newItems.push(i);
            }
            item.data = newItems;
          }
        } else if (item?.moduleType === 7 && item?.title === "我的服务") {
          // 我的服务
          if (item?.data?.length > 0) {
            let newItems = [];
            for (let i of item.data) {
              if (["功能实验室", "芒果壁纸", "我的音乐"]?.includes(i?.title)) {
                continue;
              }
              newItems.push(i);
            }
            item.data = newItems;
          }
        }
        newList.push(item);
      }
      obj.data.list = newList;
    }
  } else if (url.includes("/v10/video/info?")) {
    if (obj?.data?.categoryList?.length > 0) {
      // 1正片 2花絮片段 6设备信息 7未知 8看了还会看 9精华打包 10未知 14vip
      // 15未知 17周边大放送 18未知 20出品人 22未知 30未知 31系列推荐
      // 35音乐fm入口 36为你推荐 37音乐fm入口
      obj.data.categoryList = obj.data.categoryList.filter(
        (i) => ![2, 8, 9, 14, 17]?.includes(i?.dataType)
      );
    }
  }
} else if (isYK) {
  if (url.includes("/collect-api/get_push_interval_config_wx?")) {
    // 热剧弹窗
    if (obj?.data) {
      const item = ["tipContent", "tipContentNew"];
      for (let i of item) {
        delete obj.data[i];
      }
    }
  } else if (url.includes("columbus.gateway.new.execute")) {
    // 播放详情页组件
    if (obj?.data?.["2019030100"]?.data) {
      let objData = obj.data["2019030100"].data;
      if (objData?.data?.global) {
        let config = objData.data.global;
        if (config?.PHONE_DETAIL_TOP_TAB?.pageTabs?.length > 0) {
          config.PHONE_DETAIL_TOP_TAB.pageTabs =
            config.PHONE_DETAIL_TOP_TAB.pageTabs.filter(
              (i) => ["detail", "list", "planet"]?.includes(i?.code)
            );
        }
      }
      if (objData?.nodes?.length > 0) {
        let node0 = objData.nodes[0];
        if (node0?.nodes?.length > 0) {
          node0.nodes = node0.nodes.filter((i) =>
            ![
              "Phone运营banner",
              "播放页广告组件",
              "播放页会员引导组件",
              "播放页活动组件",
              "播放页全屏播后推荐组件",
              "播放页推荐组件",
              "播放页用户触达组件",
              "播放页有料不能停组件",
              "球区自动化组件",
              "优酷购"
            ]?.includes(i?.typeName)
          );
        }
      }
    }
  } else if (url.includes("columbus.home.query/")) {
    // 首页
    if (obj?.data?.["2019061000"]?.data) {
      let objData = obj.data["2019061000"].data;
      if (objData?.data?.indexPositionResult) {
        objData.data.indexPositionResult = [];
      }
      if (objData?.nodes?.length > 0) {
        let newNodes = [];
        for (let item of objData.nodes) {
          if (["CHILD", "COMIC2"]?.includes(item?.data?.nodeKey)) {
            // 首页菜单 少儿 动漫
            continue;
          } else if (item?.data?.nodeKey === "SELECTION") {
            // 首页信息流
            if (item?.nodes?.length > 0) {
              let newItem = [];
              for (let i of item.nodes) {
                if (i?.id === 29490) {
                  // 信息流广告
                  if (i?.nodes?.length > 0) {
                    let newII = [];
                    for (let ii of i.nodes) {
                      if (ii?.typeName === "PHONE_FEED_CARD_B_AD") {
                        // 汇川广告
                        continue;
                      }
                      newII.push(ii);
                    }
                    i.nodes = newII;
                  }
                } else if (i?.id === 31476) {
                  // 正在热播右边滚动热词
                  if (i?.data?.keywords?.length > 0) {
                    delete i.data.keywords;
                  }
                } else if (i?.id === 35505) {
                  // 优惠购会员横幅
                  continue;
                } else {
                  newItem.push(i);
                }
              }
              item.nodes = newItem;
            }
            newNodes.push(item);
          } else {
            newNodes.push(item);
          }
        }
        objData.nodes = newNodes;
      }
    }
  } else if (url.includes("columbus.uc.query/")) {
    // 我的页面
    if (obj?.data?.["2019061000"]?.data) {
      let objData = obj.data["2019061000"].data;
      if (objData?.nodes?.length > 0) {
        let objNodes = objData.nodes[0];
        if (objNodes?.nodes?.length > 0) {
          let newNodes = [];
          for (let item of objNodes.nodes) {
            if (item?.id === 32775) {
              // 个人中心二楼
              continue;
            } else if (item?.id === 28912) {
              // 我的下载 收藏 购买 场景
              if (item?.nodes?.length > 0) {
                let newII = [];
                for (let ii of item.nodes) {
                  if (ii?.id === 110429) {
                    // 免费兑换VIP
                    continue;
                  }
                  newII.push(ii);
                }
                item.nodes = newII;
              }
              newNodes.push(item);
            } else if (item?.id === 22570) {
              // 横版轮播图
              continue;
            } else if (item?.id === 36014) {
              // 业务区 星光币 优酷购 数字藏品
              continue;
            } else if (item?.id === 36015) {
              // 功能区 卡卷包 商城 设置
              if (item?.nodes?.length > 0) {
                let node0 = item.nodes[0];
                if (node0?.nodes?.length > 0) {
                  let newII = [];
                  for (let ii of node0.nodes) {
                    // 683364卡卷包 683359个性商城 683501TV助手 683367设置
                    // 683368我的客服 683502意见反馈 683366有奖调研 683372更多
                    if ([683367, 683368, 683372, 683502]?.includes(ii?.id)) {
                      newII.push(ii);
                    }
                  }
                  node0.nodes = newII;
                }
              }
              newNodes.push(item);
            } else {
              newNodes.push(item);
            }
          }
          objNodes.nodes = newNodes;
        }
      }
    }
  } else if (url.includes("haidai.lantern.appconfig.get/")) {
    // 底部菜单
    if (obj?.data?.model?.configInfo?.bottomNavigate) {
      let bottom = obj.data.model.configInfo.bottomNavigate;
      if (bottom?.data?.bottomTabList?.length > 0) {
        // HOME首页 DONGTAI短视频 SEARCH淘好片 VIP_MEMBER会员 NEW_UCENTER我的
        bottom.data.bottomTabList = bottom.data.bottomTabList.filter((i) =>
          ["HOME", "NEW_UCENTER", "VIP_MEMBER"]?.includes(i?.type)
        );
        // 修复位置
        for (let i = 0; i < bottom.data.bottomTabList.length; i++) {
          bottom.data.bottomTabList[i].menuIndex = i + 1;
        }
      }
    }
  } else if (url.includes("play.ups.appinfo.get/")) {
    // 开屏广告 播放广告
    if (obj?.data?.data) {
      const item = ["ad", "watermark", "ykad"];
      for (let i of item) {
        delete obj.data.data[i];
      }
    }
  }
}

$done({ body: JSON.stringify(obj) });
