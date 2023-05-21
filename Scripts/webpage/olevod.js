let rHead = "<head>";
let newStyle =
  "<head><style> .ad, .ad1, .ad2, .L4A, .A4R, .wbalist_thumb.ab-light, .L1 .B1L, .B1R{display:none!important} </style>";
let body = $response.body.replace(rHead, newStyle);
$done({ body });
