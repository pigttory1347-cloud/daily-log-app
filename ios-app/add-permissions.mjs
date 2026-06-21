// cap sync/add 이후 iOS Info.plist에 카메라·사진 권한 문구를 보장한다.
// Capacitor가 프로젝트를 재생성하면 Info.plist가 초기화돼 권한이 사라지므로,
// 빌드 파이프라인에서 매번 이 스크립트로 다시 주입한다. (없으면 카메라 접근 시 크래시)
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const plist = join(here, "ios", "App", "App", "Info.plist");

if (!existsSync(plist)) {
  console.log("ℹ️ Info.plist 없음 — iOS 프로젝트를 먼저 만드세요:", plist);
  process.exit(0);
}

const perms = {
  NSCameraUsageDescription: "사진을 찍어 기록과 일기에 첨부하기 위해 카메라를 사용합니다.",
  NSPhotoLibraryUsageDescription: "기록과 일기에 사진을 첨부하기 위해 사진 보관함에 접근합니다.",
  NSPhotoLibraryAddUsageDescription: "기록한 사진을 사진 보관함에 저장하기 위해 접근합니다.",
};

for (const [key, value] of Object.entries(perms)) {
  try {
    execSync(`/usr/libexec/PlistBuddy -c "Print :${key}" "${plist}"`, { stdio: "ignore" });
    execSync(`/usr/libexec/PlistBuddy -c "Set :${key} '${value}'" "${plist}"`);
  } catch {
    execSync(`/usr/libexec/PlistBuddy -c "Add :${key} string '${value}'" "${plist}"`);
  }
  console.log("✓", key);
}
console.log("📷 카메라·사진 권한 문구 적용 완료");
