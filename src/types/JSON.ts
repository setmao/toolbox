type JSONValue =
  | null
  | string
  | number
  | boolean
  | JSONArray
  | JSONObject;

interface JSONObject {
  [key: string]: JSONValue;
}

type JSONArray = Array<JSONValue>;

export type { JSONValue, JSONObject, JSONArray };
