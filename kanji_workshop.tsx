import { useState } from "react";

// ── たたき台データ（抜粋）──
const INITIAL = [
  {id:"ndc1_0", kanji:"総", color:"#7F8C8D", label:"0類 総記",       category:"NDC大", status:"confirmed"},
  {id:"ndc1_1", kanji:"哲", color:"#8E44AD", label:"1類 哲学",       category:"NDC大", status:"confirmed"},
  {id:"ndc1_2", kanji:"史", color:"#A0522D", label:"2類 歴史",       category:"NDC大", status:"confirmed"},
  {id:"ndc1_3", kanji:"社", color:"#2C3E50", label:"3類 社会科学",   category:"NDC大", status:"confirmed"},
  {id:"ndc1_4", kanji:"然", color:"#27AE60", label:"4類 自然科学",   category:"NDC大", status:"confirmed"},
  {id:"ndc1_5", kanji:"技", color:"#E67E22", label:"5類 技術・工学", category:"NDC大", status:"confirmed"},
  {id:"ndc1_6", kanji:"業", color:"#F1C40F", label:"6類 産業",       category:"NDC大", status:"confirmed"},
  {id:"ndc1_7", kanji:"芸", color:"#E91E63", label:"7類 芸術",       category:"NDC大", status:"confirmed"},
  {id:"ndc1_8", kanji:"語", color:"#2471A3", label:"8類 言語",       category:"NDC大", status:"confirmed"},
  {id:"ndc1_9", kanji:"文", color:"#E8700A", label:"9類 文学",       category:"NDC大", status:"confirmed"},

  {id:"ind_農", kanji:"農", color:"#27AE60", label:"農業",           category:"業種",  status:"confirmed"},
  {id:"ind_商", kanji:"商", color:"#F39C12", label:"商業",           category:"業種",  status:"confirmed"},
  {id:"ind_建", kanji:"建", color:"#D35400", label:"建設業",         category:"業種",  status:"confirmed"},
  {id:"ind_電", kanji:"電", color:"#5DADE2", label:"電気業",         category:"業種",  status:"confirmed"},
  {id:"ind_情", kanji:"情", color:"#E91E63", label:"情報サービス",   category:"業種",  status:"confirmed"},
  {id:"ind_医", kanji:"医", color:"#2ECC71", label:"医療業",         category:"業種",  status:"confirmed"},
  {id:"ind_食", kanji:"食", color:"#E8700A", label:"飲食業",         category:"業種",  status:"confirmed"},
  {id:"ind_金", kanji:"金", color:"#C0A000", label:"金融業",         category:"業種",  status:"confirmed"},
  {id:"ind_宅", kanji:"宅", color:"#F0B27A", label:"不動産業",       category:"業種",  status:"confirmed"},
  {id:"ind_旅", kanji:"旅", color:"#D68910", label:"運輸・観光",     category:"業種",  status:"confirmed"},
  {id:"ind_教", kanji:"教", color:"#6C3483", label:"教育",           category:"業種",  status:"confirmed"},
  {id:"ind_技", kanji:"技", color:"#E67E22", label:"技術サービス",   category:"業種",  status:"debating", note:"NDC5類と共有"},
  {id:"ind_文", kanji:"文", color:"#E8700A", label:"文化業",         category:"業種",  status:"debating", note:"NDC9類と共有"},

  {id:"lang_J", kanji:"Ｊ", color:"#C0392B", label:"日本語",         category:"言語",  status:"confirmed"},
  {id:"lang_C", kanji:"Ｃ", color:"#E74C3C", label:"中国語",         category:"言語",  status:"confirmed"},
  {id:"lang_E", kanji:"Ｅ", color:"#1A5276", label:"英語",           category:"言語",  status:"confirmed"},
  {id:"lang_F", kanji:"Ｆ", color:"#2980B9", label:"フランス語",     category:"言語",  status:"confirmed"},
  {id:"lang_D", kanji:"Ｄ", color:"#154360", label:"ドイツ語",       category:"言語",  status:"confirmed"},
  {id:"lang_I", kanji:"Ｉ", color:"#1F618D", label:"イタリア語",     category:"言語",  status:"confirmed"},
  {id:"lang_S", kanji:"Ｓ", color:"#117A65", label:"スペイン語",     category:"言語",  status:"confirmed"},
  {id:"lang_R", kanji:"Ｒ", color:"#1ABC9C", label:"ロシア語",       category:"言語",  status:"confirmed"},
  {id:"lang_K", kanji:"Ｋ", color:"#2471A3", label:"韓国語",         category:"言語",  status:"confirmed"},
];

const STATUS_META = {
  confirmed: { label:"✅ 確定",   bg:"#EAF7EA", color:"#1E8449" },
  debating:  { label:"💬 議論中", bg:"#FEF9E7", color:"#B7950B" },
  proposed:  { label:"🆕 提案",   bg:"#EBF5FB", color:"#2980B9" },
  rejected:  { label:"❌ 却下",   bg:"#FDEDEC", color:"#E74C3C" },
};

const COLORS = [
  "#E74C3C","#C0392B","#E67E22","#D35400","#F1C40F","#D4AC0D",
  "#27AE60","#1E8449","#2ECC71","#16A085","#2980B9","#1A5276",
  "#8E44AD","#6C3483","#E91E63","#880E4F","#7F8C8D","#4D5656",
  "#A0522D","#784212","#E8700A","#CA6F1E","#1ABC9C","#148F77",
];

function KChip({ kanji, color, size=40 }) {
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", justifyContent:"center",
      width:size, height:size, borderRadius:7, background:color,
      color:"#fff", fontWeight:"bold", fontSize:size*0.48, flexShrink:0,
      textShadow:"0 1px 2px rgba(0,0,0,0.4)",
      boxShadow:"0 2px 6px rgba(0,0,0,0.2)",
    }}>{kanji}</span>
  );
}

export default function App() {
  const [entries, setEntries]   = useState(INITIAL);
  const [filter, setFilter]     = useState("all");
  const [catFilter, setCat]     = useState("all");
  const [selected, setSelected] = useState(null);
  // 提案フォーム
  const [propKanji,  setPropKanji]  = useState("");
  const [propLabel,  setPropLabel]  = useState("");
  const [propReason, setPropReason] = useState("");
  const [propColor,  setPropColor]  = useState("#2980B9");
  const [propCat,    setPropCat]    = useState("NDC大");
  const [showForm,   setShowForm]   = useState(false);
  // 投票
  const [votes, setVotes] = useState({});

  const cats = ["all", ...Array.from(new Set(entries.map(e=>e.category)))];

  const displayed = entries.filter(e => {
    const sOk = filter==="all" || e.status===filter;
    const cOk = catFilter==="all" || e.category===catFilter;
    return sOk && cOk;
  });

  const vote = (id, dir) => {
    setVotes(v => ({...v, [id]: (v[id]||0) + (dir==="up"?1:-1)}));
  };

  const addProposal = () => {
    if (!propKanji || !propLabel) return;
    const newEntry = {
      id: "prop_" + Date.now(),
      kanji: propKanji,
      color: propColor,
      label: propLabel,
      category: propCat,
      status: "proposed",
      note: propReason || "",
    };
    setEntries(e => [...e, newEntry]);
    setPropKanji(""); setPropLabel(""); setPropReason("");
    setShowForm(false);
  };

  const promote = (id) => setEntries(e => e.map(x => x.id===id ? {...x, status:"confirmed"} : x));
  const reject  = (id) => setEntries(e => e.map(x => x.id===id ? {...x, status:"rejected"}  : x));
  const debate  = (id) => setEntries(e => e.map(x => x.id===id ? {...x, status:"debating"}  : x));

  const sel = selected ? entries.find(e=>e.id===selected) : null;

  const counts = {
    all:       entries.length,
    confirmed: entries.filter(e=>e.status==="confirmed").length,
    debating:  entries.filter(e=>e.status==="debating").length,
    proposed:  entries.filter(e=>e.status==="proposed").length,
    rejected:  entries.filter(e=>e.status==="rejected").length,
  };

  return (
    <div style={{fontFamily:"sans-serif", background:"#0f0f1a", minHeight:"100vh", color:"#eee", padding:16}}>

      {/* ヘッダー */}
      <div style={{marginBottom:14}}>
        <h2 style={{margin:"0 0 2px", fontSize:17, color:"#fff", letterSpacing:1}}>
          色彩日本語 ルビColourful Japan™ — 参加型ワークショップ
        </h2>
        <p style={{margin:0, fontSize:11, color:"#888"}}>
          漢字の割り当ては「仮説」です。提案・投票で、みんなで育てるインデックスです。
        </p>
      </div>

      {/* サマリー */}
      <div style={{display:"flex", gap:6, flexWrap:"wrap", marginBottom:12}}>
        {[
          ["all","総数","#7F8C8D"],
          ["confirmed","確定","#27AE60"],
          ["debating","議論中","#F39C12"],
          ["proposed","提案","#3498DB"],
          ["rejected","却下","#E74C3C"],
        ].map(([k,l,c])=>(
          <div key={k} onClick={()=>setFilter(k)}
            style={{padding:"6px 12px", borderRadius:8, cursor:"pointer", minWidth:52, textAlign:"center",
              background:filter===k?c:"#1a1a2e", border:`1px solid ${filter===k?c:"#2C3E50"}`}}>
            <div style={{fontSize:18, fontWeight:"bold", color:filter===k?"#fff":c}}>{counts[k]}</div>
            <div style={{fontSize:10, color:filter===k?"rgba(255,255,255,0.85)":c}}>{l}</div>
          </div>
        ))}
        <button onClick={()=>setShowForm(f=>!f)}
          style={{marginLeft:"auto", padding:"6px 16px", borderRadius:8, border:"none",
            background:showForm?"#E74C3C":"#E67E22", color:"#fff", cursor:"pointer",
            fontWeight:"bold", fontSize:13}}>
          {showForm ? "✕ 閉じる" : "＋ 漢字を提案する"}
        </button>
      </div>

      {/* 提案フォーム */}
      {showForm && (
        <div style={{background:"#1a1a2e", borderRadius:10, padding:14, marginBottom:14,
          border:"1px solid #E67E22"}}>
          <div style={{fontWeight:"bold", fontSize:13, color:"#E67E22", marginBottom:10}}>
            🆕 新しい漢字を提案する
          </div>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10}}>
            <div>
              <div style={{fontSize:11, color:"#aaa", marginBottom:4}}>漢字（1文字）*</div>
              <input value={propKanji} onChange={e=>setPropKanji(e.target.value.slice(0,1))}
                placeholder="例：宙"
                style={{width:"100%", padding:"8px 10px", borderRadius:6, border:"1px solid #2C3E50",
                  background:"#0f3460", color:"#fff", fontSize:20, textAlign:"center",
                  boxSizing:"border-box"}}/>
            </div>
            <div>
              <div style={{fontSize:11, color:"#aaa", marginBottom:4}}>カテゴリ</div>
              <select value={propCat} onChange={e=>setPropCat(e.target.value)}
                style={{width:"100%", padding:"8px 10px", borderRadius:6, border:"1px solid #2C3E50",
                  background:"#0f3460", color:"#fff", fontSize:12, boxSizing:"border-box"}}>
                {["NDC大","NDC中","NDC細","業種","言語"].map(c=>(
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <div style={{fontSize:11, color:"#aaa", marginBottom:4}}>対応する分類・用途 *</div>
              <input value={propLabel} onChange={e=>setPropLabel(e.target.value)}
                placeholder="例：天文学・宇宙科学"
                style={{width:"100%", padding:"8px 10px", borderRadius:6, border:"1px solid #2C3E50",
                  background:"#0f3460", color:"#fff", fontSize:12, boxSizing:"border-box"}}/>
            </div>
            <div>
              <div style={{fontSize:11, color:"#aaa", marginBottom:4}}>背景色</div>
              <div style={{display:"flex", flexWrap:"wrap", gap:4}}>
                {COLORS.map(c=>(
                  <div key={c} onClick={()=>setPropColor(c)}
                    style={{width:22, height:22, borderRadius:4, background:c, cursor:"pointer",
                      border:propColor===c?"2px solid #fff":"2px solid transparent"}}/>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div style={{fontSize:11, color:"#aaa", marginBottom:4}}>提案理由・コメント</div>
            <textarea value={propReason} onChange={e=>setPropReason(e.target.value)}
              placeholder="例：「宙」は宇宙・天文を直感的に表せる。既存の「天」より広い概念をカバーできる。"
              rows={2}
              style={{width:"100%", padding:"8px 10px", borderRadius:6, border:"1px solid #2C3E50",
                background:"#0f3460", color:"#fff", fontSize:12, resize:"vertical",
                boxSizing:"border-box"}}/>
          </div>
          <div style={{display:"flex", gap:8, marginTop:10, alignItems:"center"}}>
            {propKanji && <KChip kanji={propKanji} color={propColor} size={44}/>}
            <div style={{flex:1, fontSize:12, color:"#aaa"}}>{propLabel}</div>
            <button onClick={addProposal}
              style={{padding:"8px 20px", borderRadius:6, border:"none",
                background:propKanji&&propLabel?"#27AE60":"#2C3E50",
                color:"#fff", cursor:"pointer", fontWeight:"bold"}}>
              提案する
            </button>
          </div>
        </div>
      )}

      {/* カテゴリフィルター */}
      <div style={{display:"flex", gap:6, flexWrap:"wrap", marginBottom:10}}>
        {cats.map(c=>(
          <button key={c} onClick={()=>setCat(c)}
            style={{padding:"3px 10px", borderRadius:12, border:"none", cursor:"pointer",
              fontSize:11, background:catFilter===c?"#E67E22":"#1a1a2e",
              color:"#fff", border:`1px solid ${catFilter===c?"#E67E22":"#2C3E50"}`}}>
            {c==="all"?"すべて":c}
          </button>
        ))}
      </div>

      {/* エントリーグリッド */}
      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:8, marginBottom:16}}>
        {displayed.map(e => {
          const sm = STATUS_META[e.status];
          const v  = votes[e.id] || 0;
          const isOpen = selected===e.id;
          return (
            <div key={e.id} onClick={()=>setSelected(isOpen?null:e.id)}
              style={{background:"#1a1a2e", borderRadius:9, padding:12, cursor:"pointer",
                border:`1px solid ${isOpen?"#E67E22":"#2C3E50"}`,
                boxShadow:isOpen?"0 0 0 2px #E67E22":"none", transition:"all 0.15s"}}>
              <div style={{display:"flex", alignItems:"center", gap:10}}>
                <KChip kanji={e.kanji} color={e.color} size={42}/>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:13, color:"#eee", fontWeight:"bold",
                    whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>
                    {e.label}
                  </div>
                  <div style={{display:"flex", gap:4, marginTop:4, flexWrap:"wrap"}}>
                    <span style={{fontSize:10, padding:"1px 6px", borderRadius:6,
                      background:"#2C3E50", color:"#aaa"}}>{e.category}</span>
                    <span style={{fontSize:10, padding:"1px 6px", borderRadius:6,
                      background:sm.bg, color:sm.color}}>{sm.label}</span>
                  </div>
                </div>
                {/* 投票 */}
                <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:2}}
                  onClick={ev=>ev.stopPropagation()}>
                  <button onClick={()=>vote(e.id,"up")}
                    style={{background:"none", border:"none", color:"#27AE60",
                      fontSize:16, cursor:"pointer", lineHeight:1}}>▲</button>
                  <span style={{fontSize:12, fontWeight:"bold",
                    color:v>0?"#27AE60":v<0?"#E74C3C":"#888"}}>{v>0?"+":""}{v}</span>
                  <button onClick={()=>vote(e.id,"dn")}
                    style={{background:"none", border:"none", color:"#E74C3C",
                      fontSize:16, cursor:"pointer", lineHeight:1}}>▼</button>
                </div>
              </div>

              {/* 展開 */}
              {isOpen && (
                <div style={{marginTop:10, paddingTop:10, borderTop:"1px solid #2C3E50"}}>
                  {e.note && (
                    <div style={{fontSize:11, color:"#F39C12", marginBottom:8}}>
                      💬 {e.note}
                    </div>
                  )}
                  {/* 管理アクション */}
                  {e.status !== "confirmed" && (
                    <div style={{display:"flex", gap:6}}>
                      <button onClick={ev=>{ev.stopPropagation();promote(e.id);}}
                        style={{flex:1, padding:"5px", borderRadius:5, border:"none",
                          background:"#27AE60", color:"#fff", cursor:"pointer", fontSize:11}}>
                        ✅ 確定
                      </button>
                      <button onClick={ev=>{ev.stopPropagation();debate(e.id);}}
                        style={{flex:1, padding:"5px", borderRadius:5, border:"none",
                          background:"#F39C12", color:"#fff", cursor:"pointer", fontSize:11}}>
                        💬 議論中へ
                      </button>
                      <button onClick={ev=>{ev.stopPropagation();reject(e.id);}}
                        style={{flex:1, padding:"5px", borderRadius:5, border:"none",
                          background:"#E74C3C", color:"#fff", cursor:"pointer", fontSize:11}}>
                        ❌ 却下
                      </button>
                    </div>
                  )}
                  {e.status === "confirmed" && (
                    <div style={{display:"flex", gap:6}}>
                      <button onClick={ev=>{ev.stopPropagation();debate(e.id);}}
                        style={{flex:1, padding:"5px", borderRadius:5, border:"none",
                          background:"#F39C12", color:"#fff", cursor:"pointer", fontSize:11}}>
                        💬 再議論
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* フッター */}
      <div style={{background:"#1a1a2e", borderRadius:8, padding:12, fontSize:11, color:"#666",
        borderTop:"1px solid #2C3E50"}}>
        <div style={{color:"#aaa", marginBottom:4}}>📌 使い方</div>
        <div>▲▼ で投票 → カードをタップで詳細・ステータス変更 → ＋ボタンで新しい漢字を提案</div>
        <div style={{marginTop:4}}>漢字の割り当ては「仮説」です。参加者の提案と投票で、ヒューリスティックに収れんしていきます。</div>
        <div style={{marginTop:6, color:"#555"}}>色彩日本語 ルビColourful Japan™（出願中）株式会社ダンクソフト</div>
      </div>
    </div>
  );
}
