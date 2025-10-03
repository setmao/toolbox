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
  locale: "en",
  metadata: {
    title: "JSON Toolbox — The modern JSON/API workspace",
    description:
      "Format, compress, search, and remix JSON payloads instantly. A startup-grade toolkit for API builders.",
    keywords: [
      "JSON toolbox",
      "API utilities",
      "JSON formatter",
      "JSON minifier",
      "Python dict to JSON",
      "JSON search",
    ],
    url: "https://example.com",
  },
  nav: {
    brand: "JSON Toolbox",
    links: [
      { href: "#workspace", label: "Workspace" },
      { href: "#tips", label: "Playbook" },
    ],
    language: {
      label: "Language",
      english: "English",
      traditionalChinese: "繁體中文",
    },
    themeToggle: "Theme",
  },
  hero: {
    badge: "JSON Workbench",
    title: "Handle JSON without the busywork.",
    subtitle:
      "Convert, clean, and inspect payloads in seconds with a focused toolset built for API teams.",
    ctas: {
      primary: "Start transforming",
    },
    highlights: [
      {
        title: "Instant results",
        body: "All processing stays in the browser, so nothing leaves your machine.",
      },
      {
        title: "Key lookup",
        body: "Find every occurrence of a field across deep JSON structures.",
      },
      // {
      //   title: "Saved presets",
      //   body: "Sign in to store templates and reuse them across projects.",
      // },
    ],
  },
  workspaceIntro: {
    title: "JSON Studio",
    description: "Switch tools quickly, compare output, and stay focused on the payload.",
  },
  workspaceUi: {
    inputLabel: "Input",
    keyLabel: "Key name",
    outputLabel: "Output",
    readOnlyHint: "Output is read-only",
    applySample: "Insert sample",
    convertNow: "Run transformation",
    copyIdle: "Copy result",
    copySuccess: "Copied",
    copyError: "Copy failed. Please copy manually.",
  },
  converters: {
    formatJson: {
      label: "Beautify JSON",
      description: "Reformat any JSON payload with smart indentation and consistent keys.",
      inputPlaceholder: '{"status":200,"message":"OK"}',
      sampleInput:
        '{"customer":{"id":1,"name":"Ada"},"orders":[{"id":101,"total":1200.5}]}',
      errors: {
        emptyInput: "Paste some JSON to format.",
        invalidJson: "We couldn't parse this JSON snippet.",
      },
    },
    minifyJson: {
      label: "Minify JSON",
      description: "Strip whitespace and line breaks to ship compact payloads.",
      inputPlaceholder: '{\n  "status": 200,\n  "message": "OK"\n}',
      sampleInput: samplePayload,
      errors: {
        emptyInput: "Paste some JSON to compress.",
        invalidJson: "We couldn't parse this JSON snippet.",
      },
    },
    jsonToYaml: {
      label: "JSON → YAML",
      description: "Turn structured payloads into readable YAML config blocks.",
      inputPlaceholder: '{"service":{"name":"api","port":8080}}',
      sampleInput:
        '{"service":{"name":"json-toolbox","env":"production","ports":[80,443]},"resources":{"memory":"512Mi","replicas":2}}',
      errors: {
        emptyInput: "Paste JSON so we can generate YAML.",
        invalidJson: "Oops, that JSON isn't valid yet.",
      },
    },
    pythonDictJson: {
      label: "Python dict → JSON",
      description: "Convert Python-style dictionaries into valid JSON instantly.",
      inputPlaceholder: "{'name': 'Ada Lovelace', 'skills': ['math', 'code']}",
      sampleInput:
        "{'payload': {'id': 1, 'active': True, 'tags': ['api', 'json'], 'metadata': None}}",
      errors: {
        emptyInput: "Paste the Python dict you want to convert.",
        parseError: "We couldn't interpret this dict. Check the syntax and try again.",
      },
    },
    searchJsonKey: {
      label: "Search JSON key",
      description: "Find every occurrence of a key across deeply nested data.",
      keyPlaceholder: "token",
      inputPlaceholder: '{"user":{"token":"abc123"},"sessions":[{"token":"zzz999"}]}',
      sampleKey: "token",
      sampleInput:
        '{"user": {"id": 12, "profile": {"token": "abc123", "history": [{"token": "zzz999"}, {"token": "yyy222"}]}}, "sessions": [{"token": "def456"}, {"token": "ghi789", "meta": {"token": null}}]}',
      errors: {
        missingKeyName: "Enter the key name you want to search.",
        missingJson: "Paste JSON to search.",
        invalidJson: "We couldn't parse the JSON block. Check the structure.",
      },
    },
    copyError: "Copy failed. Please copy manually.",
  },
  tips: {
    heading: "Operator playbook",
    items: [
      "Everything runs client-side for privacy and speed.",
      "Use the key search tab to surface nested tokens instantly.",
      "Pin tabs you rely on by bookmarking this toolkit.",
    ],
  },
  ads: {
    default: "Sponsored",
    hero: "Hero placement",
    tips: "Insights placement",
  },
  footer: {
    note: "© 2025 JSON Toolbox. Crafted for API builders everywhere.",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Contact", href: "mailto:hello@example.com" },
    ],
    contact: "Built in Taipei • Shipping worldwide",
  },
};

export default messages;
