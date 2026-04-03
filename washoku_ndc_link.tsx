import { useState, useMemo } from "react";

// ===================== NDC 10大分類 =====================
const NDC10 = [
  { code:"0", name:"総記",      kanji:"総", color:"#7F8C8D", motif:"すべてを包む・中立",   washokuKey:"灰・鼠" },
  { code:"1", name:"哲学",      kanji:"哲", color:"#6C3483", motif:"思索・精神・神秘",     washokuKey:"紫・菫・葡萄" },
  { code:"2", name:"歴史",      kanji:"史", color:"#7D4427", motif:"土・時間・古色",       washokuKey:"茶・弁柄・朽葉" },
  { code:"3", name:"社会科学",  kanji:"社", color:"#1A3A6B", motif:"秩序・制度・権威",     washokuKey:"紺・藍・勝色" },
  { code:"4", name:"自然科学",  kanji:"然", color:"#196F3D", motif:"自然・生命・地球",     washokuKey:"緑・萌黄・若草・翡翠" },
  { code:"5", name:"技術・工学",kanji:"技", color:"#B7470A", motif:"手・ものをつくる",     washokuKey:"橙・赤・鉄" },
  { code:"6", name:"産業",      kanji:"産", color:"#C8A000", motif:"実り・富・生産",       washokuKey:"黄・山吹・鬱金" },
  { code:"7", name:"芸術",      kanji:"芸", color:"#B0003A", motif:"感性・美・表現",       washokuKey:"赤・紅・桜・躑躅" },
  { code:"8", name:"言語",      kanji:"語", color:"#1565C0", motif:"言葉・空・広がり",     washokuKey:"青・縹・水色・花色" },
  { code:"9", name:"文学",      kanji:"文", color:"#8B4513", motif:"物語・人間・温かみ",   washokuKey:"茶赤・桃・珊瑚" },
];

// ===================== 和色→NDC 連携 =====================
const COLOR_NDC = [
  {name:"藍色",    yomi:"あいいろ",      hex:"#004C71", g:"青",  ndc:["8","3"], reason:"藍染は日本語文化・社会制度と深く結びつく。"},
  {name:"縹色",    yomi:"はなだいろ",    hex:"#0086AD", g:"青",  ndc:["8"],     reason:"万葉集から続く言語表現の色。和歌・古典文学の世界観。"},
  {name:"花色",    yomi:"はないろ",      hex:"#0086AD", g:"青",  ndc:["8","7"], reason:"江戸の染め色。言語表現・芸術文化に通じる。"},
  {name:"水色",    yomi:"みずいろ",      hex:"#7FCCE3", g:"青",  ndc:["4","8"], reason:"水＝自然科学（水文学）、澄んだ言語表現の比喩。"},
  {name:"空色",    yomi:"そらいろ",      hex:"#73B8E2", g:"青",  ndc:["4","8"], reason:"空・大気＝自然科学（気象・天文）。広がり＝言語。"},
  {name:"紺碧",    yomi:"こんぺき",      hex:"#005B98", g:"青",  ndc:["4"],     reason:"真夏の空・深海＝自然科学。地球科学そのもの。"},
  {name:"勝色",    yomi:"かついろ",      hex:"#181B39", g:"青",  ndc:["3","2"], reason:"武家に愛された濃藍。社会秩序・歴史・武家文化を象徴。"},
  {name:"瑠璃色",  yomi:"るりいろ",      hex:"#004898", g:"青",  ndc:["1","7"], reason:"仏の髪の色・七宝。哲学（仏教）・芸術（宝石工芸）。"},
  {name:"群青色",  yomi:"ぐんじょういろ",hex:"#005BAA", g:"青",  ndc:["7","4"], reason:"岩絵具。日本画・芸術の基本色。鉱物＝自然科学。"},
  {name:"浅葱色",  yomi:"あさぎいろ",    hex:"#00A5BF", g:"青",  ndc:["6","2"], reason:"ネギの色。農業（野菜）＝産業。新選組の色で歴史にも。"},
  {name:"甕覗",    yomi:"かめのぞき",    hex:"#C5E4ED", g:"青",  ndc:["5","6"], reason:"藍甕＝製造技術・染色工業。産業と技術の原点。"},
  {name:"御納戸色",yomi:"おなんどいろ",  hex:"#007083", g:"青",  ndc:["3","2"], reason:"江戸時代の流行色。生活・社会文化・歴史を映す。"},
  {name:"露草色",  yomi:"つゆくさいろ",  hex:"#71A4D9", g:"青",  ndc:["4","6"], reason:"露草（植物）＝自然科学・植物学。花の色素の化学。"},
  {name:"深藍",    yomi:"ふかあい",      hex:"#004150", g:"青",  ndc:["3"],     reason:"最も深い藍。社会制度・権威・秩序を象徴する色。"},
  {name:"紅",      yomi:"くれない",      hex:"#CB1B45", g:"赤",  ndc:["7","9"], reason:"紅花染の赤。芸術（染色）・文学（源氏物語の紅）。"},
  {name:"緋色",    yomi:"ひいろ",        hex:"#E83929", g:"赤",  ndc:["7","2"], reason:"武具・装束の赤。芸術（染色）・歴史（武家文化）。"},
  {name:"朱色",    yomi:"しゅいろ",      hex:"#E0522B", g:"赤",  ndc:["7","5"], reason:"朱塗り＝工芸・建築（技術）。漆芸＝芸術。"},
  {name:"茜色",    yomi:"あかねいろ",    hex:"#9B1B30", g:"赤",  ndc:["4","6"], reason:"茜草（植物）で染める。植物学・農業・染料化学。"},
  {name:"桜色",    yomi:"さくらいろ",    hex:"#F2A0B0", g:"赤",  ndc:["7","9"], reason:"桜は日本文学・芸術の代表的モチーフ。美と無常の象徴。"},
  {name:"薔薇色",  yomi:"ばらいろ",      hex:"#E73275", g:"赤",  ndc:["7","4"], reason:"薔薇（植物）。芸術的モチーフ・園芸（自然科学）。"},
  {name:"弁柄色",  yomi:"べんがらいろ",  hex:"#9B3A2A", g:"赤",  ndc:["5","2"], reason:"インド由来の顔料。建築材料（技術）・染料の歴史。"},
  {name:"臙脂",    yomi:"えんじ",        hex:"#9B0040", g:"赤",  ndc:["7","2"], reason:"中国由来の染料。芸術（染色）・歴史（大陸交流）。"},
  {name:"牡丹色",  yomi:"ぼたんいろ",    hex:"#C0305A", g:"赤",  ndc:["4","7"], reason:"牡丹（植物・花）。植物学・芸術的モチーフ。"},
  {name:"珊瑚色",  yomi:"さんごいろ",    hex:"#F28A6D", g:"赤",  ndc:["4","7"], reason:"珊瑚（海洋生物）＝自然科学（生物）。宝石工芸＝芸術。"},
  {name:"曙色",    yomi:"あけぼのいろ",  hex:"#F4A080", g:"赤",  ndc:["9","7"], reason:"枕草子の「春はあけぼの」。文学の象徴色。"},
  {name:"躑躅色",  yomi:"つつじいろ",    hex:"#E02C87", g:"赤",  ndc:["4","7"], reason:"躑躅（植物）。万葉集にも登場する植物文学・芸術の色。"},
  {name:"猩々緋",  yomi:"しょうじょうひ",hex:"#C9361C", g:"赤",  ndc:["2","7"], reason:"西洋から伝来した緋色。歴史（渡来文化）・芸術（染色）。"},
  {name:"萌黄",    yomi:"もえぎ",        hex:"#88A838", g:"緑",  ndc:["4","6"], reason:"芽吹き＝植物の生命力。自然科学（植物学）・農業（産業）。"},
  {name:"若草色",  yomi:"わかくさいろ",  hex:"#90B840", g:"緑",  ndc:["4"],     reason:"若い草の色。植物学・生態学・自然科学の象徴色。"},
  {name:"常磐色",  yomi:"ときわいろ",    hex:"#1B6B3A", g:"緑",  ndc:["4","6"], reason:"常緑樹。永続する自然・林業（産業）・生命科学。"},
  {name:"翡翠色",  yomi:"ひすいいろ",    hex:"#38B088", g:"緑",  ndc:["4","7"], reason:"翡翠（鉱物・鳥）。地球科学（鉱物）・芸術（宝石工芸）。"},
  {name:"松葉色",  yomi:"まつばいろ",    hex:"#4A7840", g:"緑",  ndc:["4","6"], reason:"松（植物）。植物学・林業（産業）。日本の自然の象徴。"},
  {name:"竹色",    yomi:"たけいろ",      hex:"#809858", g:"緑",  ndc:["6","7"], reason:"竹（産業素材）。林業・竹工芸（芸術）・日本の産業文化。"},
  {name:"鶸色",    yomi:"ひわいろ",      hex:"#C8D840", g:"緑",  ndc:["4"],     reason:"鶸（野鳥）の羽の色。動物学・鳥類学（自然科学）。"},
  {name:"青磁色",  yomi:"せいじいろ",    hex:"#98C8B8", g:"緑",  ndc:["7","5"], reason:"青磁器の色。工芸（芸術）・陶磁器技術（技術）。"},
  {name:"緑青色",  yomi:"ろくしょういろ",hex:"#3A8070", g:"緑",  ndc:["4","7"], reason:"銅の酸化による緑。化学（自然科学）・日本画の顔料（芸術）。"},
  {name:"鶯色",    yomi:"うぐいすいろ",  hex:"#808030", g:"緑",  ndc:["4","9"], reason:"鶯（野鳥）。動物学（自然科学）・文学（春を告げる鳥）。"},
  {name:"海松色",  yomi:"みるいろ",      hex:"#706840", g:"緑",  ndc:["4","6"], reason:"海松（海藻）。海洋生物学（自然科学）・水産業（産業）。"},
  {name:"玉虫色",  yomi:"たまむしいろ",  hex:"#00562B", g:"緑",  ndc:["4","7"], reason:"玉虫（昆虫）。昆虫学（自然科学）・工芸装飾（芸術）。"},
  {name:"山吹色",  yomi:"やまぶきいろ",  hex:"#E8A000", g:"黄",  ndc:["6","7"], reason:"山吹（植物・花）。園芸（産業）・文学的モチーフ（芸術）。"},
  {name:"鬱金色",  yomi:"うこんいろ",    hex:"#D4A800", g:"黄",  ndc:["4","6"], reason:"ウコン（植物・薬草）。薬学（自然科学）・農業・染料産業。"},
  {name:"金色",    yomi:"きんいろ",      hex:"#D4AF37", g:"黄",  ndc:["5","7"], reason:"金属（技術・工学）。金工芸・装飾（芸術）。"},
  {name:"蒲公英色",yomi:"たんぽぽいろ",  hex:"#F8D040", g:"黄",  ndc:["4","9"], reason:"タンポポ（植物）。植物学（自然科学）・文学的モチーフ。"},
  {name:"菜の花色",yomi:"なのはないろ",  hex:"#F0E050", g:"黄",  ndc:["6","4"], reason:"菜の花（農業作物）。農業（産業）・植物学（自然科学）。"},
  {name:"琥珀色",  yomi:"こはくいろ",    hex:"#C88820", g:"黄",  ndc:["4","7"], reason:"琥珀（化石・宝石）。古生物学（自然科学）・宝石工芸（芸術）。"},
  {name:"向日葵色",yomi:"ひまわりいろ",  hex:"#FCCA00", g:"黄",  ndc:["4","6"], reason:"ヒマワリ（植物・農業作物）。植物学・農業・油脂産業。"},
  {name:"刈安色",  yomi:"かりやすいろ",  hex:"#D9C400", g:"黄",  ndc:["6","4"], reason:"刈安草（染料植物）。農業・染料産業・植物学。"},
  {name:"弁柄",    yomi:"べんがら",      hex:"#9B3A2A", g:"茶",  ndc:["5","2"], reason:"酸化鉄顔料。建築材料（技術）・染色の歴史（歴史）。"},
  {name:"江戸茶",  yomi:"えどちゃ",      hex:"#A05028", g:"茶",  ndc:["2","9"], reason:"江戸時代の流行色。歴史（江戸文化）・文学（町人文化）。"},
  {name:"利休茶",  yomi:"りきゅうちゃ",  hex:"#788050", g:"茶",  ndc:["7","2"], reason:"千利休由来の色。茶道（芸術）・桃山時代の歴史。"},
  {name:"煉瓦色",  yomi:"れんがいろ",    hex:"#B04028", g:"茶",  ndc:["5","2"], reason:"煉瓦（建築材料）。建築技術・近代化の歴史（明治）。"},
  {name:"団十郎茶",yomi:"だんじゅうろうちゃ",hex:"#884028",g:"茶",ndc:["7","2"],reason:"歌舞伎役者由来の色。演劇（芸術）・江戸文化（歴史）。"},
  {name:"朽葉色",  yomi:"くちばいろ",    hex:"#C88030", g:"茶",  ndc:["4","9"], reason:"朽ちた葉。植物の生態（自然科学）・詩歌の秋の意象（文学）。"},
  {name:"紫",      yomi:"むらさき",      hex:"#5B2D8E", g:"紫",  ndc:["1","7"], reason:"高貴な色。哲学・宗教（仏教の法衣）・芸術（王権の色）。"},
  {name:"菫色",    yomi:"すみれいろ",    hex:"#7B5EA7", g:"紫",  ndc:["4","7"], reason:"菫（植物・花）。植物学（自然科学）・芸術的モチーフ。"},
  {name:"桔梗色",  yomi:"ききょういろ",  hex:"#7047A8", g:"紫",  ndc:["4","9"], reason:"桔梗（植物・薬草）。薬学（自然科学）・万葉集（文学）。"},
  {name:"藤色",    yomi:"ふじいろ",      hex:"#9B7FC7", g:"紫",  ndc:["4","9"], reason:"藤（植物）。植物学（自然科学）・古典文学（源氏物語）。"},
  {name:"葡萄色",  yomi:"ぶどういろ",    hex:"#6B2D8E", g:"紫",  ndc:["6","4"], reason:"葡萄（果実）。農業・食品産業（産業）・植物学（自然科学）。"},
  {name:"紫紺",    yomi:"しこん",        hex:"#3B0E6B", g:"紫",  ndc:["1","3"], reason:"最も深い紫。哲学・宗教の奥深さ・社会的権威を象徴。"},
  {name:"江戸紫",  yomi:"えどむらさき",  hex:"#6C3882", g:"紫",  ndc:["2","7"], reason:"江戸の染め色。歴史（江戸文化）・染色芸術。"},
  {name:"杜若色",  yomi:"かきつばたいろ",hex:"#5840A0", g:"紫",  ndc:["4","9"], reason:"杜若（植物・水辺の花）。植物学・伊勢物語（文学）。"},
  {name:"紫苑色",  yomi:"しおんいろ",    hex:"#8888C0", g:"紫",  ndc:["4","9"], reason:"紫苑（植物・薬草）。薬学・古典文学の季語（文学）。"},
  {name:"竜胆色",  yomi:"りんどういろ",  hex:"#6860A8", g:"紫",  ndc:["4","6"], reason:"竜胆（薬草植物）。薬学（自然科学）・生薬産業（産業）。"},
  {name:"墨色",    yomi:"すみいろ",      hex:"#3D3C3A", g:"白黒",ndc:["7","0"], reason:"和墨・書道。芸術（書道・絵画）・総記（情報の記録）。"},
  {name:"銀色",    yomi:"ぎんいろ",      hex:"#C0C0C0", g:"白黒",ndc:["5","7"], reason:"金属（技術）。金属工学・銀工芸（芸術）。"},
  {name:"鼠色",    yomi:"ねずみいろ",    hex:"#909090", g:"白黒",ndc:["3","0"], reason:"江戸の庶民色（百鼠）。社会文化（社会科学）・総記。"},
  {name:"鈍色",    yomi:"にびいろ",      hex:"#808088", g:"白黒",ndc:["1","9"], reason:"喪・仏事の色。哲学（宗教）・文学（源氏物語の出家場面）。"},
  {name:"白",      yomi:"しろ",          hex:"#F5F5F0", g:"白黒",ndc:["0","4"], reason:"純粋・始まり。総記（知の起点）・自然科学（光の色）。"},
];

// ===================== 花の色データ（i-iro.com より） =====================
const HANA = [
  // 和名（日本の花）
  {name:"露草色",   yomi:"つゆくさいろ",  hex:"#4EA4D4", type:"和",  flower:"露草（ツユクサ）",  ndc:["4","9"], season:"夏",
   note:"万葉集にも詠まれた身近な野草。青花紙の原料。自然科学（植物）・文学（夏の季語）。"},
  {name:"勿忘草色", yomi:"わすれなぐさいろ",hex:"#89BCDE",type:"和",  flower:"勿忘草（ワスレナグサ）",ndc:["9","7"],season:"春",
   note:"ドイツ伝説に由来する色名。文学（浪漫主義）・芸術（近代絵画）。"},
  {name:"桜色",     yomi:"さくらいろ",    hex:"#FEE3E3", type:"和",  flower:"桜（サクラ）",       ndc:["9","7"], season:"春",
   note:"日本文学・芸術の最重要モチーフ。万葉集・源氏物語・俳句に登場。"},
  {name:"灰桜",     yomi:"はいざくら",    hex:"#F0C8C4", type:"和",  flower:"桜（サクラ）",       ndc:["7","9"], season:"春",
   note:"灰色がかった桜色。侘び・寂びの美意識。芸術（染色）・文学（俳句）。"},
  {name:"退紅色",   yomi:"たいこうしょく", hex:"#E8B4AA", type:"和",  flower:"紅花（ベニバナ）",   ndc:["6","5"], season:"夏",
   note:"色褪せた紅染。紅花染料産業・繊維技術の歴史。"},
  {name:"一斤染",   yomi:"いっこんぞめ",  hex:"#F5C8C2", type:"和",  flower:"紅花（ベニバナ）",   ndc:["6","5"], season:"夏",
   note:"紅花一斤で絹一疋を染めた薄色。染色技術・産業の基準色。"},
  {name:"紅梅色",   yomi:"こうばいいろ",  hex:"#E87880", type:"和",  flower:"梅（ウメ）",         ndc:["4","9"], season:"春",
   note:"梅は万葉集で最多詠まれた花。植物学・日本文学の象徴。"},
  {name:"桃色",     yomi:"ももいろ",      hex:"#F090A0", type:"和",  flower:"桃（モモ）",         ndc:["4","6"], season:"春",
   note:"桃は農業作物であり、桃の節句など文化的象徴でもある。"},
  {name:"薔薇色",   yomi:"ばらいろ",      hex:"#E84080", type:"和",  flower:"薔薇（バラ）",       ndc:["4","7"], season:"春夏",
   note:"植物学（園芸）・芸術（西洋絵画・装飾）に欠かせないモチーフ。"},
  {name:"牡丹色",   yomi:"ぼたんいろ",    hex:"#C03060", type:"和",  flower:"牡丹（ボタン）",     ndc:["4","7"], season:"春",
   note:"「花の王」。植物学（園芸）・文学（漢詩）・芸術（日本画）。"},
  {name:"躑躅色",   yomi:"つつじいろ",    hex:"#E02C87", type:"和",  flower:"躑躅（ツツジ）",     ndc:["4","7"], season:"春",
   note:"万葉集にも登場。植物学・芸術（日本画・庭園）。"},
  {name:"撫子色",   yomi:"なでしこいろ",  hex:"#EDA8B0", type:"和",  flower:"撫子（ナデシコ）",   ndc:["4","9"], season:"秋",
   note:"秋の七草のひとつ。植物学・文学（秋の季語・万葉集）。"},
  {name:"山吹色",   yomi:"やまぶきいろ",  hex:"#E8A000", type:"和",  flower:"山吹（ヤマブキ）",   ndc:["6","9"], season:"春",
   note:"「七重八重 花は咲けども山吹の…」和歌の名花。産業・文学。"},
  {name:"菜の花色", yomi:"なのはないろ",  hex:"#F0E050", type:"和",  flower:"菜の花（アブラナ）", ndc:["6","4"], season:"春",
   note:"農業作物。食用油・蜜蜂の蜜源。農業産業・植物学。"},
  {name:"蒲公英色", yomi:"たんぽぽいろ",  hex:"#F8D040", type:"和",  flower:"蒲公英（タンポポ）", ndc:["4","9"], season:"春",
   note:"身近な野草。民間薬草・食用。植物学・文学（童謡・詩）。"},
  {name:"向日葵色", yomi:"ひまわりいろ",  hex:"#FCCA00", type:"和",  flower:"向日葵（ヒマワリ）", ndc:["4","6"], season:"夏",
   note:"油脂原料・農業作物。植物学・農業産業・芸術（ゴッホ）。"},
  {name:"萱草色",   yomi:"かんぞういろ",  hex:"#F08040", type:"和",  flower:"萱草（カンゾウ）",   ndc:["4","6"], season:"夏",
   note:"「忘れ草」とも呼ばれた万葉の花。食用植物・薬草。"},
  {name:"藤色",     yomi:"ふじいろ",      hex:"#9B7FC7", type:"和",  flower:"藤（フジ）",         ndc:["4","9"], season:"春",
   note:"源氏物語「藤壺」。日本文学・絵画の重要モチーフ。"},
  {name:"菖蒲色",   yomi:"しょうぶいろ",  hex:"#8060A8", type:"和",  flower:"菖蒲（ショウブ）",   ndc:["4","9"], season:"夏",
   note:"端午の節句の花。文化行事（民俗学）・植物学。"},
  {name:"杜若色",   yomi:"かきつばたいろ",hex:"#5840A0", type:"和",  flower:"杜若（カキツバタ）", ndc:["4","9"], season:"春",
   note:"伊勢物語「かきつばた」。文学の名歌・水辺の植物学。"},
  {name:"菫色",     yomi:"すみれいろ",    hex:"#7B5EA7", type:"和",  flower:"菫（スミレ）",       ndc:["4","7"], season:"春",
   note:"春の野草。文学（啄木・万葉）・芸術・植物学。"},
  {name:"桔梗色",   yomi:"ききょういろ",  hex:"#7047A8", type:"和",  flower:"桔梗（キキョウ）",   ndc:["4","9"], season:"秋",
   note:"秋の七草・薬草。薬学（自然科学）・万葉集（文学）。"},
  {name:"紫苑色",   yomi:"しおんいろ",    hex:"#8888C0", type:"和",  flower:"紫苑（シオン）",     ndc:["4","9"], season:"秋",
   note:"秋の花。薬草・古典文学の季語。薬学・文学。"},
  {name:"竜胆色",   yomi:"りんどういろ",  hex:"#6860A8", type:"和",  flower:"竜胆（リンドウ）",   ndc:["4","6"], season:"秋",
   note:"秋の七草にも数えられる薬草。薬学・生薬産業。"},
  {name:"卯の花色", yomi:"うのはないろ",  hex:"#F8F4F0", type:"和",  flower:"空木（ウノハナ）",   ndc:["9","4"], season:"夏",
   note:"「卯の花の 匂う垣根に…」童謡・文学。白い花の植物学。"},
  // 洋名（世界の花）
  {name:"ローズ",       yomi:"ろーず",         hex:"#E8405A", type:"洋",  flower:"薔薇（バラ）",       ndc:["7","4"], season:"春夏",
   note:"西洋芸術・文学の象徴色。絵画・詩・音楽に登場。"},
  {name:"ラベンダー",   yomi:"らべんだー",     hex:"#A08CC0", type:"洋",  flower:"ラベンダー",         ndc:["4","6"], season:"夏",
   note:"芳香植物。香料産業・アロマテラピー・農業産業。"},
  {name:"ライラック",   yomi:"らいらっく",     hex:"#C0A8D8", type:"洋",  flower:"ライラック（リラ）", ndc:["4","9"], season:"春",
   note:"フランス文学・音楽（リラ色の夜）に頻出するロマン的花。"},
  {name:"バイオレット", yomi:"ばいおれっと",   hex:"#7060B0", type:"洋",  flower:"菫（スミレ）",       ndc:["4","7"], season:"春",
   note:"西洋芸術・宝石・光学（可視光の端）。自然科学（物理）にも。"},
  {name:"パンジー",     yomi:"ぱんじー",       hex:"#5038A0", type:"洋",  flower:"パンジー",           ndc:["6","7"], season:"春",
   note:"園芸品種の代表。農業（園芸産業）・芸術（装飾モチーフ）。"},
  {name:"オーキッド",   yomi:"おーきっど",     hex:"#D090C0", type:"洋",  flower:"蘭（ラン）",         ndc:["4","6"], season:"通年",
   note:"熱帯植物学・園芸産業。生物多様性の象徴。"},
  {name:"マリーゴールド",yomi:"まりーごーるど", hex:"#F09820", type:"洋",  flower:"金盞花",             ndc:["6","4"], season:"夏秋",
   note:"農業（害虫対策のコンパニオンプランツ）・薬用植物。"},
  {name:"サフランイエロー",yomi:"さふらんいえろー",hex:"#F0C030",type:"洋",flower:"サフラン",          ndc:["6","4"], season:"秋",
   note:"世界最高級の香辛料。農業産業・食品化学・薬学。"},
  {name:"ヒヤシンス",   yomi:"ひやしんす",     hex:"#6870C0", type:"洋",  flower:"ヒヤシンス",         ndc:["4","9"], season:"春",
   note:"ギリシャ神話由来（ヒュアキントス）。文学（神話）・植物学。"},
  {name:"サルビアブルー",yomi:"さるびあぶるー", hex:"#4060B0", type:"洋",  flower:"サルビア（サルビア）",ndc:["4","6"],season:"夏秋",
   note:"薬用サルビア（セージ）は香辛料・薬草産業の重要植物。"},
  {name:"ポピーレッド", yomi:"ぽぴーれっど",   hex:"#E03020", type:"洋",  flower:"罌粟（ケシ）",       ndc:["4","3"], season:"春",
   note:"ケシ（植物）は麻薬・鎮痛薬の原料。薬学・社会問題（法律）。"},
  {name:"ベゴニア",     yomi:"べごにあ",       hex:"#E86050", type:"洋",  flower:"ベゴニア",           ndc:["4","6"], season:"夏",
   note:"熱帯原産の園芸植物。植物学・園芸産業（産業）。"},
  {name:"カメリア",     yomi:"かめりあ",       hex:"#D02840", type:"洋",  flower:"椿（ツバキ）",       ndc:["7","9"], season:"冬春",
   note:"「椿姫」（デュマ）。西洋文学・芸術（ジャポニスム）の象徴。"},
  {name:"フクシアピンク",yomi:"ふくしあぴんく", hex:"#E870B0", type:"洋",  flower:"フクシア",           ndc:["4","7"], season:"春夏",
   note:"中南米原産の観賞植物。植物学・園芸・芸術（色彩）。"},
  {name:"ウィスタリア", yomi:"うぃすたりあ",   hex:"#8878C0", type:"洋",  flower:"藤（フジ）",         ndc:["4","9"], season:"春",
   note:"英名で藤を指す。西洋における日本庭園・ジャポニスムの象徴。"},
  {name:"ヘリオトロープ",yomi:"へりおとろーぷ", hex:"#B060B8", type:"洋",  flower:"ニオイムラサキ",     ndc:["4","7"], season:"春夏",
   note:"ギリシャ語「太陽に向かう」。植物の向日性（自然科学）・芸術。"},
  {name:"ブーゲンビリア",yomi:"ぶーげんびりあ", hex:"#D030A0", type:"洋",  flower:"ブーゲンビリア",     ndc:["4","6"], season:"通年",
   note:"熱帯植物。バーガンヴィル提督（歴史）が発見・命名した花。"},
  {name:"クロッカス",   yomi:"くろっかす",     hex:"#A080C8", type:"洋",  flower:"クロッカス",         ndc:["4","6"], season:"春",
   note:"サフランと同属。球根植物・園芸産業。"},
  {name:"コクリコ",     yomi:"こくりこ",       hex:"#E02000", type:"洋",  flower:"雛罌粟（ヒナゲシ）", ndc:["9","7"], season:"春",
   note:"フランス文学（コクリコ畑）・印象派絵画（モネ）の象徴花。"},
];

const NDC_COLORS = {
  "0":"#7F8C8D","1":"#6C3483","2":"#7D4427","3":"#1A3A6B",
  "4":"#196F3D","5":"#B7470A","6":"#C8A000","7":"#B0003A",
  "8":"#1565C0","9":"#8B4513"
};
const GC = {青:"#005B98",赤:"#CB1B45",緑:"#196F3D",黄:"#C8A000",茶:"#7D4427",紫:"#6C3483",白黒:"#555"};
const SEASONS = ["全季節","春","夏","秋","冬","春夏","通年"];
const TYPES = ["和洋すべて","和","洋"];
const TABS = ["🌸 花の色×NDC","🎨 和色→NDC","📚 NDC→和色逆引き","🌿 部首×分類"];

function lum(hex){
  if(!hex||hex.length<7) return 100;
  return parseInt(hex.slice(1,3),16)*0.299+parseInt(hex.slice(3,5),16)*0.587+parseInt(hex.slice(5,7),16)*0.114;
}
function Chip({k,c,s=32}){
  return <div style={{width:s,height:s,borderRadius:5,background:c||"#ccc",display:"flex",
    alignItems:"center",justifyContent:"center",fontSize:s*0.44,fontWeight:"bold",
    color:lum(c||"#888")>140?"#333":"#fff",fontFamily:"serif",flexShrink:0,
    border:"1px solid rgba(0,0,0,0.1)"}}>{k}</div>;
}

export default function App(){
  const [tab,setTab]=useState(0);
  const [ndcSel,setNdcSel]=useState(null);
  const [season,setSeason]=useState("全季節");
  const [typeF,setTypeF]=useState("和洋すべて");
  const [grp,setGrp]=useState("全て");
  const [q,setQ]=useState("");

  // 花フィルタ
  const hanaFiltered = useMemo(()=>HANA.filter(h=>{
    const sOK = season==="全季節" || h.season.includes(season.replace("全季節",""));
    const tOK = typeF==="和洋すべて" || h.type===typeF;
    const nOK = !ndcSel || h.ndc.includes(ndcSel);
    const qOK = !q || h.name.includes(q)||h.yomi.includes(q)||h.flower.includes(q);
    return sOK&&tOK&&nOK&&qOK;
  }),[season,typeF,ndcSel,q]);

  // 和色フィルタ
  const colorFiltered = useMemo(()=>COLOR_NDC.filter(c=>{
    const gOK = grp==="全て"||c.g===grp;
    const nOK = !ndcSel||c.ndc.includes(ndcSel);
    const qOK = !q||c.name.includes(q)||c.yomi.includes(q);
    return gOK&&nOK&&qOK;
  }),[grp,ndcSel,q]);

  // NDC逆引き
  const ndcRev = useMemo(()=>{
    const m={};
    NDC10.forEach(n=>{m[n.code]={washoku:[],hana:[]};});
    COLOR_NDC.forEach(c=>c.ndc.forEach(n=>{if(m[n])m[n].washoku.push(c);}));
    HANA.forEach(h=>h.ndc.forEach(n=>{if(m[n])m[n].hana.push(h);}));
    return m;
  },[]);

  // 部首データ
  const BUSHU=[
    {bushu:"艹",read:"草かんむり",ndc:"4",color:"#196F3D",
     washoku:["萌黄","若草","蒲公英色","躑躅色","菫色","桔梗色","藤色"],
     hana:["萱草色","菜の花色","菫色","桔梗色","紫苑色","竜胆色"],
     note:"植物・草木 → 4類自然科学（植物学）・6類産業（農業）"},
    {bushu:"木",read:"きへん",ndc:"6",color:"#7D4427",
     washoku:["松葉色","竹色","朽葉色","桃色","桑色","栗色"],
     hana:["桜色","桃色","山吹色","梅色"],
     note:"木・樹木 → 6類産業（林業・農業）・4類自然科学（植物学）"},
    {bushu:"氵",read:"さんずい",ndc:"8",color:"#1565C0",
     washoku:["水色","水縹","水浅葱","深藍"],
     hana:["露草色","卯の花色"],
     note:"水・液体 → 8類言語（流れ・広がり）・4類自然科学（水文学）"},
    {bushu:"糸",read:"いとへん",ndc:"5",color:"#B7470A",
     washoku:["紅","紺","縹色","紫","緋色","紅梅色"],
     hana:["紅梅色","一斤染","退紅色"],
     note:"染色・糸 → 5類技術（繊維工業）・7類芸術（染織・染色）"},
    {bushu:"石",read:"いしへん",ndc:"4",color:"#708090",
     washoku:["青磁色","緑青色","群青色","瑠璃色","珊瑚色"],
     hana:["バイオレット","ラベンダー"],
     note:"鉱物・石 → 4類自然科学（地学・鉱物学）・7類芸術（顔料・工芸）"},
    {bushu:"金",read:"かねへん",ndc:"5",color:"#C8A000",
     washoku:["金色","銀色","錫色","鉄色","鉄紺"],
     hana:["サフランイエロー","マリーゴールド"],
     note:"金属 → 5類技術（金属工学）・7類芸術（金工）"},
    {bushu:"鳥",read:"とりへん",ndc:"4",color:"#4A7840",
     washoku:["鶸色","鶯色","鴇色","鴨頭草"],
     hana:["向日葵色","ウィスタリア"],
     note:"鳥類 → 4類自然科学（鳥類学）・9類文学（鳥の歌）"},
    {bushu:"日",read:"にちへん",ndc:"9",color:"#8B4513",
     washoku:["曙色"],
     hana:["向日葵色","サンフラワー"],
     note:"日・光・時間 → 9類文学（自然描写・季語）・4類自然科学（天文）"},
  ];

  const tabColors=["#4A2060","#1A3A6B","#196F3D","#4A3010"];

  return(
    <div style={{fontFamily:"sans-serif",background:"#F5F4EF",minHeight:"100vh",padding:12}}>
      <div style={{maxWidth:1040,margin:"0 auto"}}>

        {/* ヘッダ */}
        <div style={{background:"linear-gradient(135deg,#1a0a2e 0%,#2d1b4e 40%,#0d2a10 100%)",
          borderRadius:12,padding:"14px 18px",marginBottom:12,color:"#fff"}}>
          <div style={{fontSize:18,fontWeight:"bold",letterSpacing:2}}>
            🌸 花の色 × 🎨 和色 × 📚 NDC — 統合マップ
          </div>
          <div style={{fontSize:11,color:"#bbc",marginTop:2}}>
            色彩日本語 ルビColourful Japan™（出願中）／ 花名・和色名・部首がNDC図書分類の色決定ロジックになる
          </div>
          {/* NDC選択バー */}
          <div style={{display:"flex",gap:6,marginTop:10,flexWrap:"wrap"}}>
            {NDC10.map(n=>{
              const wc=ndcRev[n.code]?.washoku.length||0;
              const hc=ndcRev[n.code]?.hana.length||0;
              return(
                <div key={n.code}
                  onClick={()=>setNdcSel(ndcSel===n.code?null:n.code)}
                  style={{display:"flex",alignItems:"center",gap:4,
                    background:ndcSel===n.code?"rgba(255,255,255,0.25)":"rgba(255,255,255,0.08)",
                    borderRadius:6,padding:"4px 8px",cursor:"pointer",
                    border:ndcSel===n.code?"1px solid rgba(255,255,255,0.6)":"1px solid transparent"}}>
                  <Chip k={n.kanji} c={n.color} s={22}/>
                  <div style={{fontSize:10,lineHeight:1.3}}>
                    <div>{n.code}類 {n.name}</div>
                    <div style={{color:"#aac"}}>和{wc} 花{hc}</div>
                  </div>
                </div>
              );
            })}
          </div>
          {ndcSel&&(
            <div style={{marginTop:6,fontSize:11,color:"#ffd",padding:"3px 10px",
              background:"rgba(255,255,255,0.1)",borderRadius:5,display:"inline-block"}}>
              🔍 {NDC10.find(n=>n.code===ndcSel)?.name}でフィルタ中（クリックで解除）
            </div>
          )}
        </div>

        {/* タブ */}
        <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
          {TABS.map((t,i)=>(
            <button key={i} onClick={()=>{setTab(i);setQ("");}}
              style={{padding:"6px 14px",borderRadius:6,border:"none",cursor:"pointer",fontSize:12,
                background:tab===i?tabColors[i]:"#fff",color:tab===i?"#fff":"#444",
                boxShadow:"0 1px 3px rgba(0,0,0,0.1)"}}>
              {t}
            </button>
          ))}
        </div>

        {/* ===== TAB 0: 花の色×NDC ===== */}
        {tab===0&&(
          <div>
            <div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap",alignItems:"center"}}>
              {TYPES.map(t=>(
                <button key={t} onClick={()=>setTypeF(t)}
                  style={{padding:"3px 10px",borderRadius:4,border:"none",cursor:"pointer",fontSize:11,
                    background:typeF===t?"#4A2060":"#fff",color:typeF===t?"#fff":"#444",
                    boxShadow:"0 1px 2px rgba(0,0,0,0.1)"}}>
                  {t}
                </button>
              ))}
              <span style={{fontSize:11,color:"#888",margin:"0 4px"}}>季節:</span>
              {SEASONS.map(s=>(
                <button key={s} onClick={()=>setSeason(s)}
                  style={{padding:"3px 8px",borderRadius:4,border:"none",cursor:"pointer",fontSize:11,
                    background:season===s?"#196F3D":"#fff",color:season===s?"#fff":"#444",
                    boxShadow:"0 1px 2px rgba(0,0,0,0.1)"}}>
                  {s}
                </button>
              ))}
            </div>
            <input value={q} onChange={e=>setQ(e.target.value)}
              placeholder={`花名・色名で検索（${hanaFiltered.length}/${HANA.length}色表示）`}
              style={{width:"100%",padding:"7px 12px",borderRadius:6,border:"1px solid #ddd",
                fontSize:13,marginBottom:10,boxSizing:"border-box"}}/>

            <div style={{background:"#fff",borderRadius:10,overflow:"hidden",
              boxShadow:"0 1px 6px rgba(0,0,0,0.08)"}}>
              <table style={{borderCollapse:"collapse",width:"100%",fontSize:12}}>
                <thead>
                  <tr style={{background:"#2d1b3e",color:"#fff"}}>
                    <th style={{padding:"8px 8px",textAlign:"center",width:36}}>色</th>
                    <th style={{padding:"8px 8px",textAlign:"left",minWidth:80}}>色名</th>
                    <th style={{padding:"8px 8px",textAlign:"center",width:36}}>種</th>
                    <th style={{padding:"8px 8px",textAlign:"left",minWidth:100}}>花（植物）</th>
                    <th style={{padding:"8px 8px",textAlign:"center",width:50}}>色見本</th>
                    <th style={{padding:"8px 8px",textAlign:"center",width:40}}>季節</th>
                    <th style={{padding:"8px 8px",textAlign:"left",minWidth:110}}>関連NDC</th>
                    <th style={{padding:"8px 8px",textAlign:"left"}}>補足（図書分類での活用）</th>
                  </tr>
                </thead>
                <tbody>
                  {hanaFiltered.map((h,i)=>{
                    const k=h.name.split("").find(c=>/[\u4e00-\u9fff]/.test(c))||h.name[0];
                    return(
                      <tr key={i} style={{background:i%2===0?"#fff":"#fafaf8",
                        borderBottom:"1px solid #f0ede8",
                        borderLeft:`3px solid ${h.type==="和"?"#C8A000":"#4A2060"}`}}>
                        <td style={{padding:"5px 6px",textAlign:"center"}}>
                          <Chip k={k} c={h.hex} s={26}/>
                        </td>
                        <td style={{padding:"5px 8px"}}>
                          <div style={{fontWeight:"bold"}}>{h.name}</div>
                          <div style={{fontSize:10,color:"#999"}}>{h.yomi}</div>
                        </td>
                        <td style={{padding:"5px 6px",textAlign:"center"}}>
                          <span style={{background:h.type==="和"?"#C8A000":"#4A2060",
                            color:"#fff",fontSize:9,padding:"1px 5px",borderRadius:3}}>
                            {h.type}
                          </span>
                        </td>
                        <td style={{padding:"5px 8px",fontSize:11,color:"#555"}}>{h.flower}</td>
                        <td style={{padding:"5px 6px",textAlign:"center"}}>
                          <div style={{width:44,height:18,background:h.hex,borderRadius:3,
                            display:"inline-block",border:"1px solid rgba(0,0,0,0.1)"}}/>
                        </td>
                        <td style={{padding:"5px 6px",textAlign:"center",fontSize:11,color:"#888"}}>
                          {h.season}
                        </td>
                        <td style={{padding:"5px 6px"}}>
                          <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                            {h.ndc.map(n=>{
                              const nd=NDC10.find(x=>x.code===n);
                              return nd?(
                                <div key={n} style={{display:"flex",alignItems:"center",gap:3,
                                  background:"#f5f3ff",borderRadius:4,padding:"1px 5px"}}>
                                  <Chip k={nd.kanji} c={nd.color} s={16}/>
                                  <span style={{fontSize:9,color:"#555"}}>{n}類</span>
                                </div>
                              ):null;
                            })}
                          </div>
                        </td>
                        <td style={{padding:"5px 8px",fontSize:10,color:"#666",lineHeight:1.5}}>
                          {h.note}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {hanaFiltered.length===0&&<p style={{textAlign:"center",color:"#aaa",padding:20}}>該当なし</p>}
              <div style={{padding:"6px 12px",fontSize:10,color:"#aaa",borderTop:"1px solid #f0ede8"}}>
                {hanaFiltered.length}件 ／ 全{HANA.length}件 ／ 出典: i-iro.com（花の色一覧）
              </div>
            </div>

            {/* 花×NDC サマリ */}
            <div style={{marginTop:12,background:"#fff",borderRadius:10,padding:14,
              boxShadow:"0 1px 6px rgba(0,0,0,0.08)"}}>
              <div style={{fontWeight:"bold",fontSize:13,marginBottom:10}}>
                🌸 NDC分類ごとの「代表花色」サマリ
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:8}}>
                {NDC10.map(n=>{
                  const flowers=ndcRev[n.code]?.hana||[];
                  if(flowers.length===0) return null;
                  return(
                    <div key={n.code} style={{borderRadius:7,overflow:"hidden",
                      boxShadow:"0 1px 3px rgba(0,0,0,0.08)"}}>
                      <div style={{background:n.color,padding:"6px 10px",display:"flex",
                        alignItems:"center",gap:8}}>
                        <Chip k={n.kanji} c="rgba(255,255,255,0.2)" s={28}/>
                        <div style={{color:"#fff",fontSize:11,fontWeight:"bold"}}>
                          {n.code}類 {n.name}
                        </div>
                      </div>
                      <div style={{padding:"6px 8px",display:"flex",flexWrap:"wrap",gap:4}}>
                        {flowers.slice(0,6).map((f,j)=>(
                          <div key={j} title={`${f.name}（${f.flower}）`}
                            style={{width:22,height:22,borderRadius:3,background:f.hex,
                              border:"1px solid rgba(0,0,0,0.1)",cursor:"help"}}/>
                        ))}
                        {flowers.length>6&&<span style={{fontSize:10,color:"#aaa",alignSelf:"center"}}>+{flowers.length-6}</span>}
                      </div>
                      <div style={{height:5,display:"flex"}}>
                        {flowers.map((f,j)=><div key={j} style={{flex:1,background:f.hex}}/>)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ===== TAB 1: 和色→NDC ===== */}
        {tab===1&&(
          <div>
            <div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}>
              {["全て","青","赤","緑","黄","茶","紫","白黒"].map(g=>(
                <button key={g} onClick={()=>setGrp(g)}
                  style={{padding:"3px 10px",borderRadius:4,border:"none",cursor:"pointer",fontSize:11,
                    background:grp===g?(GC[g]||"#333"):"#fff",color:grp===g?"#fff":"#444",
                    boxShadow:"0 1px 2px rgba(0,0,0,0.1)"}}>
                  {g}
                </button>
              ))}
            </div>
            <input value={q} onChange={e=>setQ(e.target.value)}
              placeholder={`色名・読みで検索（${colorFiltered.length}色）`}
              style={{width:"100%",padding:"7px 12px",borderRadius:6,border:"1px solid #ddd",
                fontSize:13,marginBottom:10,boxSizing:"border-box"}}/>
            <div style={{background:"#fff",borderRadius:10,overflow:"hidden",boxShadow:"0 1px 6px rgba(0,0,0,0.08)"}}>
              <table style={{borderCollapse:"collapse",width:"100%",fontSize:12}}>
                <thead>
                  <tr style={{background:"#1A3A6B",color:"#fff"}}>
                    <th style={{padding:"8px 8px",textAlign:"center",width:36}}>漢字</th>
                    <th style={{padding:"8px 8px",textAlign:"left"}}>和色名</th>
                    <th style={{padding:"8px 8px",textAlign:"center",width:56}}>色見本</th>
                    <th style={{padding:"8px 8px",textAlign:"left"}}>関連NDC</th>
                    <th style={{padding:"8px 8px",textAlign:"left"}}>連携の理由</th>
                  </tr>
                </thead>
                <tbody>
                  {colorFiltered.map((c,i)=>{
                    const k=c.name.split("").find(ch=>/[\u4e00-\u9fff]/.test(ch))||c.name[0];
                    return(
                      <tr key={i} style={{background:i%2===0?"#fff":"#fafaf8",
                        borderBottom:"1px solid #f0ede8",borderLeft:`3px solid ${GC[c.g]||"#ccc"}`}}>
                        <td style={{padding:"5px 6px",textAlign:"center"}}><Chip k={k} c={c.hex} s={26}/></td>
                        <td style={{padding:"5px 8px"}}>
                          <div style={{fontWeight:"bold"}}>{c.name}</div>
                          <div style={{fontSize:10,color:"#999"}}>{c.yomi}</div>
                        </td>
                        <td style={{padding:"5px 6px",textAlign:"center"}}>
                          <div style={{width:48,height:18,background:c.hex,borderRadius:3,
                            display:"inline-block",border:"1px solid rgba(0,0,0,0.1)"}}/>
                        </td>
                        <td style={{padding:"5px 6px"}}>
                          <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                            {c.ndc.map(n=>{
                              const nd=NDC10.find(x=>x.code===n);
                              return nd?<div key={n} style={{display:"flex",alignItems:"center",gap:3,
                                background:"#f5f5f5",borderRadius:4,padding:"1px 5px"}}>
                                <Chip k={nd.kanji} c={nd.color} s={16}/>
                                <span style={{fontSize:9,color:"#555"}}>{n}類 {nd.name}</span>
                              </div>:null;
                            })}
                          </div>
                        </td>
                        <td style={{padding:"5px 8px",fontSize:11,color:"#666",lineHeight:1.5}}>{c.reason}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===== TAB 2: NDC→和色逆引き ===== */}
        {tab===2&&(
          <div>
            {NDC10.map(n=>{
              const wc=ndcRev[n.code]?.washoku||[];
              const hc=ndcRev[n.code]?.hana||[];
              return(
                <div key={n.code} style={{background:"#fff",borderRadius:8,marginBottom:8,
                  boxShadow:"0 1px 4px rgba(0,0,0,0.08)",overflow:"hidden"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",
                    borderLeft:`5px solid ${n.color}`,
                    background:`linear-gradient(90deg,${n.color}18 0%,transparent 60%)`}}>
                    <Chip k={n.kanji} c={n.color} s={36}/>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:"bold",fontSize:14}}>{n.code}類 — {n.name}</div>
                      <div style={{fontSize:11,color:"#888"}}>{n.motif}</div>
                    </div>
                    <div style={{fontSize:11,color:"#555",textAlign:"right"}}>
                      <div>和色 <strong>{wc.length}</strong>色</div>
                      <div>花色 <strong style={{color:"#4A2060"}}>{hc.length}</strong>色</div>
                    </div>
                  </div>
                  {/* 和色 */}
                  {wc.length>0&&<div style={{padding:"8px 14px 4px"}}>
                    <div style={{fontSize:10,color:"#888",marginBottom:4}}>■ 和色</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                      {wc.map((c,j)=>{
                        const k=c.name.split("").find(ch=>/[\u4e00-\u9fff]/.test(ch))||c.name[0];
                        return <div key={j} title={c.name+"\n"+c.reason}
                          style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,cursor:"help"}}>
                          <Chip k={k} c={c.hex} s={28}/>
                          <div style={{fontSize:8,color:"#777",textAlign:"center",maxWidth:36,lineHeight:1.2}}>
                            {c.name.length>4?c.name.slice(0,4)+"…":c.name}
                          </div>
                        </div>;
                      })}
                    </div>
                  </div>}
                  {/* 花色 */}
                  {hc.length>0&&<div style={{padding:"4px 14px 8px"}}>
                    <div style={{fontSize:10,color:"#888",marginBottom:4}}>🌸 花色</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                      {hc.map((h,j)=>{
                        const k=h.name.split("").find(c=>/[\u4e00-\u9fff]/.test(c))||h.name[0];
                        return <div key={j} title={`${h.name}（${h.flower}）\n${h.note}`}
                          style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,cursor:"help"}}>
                          <Chip k={k} c={h.hex} s={28}/>
                          <div style={{fontSize:8,color:"#777",textAlign:"center",maxWidth:36,lineHeight:1.2}}>
                            {h.name.length>4?h.name.slice(0,4)+"…":h.name}
                          </div>
                        </div>;
                      })}
                    </div>
                  </div>}
                  {/* グラデーション帯 */}
                  <div style={{height:6,display:"flex"}}>
                    {[...wc,...hc].map((c,j)=><div key={j} style={{flex:1,background:c.hex}}/>)}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ===== TAB 3: 部首×分類 ===== */}
        {tab===3&&(
          <div>
            <p style={{fontSize:12,color:"#555",marginBottom:12,lineHeight:1.7}}>
              和色名・花色名の<strong>部首</strong>は、そのまま図書分類のヒントになります。<br/>
              「艹（草）」→ 植物・農業、「糸（染色）」→ 技術・芸術、「木（樹木）」→ 林業・産業…
            </p>
            {BUSHU.map((b,i)=>{
              const nd=NDC10.find(n=>n.code===b.ndc);
              return(
                <div key={i} style={{background:"#fff",borderRadius:8,marginBottom:10,
                  boxShadow:"0 1px 4px rgba(0,0,0,0.08)",overflow:"hidden"}}>
                  <div style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",
                    borderLeft:`5px solid ${b.color}`}}>
                    <div style={{width:48,height:48,borderRadius:8,background:b.color,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontSize:28,color:"#fff",fontFamily:"serif",flexShrink:0}}>{b.bushu}</div>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:"bold",fontSize:14}}>「{b.bushu}」{b.read}</div>
                      <div style={{fontSize:11,color:"#666",marginTop:2}}>{b.note}</div>
                    </div>
                    {nd&&<div style={{display:"flex",alignItems:"center",gap:6,
                      background:"#f5f5f5",borderRadius:6,padding:"6px 10px"}}>
                      <Chip k={nd.kanji} c={nd.color} s={28}/>
                      <div style={{fontSize:11}}>
                        <div style={{fontWeight:"bold"}}>{nd.code}類 {nd.name}</div>
                        <div style={{color:"#888",fontSize:10}}>主要対応分類</div>
                      </div>
                    </div>}
                  </div>
                  <div style={{display:"flex",gap:0}}>
                    {/* 和色 */}
                    <div style={{flex:1,padding:"8px 14px",borderRight:"1px solid #f0f0e8"}}>
                      <div style={{fontSize:10,color:"#888",marginBottom:4}}>■ 和色例</div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                        {b.washoku.map((name,j)=>{
                          const cd=COLOR_NDC.find(c=>c.name===name);
                          const k=name.split("").find(c=>/[\u4e00-\u9fff]/.test(c))||name[0];
                          return <div key={j} style={{display:"flex",alignItems:"center",gap:3,
                            background:"#fafafa",borderRadius:3,padding:"2px 6px",fontSize:10}}>
                            <Chip k={k} c={cd?.hex||"#aaa"} s={18}/>
                            <span style={{color:"#555"}}>{name}</span>
                          </div>;
                        })}
                      </div>
                    </div>
                    {/* 花色 */}
                    <div style={{flex:1,padding:"8px 14px"}}>
                      <div style={{fontSize:10,color:"#4A2060",marginBottom:4}}>🌸 花色例</div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                        {b.hana.map((name,j)=>{
                          const hd=HANA.find(h=>h.name===name);
                          const k=name.split("").find(c=>/[\u4e00-\u9fff]/.test(c))||name[0];
                          return <div key={j} style={{display:"flex",alignItems:"center",gap:3,
                            background:"#fdf5ff",borderRadius:3,padding:"2px 6px",fontSize:10}}>
                            <Chip k={k} c={hd?.hex||"#ccc"} s={18}/>
                            <span style={{color:"#555"}}>{name}</span>
                          </div>;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* まとめ */}
            <div style={{background:"linear-gradient(135deg,#1a0a2e,#0d2a10)",
              borderRadius:10,padding:16,color:"#fff",marginTop:4}}>
              <div style={{fontWeight:"bold",fontSize:14,marginBottom:10}}>
                💡 花の色が図書分類の「補足説明」になる仕組み
              </div>
              <div style={{fontSize:12,color:"#cce",lineHeight:2}}>
                ① 花名（漢字）は<strong>植物名そのもの</strong> → 4類自然科学・6類産業に直結<br/>
                ② 花の<strong>文化的背景</strong>（和歌・俳句・絵画）→ 7類芸術・9類文学の補足説明に最適<br/>
                ③ 花の<strong>薬効・産業利用</strong>（薬草・染料・食用）→ 5類技術・4類自然科学に連携<br/>
                ④ 花名は「漢字1文字では表せない」が、<strong>色（HEX）で視覚的に分類と結びつく</strong><br/>
                ⑤ 花色のグラデーション帯が<strong>棚の色づけ・図書館サイン</strong>のデザイン素材になる
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
