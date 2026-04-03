import { useState } from "react";

const TSE33 = {
  "3700": { code:"3700", name:"輸送用機器", kanji:"輸", radical:"車", color:"#7F8C8D" },
  "7050": { code:"7050", name:"銀行業", kanji:"融", radical:"鬲", color:"#C0A000" },
  "7200": { code:"7200", name:"その他金融業", kanji:"貸", radical:"貝", color:"#D4AC0D" },
  "3650": { code:"3650", name:"電気機器", kanji:"電", radical:"雨", color:"#5DADE2" },
  "5250": { code:"5250", name:"情報・通信業", kanji:"通", radical:"辶", color:"#27AE60" },
  "3800": { code:"3800", name:"その他製品", kanji:"製", radical:"衤", color:"#9B59B6" },
  "3050": { code:"3050", name:"食料品", kanji:"食", radical:"食", color:"#E8700A" },
  "3200": { code:"3200", name:"化学", kanji:"化", radical:"匕", color:"#00BCD4" },
  "3600": { code:"3600", name:"機械", kanji:"機", radical:"木", color:"#8B6914" },
  "4050": { code:"4050", name:"電気・ガス業", kanji:"熱", radical:"灬", color:"#FF4500" },
  "8050": { code:"8050", name:"不動産業", kanji:"地", radical:"土", color:"#8B4513" },
  "9050": { code:"9050", name:"サービス業", kanji:"務", radical:"攵", color:"#8E44AD" },
  "3250": { code:"3250", name:"医薬品", kanji:"薬", radical:"艸", color:"#58D68D" },
  "6100": { code:"6100", name:"小売業", kanji:"販", radical:"貝", color:"#D4AC0D" },
  "7100": { code:"7100", name:"証券・商品先物", kanji:"券", radical:"刀", color:"#566573" },
  "7150": { code:"7150", name:"保険業", kanji:"険", radical:"阝", color:"#E67E22" },
  "2050": { code:"2050", name:"建設業", kanji:"建", radical:"廴", color:"#D35400" },
  "3300": { code:"3300", name:"石油・石炭製品", kanji:"油", radical:"氵", color:"#4A90D9" },
  "5050": { code:"5050", name:"陸運業", kanji:"陸", radical:"阝", color:"#E67E22" },
  "5100": { code:"5100", name:"海運業", kanji:"航", radical:"舟", color:"#1A6EA8" },
  "6050": { code:"6050", name:"卸売業", kanji:"卸", radical:"卩", color:"#E74C3C" },
  "3450": { code:"3450", name:"鉄鋼", kanji:"鉄", radical:"金", color:"#C0A000" },
  "3550": { code:"3550", name:"金属製品", kanji:"鋼", radical:"金", color:"#A07010" },
  "3750": { code:"3750", name:"精密機器", kanji:"精", radical:"米", color:"#F0D080" },
  "5200": { code:"5200", name:"倉庫・運輸関連業", kanji:"倉", radical:"亻", color:"#2ECC71" },
  "0050": { code:"0050", name:"水産・農林業", kanji:"農", radical:"辰", color:"#27AE60" },
};

const EXTRA = {
  "AI":      { code:"AI",      name:"AI・デジタル変革", kanji:"革", radical:"革", color:"#00BCD4" },
  "EV":      { code:"EV",      name:"電動化・EV", kanji:"電", radical:"雨", color:"#5DADE2" },
  "CONTENT": { code:"CONTENT", name:"コンテンツ・IP", kanji:"映", radical:"日", color:"#F1C40F" },
  "SDGs":    { code:"SDGs",    name:"サステナビリティ", kanji:"循", radical:"彳", color:"#2ECC71" },
  "GLOBAL":  { code:"GLOBAL",  name:"グローバル投資", kanji:"際", radical:"阝", color:"#E67E22" },
};

const ALL = { ...TSE33, ...EXTRA };

const CATEGORIES = ["すべて", "製造業", "金融", "通信・IT", "商社・流通"];

const companies = [
  // ── 製造業 ──
  { id:"toyota",    cat:"製造業", name:"トヨタ自動車",      code:"7203", listed:"3700", period:"2025/3期", revenue:"48兆367億円",
    segments:[
      { tseCode:"3700", pct:76, detail:"自動車・部品・HEV。世界販売1,027万台。" },
      { tseCode:"7200", pct:16, detail:"カーローン・リース。前年比28.6%増。" },
      { tseCode:"EV",   pct:5,  detail:"HEV/BEV。xEV比率46.2%に上昇。" },
      { tseCode:"AI",   pct:3,  detail:"SDV・AI・コネクテッド投資1.7兆円。" },
    ]},
  { id:"sony",      cat:"製造業", name:"ソニーグループ",     code:"6758", listed:"3800", period:"2025/3期", revenue:"13兆2,096億円",
    segments:[
      { tseCode:"9050",    pct:35, detail:"PlayStation・ゲームソフト。最大の柱。" },
      { tseCode:"CONTENT", pct:22, detail:"ソニーピクチャーズ・ソニーミュージック。" },
      { tseCode:"7150",    pct:18, detail:"ソニー生命・損保・銀行。安定収益源。" },
      { tseCode:"3650",    pct:15, detail:"イメージセンサー世界首位。CMOS中核。" },
      { tseCode:"3800",    pct:10, detail:"テレビ・カメラ・ヘッドフォン。" },
    ]},
  { id:"hitachi",   cat:"製造業", name:"日立製作所",         code:"6501", listed:"3650", period:"2025/3期", revenue:"9兆7,833億円",
    segments:[
      { tseCode:"AI",   pct:29, detail:"Lumada・DX・クラウド・セキュリティ。過去最高益。" },
      { tseCode:"3650", pct:27, detail:"日立エナジー（送配電）・パワーグリッド。" },
      { tseCode:"3600", pct:24, detail:"鉄道システム・タレスGTS買収。社会インフラ。" },
      { tseCode:"3250", pct:12, detail:"日立ヘルスケア。医療機器・ライフサイエンス。" },
      { tseCode:"2050", pct:8,  detail:"ビルシステム（エレベーター・空調）。" },
    ]},
  { id:"panasonic", cat:"製造業", name:"パナソニックHD",      code:"6752", listed:"3650", period:"2025/3期", revenue:"8兆5,961億円",
    segments:[
      { tseCode:"3650", pct:32, detail:"空調・冷熱・電子部品。コンシューマー向け。" },
      { tseCode:"EV",   pct:25, detail:"車載電池（テスラ向けパナパワー）。EV踊り場。" },
      { tseCode:"3600", pct:20, detail:"FA・溶接・センシング。産業機器部門。" },
      { tseCode:"2050", pct:13, detail:"施工・建材・空調設備。住宅・店舗向け。" },
      { tseCode:"AI",   pct:10, detail:"ソフトウェアプラットフォーム事業。DX推進。" },
    ]},
  { id:"canon",     cat:"製造業", name:"キヤノン",            code:"7751", listed:"3750", period:"2025/3期", revenue:"4兆3,636億円",
    segments:[
      { tseCode:"3750", pct:38, detail:"カメラ・レンズ・プリンター。精密光学の本領。" },
      { tseCode:"9050", pct:28, detail:"複合機・ドキュメントソリューション。オフィス向け。" },
      { tseCode:"3650", pct:20, detail:"半導体露光装置・FPD装置。成長領域。" },
      { tseCode:"3250", pct:14, detail:"眼科・放射線医療機器。ヘルスケア拡大中。" },
    ]},
  { id:"mitsubishi_e", cat:"製造業", name:"三菱電機",         code:"6503", listed:"3650", period:"2025/3期", revenue:"5兆3,658億円",
    segments:[
      { tseCode:"3650", pct:30, detail:"FA・サーボ・インバーター。工場自動化の雄。" },
      { tseCode:"5050", pct:22, detail:"鉄道・ビルシステム（エレベーター）社会インフラ。" },
      { tseCode:"3600", pct:20, detail:"電力システム・変電・スマートグリッド。" },
      { tseCode:"3800", pct:16, detail:"空調・冷蔵庫・テレビ。家電・民生品。" },
      { tseCode:"AI",   pct:12, detail:"防衛・宇宙・セキュリティ。2期連続最高益。" },
    ]},
  { id:"fujitsu",   cat:"通信・IT", name:"富士通",            code:"6702", listed:"9050", period:"2025/3期", revenue:"3兆7,506億円",
    segments:[
      { tseCode:"9050", pct:55, detail:"Fujitsu Uvance・DX・モダナイゼーション。31%増。" },
      { tseCode:"AI",   pct:25, detail:"生成AI・クラウド基盤・コンサルティング。急拡大。" },
      { tseCode:"5250", pct:12, detail:"海外ICTサービス（欧州・アジア）。" },
      { tseCode:"3650", pct:8,  detail:"デバイス（半導体・電子部品）は縮小・売却中。" },
    ]},
  // ── 金融 ──
  { id:"mufg",      cat:"金融", name:"三菱UFJ FG",         code:"8306", listed:"7050", period:"2025/3期", revenue:"約20兆円（業務粗利益）",
    segments:[
      { tseCode:"7050", pct:45, detail:"三菱UFJ銀行。国内最大メガバンク。金利上昇で急拡大。" },
      { tseCode:"GLOBAL",pct:25, detail:"海外事業（米国・ASEANなど）。国際部門急成長。" },
      { tseCode:"7100", pct:15, detail:"三菱UFJモルガン・スタンレー証券。" },
      { tseCode:"7200", pct:10, detail:"信託・アセットマネジメント・リース。" },
      { tseCode:"AI",   pct:5,  detail:"デジタル・フィンテック投資。DX推進。" },
    ]},
  { id:"mizuho",    cat:"金融", name:"みずほFG",            code:"8411", listed:"7050", period:"2025/3期", revenue:"約9兆円（業務粗利益）",
    segments:[
      { tseCode:"7050", pct:42, detail:"みずほ銀行。純利益8,854億円・過去最高益。" },
      { tseCode:"7100", pct:22, detail:"みずほ証券・投資銀行・アセットマネジメント。" },
      { tseCode:"GLOBAL",pct:20, detail:"海外CIB・グローバル市場部門GMC。" },
      { tseCode:"7200", pct:11, detail:"みずほ信託銀行・リース事業。" },
      { tseCode:"AI",   pct:5,  detail:"デジタルバンキング・フィンテック事業。" },
    ]},
  { id:"daiwa",     cat:"金融", name:"大和証券グループ本社", code:"8601", listed:"7100", period:"2025/3期", revenue:"6,459億円（純営業収益）",
    segments:[
      { tseCode:"7100", pct:45, detail:"大和証券（リテール）。ウェルスマネジメント部門が経常利益22%増・806億円。個人・富裕層向け好調。" },
      { tseCode:"7200", pct:25, detail:"大和アセットマネジメント。投信・ファンドラップ収益拡大。預かり資産連動型収益が安定成長。" },
      { tseCode:"GLOBAL",pct:15, detail:"大和証券（ホールセール・海外）。株式引受・M&A助言。投資銀行部門が経常利益2.6倍の116億円。" },
      { tseCode:"7050", pct:10, detail:"大和ネクスト銀行。預金残高拡大。証券との一体サービス強化。" },
      { tseCode:"AI",   pct:5,  detail:"DX推進・デジタル証券・フィンテック。2030Vision戦略の柱。" },
    ]},
  { id:"tokio",     cat:"金融", name:"東京海上HD",          code:"8766", listed:"7150", period:"2025/3期", revenue:"約8兆円",
    segments:[
      { tseCode:"7150", pct:50, detail:"東京海上日動火災。国内損保最大手。" },
      { tseCode:"GLOBAL",pct:35, detail:"海外保険（北米・欧州）。利益の半数超を占める。" },
      { tseCode:"7050", pct:10, detail:"生命保険・あんしん生命。" },
      { tseCode:"AI",   pct:5,  detail:"InsurTech・デジタル保険事業。" },
    ]},
  { id:"orix",      cat:"金融", name:"オリックス",           code:"8591", listed:"7200", period:"2025/3期", revenue:"約3兆円",
    segments:[
      { tseCode:"7200", pct:30, detail:"法人金融・リース・ローン。多角化金融の基盤。" },
      { tseCode:"8050", pct:20, detail:"不動産開発・ホテル・賃貸。REIT事業も。" },
      { tseCode:"7150", pct:18, detail:"生命保険・医療保険。大樹生命等。" },
      { tseCode:"GLOBAL",pct:17, detail:"海外事業（アジア・米国）。投資・インフラ。" },
      { tseCode:"4050", pct:15, detail:"再生可能エネルギー・電力・環境事業。" },
    ]},
  // ── 通信・IT ──
  { id:"softbank",  cat:"通信・IT", name:"ソフトバンク(株)", code:"9434", listed:"5250", period:"2025/3期", revenue:"6兆840億円",
    segments:[
      { tseCode:"5250", pct:48, detail:"モバイル通信（携帯・法人）。国内主力事業。" },
      { tseCode:"9050", pct:22, detail:"LYコーポレーション（LINEヤフー）。PayPay等。" },
      { tseCode:"6100", pct:15, detail:"eコマース・決済（PayPay・ヤフーショッピング）。" },
      { tseCode:"AI",   pct:15, detail:"AI計算基盤（NVIDIA）・Biz-Tech事業急拡大。" },
    ]},
  { id:"sbg",       cat:"通信・IT", name:"ソフトバンクG",    code:"9984", listed:"5250", period:"2025/3期", revenue:"約7兆円",
    segments:[
      { tseCode:"GLOBAL",pct:45, detail:"SBIファンド（ARM・投資ポートフォリオ）。" },
      { tseCode:"AI",   pct:30, detail:"AI戦略投資。ARM IPO後も出資継続。" },
      { tseCode:"5250", pct:15, detail:"ソフトバンク(株)連結。国内通信基盤。" },
      { tseCode:"9050", pct:10, detail:"LINEヤフー等デジタルサービス。" },
    ]},
  { id:"ntt",       cat:"通信・IT", name:"NTTグループ",       code:"9432", listed:"5250", period:"2025/3期", revenue:"13兆5,900億円",
    segments:[
      { tseCode:"5250", pct:45, detail:"NTTドコモ・固定通信。国内最大通信インフラ。" },
      { tseCode:"9050", pct:30, detail:"NTTデータ・コミュニケーションズ。企業向けIT。" },
      { tseCode:"4050", pct:12, detail:"NTTアノードエナジー。再生可能エネルギー。" },
      { tseCode:"8050", pct:8,  detail:"NTT都市開発。局舎跡地の再開発。" },
      { tseCode:"AI",   pct:5,  detail:"光電融合IOWN・生成AI基盤。次世代通信。" },
    ]},
  { id:"rakuten",   cat:"通信・IT", name:"楽天グループ",      code:"4755", listed:"5250", period:"2025/3期", revenue:"2兆1,534億円",
    segments:[
      { tseCode:"6100", pct:35, detail:"楽天市場・トラベル・EC。インターネットサービス。" },
      { tseCode:"7200", pct:30, detail:"楽天銀行・楽天カード・楽天証券。フィンテック。" },
      { tseCode:"5250", pct:30, detail:"楽天モバイル。完全仮想化ネットワーク。赤字縮小中。" },
      { tseCode:"AI",   pct:5,  detail:"AI活用のパーソナライゼーション・データ基盤。" },
    ]},
  // ── 商社・流通 ──
  { id:"mitsubishi", cat:"商社・流通", name:"三菱商事",       code:"8058", listed:"6050", period:"2025/3期", revenue:"約20兆円",
    segments:[
      { tseCode:"3300", pct:28, detail:"LNG・石炭・原油。資源が最大の稼ぎ頭。" },
      { tseCode:"3050", pct:22, detail:"食料・ローソン完全子会社。農業バリューチェーン。" },
      { tseCode:"3600", pct:20, detail:"プラント・電力・自動車。総合商社の工業部門。" },
      { tseCode:"7200", pct:15, detail:"三菱UFJ協業。リース・ファイナンス。" },
      { tseCode:"3200", pct:15, detail:"化学品・電池材料など新素材拡大中。" },
    ]},
  { id:"itochu",    cat:"商社・流通", name:"伊藤忠商事",      code:"8001", listed:"6050", period:"2025/3期", revenue:"約14兆円",
    segments:[
      { tseCode:"3050", pct:30, detail:"食料・ファミリーマート。非資源No.1。" },
      { tseCode:"6100", pct:25, detail:"繊維・ブランド・小売（ファミマ含む）。" },
      { tseCode:"4050", pct:20, detail:"エネルギー・化学品・電力。" },
      { tseCode:"3600", pct:15, detail:"機械・プラント・建設機械（ヤンマー等）。" },
      { tseCode:"AI",   pct:10, detail:"DX推進・デジタルビジネス・データ活用。" },
    ]},
  { id:"marubeni",  cat:"商社・流通", name:"丸紅",            code:"8002", listed:"6050", period:"2025/3期", revenue:"約10兆円",
    segments:[
      { tseCode:"4050", pct:30, detail:"電力・エネルギー・LNG。再エネ最大手級。" },
      { tseCode:"0050", pct:25, detail:"食料・穀物・農産品。世界的な農業インフラ。" },
      { tseCode:"3600", pct:22, detail:"航空機・船舶・産業機械。グローバル展開。" },
      { tseCode:"3200", pct:13, detail:"化学品・プラスチック原料。" },
      { tseCode:"SDGs", pct:10, detail:"再生可能エネルギー・サステナビリティ投資。" },
    ]},
  { id:"aeon",      cat:"商社・流通", name:"イオン",           code:"8267", listed:"6100", period:"2025/2期", revenue:"11兆3,249億円",
    segments:[
      { tseCode:"6100", pct:55, detail:"総合スーパー・SM・DS。国内最大小売グループ。" },
      { tseCode:"7200", pct:20, detail:"イオンフィナンシャル・カード・電子マネー。" },
      { tseCode:"8050", pct:12, detail:"ショッピングモール開発・不動産賃貸事業。" },
      { tseCode:"9050", pct:8,  detail:"ヘルス＆ウェルネス・クリニック・薬局。" },
      { tseCode:"AI",   pct:5,  detail:"デジタルショッピング・POSデータ活用。" },
    ]},
  { id:"keyence",   cat:"製造業", name:"キーエンス",          code:"6861", listed:"3750", period:"2025/3期", revenue:"9,799億円",
    segments:[
      { tseCode:"3750", pct:70, detail:"センサー・計測機器・FA向け精密機器。高付加価値。" },
      { tseCode:"AI",   pct:20, detail:"画像処理AI・スマートファクトリー・データ解析。" },
      { tseCode:"GLOBAL",pct:10, detail:"海外売上比率55%超。グローバル展開加速。" },
    ]},
];

const seg2info = (s) => ({ ...ALL[s.tseCode], pct: s.pct, detail: s.detail });

function KanjiTag({ seg, onClick, selected }) {
  const info = seg2info(seg);
  return (
    <div onClick={() => onClick(seg)} style={{
      display:"inline-flex", flexDirection:"column", alignItems:"center",
      background: selected ? info.color : "#fff",
      border:`2px solid ${info.color}`,
      borderRadius:10, padding:"5px 9px", cursor:"pointer", margin:3,
      boxShadow: selected ? `0 2px 10px ${info.color}66` : "none",
      transition:"all 0.15s"
    }}>
      <span style={{fontSize:28, color: selected?"#fff":info.color, fontWeight:"bold", lineHeight:1}}>{info.kanji}</span>
      <span style={{fontSize:9, color: selected?"#fff":"#aaa", marginTop:2}}>{seg.pct}%</span>
    </div>
  );
}

function TSEBadge({ tseCode }) {
  const info = ALL[tseCode]; if (!info) return null;
  const isExtra = !!EXTRA[tseCode];
  return (
    <span style={{
      display:"inline-block", fontSize:10, padding:"2px 7px", borderRadius:10,
      background: isExtra?"#f0f0f0":info.color, color: isExtra?info.color:"#fff",
      border: isExtra?`1px solid ${info.color}`:"none", marginLeft:5, fontWeight:"bold"
    }}>
      {isExtra?`★${info.code}`:info.code} {info.name}
    </span>
  );
}

function RelatedCompanies({ activeId, tseCode }) {
  const related = companies.filter(c => c.id !== activeId && c.segments.some(s => s.tseCode === tseCode));
  if (!related.length) return null;
  return (
    <div style={{marginTop:6, fontSize:11}}>
      <b style={{color:"#888"}}>同コードを持つ企業：</b>
      {related.map(c => {
        const s = c.segments.find(s2 => s2.tseCode === tseCode);
        return <span key={c.id} style={{marginLeft:6, background:"#f0f0f0", borderRadius:6, padding:"1px 7px", fontSize:11}}>{c.name}（{s.pct}%）</span>;
      })}
    </div>
  );
}

export default function App() {
  const [cat, setCat] = useState("すべて");
  const [activeCompany, setActiveCompany] = useState(companies[0]);
  const [selectedSeg, setSelectedSeg] = useState(null);
  const [view, setView] = useState("visual");
  const [browseCode, setBrowseCode] = useState(null);

  const displayed = cat === "すべて" ? companies : companies.filter(c => c.cat === cat);
  const listedInfo = TSE33[activeCompany.listed];
  const maxPct = Math.max(...activeCompany.segments.map(s => s.pct));
  const selectedInfo = selectedSeg ? seg2info(selectedSeg) : null;
  const browsed = browseCode ? companies.filter(c => c.segments.some(s => s.tseCode === browseCode)) : [];

  const handleCompany = (c) => { setActiveCompany(c); setSelectedSeg(null); setBrowseCode(null); };
  const handleSeg = (s) => setSelectedSeg(selectedSeg?.tseCode === s.tseCode ? null : s);

  return (
    <div style={{fontFamily:"'メイリオ',sans-serif", background:"#f5f6fa", minHeight:"100vh", padding:14, paddingBottom:40}}>
      <h2 style={{fontSize:15, margin:0}}>企業 漢字プロファイル × 東証33業種コード連携</h2>
      <p style={{fontSize:11, color:"#888", margin:"2px 0 10px"}}>売上比率順に漢字を並べるだけで企業の多面的な顔が一目でわかる　色彩日本語 ルビColourful Japan™（出願中）　({companies.length}社収録)</p>

      {/* カテゴリフィルター */}
      <div style={{display:"flex", gap:4, marginBottom:8, flexWrap:"wrap"}}>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            padding:"4px 11px", borderRadius:20, border:"none", cursor:"pointer", fontSize:11,
            background: cat===c?"#2C3E50":"#ddd", color: cat===c?"#fff":"#333"
          }}>{c}</button>
        ))}
      </div>

      {/* 企業ボタン一覧 */}
      <div style={{display:"flex", gap:4, marginBottom:12, flexWrap:"wrap"}}>
        {displayed.map(c => (
          <button key={c.id} onClick={() => handleCompany(c)} style={{
            padding:"5px 10px", borderRadius:16, border:`2px solid ${activeCompany.id===c.id?"#2C3E50":"transparent"}`,
            cursor:"pointer", fontSize:11, background: activeCompany.id===c.id?"#2C3E50":"#fff",
            color: activeCompany.id===c.id?"#fff":"#333", boxShadow:"0 1px 4px rgba(0,0,0,0.1)"
          }}>{c.name}</button>
        ))}
      </div>

      {/* 企業ヘッダー */}
      <div style={{background:"#2C3E50", color:"#fff", borderRadius:10, padding:"10px 14px", marginBottom:10}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:8}}>
          <div>
            <div style={{fontSize:15, fontWeight:"bold"}}>{activeCompany.name}
              <span style={{fontSize:11, color:"#aaa", marginLeft:8}}>{activeCompany.code}</span>
            </div>
            <div style={{fontSize:11, color:"#aaa"}}>{activeCompany.period}　{activeCompany.revenue}</div>
            {listedInfo && (
              <div style={{marginTop:3, fontSize:11}}>
                東証：<span style={{background:listedInfo.color, color:"#fff", borderRadius:6, padding:"1px 7px", marginLeft:2}}>{listedInfo.code} {listedInfo.name}</span>
                <span style={{color:"#888", fontSize:10, marginLeft:5}}>（主要業種）</span>
              </div>
            )}
          </div>
          <div style={{display:"flex", gap:4, alignItems:"center", flexWrap:"wrap"}}>
            {activeCompany.segments.map((s,i) => {
              const info = seg2info(s);
              return (
                <div key={i} style={{textAlign:"center"}}>
                  <div style={{fontSize:26, color:info.color, fontWeight:"bold", lineHeight:1}}>{info.kanji}</div>
                  <div style={{fontSize:9, color:"#aaa"}}>{s.pct}%</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 表示切替 */}
      <div style={{display:"flex", gap:4, marginBottom:10}}>
        {[["visual","ビジュアル"],["bar","比率グラフ"],["code","業種コード表"]].map(([v,l]) => (
          <button key={v} onClick={() => setView(v)} style={{
            padding:"4px 11px", borderRadius:20, border:"none", cursor:"pointer", fontSize:11,
            background: view===v?"#566573":"#ddd", color: view===v?"#fff":"#333"
          }}>{l}</button>
        ))}
      </div>

      {/* ビジュアル */}
      {view==="visual" && (
        <div style={{background:"#fff", borderRadius:10, padding:14, marginBottom:10}}>
          <div style={{fontSize:11, color:"#aaa", marginBottom:8}}>漢字をタップ → 詳細＋同業種コードの他社表示</div>
          <div style={{display:"flex", flexWrap:"wrap"}}>
            {activeCompany.segments.map((s,i) => <KanjiTag key={i} seg={s} onClick={handleSeg} selected={selectedSeg?.tseCode===s.tseCode} />)}
          </div>
          {selectedSeg && selectedInfo && (
            <div style={{marginTop:10, padding:12, background:"#f8f9fa", borderRadius:8, borderLeft:`4px solid ${selectedInfo.color}`}}>
              <div style={{display:"flex", alignItems:"flex-start", gap:12, flexWrap:"wrap"}}>
                <span style={{fontSize:44, color:selectedInfo.color, fontWeight:"bold", lineHeight:1}}>{selectedInfo.kanji}</span>
                <div style={{flex:1, fontSize:12}}>
                  <div style={{fontWeight:"bold", fontSize:14}}>{selectedInfo.name} <span style={{color:selectedInfo.color}}>{selectedSeg.pct}%</span></div>
                  <TSEBadge tseCode={selectedSeg.tseCode} />
                  <div style={{color:"#555", marginTop:5}}>{selectedSeg.detail}</div>
                  <div style={{color:"#aaa", fontSize:10, marginTop:3}}>部首：{selectedInfo.radical}</div>
                  <RelatedCompanies activeId={activeCompany.id} tseCode={selectedSeg.tseCode} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 比率グラフ */}
      {view==="bar" && (
        <div style={{background:"#fff", borderRadius:10, padding:14, marginBottom:10}}>
          {activeCompany.segments.map((s,i) => {
            const info = seg2info(s);
            return (
              <div key={i} style={{marginBottom:10}}>
                <div style={{display:"flex", alignItems:"center", gap:8}}>
                  <span style={{fontSize:28, color:info.color, fontWeight:"bold", lineHeight:1, minWidth:34, textAlign:"center"}}>{info.kanji}</span>
                  <div style={{flex:1}}>
                    <div style={{display:"flex", justifyContent:"space-between", fontSize:11, marginBottom:2}}>
                      <span>{info.name} <TSEBadge tseCode={s.tseCode} /></span>
                      <span style={{fontWeight:"bold", color:info.color}}>{s.pct}%</span>
                    </div>
                    <div style={{background:"#eee", borderRadius:4, height:10, overflow:"hidden"}}>
                      <div style={{width:`${(s.pct/maxPct)*100}%`, background:info.color, height:"100%", borderRadius:4, transition:"width 0.5s"}} />
                    </div>
                    <div style={{fontSize:10, color:"#999", marginTop:2}}>{s.detail}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 業種コード表 */}
      {view==="code" && (
        <div style={{background:"#fff", borderRadius:10, padding:14, marginBottom:10}}>
          <p style={{fontSize:11, color:"#888", marginBottom:10}}>コードをクリックすると同業種コードを持つ全企業を横断表示</p>
          <table style={{width:"100%", borderCollapse:"collapse", fontSize:12}}>
            <thead>
              <tr style={{background:"#2C3E50", color:"#fff"}}>
                <th style={{padding:"6px 8px", textAlign:"center"}}>漢字</th>
                <th style={{padding:"6px 8px", textAlign:"left"}}>業種名</th>
                <th style={{padding:"6px 8px", textAlign:"left"}}>東証コード</th>
                <th style={{padding:"6px 8px", textAlign:"right"}}>比率</th>
              </tr>
            </thead>
            <tbody>
              {activeCompany.segments.map((s,i) => {
                const info = seg2info(s);
                const isExtra = !!EXTRA[s.tseCode];
                return (
                  <tr key={i} style={{background: i%2===0?"#f9f9f9":"#fff"}}>
                    <td style={{padding:"7px 8px", textAlign:"center", fontSize:24, color:info.color, fontWeight:"bold"}}>{info.kanji}</td>
                    <td style={{padding:"7px 8px"}}>{info.name}</td>
                    <td style={{padding:"7px 8px"}}>
                      <span onClick={() => setBrowseCode(browseCode===s.tseCode?null:s.tseCode)} style={{
                        cursor:"pointer", background: isExtra?"#f0f0f0":info.color,
                        color: isExtra?info.color:"#fff", border: isExtra?`1px solid ${info.color}`:"none",
                        borderRadius:6, padding:"2px 8px", fontSize:11, fontWeight:"bold",
                        boxShadow: browseCode===s.tseCode?`0 0 6px ${info.color}`:"none"
                      }}>{isExtra?`★${s.tseCode}`:s.tseCode}</span>
                    </td>
                    <td style={{padding:"7px 8px", textAlign:"right", fontWeight:"bold", color:info.color}}>{s.pct}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {browseCode && browsed.length > 0 && (
            <div style={{marginTop:14, padding:12, background:"#f0f7ff", borderRadius:8, border:`1px solid ${ALL[browseCode]?.color}`}}>
              <div style={{fontSize:12, fontWeight:"bold", marginBottom:8}}>
                <span style={{fontSize:22, color:ALL[browseCode]?.color, marginRight:6}}>{ALL[browseCode]?.kanji}</span>
                「{ALL[browseCode]?.name}（{browseCode}）」を持つ企業 {browsed.length}社
              </div>
              {browsed.map(c => {
                const s = c.segments.find(sg => sg.tseCode === browseCode);
                const info = seg2info(s);
                return (
                  <div key={c.id} onClick={() => handleCompany(c)}
                    style={{display:"flex", alignItems:"center", gap:10, padding:"6px 8px", background:"#fff", borderRadius:6, marginBottom:5, cursor:"pointer", border:"1px solid #e0e0e0"}}>
                    <span style={{fontSize:20, color:info.color, fontWeight:"bold"}}>{info.kanji}</span>
                    <div style={{flex:1, fontSize:12}}>
                      <b>{c.name}</b>　{s.pct}%
                      <div style={{fontSize:10, color:"#888"}}>{s.detail}</div>
                    </div>
                    <span style={{fontSize:10, color:"#aaa"}}>→ 表示</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div style={{fontSize:10, color:"#bbb", textAlign:"center"}}>
        ※比率は各社IR資料をもとにした概算値。★印は東証コード外の拡張タグ。色彩日本語 ルビColourful Japan™（出願中）株式会社ダンクソフト
      </div>
    </div>
  );
}
