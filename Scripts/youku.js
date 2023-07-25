// 2023-07-25 16:30

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("play.ups.appinfo.get")) {
  if (obj.data.data) {
    const item = ["ad", "ykad", "watermark"];
    for (let i of item) {
      if (obj.data.data?.[i]) {
        delete obj.data.data[i];
      }
    }
  }
}

$done({ body: JSON.stringify(obj) });
