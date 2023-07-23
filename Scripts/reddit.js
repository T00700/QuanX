// 2023-07-23 15:55

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (obj.data) {
  if (obj.data?.home?.elements?.edges) {
    // Home
    obj.data.home.elements.edges = obj.data.home.elements.edges.filter(
      (i) => !i?.node?.__typename?.includes("AdPost")
    );
  } else if (obj.data?.popularV3?.elements?.edges) {
    // Popular
    obj.data.popularV3.elements.edges =
      obj.data.popularV3.elements.edges.filter(
        (i) => i?.node?.adPayload === null
      );
  } else if (obj.data?.postsInfoByIds) {
    // Popular
    // let newItems = [];
    // for (let item of obj.data.postsInfoByIds) {
    //   if (item?.__typename !== "ProfilePost") {
    //     newItems.push(item);
    //   }
    // }
    // obj.data.postsInfoByIds = newItems;
  } else if (obj.data?.subredditInfoByName?.elements?.edges) {
    obj.data.subredditInfoByName.elements.edges =
      obj.data.subredditInfoByName.elements.edges.filter(
        (i) => !i?.node?.__typename?.includes("AdPost")
      );
  } else if (obj.data?.subredditsInfoByNames) {
    obj.data.subredditsInfoByNames = obj.data.subredditsInfoByNames.map(
      (i) => ({ ...i, isNsfw: false })
    );
  }
}

$done({ body: JSON.stringify(obj) });
