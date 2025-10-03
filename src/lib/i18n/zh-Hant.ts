import type { Messages } from "./messages";

const samplePayload = `{
  "status": 200,
  "message": "OK",
  "payload": {
    "items": [
      { "id": 1, "name": "alpha" },
      { "id": 2, "name": "beta" }
    ],
    "count": 2
  }
}`;

const messages: Messages = {
  locale: "zh-Hant",
  metadata: {
    title: "JSON Toolbox — 進階 JSON / API 工具箱",
    description: "秒開 JSON 工具台：格式化、壓縮、查 key、匯出 Query String，一次搞定。",
    keywords: [
      "JSON 工具",
      "API 工具",
      "JSON 格式化",
      "JSON 壓縮",
      "Python Dict 轉 JSON",
      "JSON 搜尋",
    ],
    url: "https://example.com",
  },
  nav: {
    brand: "JSON Toolbox",
    links: [
      { href: "#workspace", label: "工作台" },
      { href: "#tips", label: "操作筆記" },
    ],
    language: {
      label: "語系",
      english: "English",
      traditionalChinese: "繁體中文",
    },
    themeToggle: "主題",
  },
  hero: {
    badge: "JSON 工具台",
    title: "簡潔處理每一筆 JSON。",
    subtitle: "在瀏覽器直接格式化、搜尋、匯出，不用再來回打指令。",
    ctas: {
      primary: "開始轉換",
    },
    highlights: [
      {
        title: "即時結果",
        body: "全部在瀏覽器完成，資料不離開你的裝置。",
      },
      {
        title: "關鍵欄位搜尋",
        body: "快速找出巢狀欄位與對應值。",
      },
      {
        title: "常用頁籤",
        body: "把常用工具加入書籤，隨時快速開啟。",
      },
    ],
  },
  workspaceIntro: {
    title: "JSON Studio",
    description: "快速切換工具、比對輸出，把重點放在資料本身。",
  },
  workspaceUi: {
    inputLabel: "輸入",
    keyLabel: "欄位名稱",
    outputLabel: "輸出",
    readOnlyHint: "輸出結果為唯讀",
    applySample: "套用範例",
    convertNow: "立即轉換",
    copyIdle: "複製結果",
    copySuccess: "已複製",
    copyError: "複製失敗，請手動選取。",
  },
  converters: {
    formatJson: {
      label: "JSON 美化",
      description: "自動縮排、重新排序 key，輸出更易讀。",
      inputPlaceholder: '{"status":200,"message":"OK"}',
      sampleInput:
        '{"customer":{"id":1,"name":"Ada"},"orders":[{"id":101,"total":1200.5}]}',
      errors: {
        emptyInput: "請先貼上要美化的 JSON。",
        invalidJson: "JSON 結構有誤，請檢查後再試。",
      },
    },
    minifyJson: {
      label: "JSON 壓縮",
      description: "移除多餘空白與換行，最適合走線上傳輸。",
      inputPlaceholder: '{\n  "status": 200,\n  "message": "OK"\n}',
      sampleInput: samplePayload,
      errors: {
        emptyInput: "請先貼上要壓縮的 JSON。",
        invalidJson: "JSON 結構有誤，請檢查後再試。",
      },
    },
    jsonToYaml: {
      label: "JSON 轉 YAML",
      description: "把 JSON 結構轉成好讀的 YAML 設定檔格式。",
      inputPlaceholder: '{"service":{"name":"api","port":8080}}',
      sampleInput:
        '{"service":{"name":"json-toolbox","env":"production","ports":[80,443]},"resources":{"memory":"512Mi","replicas":2}}',
      errors: {
        emptyInput: "請貼上 JSON，我們才能輸出 YAML。",
        invalidJson: "JSON 結構有誤，請檢查後再試。",
      },
    },
    pythonDictJson: {
      label: "Python Dict → JSON",
      description: "把 Python 字典語法一鍵轉成合法 JSON。",
      inputPlaceholder: "{'name': 'Ada Lovelace', 'skills': ['math', 'code']}",
      sampleInput:
        "{'payload': {'id': 1, 'active': True, 'tags': ['api', 'json'], 'metadata': None}}",
      errors: {
        emptyInput: "請貼上要轉換的 Python Dict。",
        parseError: "無法解析字典，請確認語法是否正確。",
      },
    },
    searchJsonKey: {
      label: "搜尋 JSON Key",
      description: "輸入 key 名稱，快速找出所有巢狀位置與值。",
      keyPlaceholder: "token",
      inputPlaceholder: '{"user":{"token":"abc123"},"sessions":[{"token":"zzz999"}]}',
      sampleKey: "token",
      sampleInput:
        '{"user": {"id": 12, "profile": {"token": "abc123", "history": [{"token": "zzz999"}, {"token": "yyy222"}]}}, "sessions": [{"token": "def456"}, {"token": "ghi789", "meta": {"token": null}}]}',
      errors: {
        missingKeyName: "請填入要搜尋的欄位名稱。",
        missingJson: "請貼上要搜尋的 JSON 內容。",
        invalidJson: "JSON 結構有誤，請檢查後再試。",
      },
    },
    copyError: "複製失敗，請手動選取。",
  },
  tips: {
    heading: "操作筆記",
    items: [
      "所有運算都在瀏覽器執行，安全又快速。",
      "搜尋 key 可以同時看到巢狀路徑與值。",
      "善用瀏覽器書籤快速回到常用工具。",
    ],
  },
  ads: {
    default: "品牌合作位",
    hero: "首頁展示位",
    tips: "提示區廣告",
  },
  footer: {
    note: "© 2025 JSON Toolbox. 為 API 開發者打造。",
    links: [
      { label: "隱私權政策", href: "#" },
      { label: "使用條款", href: "#" },
      { label: "聯絡我們", href: "mailto:hello@example.com" },
    ],
    contact: "Base in Taipei · Ship worldwide",
  },
};

export default messages;
