// 웹앱 파일을 앱 번들(www/)로 복사한다. 앱은 인터넷 없이 이 복사본으로 동작.
// sw.js는 제외 — 앱 안에서는 파일이 로컬이라 오프라인 캐시가 필요 없다.
import { cpSync, mkdirSync, rmSync } from "node:fs";

const FILES = ["index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png"];

rmSync("www", { recursive: true, force: true });
mkdirSync("www");
for (const f of FILES) cpSync("../" + f, "www/" + f);
console.log("www/ 준비 완료:", FILES.join(", "));
