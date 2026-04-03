import { useState, useMemo } from "react";

const COLORS = [
  // 青系
  { name:"ブルー", en:"Blue", hex:"#0075c2", desc:"鮮やかな青／光の三原色のひとつ", group:"青" },
  { name:"スカイブルー", en:"Sky Blue", hex:"#6699cc", desc:"明るい青／代表的な空の色", group:"青" },
  { name:"ホリゾンブルー", en:"Horizon Blue", hex:"#aec6cf", desc:"やわらかい青／地平線・水平線の色", group:"青" },
  { name:"ゼニスブルー", en:"Zenith Blue", hex:"#9cafc8", desc:"明るい紫みの青／ゼニス＝天頂", group:"青" },
  { name:"アザーブルー", en:"Azure Blue", hex:"#4d91d0", desc:"明るい青／青空という意味", group:"青" },
  { name:"セレストブルー", en:"Celeste Blue", hex:"#89ccd7", desc:"明るい青／セレスト＝天空", group:"青" },
  { name:"ミッドナイトブルー", en:"Midnight Blue", hex:"#1c2b5e", desc:"ごく暗い紫みの青／真夜中の色", group:"青" },
  { name:"サルビアブルー", en:"Salvia Blue", hex:"#5277a5", desc:"鮮やかな紫みの青／サルビアの花", group:"青" },
  { name:"フォゲットミーノット", en:"Forget Me Not", hex:"#5b9dc8", desc:"明るい青／勿忘草の花の色", group:"青" },
  { name:"ヒヤシンス", en:"Hyacinth", hex:"#7080b8", desc:"くすんだ紫みの青／ヒヤシンスの花", group:"青" },
  { name:"アクアマリン", en:"Aquamarine", hex:"#00a0b0", desc:"強い青／宝石アクアマリンの色", group:"青" },
  { name:"ラピスラズリ", en:"Lapis Lazuli", hex:"#0047ab", desc:"濃い紫みの青／宝石ラピスラズリ", group:"青" },
  { name:"ウルトラマリンブルー", en:"Ultramarine Blue", hex:"#3f32c3", desc:"濃い紫みの青／ラピスラズリ由来の顔料", group:"青" },
  { name:"サファイアブルー", en:"Sapphire Blue", hex:"#2550a7", desc:"濃い紫みの青／宝石サファイアの色", group:"青" },
  { name:"ターコイズブルー", en:"Turquoise Blue", hex:"#00b4c5", desc:"明るい緑みの青／宝石ターコイズ", group:"青" },
  { name:"インディゴ", en:"Indigo", hex:"#2e2672", desc:"暗い青／藍で染めた青色", group:"青" },
  { name:"ベビーブルー", en:"Baby Blue", hex:"#89cff0", desc:"明るい灰みの青／乳幼児の服の色", group:"青" },
  { name:"スマルト", en:"Smalt", hex:"#4b5995", desc:"くすんだ紫みの青／コバルトガラス顔料", group:"青" },
  { name:"プルシャンブルー", en:"Prussian Blue", hex:"#003153", desc:"暗い紫みの青／フェロシアン化鉄顔料", group:"青" },
  { name:"アイアンブルー", en:"Iron Blue", hex:"#254677", desc:"暗い紫みの青／鉄主成分の顔料", group:"青" },
  { name:"コバルトブルー", en:"Cobalt Blue", hex:"#1e4da1", desc:"鮮やかな青／コバルト系顔料", group:"青" },
  { name:"セルリアンブルー", en:"Cerulean Blue", hex:"#2e86c1", desc:"鮮やかな青／硫酸コバルト由来顔料", group:"青" },
  { name:"シアン", en:"Cyan", hex:"#00b5e2", desc:"明るい青／色の三原色のひとつ", group:"青" },
  { name:"マリンブルー", en:"Marine Blue", hex:"#1a5276", desc:"濃い緑みの青／海のような青", group:"青" },
  { name:"ネイビーブルー", en:"Navy Blue", hex:"#1f305e", desc:"暗い紫みの青／英国海軍由来", group:"青" },
  { name:"オリエンタルブルー", en:"Oriental Blue", hex:"#2244a2", desc:"濃い紫みの青／中国青磁器の色", group:"青" },
  { name:"サックスブルー", en:"Saxe Blue", hex:"#6b8fa8", desc:"くすんだ青／ドイツ・ザクセン地方由来", group:"青" },
  { name:"ロイヤルブルー", en:"Royal Blue", hex:"#2660a4", desc:"濃い紫みの青／英国王室カラー", group:"青" },
  { name:"ジェイブルー", en:"Jay Blue", hex:"#5b7fa6", desc:"くすんだ青／アオカケスの羽の色", group:"青" },
  { name:"ダックブルー", en:"Duck Blue", hex:"#0089a7", desc:"鮮やかな青／鴨の羽の青", group:"青" },
  // ピンク・赤紫
  { name:"ピンク", en:"Pink", hex:"#f5a0b5", desc:"やわらかい赤／撫子の花の色", group:"赤" },
  { name:"コーラルピンク", en:"Coral Pink", hex:"#f08080", desc:"薄い赤／桃色珊瑚の色", group:"赤" },
  { name:"シクラメンピンク", en:"Cyclamen Pink", hex:"#dc609c", desc:"やわらかい赤紫／シクラメンの花", group:"赤" },
  { name:"コーラルレッド", en:"Coral Red", hex:"#e8604c", desc:"明るい赤／珊瑚の色", group:"赤" },
  { name:"レッド", en:"Red", hex:"#d7002a", desc:"鮮やかな赤／光の三原色", group:"赤" },
  { name:"バーミリオン", en:"Vermilion", hex:"#e8473f", desc:"鮮やかな黄みの赤／硫化水銀顔料", group:"赤" },
  { name:"ファイアーレッド", en:"Fire Red", hex:"#e2001a", desc:"鮮やかな黄みの赤／火のような赤", group:"赤" },
  { name:"シグナルレッド", en:"Signal Red", hex:"#e30020", desc:"鮮やかな赤／信号機の赤", group:"赤" },
  { name:"ルビーレッド", en:"Ruby Red", hex:"#9b111e", desc:"鮮やかな紫みの赤／宝石ルビーの色", group:"赤" },
  { name:"アガット", en:"Agate", hex:"#c02030", desc:"強い赤／メノウの色", group:"赤" },
  { name:"ブーゲンビリア", en:"Bougainvillaea", hex:"#cc2255", desc:"鮮やかな紫みの赤／ブーゲンビリアの花", group:"赤" },
  { name:"マゼンタ", en:"Magenta", hex:"#d93880", desc:"鮮やかな赤紫／色の三原色のひとつ", group:"赤" },
  { name:"コチニールレッド", en:"Cochineal Red", hex:"#c8325e", desc:"鮮やかな紫みの赤／コチニール虫由来", group:"赤" },
  { name:"クリムソン", en:"Crimson", hex:"#a91036", desc:"鮮やかな赤紫", group:"赤" },
  { name:"カーマイン", en:"Carmine", hex:"#b5152a", desc:"鮮やかな赤／虫由来の赤", group:"赤" },
  { name:"スカーレット", en:"Scarlet", hex:"#e03010", desc:"鮮やかな黄みの赤／緋色", group:"赤" },
  { name:"インディアンレッド", en:"Indian Red", hex:"#804040", desc:"くすんだ赤／インドの赤土顔料", group:"赤" },
  { name:"チャイニーズレッド", en:"Chinese Red", hex:"#e2400e", desc:"鮮やかな黄赤／中国的な赤", group:"赤" },
  { name:"ローズ", en:"Rose", hex:"#e2004f", desc:"鮮やかな赤／薔薇の花の色", group:"赤" },
  { name:"ローズレッド", en:"Rose Red", hex:"#c8185a", desc:"鮮やかな紫みの赤", group:"赤" },
  { name:"ローズピンク", en:"Rose Pink", hex:"#e87fa0", desc:"明るい紫みの赤", group:"赤" },
  { name:"オールドローズ", en:"Old Rose", hex:"#c08080", desc:"やわらかい赤／灰色がかったローズ", group:"赤" },
  { name:"ローズグレイ", en:"Rose Grey", hex:"#a88090", desc:"赤みの灰色", group:"赤" },
  { name:"ベゴニア", en:"Begonia", hex:"#e05070", desc:"明るい赤／ベゴニアの花", group:"赤" },
  { name:"ポピーレッド", en:"Poppy Red", hex:"#d82030", desc:"鮮やかな赤／ポピーの花", group:"赤" },
  { name:"チェリー", en:"Cherry", hex:"#c06070", desc:"やわらかい赤／さくらんぼの赤", group:"赤" },
  { name:"チェリーピンク", en:"Cherry Pink", hex:"#e0507a", desc:"鮮やかな赤紫", group:"赤" },
  { name:"ストロベリー", en:"Strawberry", hex:"#cf1c3a", desc:"鮮やかな赤／苺の色", group:"赤" },
  { name:"トマトレッド", en:"Tomato Red", hex:"#d93820", desc:"鮮やかな赤／トマトの色", group:"赤" },
  { name:"ベビーピンク", en:"Baby Pink", hex:"#f4c0c0", desc:"薄い赤／乳幼児の服の色", group:"赤" },
  { name:"ドーンピンク", en:"Dawn Pink", hex:"#d8a0b0", desc:"明るい灰みの赤／夜明けの色", group:"赤" },
  { name:"シェルピンク", en:"Shell Pink", hex:"#f5d3c3", desc:"ごく薄い黄赤／貝殻の色", group:"赤" },
  { name:"フラミンゴ", en:"Flamingo", hex:"#f5837a", desc:"明るい黄みの赤／フラミンゴの羽", group:"赤" },
  { name:"シュリンプピンク", en:"Shrimp Pink", hex:"#e88a80", desc:"やわらかい赤／小エビの色", group:"赤" },
  { name:"サーモンピンク", en:"Salmon Pink", hex:"#f4a080", desc:"やわらかい黄みの赤／鮭の身の色", group:"赤" },
  { name:"ネールピンク", en:"Nail Pink", hex:"#f0c0b0", desc:"薄い黄赤／人間の爪の色", group:"赤" },
  { name:"カージナルレッド", en:"Cardinal Red", hex:"#b82020", desc:"濃い黄みの赤／枢機卿由来", group:"赤" },
  { name:"ラズベリー", en:"Raspberry", hex:"#872657", desc:"濃い紫みの赤／木苺の色", group:"赤" },
  { name:"ローズマダー", en:"Rose Madder", hex:"#a01050", desc:"濃い紫みの赤／茜染め", group:"赤" },
  { name:"ワインレッド", en:"Wine Red", hex:"#7b1e3d", desc:"濃い紫みの赤／赤ワインの深い赤", group:"赤" },
  { name:"ガーネット", en:"Garnet", hex:"#7a2534", desc:"暗い黄みの赤／宝石ガーネット", group:"赤" },
  { name:"ボルドー", en:"Bordeaux", hex:"#612040", desc:"ごく暗い赤／ボルドーワイン由来", group:"赤" },
  { name:"バーガンディー", en:"Burgundy", hex:"#5e1730", desc:"ごく暗い紫みの赤／ブルゴーニュ産ワイン", group:"赤" },
  { name:"フクシアピンク", en:"Fuchsia Pink", hex:"#f364a2", desc:"明るい赤紫／フクシアの花", group:"赤" },
  { name:"フクシアパープル", en:"Fuchsia Purple", hex:"#cc1077", desc:"鮮やかな赤紫", group:"赤" },
  { name:"ピアニー", en:"Peony", hex:"#8c2060", desc:"暗い赤紫／芍薬の花", group:"赤" },
  { name:"フレッシュピンク", en:"Fresh Pink", hex:"#f0b8c0", desc:"明るい灰みの赤／美しい肌の色", group:"赤" },
  { name:"パステルピンク", en:"Pastel Pink", hex:"#e8c0c8", desc:"明るい灰みの赤／パステル調ピンク", group:"赤" },
  { name:"オペラモーヴ", en:"Opera Mauve", hex:"#e080b0", desc:"やわらかい赤紫", group:"赤" },
  { name:"カメリア", en:"Camellia", hex:"#d02030", desc:"強い赤／椿の花の色", group:"赤" },
  { name:"ポンペイアンレッド", en:"Pompeian Red", hex:"#8c2020", desc:"濃い黄みの赤／ポンペイの壁画の赤", group:"赤" },
  { name:"カッパーレッド", en:"Copper Red", hex:"#a04030", desc:"濃い黄赤／銅錆の赤褐色", group:"赤" },
  { name:"ターキーレッド", en:"Turkey Red", hex:"#9c2030", desc:"濃い赤／トルコ布地の赤", group:"赤" },
  { name:"パーシアンレッド", en:"Persian Red", hex:"#a03030", desc:"濃い赤／ペルシア赤", group:"赤" },
  { name:"オクサイドレッド", en:"Oxide Red", hex:"#7c3030", desc:"暗い黄みの赤／酸化鉄の赤茶", group:"赤" },
  { name:"オックスブラッド", en:"Oxblood", hex:"#6c2020", desc:"濃い赤／雄牛の血のような赤", group:"赤" },
  // 緑系
  { name:"グリーン", en:"Green", hex:"#00a968", desc:"鮮やかな緑／光の三原色のひとつ", group:"緑" },
  { name:"リーフグリーン", en:"Leaf Green", hex:"#5c9932", desc:"強い黄緑／若葉の色", group:"緑" },
  { name:"スプリンググリーン", en:"Spring Green", hex:"#8db85a", desc:"やわらかい黄緑／春の若葉", group:"緑" },
  { name:"グラスグリーン", en:"Grass Green", hex:"#6e8b3d", desc:"くすんだ黄緑／草のような色", group:"緑" },
  { name:"フォレストグリーン", en:"Forest Green", hex:"#2e6844", desc:"くすんだ青みの緑／森の深い緑", group:"緑" },
  { name:"エバーグリーン", en:"Ever Green", hex:"#2f5036", desc:"暗い灰みの緑／常緑樹の色", group:"緑" },
  { name:"スプルース", en:"Spruce", hex:"#2b3d2a", desc:"ごく暗い緑／トウヒ属の樹木の色", group:"緑" },
  { name:"ハンターグリーン", en:"Hunter Green", hex:"#406040", desc:"くすんだ緑／狩人の服の色", group:"緑" },
  { name:"アイビーグリーン", en:"Ivy Green", hex:"#3d6040", desc:"暗い黄緑／アイビーの葉", group:"緑" },
  { name:"セージグリーン", en:"Sage Green", hex:"#8a9970", desc:"灰みの緑／乾燥セージの葉", group:"緑" },
  { name:"ウィローグリーン", en:"Willow Green", hex:"#7a9070", desc:"くすんだ黄緑／柳の葉の色", group:"緑" },
  { name:"エルムグリーン", en:"Elm Green", hex:"#506040", desc:"暗い黄緑／ニレの木の葉", group:"緑" },
  { name:"ライムグリーン", en:"Lime Green", hex:"#9abe3a", desc:"やわらかい黄みの緑／ライムの色", group:"緑" },
  { name:"ライムイエロー", en:"Lime Yellow", hex:"#c8d850", desc:"やわらかい黄／ライム・西洋菩提樹の色", group:"緑" },
  { name:"モスグリーン", en:"Moss Green", hex:"#6b7c43", desc:"暗い黄緑／苔のような緑", group:"緑" },
  { name:"モスグレイ", en:"Moss Grey", hex:"#8a8a6a", desc:"黄みの緑みの灰色", group:"緑" },
  { name:"アップルグリーン", en:"Apple Green", hex:"#90b840", desc:"やわらかい黄みの緑／青リンゴの色", group:"緑" },
  { name:"ピーグリーン", en:"Pea Green", hex:"#6e8838", desc:"くすんだ黄緑／エンドウ豆の色", group:"緑" },
  { name:"ピスタチオグリーン", en:"Pistachio Green", hex:"#a0c87a", desc:"やわらかい黄みの緑／ピスタチオの実", group:"緑" },
  { name:"オリーブ", en:"Olive", hex:"#8c7538", desc:"暗い緑みの黄／オリーブの実の色", group:"緑" },
  { name:"オリーブグリーン", en:"Olive Green", hex:"#6b8040", desc:"暗い灰みの黄緑／オリーブの葉", group:"緑" },
  { name:"オリーブドラブ", en:"Olive Drab", hex:"#6b7228", desc:"暗い灰みの黄／くすんだオリーブ", group:"緑" },
  { name:"アイスグリーン", en:"Ice Green", hex:"#c0e0d0", desc:"ごく薄い青みの緑／氷の透明感", group:"緑" },
  { name:"セラドン", en:"Celadon", hex:"#adc8b0", desc:"緑みの明るい灰色／中国青磁器の色", group:"緑" },
  { name:"マラカイトグリーン", en:"Malachite Green", hex:"#1a6640", desc:"濃い緑／孔雀石の色", group:"緑" },
  { name:"ベルディグリ", en:"Verdigris", hex:"#6cb8a0", desc:"やわらかい緑／銅の青緑色の錆", group:"緑" },
  { name:"コバルトグリーン", en:"Cobalt Green", hex:"#4ca880", desc:"明るい緑／コバルト系顔料の色", group:"緑" },
  { name:"ビリジアン", en:"Viridian", hex:"#407060", desc:"くすんだ青みの緑／水酸化クロム顔料", group:"緑" },
  { name:"クロムグリーン", en:"Chrome Green", hex:"#2a5040", desc:"暗い緑／クロム系合成顔料", group:"緑" },
  { name:"シーグリーン", en:"Sea Green", hex:"#4ca060", desc:"強い黄緑／緑っぽい海の色", group:"緑" },
  { name:"ナイルブルー", en:"Nile Blue", hex:"#5090a0", desc:"くすんだ青緑／ナイル川の色", group:"緑" },
  { name:"エメラルドグリーン", en:"Emerald Green", hex:"#009966", desc:"強い緑／宝石エメラルドの色", group:"緑" },
  { name:"ジェードグリーン", en:"Jade Green", hex:"#4d8870", desc:"くすんだ青みの緑／翡翠の色", group:"緑" },
  { name:"ジャスパーグリーン", en:"Jasper Green", hex:"#507060", desc:"くすんだ青みの緑／宝石ジャスパー", group:"緑" },
  { name:"オパールグリーン", en:"Opal Green", hex:"#a0c8b0", desc:"薄い緑／宝石オパールの色", group:"緑" },
  { name:"ビリヤードグリーン", en:"Billiard Green", hex:"#2a6040", desc:"暗い青みの緑／ビリヤード台の色", group:"緑" },
  { name:"シャルトルーズグリーン", en:"Chartreuse Green", hex:"#a0c030", desc:"明るい黄緑／修道院由来", group:"緑" },
  { name:"シャルトルーズイエロー", en:"Chartreuse Yellow", hex:"#c8d820", desc:"鮮やかな黄緑／フランス修道院由来", group:"緑" },
  { name:"ミントグリーン", en:"Mint Green", hex:"#7dc8b0", desc:"明るい緑／ミントの葉の色", group:"緑" },
  { name:"ボトルグリーン", en:"Bottle Green", hex:"#1e4030", desc:"ごく暗い緑／ワインボトルの色", group:"緑" },
  { name:"パロットグリーン", en:"Parrot Green", hex:"#507840", desc:"暗い黄緑／オウムの羽の色", group:"緑" },
  { name:"ピーコックグリーン", en:"Peacock Green", hex:"#008080", desc:"鮮やかな青緑／孔雀の羽", group:"緑" },
  { name:"ピーコックブルー", en:"Peacock Blue", hex:"#006280", desc:"濃い青緑／孔雀の羽の青", group:"緑" },
  // 黄・橙系
  { name:"イエロー", en:"Yellow", hex:"#f5d800", desc:"鮮やかな黄／色の三原色のひとつ", group:"黄" },
  { name:"ゴールデンイエロー", en:"Golden Yellow", hex:"#e8a000", desc:"強い赤みの黄／ゴールドな黄色", group:"黄" },
  { name:"サルファーイエロー", en:"Sulphur Yellow", hex:"#e8da3a", desc:"明るい緑みの黄／硫黄の色", group:"黄" },
  { name:"クロムイエロー", en:"Chrome Yellow", hex:"#f0c000", desc:"明るい黄／クロム酸鉛顔料", group:"黄" },
  { name:"クロムオレンジ", en:"Chrome Orange", hex:"#e06820", desc:"強い黄赤／クロム酸鉛顔料の橙", group:"黄" },
  { name:"カドミウムイエロー", en:"Cadmium Yellow", hex:"#f5d200", desc:"鮮やかな緑みの黄／カドミウム顔料", group:"黄" },
  { name:"ネープルスイエロー", en:"Naples Yellow", hex:"#f5c840", desc:"強い黄／ナポリ由来", group:"黄" },
  { name:"ジョンブリアン", en:"Jaune Brillant", hex:"#f8d850", desc:"鮮やかな黄／仏語で輝く黄色", group:"黄" },
  { name:"カナリーイエロー", en:"Canary Yellow", hex:"#f8e040", desc:"明るい緑みの黄／カナリアの羽", group:"黄" },
  { name:"シャンパン", en:"Champagne", hex:"#f5e8c8", desc:"明るい灰みの黄みの赤／シャンパンの色", group:"黄" },
  { name:"キャロットオレンジ", en:"Carrot Orange", hex:"#e87030", desc:"強い黄赤／人参の色", group:"黄" },
  { name:"パンプキン", en:"Pumpkin", hex:"#e87830", desc:"強い赤みの黄／カボチャの色", group:"黄" },
  { name:"メイズ", en:"Maize", hex:"#f0c030", desc:"強い黄／トウモロコシの色", group:"黄" },
  { name:"レモンイエロー", en:"Lemon Yellow", hex:"#f8e820", desc:"鮮やかな緑みの黄／レモンの色", group:"黄" },
  { name:"アプリコット", en:"Apricot", hex:"#f5a870", desc:"やわらかい黄赤／アンズの実の色", group:"黄" },
  { name:"ピーチ", en:"Peach", hex:"#f5c0a0", desc:"明るい灰みの黄赤／桃の果肉の色", group:"黄" },
  { name:"オレンジ", en:"Orange", hex:"#f08000", desc:"鮮やかな黄赤／果物オレンジの色", group:"黄" },
  { name:"マンダリンオレンジ", en:"Mandarin Orange", hex:"#f06820", desc:"強い赤みの黄／中国官僚の服の色", group:"黄" },
  { name:"タンジェリンオレンジ", en:"Tangerine Orange", hex:"#f07820", desc:"鮮やかな黄赤／モロッコ・タンジール由来", group:"黄" },
  { name:"バーントオレンジ", en:"Burnt Orange", hex:"#d06020", desc:"強い黄赤／濃いオレンジ色", group:"黄" },
  { name:"ハニー", en:"Honey", hex:"#d09820", desc:"濃い黄／蜂蜜のような色", group:"黄" },
  { name:"クリームイエロー", en:"Cream Yellow", hex:"#f8f0c0", desc:"ごく薄い黄／カスタードクリームの色", group:"黄" },
  { name:"マスタード", en:"Mustard", hex:"#c8a020", desc:"くすんだ黄／マスタードの色", group:"黄" },
  { name:"サフランイエロー", en:"Saffron Yellow", hex:"#f0b000", desc:"明るい黄／サフランの雌しべ", group:"黄" },
  { name:"ストローイエロー", en:"Straw Yellow", hex:"#e8d080", desc:"強い黄／麦わらの色", group:"黄" },
  { name:"バンブー", en:"Bamboo", hex:"#d8c878", desc:"やわらかい黄／竹のイメージ", group:"黄" },
  { name:"マリーゴールド", en:"Marigold", hex:"#f5a020", desc:"鮮やかな赤みの黄／金盞花の色", group:"黄" },
  { name:"サンフラワー", en:"Sunflower", hex:"#ffd900", desc:"明るい黄／ひまわりの花", group:"黄" },
  { name:"トパーズ", en:"Topaz", hex:"#d0901a", desc:"濃い赤みの黄／宝石トパーズ", group:"黄" },
  { name:"ブロンド", en:"Blond", hex:"#f5e0a0", desc:"やわらかい黄／金髪のような色", group:"黄" },
  { name:"フレッシュ", en:"Flesh", hex:"#f5d0b8", desc:"ごく薄い黄赤／肌色", group:"黄" },
  // 紫系
  { name:"パープル", en:"Purple", hex:"#8837bb", desc:"鮮やかな紫／貝紫由来", group:"紫" },
  { name:"チリアンパープル", en:"Tyrian Purple", hex:"#6c2a7a", desc:"くすんだ赤紫／港町ティルス由来", group:"紫" },
  { name:"ロイヤルパープル", en:"Royal Purple", hex:"#7030a0", desc:"強い赤みの紫／王室の紫", group:"紫" },
  { name:"アメジスト", en:"Amethyst", hex:"#7b5098", desc:"強い紫／宝石アメジスト", group:"紫" },
  { name:"マルベリー", en:"Mulberry", hex:"#803060", desc:"暗い赤紫／桑の実の色", group:"紫" },
  { name:"モーブ", en:"Mauve", hex:"#b060a8", desc:"強い赤みの紫／葵の花の色", group:"紫" },
  { name:"バイオレット", en:"Violet", hex:"#5040a8", desc:"鮮やかな青紫／菫の花の色", group:"紫" },
  { name:"パンジー", en:"Pansy", hex:"#3b2880", desc:"濃い青紫／パンジーの花", group:"紫" },
  { name:"ライラック", en:"Lilac", hex:"#c090c8", desc:"やわらかい紫／ライラックの花", group:"紫" },
  { name:"クロッカス", en:"Crocus", hex:"#9070b8", desc:"やわらかい青みの紫／クロッカスの花", group:"紫" },
  { name:"ウィスタリア", en:"Wistaria", hex:"#6060c8", desc:"鮮やかな青紫／藤の花の色", group:"紫" },
  { name:"ラベンダー", en:"Lavender", hex:"#a08cb4", desc:"灰みの青みの紫／ラベンダーの花", group:"紫" },
  { name:"ヘリオトロープ", en:"Heliotrope", hex:"#8060c0", desc:"鮮やかな青紫／ニオイムラサキの花", group:"紫" },
  { name:"オーキッド", en:"Orchid", hex:"#c080c8", desc:"やわらかい紫／蘭の花の色", group:"紫" },
  // 茶系
  { name:"ブラウン", en:"Brown", hex:"#7b4a28", desc:"暗い灰みの黄赤／ゲルマン語由来", group:"茶" },
  { name:"ラセットブラウン", en:"Russet Brown", hex:"#a04030", desc:"濃い黄赤／赤褐色", group:"茶" },
  { name:"イエローオーカー", en:"Yellow Ocher", hex:"#c89030", desc:"濃い赤みの黄／黄土", group:"茶" },
  { name:"ローシェンナ", en:"Raw Sienna", hex:"#c07830", desc:"強い黄赤／シエナ由来の土の色", group:"茶" },
  { name:"バーントシェンナ", en:"Burnt Sienna", hex:"#a04828", desc:"くすんだ黄赤／焼いたシエナ土", group:"茶" },
  { name:"ローアンバー", en:"Raw Umber", hex:"#8c6028", desc:"暗い黄／ウンブリア州の土", group:"茶" },
  { name:"バーントアンバー", en:"Burnt Umber", hex:"#703018", desc:"ごく暗い赤みの黄／焼いたアンバー", group:"茶" },
  { name:"バンダイクブラウン", en:"Van Dyck Brown", hex:"#5a3820", desc:"暗い灰みの黄赤／画家バン・ダイク", group:"茶" },
  { name:"セピア", en:"Sepia", hex:"#5c3018", desc:"ごく暗い赤みの黄／イカの墨顔料", group:"茶" },
  { name:"カーキー", en:"Khaki", hex:"#b09060", desc:"くすんだ赤みの黄／土埃の色", group:"茶" },
  { name:"ヘンナ", en:"Henna", hex:"#9c3820", desc:"暗い黄赤／ヘナ植物の色", group:"茶" },
  { name:"ベージュ", en:"Beige", hex:"#d4b896", desc:"明るい灰みの黄みの赤／未加工羊毛", group:"茶" },
  { name:"エクルベージュ", en:"Ecru Beige", hex:"#e8d8c0", desc:"ごく薄い赤みの黄／未加工麻・絹", group:"茶" },
  { name:"タン", en:"Tan", hex:"#c08040", desc:"くすんだ黄赤／タンニンなめし皮", group:"茶" },
  { name:"バフ", en:"Buff", hex:"#e0c090", desc:"やわらかい赤みの黄／もみ革の色", group:"茶" },
  { name:"シャモア", en:"Chamois", hex:"#d8b880", desc:"やわらかい赤みの黄／シャモア革の色", group:"茶" },
  { name:"フォーン", en:"Fawn", hex:"#c09050", desc:"ごく暗い赤みの黄／子鹿の毛の色", group:"茶" },
  { name:"キャメル", en:"Camel", hex:"#c09050", desc:"くすんだ赤みの黄／ラクダの毛の色", group:"茶" },
  { name:"マルーン", en:"Maroon", hex:"#703020", desc:"暗い赤／スペイン産の西洋栗の色", group:"茶" },
  { name:"チェスナットブラウン", en:"Chestnut Brown", hex:"#6c3020", desc:"ごく暗い赤みの黄／チェスナット（栗）", group:"茶" },
  { name:"ヘーゼルブラウン", en:"Hazel Brown", hex:"#a06030", desc:"くすんだ赤みの黄／ヘーゼルナッツ", group:"茶" },
  { name:"ココナッツブラウン", en:"Coconut Brown", hex:"#7a4828", desc:"暗い黄赤／ヤシの実の色", group:"茶" },
  { name:"コルク", en:"Cork", hex:"#c09060", desc:"くすんだ赤みの黄／コルク栓の色", group:"茶" },
  { name:"ブリックレッド", en:"Brick Red", hex:"#9c4020", desc:"暗い黄赤／赤レンガの色", group:"茶" },
  { name:"テラコッタ", en:"Terracotta", hex:"#c06038", desc:"くすんだ黄みの赤／焼いた土", group:"茶" },
  { name:"マホガニー", en:"Mahogany", hex:"#5c2010", desc:"暗い灰みの赤／マホガニー木材", group:"茶" },
  { name:"コーヒーブラウン", en:"Coffee Brown", hex:"#604028", desc:"暗い灰みの黄赤／コーヒーの色", group:"茶" },
  { name:"ココアブラウン", en:"Cocoa Brown", hex:"#6a4030", desc:"暗い灰みの黄赤／ドリンクココアの色", group:"茶" },
  { name:"チョコレート", en:"Chocolate", hex:"#542010", desc:"ごく暗い黄赤／チョコレートの色", group:"茶" },
  { name:"シナモン", en:"Sinnamon", hex:"#9c5030", desc:"くすんだ黄赤／シナモン香辛料の色", group:"茶" },
  { name:"キャラメル", en:"Caramel", hex:"#986030", desc:"暗い赤みの黄／焦がし砂糖の色", group:"茶" },
  { name:"ビスケット", en:"Biscuit", hex:"#d4a070", desc:"灰みの赤みの黄／ビスケットの色", group:"茶" },
  { name:"ブロンズ", en:"Bronze", hex:"#8c5c20", desc:"暗い赤みの黄／青銅の色", group:"茶" },
  { name:"アンバー", en:"Amber", hex:"#b07820", desc:"くすんだ赤みの黄／琥珀の色", group:"茶" },
  // モノクロ系
  { name:"ホワイト", en:"White", hex:"#ffffff", desc:"白／基本色彩語のひとつ", group:"白黒" },
  { name:"スノーホワイト", en:"Snow White", hex:"#f8f8ff", desc:"白／雪の少し青みの白", group:"白黒" },
  { name:"オイスターホワイト", en:"Oyster White", hex:"#f0ece0", desc:"白／牡蠣の身のような白", group:"白黒" },
  { name:"レグホーン", en:"Leghorn", hex:"#f5e8c0", desc:"やわらかい黄／レグホーン（鶏）の羽", group:"白黒" },
  { name:"ミルキーホワイト", en:"Milky White", hex:"#f8f0e0", desc:"赤みの黄みの白／ミルクの白", group:"白黒" },
  { name:"パールホワイト", en:"Pearl White", hex:"#f8f4e8", desc:"黄みの白／真珠の色", group:"白黒" },
  { name:"パールグレー", en:"Pearl Grey", hex:"#d0ccc8", desc:"明るい灰色／真珠の輝きの灰色", group:"白黒" },
  { name:"パーチメント", en:"Parchment", hex:"#d8d0b0", desc:"黄みの緑みの薄い灰色／羊皮紙", group:"白黒" },
  { name:"アイボリー", en:"Ivory", hex:"#f0e8c8", desc:"黄みの薄い灰色／象牙の色", group:"白黒" },
  { name:"サンド", en:"Sand", hex:"#c8b88a", desc:"灰みの黄／砂の色", group:"白黒" },
  { name:"スカイグレー", en:"Sky Grey", hex:"#b0c0c8", desc:"青みの明るい灰色／曇り空の色", group:"白黒" },
  { name:"フォグブルー", en:"Fog Blue", hex:"#607080", desc:"濃い紫みの青／霧がかった色", group:"白黒" },
  { name:"アッシュグレー", en:"Ash Grey", hex:"#b0a8a0", desc:"灰色／灰の色", group:"白黒" },
  { name:"シルバーグレー", en:"Silver Grey", hex:"#c8c8c8", desc:"明るい灰色／銀の光沢の灰", group:"白黒" },
  { name:"マウスグレー", en:"Mouse Grey", hex:"#908070", desc:"暗い灰みの黄赤／鼠のような灰茶", group:"白黒" },
  { name:"トープ", en:"Taupe", hex:"#7a6868", desc:"紫みの赤みの暗い灰色／モグラの毛皮", group:"白黒" },
  { name:"ダブグレー", en:"Dove Grey", hex:"#9090a0", desc:"紫みの灰色／鳩の羽の色", group:"白黒" },
  { name:"ガンメタルグレー", en:"Gunmetal Grey", hex:"#6a6870", desc:"赤みのくすんだ灰色／砲金の色", group:"白黒" },
  { name:"スレートグレー", en:"Slate Grey", hex:"#6a7880", desc:"暗い灰色／粘板岩の色", group:"白黒" },
  { name:"チャコールグレー", en:"Charcoal Grey", hex:"#4a4850", desc:"紫みの暗い灰色／炭の色", group:"白黒" },
  { name:"スチールグレー", en:"Steel Grey", hex:"#686870", desc:"紫みの灰色／鋼の色", group:"白黒" },
  { name:"グレー", en:"Grey", hex:"#808080", desc:"灰色／白と黒の中間の色", group:"白黒" },
  { name:"エボニー", en:"Ebony", hex:"#2a2820", desc:"緑みの黄みの黒／黒檀の木の色", group:"白黒" },
  { name:"アイボリーブラック", en:"Ivory Black", hex:"#202028", desc:"黒／象牙を焼いた黒顔料", group:"白黒" },
  { name:"ランプブラック", en:"Lamp Black", hex:"#1c1c20", desc:"黒／ランプ煤のような黒", group:"白黒" },
  { name:"ブラック", en:"Black", hex:"#000000", desc:"黒／基本色彩語のひとつ", group:"白黒" },
];

const GROUP_ORDER = ["青","赤","緑","黄","紫","茶","白黒"];
const GROUP_LABELS = { 青:"🔵 青・ブルー系", 赤:"🔴 赤・ピンク系", 緑:"🟢 緑・グリーン系", 黄:"🟡 黄・オレンジ系", 紫:"🟣 紫・パープル系", 茶:"🟤 茶・ブラウン系", 白黒:"⚪ 白黒・グレー系" };

function luminance(hex) {
  const r = parseInt(hex.slice(1,3),16)/255;
  const g = parseInt(hex.slice(3,5),16)/255;
  const b = parseInt(hex.slice(5,7),16)/255;
  return 0.299*r + 0.587*g + 0.114*b;
}

export default function App() {
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState("全て");
  const [selected, setSelected] = useState(null);
  const [copied, setCopied] = useState(false);

  const filtered = useMemo(() => {
    return COLORS.filter(c => {
      const matchGroup = activeGroup === "全て" || c.group === activeGroup;
      const q = search.toLowerCase();
      const matchSearch = !q || c.name.includes(q) || c.en.toLowerCase().includes(q) || c.hex.toLowerCase().includes(q) || c.desc.includes(q);
      return matchGroup && matchSearch;
    });
  }, [search, activeGroup]);

  const grouped = useMemo(() => {
    if (activeGroup !== "全て") return { [activeGroup]: filtered };
    const g = {};
    for (const c of filtered) {
      if (!g[c.group]) g[c.group] = [];
      g[c.group].push(c);
    }
    return g;
  }, [filtered, activeGroup]);

  const copy = (text) => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div style={{ fontFamily:"'Hiragino Sans','Meiryo',sans-serif", minHeight:"100vh", background:"#1a1a2e", color:"#f0f0f0" }}>
      {/* Header */}
      <div style={{ background:"linear-gradient(135deg,#16213e,#0f3460)", padding:"20px 24px 16px", boxShadow:"0 2px 12px #0008" }}>
        <h1 style={{ margin:"0 0 4px", fontSize:22, fontWeight:700, letterSpacing:2 }}>🌍 世界の伝統色ビューア</h1>
        <p style={{ margin:"0 0 14px", fontSize:12, color:"#a0b0c8" }}>i-iro.com 収録 — {COLORS.length}色を色相別・キーワードで検索</p>
        {/* Search */}
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="色名・英語名・説明でフィルタ…"
          style={{ width:"100%", boxSizing:"border-box", padding:"8px 14px", borderRadius:8, border:"1px solid #304060", background:"#0d1b2a", color:"#f0f0f0", fontSize:14, outline:"none" }}
        />
        {/* Group tabs */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:12 }}>
          {["全て", ...GROUP_ORDER].map(g => (
            <button key={g} onClick={() => setActiveGroup(g)}
              style={{ padding:"4px 12px", borderRadius:20, border:"none", cursor:"pointer", fontSize:12,
                background: activeGroup===g ? "#e8a020" : "#223050",
                color: activeGroup===g ? "#1a1a2e" : "#b0c0d8",
                fontWeight: activeGroup===g ? 700 : 400 }}>
              {g === "全て" ? "全て" : GROUP_LABELS[g]}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div style={{ padding:"10px 24px 4px", fontSize:12, color:"#7090a8" }}>
        {filtered.length}色 表示中
      </div>

      {/* Color grid */}
      <div style={{ padding:"4px 16px 100px" }}>
        {GROUP_ORDER.filter(g => grouped[g]?.length).map(g => (
          <div key={g}>
            {activeGroup === "全て" && (
              <div style={{ padding:"12px 4px 6px", fontSize:13, fontWeight:700, color:"#a0b8d0", letterSpacing:1 }}>
                {GROUP_LABELS[g]} ({grouped[g].length}色)
              </div>
            )}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))", gap:8 }}>
              {(grouped[g] || []).map(c => {
                const light = luminance(c.hex) > 0.55;
                const textColor = light ? "#222" : "#fff";
                const isSelected = selected?.name === c.name;
                return (
                  <div key={c.name} onClick={() => setSelected(isSelected ? null : c)}
                    style={{ borderRadius:10, overflow:"hidden", cursor:"pointer",
                      boxShadow: isSelected ? `0 0 0 3px #e8a020, 0 4px 16px #0006` : "0 2px 8px #0004",
                      transform: isSelected ? "scale(1.04)" : "scale(1)",
                      transition:"all 0.15s" }}>
                    {/* Color swatch */}
                    <div style={{ background:c.hex, height:64, display:"flex", alignItems:"flex-end", padding:"6px 8px" }}>
                      <span style={{ fontSize:10, color:textColor, opacity:0.85, background: light?"#ffffff44":"#00000044", padding:"1px 5px", borderRadius:4 }}>
                        {c.hex.toUpperCase()}
                      </span>
                    </div>
                    {/* Label */}
                    <div style={{ background:"#1e2a3a", padding:"6px 8px 8px" }}>
                      <div style={{ fontSize:13, fontWeight:700, lineHeight:1.3 }}>{c.name}</div>
                      <div style={{ fontSize:10, color:"#7090a8", marginTop:2 }}>{c.en}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Detail panel */}
      {selected && (
        <div style={{ position:"fixed", bottom:0, left:0, right:0, background:"#0d1b2a", borderTop:"2px solid #304060",
          padding:"16px 24px", boxShadow:"0 -4px 24px #0008", display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
          <div style={{ width:56, height:56, borderRadius:10, background:selected.hex, flexShrink:0, boxShadow:"0 2px 8px #0006" }} />
          <div style={{ flex:1, minWidth:160 }}>
            <div style={{ fontSize:18, fontWeight:700 }}>{selected.name}</div>
            <div style={{ fontSize:13, color:"#a0b0c8" }}>{selected.en}</div>
            <div style={{ fontSize:12, color:"#8090a8", marginTop:4 }}>{selected.desc}</div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:6, alignItems:"flex-end" }}>
            <button onClick={() => copy(selected.hex)}
              style={{ padding:"6px 16px", borderRadius:8, border:"none", cursor:"pointer",
                background: copied ? "#3a8040" : "#304060", color:"#e0f0ff", fontSize:13, fontWeight:600, transition:"background 0.2s" }}>
              {copied ? "✓ コピー済み" : `${selected.hex.toUpperCase()} コピー`}
            </button>
            <button onClick={() => copy(`${selected.name}（${selected.en}） ${selected.hex.toUpperCase()}`)}
              style={{ padding:"6px 16px", borderRadius:8, border:"none", cursor:"pointer",
                background:"#223050", color:"#a0b8d0", fontSize:12 }}>
              名前+HEXをコピー
            </button>
            <button onClick={() => setSelected(null)}
              style={{ padding:"4px 12px", borderRadius:6, border:"none", cursor:"pointer", background:"#182030", color:"#607080", fontSize:11 }}>
              閉じる ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
