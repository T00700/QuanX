// 2023-08-08 08:55

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/driverGuard/getShieldStatus")) {
  if (obj.data?.shieldInfo) {
    obj.data.shieldInfo = [];
  }
} else if (url.includes("/driverlife/client/driver/homepage")) {
  if (obj.data?.cardList?.length > 0) {
    obj.data.cardList = obj.data.cardList.filter(
      (i) => i?.componentId === "diamond-fixed"
    );
  }
}

$done({ body: JSON.stringify(obj) });
