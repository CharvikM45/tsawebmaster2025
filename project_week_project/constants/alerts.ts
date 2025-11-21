import { SeverityLevel } from "@/types";

type AlertLevelStyles = Record<
  SeverityLevel,
  { background: string; border: string; text: string }
>;

export const ALERT_LEVEL_STYLES: AlertLevelStyles = {
  info: {
    background: "rgba(56, 189, 248, 0.12)",
    border: "rgba(56, 189, 248, 0.45)",
    text: "#bae6fd",
  },
  alert: {
    background: "rgba(250, 204, 21, 0.15)",
    border: "rgba(250, 204, 21, 0.45)",
    text: "#fef08a",
  },
  emergency: {
    background: "rgba(239, 68, 68, 0.15)",
    border: "rgba(239, 68, 68, 0.45)",
    text: "#fecaca",
  },
};

