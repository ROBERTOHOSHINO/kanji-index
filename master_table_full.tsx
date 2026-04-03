import { useState } from "react";

// =============================================
// 色彩日本語 ルビColourful Japan - 完全版マスターテーブル
// 用途タグ:
//   industry = 日本標準産業分類
//   ndc1     = NDC 1次区分（10大分類）
//   ndc2     = NDC 2次区分（100分類）
//   ndc3     = NDC 3次区分（詳細）
// status: fixed=確定, draft=要調整, quest=検討中
// =============================================

const MASTER = [
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 0類 総記
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {kanji:"総", color:"#7F8C8D", bushu:"糸", use:["ndc1","ndc2"],        label:"総記・情報科学総論",     status:"fixed"},
  {kanji:"館", color:"#95A5A6", bushu:"食", use:["ndc2"],               label:"図書館・図書館学",       status:"fixed"},
  {kanji:"誌", color:"#AAB7B8", bushu:"言", use:["ndc2"],               label:"図書・書誌学",           status:"fixed"},
  {kanji:"典", color:"#BDC3C7", bushu:"八", use:["ndc2"],               label:"百科事典",               status:"fixed"},
  {kanji:"刊", color:"#717D7E", bushu:"刀", use:["ndc2"],               label:"逐次刊行物",             status:"fixed"},
  {kanji:"博", color:"#626567", bushu:"十", use:["ndc2"],               label:"団体・博物館",           status:"fixed"},
  {kanji:"報", color:"#566573", bushu:"土", use:["ndc2","industry"],    label:"新聞・報道・ジャーナリズム", status:"fixed"},
  {kanji:"集", color:"#4D5656", bushu:"隹", use:["ndc2"],               label:"叢書・全集",             status:"fixed"},

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 1類 哲学
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {kanji:"哲", color:"#8E44AD", bushu:"口", use:["ndc1","ndc2"],        label:"哲学",                   status:"fixed"},
  {kanji:"思", color:"#9B59B6", bushu:"心", use:["ndc2"],               label:"哲学各論・思想",         status:"fixed"},
  {kanji:"心", color:"#BB8FCE", bushu:"心", use:["ndc2"],               label:"心理学",                 status:"fixed"},
  {kanji:"倫", color:"#C39BD3", bushu:"亻", use:["ndc2"],               label:"倫理学・道徳",           status:"fixed"},
  {kanji:"宗", color:"#D2B4DE", bushu:"宀", use:["ndc2"],               label:"宗教",                   status:"fixed"},
  {kanji:"神", color:"#D7BDE2", bushu:"礻", use:["ndc2"],               label:"神道",                   status:"fixed"},
  {kanji:"仏", color:"#DCBCF0", bushu:"亻", use:["ndc2"],               label:"仏教・フランス語文学",   status:"draft", note:"仏教と仏語が衝突→文脈で区別"},
  {kanji:"聖", color:"#E8DAEF", bushu:"耳", use:["ndc2"],               label:"キリスト教",             status:"fixed"},

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 2類 歴史
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {kanji:"史", color:"#A0522D", bushu:"口", use:["ndc1","ndc2"],        label:"歴史",                   status:"fixed"},
  {kanji:"和", color:"#B03A2E", bushu:"禾", use:["ndc2"],               label:"日本史・和",             status:"draft", note:"「和」は日本語・和算とも競合"},
  {kanji:"亜", color:"#C0392B", bushu:"二", use:["ndc2"],               label:"アジア史",               status:"fixed"},
  {kanji:"欧", color:"#922B21", bushu:"欠", use:["ndc2"],               label:"ヨーロッパ史",           status:"fixed"},
  {kanji:"米", color:"#7B241C", bushu:"米", use:["ndc2"],               label:"北アメリカ史",           status:"fixed"},
  {kanji:"地", color:"#8B4513", bushu:"土", use:["ndc2","industry"],    label:"地理・地方公務",         status:"draft", note:"地理と地球科学・地方公務が競合"},

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 3類 社会科学
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {kanji:"社", color:"#2C3E50", bushu:"礻", use:["ndc1"],               label:"社会科学（NDC大分類）",   status:"fixed", note:"同一漢字・色のトーン差でカテゴリ区別"},
  {kanji:"社", color:"#4A6080", bushu:"礻", use:["ndc2"],               label:"社会学・社会問題（NDC中）", status:"fixed", note:"NDC中分類トーン：やや明るい紺"},
  {kanji:"社", color:"#6D8CAA", bushu:"礻", use:["industry"],           label:"社会福祉業・社会保険（業種）", status:"fixed", note:"業種トーン：さらに明るい紺"},
  {kanji:"政", color:"#8E44AD", bushu:"攵", use:["ndc2","industry"],    label:"政治",                   status:"draft", note:"攵部に教・放が集中→色区別要検討"},
  {kanji:"権", color:"#2980B9", bushu:"木", use:["ndc2"],               label:"政治学・権力",           status:"fixed"},
  {kanji:"法", color:"#2C3E50", bushu:"氵", use:["ndc2"],               label:"法律",                   status:"fixed"},
  {kanji:"経", color:"#34495E", bushu:"糸", use:["ndc2"],               label:"経済",                   status:"fixed"},
  {kanji:"財", color:"#1A5276", bushu:"貝", use:["ndc2"],               label:"財政・税制",             status:"fixed"},
  {kanji:"統", color:"#154360", bushu:"糸", use:["ndc2"],               label:"統計学",                 status:"fixed"},
  {kanji:"社", color:"#2C3E50", bushu:"礻", use:["ndc2"],               label:"社会学",                 status:"fixed"},
  {kanji:"労", color:"#1F618D", bushu:"力", use:["ndc2","industry"],    label:"労働・社会保障",         status:"fixed"},
  {kanji:"教", color:"#6C3483", bushu:"攵", use:["ndc2","industry"],    label:"教育",                   status:"fixed"},
  {kanji:"俗", color:"#4A235A", bushu:"亻", use:["ndc2"],               label:"風俗・民俗",             status:"fixed"},
  {kanji:"軍", color:"#1B2631", bushu:"車", use:["ndc2"],               label:"国防・軍事",             status:"fixed"},
  {kanji:"福", color:"#2E86C1", bushu:"礻", use:["ndc2"],               label:"社会福祉",               status:"fixed"},
  {kanji:"議", color:"#1A5276", bushu:"言", use:["ndc2"],               label:"議会・立法",             status:"fixed"},
  {kanji:"党", color:"#154360", bushu:"黒", use:["ndc2"],               label:"政党",                   status:"fixed"},

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 4類 自然科学
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {kanji:"然", color:"#27AE60", bushu:"灬", use:["ndc1","ndc2"],        label:"自然科学",               status:"fixed"},
  {kanji:"数", color:"#1E8449", bushu:"攴", use:["ndc2"],               label:"数学",                   status:"fixed"},
  {kanji:"物", color:"#148F77", bushu:"牛", use:["ndc2"],               label:"物理学",                 status:"fixed"},
  {kanji:"化", color:"#1D8348", bushu:"亻", use:["ndc2"],               label:"化学",                   status:"draft", note:"化学工業・化石と三重衝突"},
  {kanji:"天", color:"#F1C40F", bushu:"大", use:["ndc2"],               label:"天文学",                 status:"fixed"},
  {kanji:"石", color:"#7D6608", bushu:"石", use:["ndc2","ndc3"],        label:"地球科学・地質・岩石・化石", status:"fixed", note:"岩→石に変更。化石植物(478)・地質(450)・岩石を統合"},
  {kanji:"生", color:"#58D68D", bushu:"生", use:["ndc2"],               label:"生物科学",               status:"fixed"},
  {kanji:"植", color:"#229954", bushu:"木", use:["ndc2","ndc3"],        label:"植物学",                 status:"fixed"},
  {kanji:"動", color:"#28B463", bushu:"力", use:["ndc2","ndc3"],        label:"動物学",                 status:"fixed"},
  {kanji:"医", color:"#2ECC71", bushu:"匸", use:["ndc2","ndc3","industry"], label:"医学・医療",          status:"fixed"},
  // 4類 3次詳細
  {kanji:"力", color:"#0E6655", bushu:"力", use:["ndc3"],               label:"力学",                   status:"fixed"},
  {kanji:"光", color:"#F4D03F", bushu:"儿", use:["ndc3"],               label:"光学",                   status:"fixed"},
  {kanji:"熱", color:"#E67E22", bushu:"灬", use:["ndc3"],               label:"熱学",                   status:"fixed"},
  {kanji:"磁", color:"#2980B9", bushu:"石", use:["ndc3"],               label:"電磁気学",               status:"fixed"},
  {kanji:"原", color:"#1A5276", bushu:"厂", use:["ndc3"],               label:"原子・分子物理",         status:"fixed"},
  {kanji:"核", color:"#154360", bushu:"木", use:["ndc3"],               label:"核化学",                 status:"fixed"},
  {kanji:"宇", color:"#D4AC0D", bushu:"宀", use:["ndc3"],               label:"宇宙科学",               status:"fixed"},
  {kanji:"星", color:"#B7950B", bushu:"日", use:["ndc3"],               label:"恒星",                   status:"fixed"},
  {kanji:"震", color:"#8B4513", bushu:"雨", use:["ndc3"],               label:"地震学",                 status:"fixed"},
  {kanji:"菌", color:"#1D8348", bushu:"艸", use:["ndc3"],               label:"微生物学",               status:"fixed"},
  {kanji:"遺", color:"#196F3D", bushu:"辶", use:["ndc3"],               label:"遺伝学",                 status:"fixed"},
  {kanji:"環", color:"#148F77", bushu:"玉", use:["ndc3"],               label:"生態学",                 status:"fixed"},
  {kanji:"診", color:"#27AE60", bushu:"言", use:["ndc3"],               label:"臨床・診断",             status:"fixed"},
  {kanji:"歯", color:"#58D68D", bushu:"歯", use:["ndc3"],               label:"歯科学",                 status:"fixed"},
  {kanji:"衛", color:"#148F77", bushu:"行", use:["ndc3"],               label:"衛生学・公衆衛生",       status:"fixed"},
  {kanji:"薬", color:"#6E2F1A", bushu:"艸", use:["ndc2","ndc3","industry"], label:"薬学・化学工業",     status:"draft", note:"570化学工業と競合"},

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 5類 技術・工学
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {kanji:"技", color:"#E67E22", bushu:"扌", use:["ndc1","ndc2","industry"], label:"技術・工学・技術サービス", status:"fixed"},
  {kanji:"建", color:"#D35400", bushu:"廴", use:["ndc2","industry"],    label:"建設・建築",             status:"fixed"},
  {kanji:"機", color:"#BA4A00", bushu:"木", use:["ndc2","industry"],    label:"機械工学",               status:"fixed"},
  {kanji:"電", color:"#5DADE2", bushu:"雨", use:["ndc2","industry"],    label:"電気工学・電気業",       status:"fixed"},
  {kanji:"船", color:"#1A6EA8", bushu:"舟", use:["ndc2","industry"],    label:"船舶工学・水運",         status:"fixed"},
  {kanji:"鉱", color:"#784212", bushu:"金", use:["ndc2","industry"],    label:"金属工学・鉱業",         status:"fixed"},
  {kanji:"製", color:"#9B59B6", bushu:"衣", use:["ndc2","industry"],    label:"製造工業",               status:"fixed"},
  {kanji:"家", color:"#F0B27A", bushu:"宀", use:["ndc2","industry"],    label:"家政学・不動産業",       status:"draft", note:"家政と不動産が競合"},
  // 5類 3次詳細
  {kanji:"道", color:"#E59866", bushu:"辶", use:["ndc3"],               label:"道路工学",               status:"fixed"},
  {kanji:"橋", color:"#CA6F1E", bushu:"木", use:["ndc3"],               label:"橋梁",                   status:"fixed"},
  {kanji:"鉄", color:"#7D6608", bushu:"金", use:["ndc3","industry"],    label:"鉄道工学・鉄道業",       status:"fixed"},
  {kanji:"都", color:"#A04000", bushu:"邑", use:["ndc3"],               label:"都市工学",               status:"fixed"},
  {kanji:"翼", color:"#935116", bushu:"羽", use:["ndc3"],               label:"航空工学",               status:"fixed"},
  {kanji:"炉", color:"#784212", bushu:"火", use:["ndc3"],               label:"原子力工学",             status:"fixed"},
  {kanji:"回", color:"#5DADE2", bushu:"囗", use:["ndc3"],               label:"電気回路",               status:"fixed"},
  {kanji:"発", color:"#2980B9", bushu:"癶", use:["ndc3"],               label:"発電",                   status:"fixed"},
  {kanji:"波", color:"#1A5276", bushu:"氵", use:["ndc3"],               label:"電波・通信",             status:"fixed"},
  {kanji:"符", color:"#154360", bushu:"竹", use:["ndc3"],               label:"情報処理・符号",         status:"fixed"},
  {kanji:"素", color:"#2471A3", bushu:"糸", use:["ndc3"],               label:"電子工学・素子",         status:"fixed"},
  {kanji:"鋼", color:"#6E2C0E", bushu:"金", use:["ndc3"],               label:"鉄鋼",                   status:"fixed"},
  {kanji:"爆", color:"#922B21", bushu:"火", use:["ndc3"],               label:"爆発物・火薬",           status:"fixed"},
  {kanji:"紙", color:"#FAD7A0", bushu:"糸", use:["ndc3"],               label:"紙・パルプ工業",         status:"fixed"},
  {kanji:"醸", color:"#E8700A", bushu:"酉", use:["ndc3"],               label:"食品工業・醸造",         status:"fixed"},
  {kanji:"縫", color:"#F8C471", bushu:"糸", use:["ndc3"],               label:"被服・縫製",             status:"fixed"},
  {kanji:"厨", color:"#FDEBD0", bushu:"广", use:["ndc3"],               label:"食品・料理",             status:"fixed"},

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 6類 産業
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {kanji:"業", color:"#F1C40F", bushu:"木", use:["ndc1","ndc2","industry"], label:"産業・業種",         status:"fixed", note:"「業種」の業。産婦人科衝突も解消"},
  {kanji:"産", color:"#E8F5E9", bushu:"生", use:["ndc3"],               label:"産物・生産（細分類用）",  status:"fixed", note:"産婦人科(495)にも転用可"},
  {kanji:"農", color:"#D4AC0D", bushu:"辰", use:["ndc2","industry"],    label:"農業",                   status:"fixed"},
  {kanji:"花", color:"#B7950B", bushu:"艸", use:["ndc2"],               label:"園芸",                   status:"fixed"},
  {kanji:"蚕", color:"#9A7D0A", bushu:"虫", use:["ndc2","industry"],    label:"蚕糸業",                 status:"fixed"},
  {kanji:"畜", color:"#7D6608", bushu:"田", use:["ndc2","industry"],    label:"畜産業",                 status:"fixed"},
  {kanji:"林", color:"#6E2C0E", bushu:"木", use:["ndc2","industry"],    label:"林業",                   status:"fixed"},
  {kanji:"漁", color:"#1A6EA8", bushu:"氵", use:["ndc2","industry"],    label:"水産業・漁業",           status:"fixed"},
  {kanji:"商", color:"#F39C12", bushu:"口", use:["ndc2","industry"],    label:"商業",                   status:"fixed"},
  {kanji:"旅", color:"#D68910", bushu:"方", use:["ndc2","industry"],    label:"運輸・交通・観光",       status:"fixed"},
  {kanji:"通", color:"#B9770E", bushu:"辶", use:["ndc2","industry"],    label:"通信事業",               status:"fixed"},
  // 6類 3次詳細
  {kanji:"稲", color:"#E8F5E9", bushu:"禾", use:["ndc3"],               label:"作物・稲作",             status:"fixed"},
  {kanji:"鯨", color:"#1A6EA8", bushu:"魚", use:["ndc3"],               label:"捕鯨",                   status:"fixed"},
  {kanji:"釣", color:"#2471A3", bushu:"金", use:["ndc3"],               label:"漁労・釣り",             status:"fixed"},
  {kanji:"養", color:"#1F618D", bushu:"食", use:["ndc3","industry"],    label:"水産養殖",               status:"fixed"},
  {kanji:"販", color:"#F39C12", bushu:"貝", use:["ndc3"],               label:"商業政策・販売",         status:"fixed"},
  {kanji:"貿", color:"#D68910", bushu:"貝", use:["ndc3"],               label:"貿易",                   status:"fixed"},
  {kanji:"駅", color:"#B9770E", bushu:"馬", use:["ndc3"],               label:"鉄道・駅",               status:"fixed"},
  {kanji:"港", color:"#1A6EA8", bushu:"氵", use:["ndc3"],               label:"海運・港",               status:"fixed"},
  {kanji:"空", color:"#5DADE2", bushu:"穴", use:["ndc3"],               label:"航空運輸・空港",         status:"fixed"},
  {kanji:"倉", color:"#AED6F1", bushu:"人", use:["ndc3"],               label:"物流・倉庫",             status:"fixed"},

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 7類 芸術
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {kanji:"芸", color:"#E91E63", bushu:"艸", use:["ndc1","ndc2","industry"], label:"芸術・美術",         status:"fixed"},
  {kanji:"彫", color:"#C0392B", bushu:"彡", use:["ndc2"],               label:"彫刻",                   status:"fixed"},
  {kanji:"画", color:"#D81B60", bushu:"田", use:["ndc2","industry"],    label:"絵画・映像制作",         status:"fixed"},
  {kanji:"版", color:"#AD1457", bushu:"片", use:["ndc2"],               label:"版画・印章",             status:"fixed"},
  {kanji:"写", color:"#880E4F", bushu:"宀", use:["ndc2"],               label:"写真・印刷",             status:"fixed"},
  {kanji:"匠", color:"#F06292", bushu:"匸", use:["ndc2"],               label:"工芸",                   status:"fixed"},
  {kanji:"楽", color:"#F48FB1", bushu:"木", use:["ndc2"],               label:"音楽・舞踊",             status:"fixed"},
  {kanji:"劇", color:"#CE93D8", bushu:"刀", use:["ndc2","industry"],    label:"演劇・映画",             status:"fixed"},
  {kanji:"体", color:"#EC407A", bushu:"亻", use:["ndc2","industry"],    label:"スポーツ・体育",         status:"fixed"},
  {kanji:"遊", color:"#F8BBD0", bushu:"辶", use:["ndc2"],               label:"諸芸・娯楽",             status:"fixed"},
  // 7類 3次詳細
  {kanji:"美", color:"#FCE4EC", bushu:"羊", use:["ndc3"],               label:"芸術理論・美学",         status:"fixed"},
  {kanji:"墨", color:"#C62828", bushu:"土", use:["ndc3"],               label:"日本画・墨絵",           status:"fixed"},
  {kanji:"油", color:"#AD1457", bushu:"氵", use:["ndc3"],               label:"西洋画・油絵",           status:"fixed"},
  {kanji:"筆", color:"#880E4F", bushu:"竹", use:["ndc3"],               label:"書道・技法",             status:"fixed"},
  {kanji:"漫", color:"#E91E63", bushu:"氵", use:["ndc3"],               label:"漫画・アニメ",           status:"fixed"},
  {kanji:"書", color:"#880E4F", bushu:"曰", use:["ndc3"],               label:"書道",                   status:"fixed"},
  {kanji:"漆", color:"#880E4F", bushu:"氵", use:["ndc3"],               label:"漆工芸",                 status:"fixed"},
  {kanji:"錦", color:"#F48FB1", bushu:"金", use:["ndc3"],               label:"染織・錦",               status:"fixed"},
  {kanji:"謡", color:"#CE93D8", bushu:"言", use:["ndc3"],               label:"能楽・謡曲",             status:"fixed"},
  {kanji:"噺", color:"#F06292", bushu:"口", use:["ndc3"],               label:"落語・大衆演芸",         status:"fixed"},
  {kanji:"競", color:"#F8BBD0", bushu:"立", use:["ndc3"],               label:"スポーツ競技",           status:"fixed"},
  {kanji:"武", color:"#E91E63", bushu:"止", use:["ndc3"],               label:"武道・格闘技",           status:"fixed"},
  {kanji:"碁", color:"#4A235A", bushu:"石", use:["ndc3"],               label:"囲碁",                   status:"fixed"},
  {kanji:"棋", color:"#6C3483", bushu:"木", use:["ndc3"],               label:"将棋",                   status:"fixed"},
  {kanji:"茶", color:"#A9714E", bushu:"艸", use:["ndc3"],               label:"茶道",                   status:"fixed"},
  {kanji:"香", color:"#D7BDE2", bushu:"香", use:["ndc3"],               label:"香道",                   status:"fixed"},
  {kanji:"舞", color:"#F48FB1", bushu:"舛", use:["ndc3"],               label:"舞踊・バレエ",           status:"fixed"},

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 8類 言語
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {kanji:"語", color:"#2471A3", bushu:"言", use:["ndc1","ndc2"],        label:"言語・言語学",           status:"fixed"},
  {kanji:"Ｊ", color:"#C0392B", bushu:"－", use:["ndc2"],               label:"日本語",                 status:"fixed", note:"倍角アルファベット。Japanese"},
  {kanji:"Ｃ", color:"#E74C3C", bushu:"－", use:["ndc2"],               label:"中国語",                 status:"fixed", note:"倍角アルファベット。Chinese"},
  {kanji:"Ｅ", color:"#1A5276", bushu:"－", use:["ndc2"],               label:"英語",                   status:"fixed", note:"倍角アルファベット。English"},
  {kanji:"Ｆ", color:"#2980B9", bushu:"－", use:["ndc2"],               label:"フランス語",              status:"fixed", note:"倍角アルファベット。French"},
  {kanji:"Ｄ", color:"#154360", bushu:"－", use:["ndc2"],               label:"ドイツ語",               status:"fixed", note:"倍角アルファベット。Deutsch"},
  {kanji:"Ｉ", color:"#1F618D", bushu:"－", use:["ndc2"],               label:"イタリア語",              status:"fixed", note:"倍角アルファベット。Italian"},
  {kanji:"Ｓ", color:"#117A65", bushu:"－", use:["ndc2"],               label:"スペイン語",              status:"fixed", note:"倍角アルファベット。Spanish（Ｅは英語と衝突）"},
  {kanji:"Ｒ", color:"#1ABC9C", bushu:"－", use:["ndc2"],               label:"ロシア語",               status:"fixed", note:"倍角アルファベット。Russian"},
  {kanji:"Ｋ", color:"#2471A3", bushu:"－", use:["ndc3"],               label:"韓国語・朝鮮語",          status:"fixed", note:"倍角アルファベット。Korean"},
  {kanji:"梵", color:"#1F618D", bushu:"木", use:["ndc3"],               label:"インド語（梵語）",       status:"fixed"},

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 9類 文学
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {kanji:"文", color:"#E8700A", bushu:"攵", use:["ndc1","ndc2","industry"], label:"文学・文化",         status:"fixed"},
  {kanji:"俳", color:"#D35400", bushu:"亻", use:["ndc3"],               label:"詩歌・俳句",             status:"fixed"},
  {kanji:"脚", color:"#CA6F1E", bushu:"肉", use:["ndc3"],               label:"戯曲・脚本",             status:"fixed"},
  {kanji:"小", color:"#BA4A00", bushu:"小", use:["ndc3"],               label:"小説・物語",             status:"fixed"},
  {kanji:"随", color:"#A04000", bushu:"阜", use:["ndc3"],               label:"随筆・エッセイ",         status:"fixed"},
  {kanji:"録", color:"#935116", bushu:"金", use:["ndc3"],               label:"記録・ルポ",             status:"fixed"},
  {kanji:"評", color:"#784212", bushu:"言", use:["ndc3"],               label:"文芸批評",               status:"fixed"},
  {kanji:"絵", color:"#F0B27A", bushu:"糸", use:["ndc3"],               label:"児童文学・絵本",         status:"fixed"},
  // ※ 各国文学は言語と同一漢字で、色のトーンで区別（案）
  // 英米文学→英（濃）、英語→英（淡）などトーン差で運用

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 業種固有（NDCに登場しないもの）
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {kanji:"金", color:"#C0A000", bushu:"金", use:["industry"],           label:"金融業・金属",          status:"fixed"},
  {kanji:"銀", color:"#BDC3C7", bushu:"金", use:["industry"],           label:"銀行業",                status:"fixed"},
  {kanji:"保", color:"#2ECC71", bushu:"亻", use:["industry"],           label:"保険業",                status:"fixed"},
  {kanji:"証", color:"#27AE60", bushu:"言", use:["industry"],           label:"証券業",                status:"fixed"},
  {kanji:"貸", color:"#D4AC0D", bushu:"貝", use:["industry"],           label:"貸金業",                status:"fixed"},
  {kanji:"貨", color:"#D4AC0D", bushu:"貝", use:["industry"],           label:"貨物運送",              status:"fixed"},
  {kanji:"輸", color:"#2980B9", bushu:"車", use:["industry"],           label:"輸送用機器",            status:"fixed"},
  {kanji:"情", color:"#E91E63", bushu:"忄", use:["industry"],           label:"情報サービス",          status:"fixed"},
  {kanji:"放", color:"#8E44AD", bushu:"攵", use:["industry"],           label:"放送業",                status:"fixed"},
  {kanji:"設", color:"#8E44AD", bushu:"訁", use:["industry"],           label:"設備工事",              status:"fixed"},
  {kanji:"宅", color:"#F0B27A", bushu:"宀", use:["industry"],           label:"不動産業・宅地建物",     status:"fixed", note:"宅建資格にも対応。「地」「土」の競合を回避"},
  {kanji:"食", color:"#E8700A", bushu:"食", use:["industry"],           label:"飲食業・食料品",        status:"fixed"},
  {kanji:"宿", color:"#A0522D", bushu:"宀", use:["industry"],           label:"宿泊業",                status:"fixed"},
  {kanji:"介", color:"#2ECC71", bushu:"亻", use:["industry"],           label:"介護・福祉サービス",    status:"fixed"},
];

// 重複漢字の検出
const kanjiCount = {};
MASTER.forEach(d => { kanjiCount[d.kanji] = (kanjiCount[d.kanji]||0)+1; });
const dupKanji = new Set(Object.keys(kanjiCount).filter(k=>kanjiCount[k]>1));

const USE_LABELS = {
  industry: {label:"業種", bg:"#FFF3E0", color:"#E65100"},
  ndc1:     {label:"NDC大",  bg:"#E8F5E9", color:"#1B5E20"},
  ndc2:     {label:"NDC中",  bg:"#E3F2FD", color:"#0D47A1"},
  ndc3:     {label:"NDC細",  bg:"#F3E5F5", color:"#4A148C"},
};

const STATUS_META = {
  fixed: {label:"✅ 確定",  bg:"#EAF7EA", color:"#1E8449"},
  draft: {label:"⚠ 要調整", bg:"#FEF9E7", color:"#B7950B"},
  quest: {label:"？ 検討中", bg:"#EBF5FB", color:"#2980B9"},
};

function KChip({kanji, color, size=34}) {
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", justifyContent:"center",
      width:size, height:size, borderRadius:6, background:color,
      color:"#fff", fontWeight:"bold", fontSize:size*0.48, flexShrink:0,
      textShadow:"0 1px 2px rgba(0,0,0,0.4)",
      boxShadow:"0 1px 4px rgba(0,0,0,0.18)",
    }}>{kanji}</span>
  );
}

export default function App() {
  const [filterUse,    setFilterUse]    = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDupe,   setFilterDupe]   = useState(false);
  const [search,       setSearch]       = useState("");
  const [view,         setView]         = useState("grid");
  const [openKanji,    setOpenKanji]    = useState(null);

  const displayed = MASTER.filter(d => {
    if (filterUse !== "all" && !d.use.includes(filterUse)) return false;
    if (filterStatus !== "all" && d.status !== filterStatus) return false;
    if (filterDupe && !dupKanji.has(d.kanji)) return false;
    if (search && !d.label.includes(search) && !d.kanji.includes(search) && !d.bushu.includes(search)) return false;
    return true;
  });

  const totalUniq = new Set(MASTER.map(d=>d.kanji)).size;
  const dupCount  = dupKanji.size;
  const draftCount = MASTER.filter(d=>d.status==="draft").length;

  return (
    <div style={{fontFamily:"sans-serif", padding:16, background:"#1a1a2e", minHeight:"100vh", color:"#eee"}}>

      {/* ヘッダー */}
      <div style={{marginBottom:16}}>
        <h2 style={{margin:"0 0 4px", fontSize:18, color:"#fff", letterSpacing:1}}>
          色彩日本語 ルビColourful Japan™（出願中）
        </h2>
        <p style={{margin:0, fontSize:12, color:"#aaa"}}>
          完全版マスターテーブル — 業種分類 ＋ NDC図書分類（0〜9類）統合
        </p>
      </div>

      {/* サマリーカード */}
      <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:14}}>
        {[
          ["漢字総数（ユニーク）", totalUniq, "#3498DB"],
          ["登録エントリ",  MASTER.length, "#2ECC71"],
          ["重複漢字",      dupCount,  "#F39C12"],
          ["要調整",        draftCount, "#E74C3C"],
        ].map(([lbl,val,clr])=>(
          <div key={lbl} style={{background:"#16213e", borderRadius:8, padding:"10px 12px",
            borderTop:`3px solid ${clr}`}}>
            <div style={{fontSize:22, fontWeight:"bold", color:clr}}>{val}</div>
            <div style={{fontSize:10, color:"#aaa", marginTop:2}}>{lbl}</div>
          </div>
        ))}
      </div>

      {/* フィルター */}
      <div style={{background:"#16213e", borderRadius:8, padding:12, marginBottom:12}}>
        <div style={{display:"flex", flexWrap:"wrap", gap:6, marginBottom:8, alignItems:"center"}}>
          <span style={{fontSize:11, color:"#aaa", width:60}}>用途：</span>
          {[["all","すべて"],["industry","業種"],["ndc1","NDC大"],["ndc2","NDC中"],["ndc3","NDC細"]].map(([v,l])=>(
            <button key={v} onClick={()=>setFilterUse(v)}
              style={{padding:"4px 10px", borderRadius:12, border:"none", cursor:"pointer", fontSize:11,
                background:filterUse===v?"#E67E22":"#2C3E50", color:"#fff"}}>
              {l}
            </button>
          ))}
        </div>
        <div style={{display:"flex", flexWrap:"wrap", gap:6, alignItems:"center"}}>
          <span style={{fontSize:11, color:"#aaa", width:60}}>状態：</span>
          {[["all","すべて"],["fixed","✅確定"],["draft","⚠要調整"]].map(([v,l])=>(
            <button key={v} onClick={()=>setFilterStatus(v)}
              style={{padding:"4px 10px", borderRadius:12, border:"none", cursor:"pointer", fontSize:11,
                background:filterStatus===v?"#E67E22":"#2C3E50", color:"#fff"}}>
              {l}
            </button>
          ))}
          <button onClick={()=>setFilterDupe(f=>!f)}
            style={{padding:"4px 10px", borderRadius:12, border:`2px solid ${filterDupe?"#F39C12":"#2C3E50"}`,
              cursor:"pointer", fontSize:11,
              background:filterDupe?"#F39C12":"#2C3E50", color:"#fff"}}>
            ⚠ 重複のみ
          </button>
          <input value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="漢字・ラベル・部首で検索"
            style={{marginLeft:"auto", padding:"5px 10px", borderRadius:6,
              border:"1px solid #2C3E50", background:"#0f3460", color:"#eee",
              fontSize:11, width:150}}/>
          <button onClick={()=>setView(v=>v==="grid"?"list":"grid")}
            style={{padding:"4px 10px", borderRadius:12, border:"none",
              background:"#2C3E50", color:"#fff", cursor:"pointer", fontSize:11}}>
            {view==="grid"?"☰ リスト":"⬛ グリッド"}
          </button>
        </div>
      </div>

      {/* グリッドビュー */}
      {view==="grid" && (
        <div style={{background:"#16213e", borderRadius:8, padding:14, marginBottom:12}}>
          <div style={{fontSize:12, color:"#aaa", marginBottom:10}}>
            {displayed.length}件表示　— タップで詳細
          </div>
          <div style={{display:"flex", flexWrap:"wrap", gap:8}}>
            {displayed.map(d => {
              const isDup = dupKanji.has(d.kanji);
              const isOpen = openKanji === d.kanji;
              return (
                <div key={d.kanji+d.label} onClick={()=>setOpenKanji(isOpen?null:d.kanji)}
                  style={{position:"relative", cursor:"pointer"}}>
                  <KChip kanji={d.kanji} color={d.color} size={42}/>
                  {isDup && (
                    <span style={{position:"absolute", top:-4, right:-4, width:12, height:12,
                      borderRadius:"50%", background:"#F39C12", fontSize:8,
                      display:"flex", alignItems:"center", justifyContent:"center", color:"#fff"}}>!</span>
                  )}
                  {d.status==="draft" && (
                    <span style={{position:"absolute", bottom:-4, right:-4, width:12, height:12,
                      borderRadius:"50%", background:"#E74C3C", fontSize:8,
                      display:"flex", alignItems:"center", justifyContent:"center", color:"#fff"}}>△</span>
                  )}
                </div>
              );
            })}
          </div>
          {/* 選択中詳細 */}
          {openKanji && (() => {
            const entries = displayed.filter(d=>d.kanji===openKanji);
            const d = entries[0];
            if (!d) return null;
            return (
              <div style={{marginTop:12, padding:12, background:"#0f3460", borderRadius:8}}>
                <div style={{display:"flex", alignItems:"center", gap:12, marginBottom:8}}>
                  <KChip kanji={d.kanji} color={d.color} size={52}/>
                  <div>
                    <div style={{fontSize:18, fontWeight:"bold", color:"#fff"}}>「{d.kanji}」</div>
                    <div style={{fontSize:11, color:"#aaa"}}>部首：{d.bushu}</div>
                  </div>
                </div>
                {entries.map((e,i)=>(
                  <div key={i} style={{marginBottom:6, padding:"6px 10px",
                    background:"rgba(255,255,255,0.05)", borderRadius:6}}>
                    <div style={{display:"flex", flexWrap:"wrap", gap:4, marginBottom:4}}>
                      {e.use.map(u=>(
                        <span key={u} style={{fontSize:10, padding:"2px 6px", borderRadius:8,
                          background:USE_LABELS[u].bg, color:USE_LABELS[u].color}}>
                          {USE_LABELS[u].label}
                        </span>
                      ))}
                      <span style={{fontSize:10, padding:"2px 6px", borderRadius:8,
                        background:STATUS_META[e.status].bg, color:STATUS_META[e.status].color}}>
                        {STATUS_META[e.status].label}
                      </span>
                    </div>
                    <div style={{fontSize:12, color:"#eee"}}>{e.label}</div>
                    {e.note && <div style={{fontSize:11, color:"#F39C12", marginTop:4}}>⚠ {e.note}</div>}
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      )}

      {/* リストビュー */}
      {view==="list" && (
        <div style={{background:"#16213e", borderRadius:8, overflow:"hidden", marginBottom:12}}>
          <div style={{overflowX:"auto"}}>
            <table style={{borderCollapse:"collapse", width:"100%", fontSize:12}}>
              <thead>
                <tr style={{background:"#0f3460", color:"#eee"}}>
                  <th style={{padding:"8px 10px", width:50, textAlign:"center"}}>記号</th>
                  <th style={{padding:"8px 10px", textAlign:"left"}}>ラベル</th>
                  <th style={{padding:"8px 10px", width:50, textAlign:"center"}}>部首</th>
                  <th style={{padding:"8px 10px", textAlign:"left"}}>用途</th>
                  <th style={{padding:"8px 10px", width:80, textAlign:"center"}}>状態</th>
                </tr>
              </thead>
              <tbody>
                {displayed.map((d,i)=>{
                  const isDup = dupKanji.has(d.kanji);
                  const sm = STATUS_META[d.status];
                  return (
                    <tr key={d.kanji+d.label+i}
                      style={{background:isDup?"rgba(243,156,18,0.08)":i%2===0?"rgba(255,255,255,0.03)":"transparent",
                        borderBottom:"1px solid rgba(255,255,255,0.06)",
                        borderLeft:isDup?"3px solid #F39C12":"3px solid transparent"}}>
                      <td style={{padding:"6px 10px", textAlign:"center"}}>
                        <KChip kanji={d.kanji} color={d.color} size={30}/>
                      </td>
                      <td style={{padding:"6px 10px", color:"#eee"}}>
                        {d.label}
                        {d.note && <div style={{fontSize:10, color:"#F39C12", marginTop:2}}>⚠ {d.note}</div>}
                      </td>
                      <td style={{padding:"6px 10px", textAlign:"center", color:"#aaa"}}>{d.bushu}</td>
                      <td style={{padding:"6px 10px"}}>
                        <div style={{display:"flex", flexWrap:"wrap", gap:3}}>
                          {d.use.map(u=>(
                            <span key={u} style={{fontSize:9, padding:"1px 5px", borderRadius:6,
                              background:USE_LABELS[u].bg, color:USE_LABELS[u].color}}>
                              {USE_LABELS[u].label}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td style={{padding:"6px 10px", textAlign:"center"}}>
                        <span style={{fontSize:9, padding:"2px 6px", borderRadius:6,
                          background:sm.bg, color:sm.color}}>{sm.label}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* フッター注記 */}
      <div style={{background:"#16213e", borderRadius:8, padding:12, fontSize:11, color:"#888", lineHeight:1.8}}>
        <div style={{color:"#eee", fontWeight:"bold", marginBottom:6}}>📌 凡例と運用ルール</div>
        <div>🟡 <strong>!マーク</strong>（グリッド右上）= 同じ漢字が複数用途で使われている → 色のトーンや文脈で区別</div>
        <div>🔴 <strong>△マーク</strong>（グリッド右下）= 要調整 → 衝突・競合・難読の問題あり</div>
        <div>🔵 <strong>用途タグ</strong> = 業種（産業分類）/ NDC大（10大分類）/ NDC中（100分類）/ NDC細（詳細分類）</div>
        <div style={{marginTop:6, padding:"6px 10px", background:"rgba(52,152,219,0.15)", borderRadius:6, color:"#AED6F1"}}>
          💡 同じ漢字を業種・NDC双方が使う = それが色彩日本語 ルビColourful Japanの力。「農」で人・企業・本がつながる。
        </div>
        <div style={{marginTop:8, fontSize:10, color:"#666"}}>
          色彩日本語 ルビColourful Japan™ は株式会社ダンクソフトの商標出願中です。
        </div>
      </div>
    </div>
  );
}
