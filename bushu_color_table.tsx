import { useState } from "react";

const data = [
  // 部名, 部首例, 代表漢字例, 色案, 色コード, 色の根拠
  { bu: "水部", bushu: "氵・水", kanji: "漁・汎・水・洗", color: "#4A90D9", hex: "#4A90D9", reason: "水＝青（見た目そのまま）", katachi: "氵と水で形が異なる" },
  { bu: "木部", bushu: "木", kanji: "林・木・材・業・機", color: "#8B6914", hex: "#8B6914", reason: "木＝茶・緑（木のイメージ）", katachi: "" },
  { bu: "金部", bushu: "金・釒", kanji: "鉱・鋼・銀・金・鉄", color: "#C0A000", hex: "#C0A000", reason: "金属＝ゴールド・シルバー", katachi: "" },
  { bu: "食部", bushu: "食・飠", kanji: "食・飲・養", color: "#E8700A", hex: "#E8700A", reason: "食＝暖色・食欲喚起のオレンジ", katachi: "" },
  { bu: "糸部", bushu: "糸・纟", kanji: "繊・紙・織", color: "#C060A0", hex: "#C060A0", reason: "繊維・布＝紫・ピンク系", katachi: "" },
  { bu: "衣部", bushu: "衣・衤・ころも", kanji: "製・衣・補", color: "#9B59B6", hex: "#9B59B6", reason: "衣類＝紫（高貴・布地）", katachi: "衣・衤で形が異なる" },
  { bu: "口部", bushu: "口", kanji: "商・器・品・同", color: "#E74C3C", hex: "#E74C3C", reason: "口＝赤（発話・活動・エネルギー）", katachi: "" },
  { bu: "火部", bushu: "灬・火", kanji: "熱・無", color: "#FF4500", hex: "#FF4500", reason: "火＝赤橙（見た目そのまま）", katachi: "" },
  { bu: "人部", bushu: "亻・人", kanji: "信・倉・保・健・修・便", color: "#2ECC71", hex: "#2ECC71", reason: "人＝緑（生命・人間らしさ）", katachi: "" },
  { bu: "車部", bushu: "車", kanji: "輸・車", color: "#7F8C8D", hex: "#7F8C8D", reason: "車・機械＝グレー（金属・工業）", katachi: "" },
  { bu: "心部", bushu: "忄・心", kanji: "情", color: "#E91E63", hex: "#E91E63", reason: "心・感情＝ピンク・赤", katachi: "" },
  { bu: "手部", bushu: "扌", kanji: "技・持", color: "#F39C12", hex: "#F39C12", reason: "手＝肌色・オレンジ（作業・技術）", katachi: "" },
  { bu: "貝部", bushu: "貝", kanji: "貨・貸・賃", color: "#D4AC0D", hex: "#D4AC0D", reason: "貝＝金（古代の通貨・富）", katachi: "" },
  { bu: "舟部", bushu: "舟", kanji: "船・航", color: "#1A6EA8", hex: "#1A6EA8", reason: "舟＝濃い青（海・水運）", katachi: "" },
  { bu: "之部（辶）", bushu: "辶", kanji: "通・運", color: "#27AE60", hex: "#27AE60", reason: "行く・道＝緑（前進・流通）", katachi: "" },
  { bu: "攵部", bushu: "攵", kanji: "放・教・政", color: "#8E44AD", hex: "#8E44AD", reason: "打つ・制御＝紫（権力・制度）", katachi: "" },
  { bu: "广部", bushu: "广", kanji: "広・店・廃", color: "#BDC3C7", hex: "#BDC3C7", reason: "屋根・建物＝グレー（建築）", katachi: "" },
  { bu: "宀部", bushu: "宀", kanji: "家・宿・宗", color: "#A0522D", hex: "#A0522D", reason: "屋根・家＝茶（土・建物）", katachi: "" },
  { bu: "土部", bushu: "土", kanji: "地", color: "#8B4513", hex: "#8B4513", reason: "土＝茶色（見た目そのまま）", katachi: "" },
  { bu: "囗部", bushu: "囗", kanji: "回・国", color: "#2C3E50", hex: "#2C3E50", reason: "囲み・国＝紺（境界・組織）", katachi: "" },
  { bu: "日部", bushu: "日", kanji: "映", color: "#F1C40F", hex: "#F1C40F", reason: "日＝黄色（見た目そのまま）", katachi: "" },
  { bu: "雨部", bushu: "雨", kanji: "電", color: "#5DADE2", hex: "#5DADE2", reason: "雨・空＝水色（空・天気）", katachi: "" },
  { bu: "生部", bushu: "生", kanji: "産・生", color: "#58D68D", hex: "#58D68D", reason: "生命＝明るい緑", katachi: "" },
  { bu: "女部", bushu: "女", kanji: "娯", color: "#FF69B4", hex: "#FF69B4", reason: "女＝ピンク（慣習的連想）", katachi: "" },
  { bu: "子部", bushu: "子", kanji: "学", color: "#3498DB", hex: "#3498DB", reason: "子・学び＝青（知性・空）", katachi: "" },
  { bu: "羽部", bushu: "羽", kanji: "習", color: "#A8D8A8", hex: "#A8D8A8", reason: "羽・鳥＝薄緑（自然・飛翔）", katachi: "" },
  { bu: "耳部", bushu: "耳", kanji: "職", color: "#E59866", hex: "#E59866", reason: "耳・聴く＝肌色系", katachi: "" },
  { bu: "石部", bushu: "石", kanji: "石", color: "#AAB7B8", hex: "#AAB7B8", reason: "石＝グレー（見た目そのまま）", katachi: "" },
  { bu: "牛部", bushu: "牜・牛", kanji: "物", color: "#784212", hex: "#784212", reason: "牛＝濃い茶（動物・農業）", katachi: "" },
  { bu: "方部", bushu: "方", kanji: "旅", color: "#1ABC9C", hex: "#1ABC9C", reason: "旅・方向＝ティール（移動）", katachi: "" },
  { bu: "邑部（阝）", bushu: "阝", kanji: "郵", color: "#E67E22", hex: "#E67E22", reason: "町・郵便＝オレンジ（郵便ポスト）", katachi: "" },
  { bu: "示部（礻）", bushu: "礻", kanji: "社", color: "#F0E68C", hex: "#F0E68C", reason: "神・礼＝淡黄（神聖・清潔）", katachi: "" },
  { bu: "刀部（刂）", bushu: "刂・刀", kanji: "刷・分", color: "#566573", hex: "#566573", reason: "刃＝濃いグレー（鋭利・切断）", katachi: "" },
  { bu: "廴部", bushu: "廴", kanji: "建", color: "#D35400", hex: "#D35400", reason: "建設＝オレンジ茶（工事・土建）", katachi: "" },
  { bu: "工部", bushu: "工", kanji: "工", color: "#2980B9", hex: "#2980B9", reason: "工業＝青（工場・技術）", katachi: "" },
  { bu: "言部（訁）", bushu: "訁・言", kanji: "設", color: "#8E44AD", hex: "#8E44AD", reason: "言葉・設計＝紫（知識・計画）", katachi: "" },
  { bu: "辰部", bushu: "辰", kanji: "農", color: "#27AE60", hex: "#27AE60", reason: "農・農業＝緑（大地・植物）", katachi: "" },
  { bu: "斗部", bushu: "斗", kanji: "料", color: "#E8DAEF", hex: "#E8DAEF", reason: "計量・料理＝薄紫", katachi: "" },
  { bu: "寸部", bushu: "寸", kanji: "専", color: "#2C3E50", hex: "#2C3E50", reason: "専門・精密＝紺（集中・専門性）", katachi: "" },
  { bu: "匕部", bushu: "匕", kanji: "化", color: "#00BCD4", hex: "#00BCD4", reason: "化学＝シアン（実験・変化）", katachi: "" },
  { bu: "一部", bushu: "一", kanji: "不", color: "#ECF0F1", hex: "#ECF0F1", reason: "無・不動＝白（シンプル・ゼロ）", katachi: "" },
  { bu: "十部", bushu: "十", kanji: "協", color: "#E74C3C", hex: "#E74C3C", reason: "協力・プラス＝赤（活動・集合）", katachi: "" },
  { bu: "卩部", bushu: "卩", kanji: "卸", color: "#95A5A6", hex: "#95A5A6", reason: "節・卸＝グレー系", katachi: "" },
  { bu: "八部", bushu: "八", kanji: "具", color: "#BDC3C7", hex: "#BDC3C7", reason: "具・道具＝シルバー", katachi: "" },
  { bu: "士部", bushu: "士", kanji: "売", color: "#884EA0", hex: "#884EA0", reason: "士・販売＝紫（格・商い）", katachi: "" },
  { bu: "夕部", bushu: "夕", kanji: "外", color: "#FF7F50", hex: "#FF7F50", reason: "夕・外国＝夕焼けオレンジ", katachi: "" },
  { bu: "非部", bushu: "非", kanji: "非", color: "#E74C3C", hex: "#E74C3C", reason: "非・否定＝赤（警告・対立）", katachi: "" },
  { bu: "尸部", bushu: "尸", kanji: "属", color: "#7D6608", hex: "#7D6608", reason: "属する＝ダークゴールド", katachi: "" },
  { bu: "匸部", bushu: "匸", kanji: "医", color: "#FFFFFF", hex: "#FFFFFF", reason: "医療＝白（清潔・病院）", katachi: "" },
  { bu: "小部", bushu: "小", kanji: "小", color: "#F8C471", hex: "#F8C471", reason: "小・小売＝淡黄（軽い・親しみ）", katachi: "" },
  { bu: "亅部", bushu: "亅", kanji: "事", color: "#7F8C8D", hex: "#7F8C8D", reason: "事・仕事＝グレー（汎用）", katachi: "" },
  { bu: "カタカナ", bushu: "—", kanji: "プ・ゴ・ガ・イ・サ", color: "#ECF0F1", hex: "#ECF0F1", reason: "外来語・未対応（要検討）", katachi: "★課題" },
];

export default function App() {
  const [filter, setFilter] = useState("all");
  const [hoverId, setHoverId] = useState(null);

  const filtered = filter === "kadai"
    ? data.filter(d => d.katachi !== "")
    : data;

  return (
    <div style={{ fontFamily: "sans-serif", padding: 16, background: "#f5f5f5", minHeight: "100vh" }}>
      <h2 style={{ margin: "0 0 4px", fontSize: 18 }}>部首 → 色 対応表</h2>
      <p style={{ margin: "0 0 12px", fontSize: 12, color: "#666" }}>色彩日本語 ルビColourful Japan™ 業種分類用（案）</p>

      <div style={{ marginBottom: 12, display: "flex", gap: 8 }}>
        <button onClick={() => setFilter("all")}
          style={{ padding: "4px 12px", borderRadius: 4, border: "1px solid #aaa",
            background: filter === "all" ? "#333" : "#fff", color: filter === "all" ? "#fff" : "#333", cursor: "pointer" }}>
          全部表示
        </button>
        <button onClick={() => setFilter("kadai")}
          style={{ padding: "4px 12px", borderRadius: 4, border: "1px solid #aaa",
            background: filter === "kadai" ? "#E74C3C" : "#fff", color: filter === "kadai" ? "#fff" : "#333", cursor: "pointer" }}>
          ⚠ 課題あり
        </button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13, background: "#fff", borderRadius: 8, overflow: "hidden" }}>
          <thead>
            <tr style={{ background: "#333", color: "#fff" }}>
              <th style={{ padding: "8px 10px", textAlign: "left" }}>部名</th>
              <th style={{ padding: "8px 10px", textAlign: "left" }}>部首</th>
              <th style={{ padding: "8px 10px", textAlign: "left" }}>代表業種漢字</th>
              <th style={{ padding: "8px 10px", textAlign: "center" }}>色案</th>
              <th style={{ padding: "8px 10px", textAlign: "left" }}>色の根拠</th>
              <th style={{ padding: "8px 10px", textAlign: "left" }}>備考・課題</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d, i) => (
              <tr key={i}
                onMouseEnter={() => setHoverId(i)}
                onMouseLeave={() => setHoverId(null)}
                style={{ background: hoverId === i ? "#f0f0f0" : i % 2 === 0 ? "#fff" : "#fafafa", borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "7px 10px", fontWeight: "bold" }}>{d.bu}</td>
                <td style={{ padding: "7px 10px" }}>{d.bushu}</td>
                <td style={{ padding: "7px 10px" }}>{d.kanji}</td>
                <td style={{ padding: "7px 10px", textAlign: "center" }}>
                  <div style={{
                    display: "inline-block",
                    width: 80,
                    height: 28,
                    background: d.color,
                    borderRadius: 4,
                    border: "1px solid #ccc",
                    verticalAlign: "middle"
                  }} title={d.hex} />
                  <div style={{ fontSize: 10, color: "#888", marginTop: 2 }}>{d.hex}</div>
                </td>
                <td style={{ padding: "7px 10px", color: "#444" }}>{d.reason}</td>
                <td style={{ padding: "7px 10px", color: d.katachi ? "#E74C3C" : "#aaa", fontSize: 12 }}>
                  {d.katachi || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ marginTop: 12, fontSize: 11, color: "#999" }}>※色案はイメージベースの初期案です。議論・調整が必要です。</p>
    </div>
  );
}
