import { LOCALE_EXAMPLES } from "./discipline-examples-i18n.mjs";
import { FIVE_TRACK_DEPTH_I18N } from "./discipline-depth-five-i18n.mjs";

export const LOCALE_DEPTH = {
  cs: {
    "zh-TW": {
      "academic-rubric":
        "\n9. **演算法與複雜度** — 時間／空間複雜度與邊界案例\n10. **安全與倫理** — 威脅模型、個資或漏洞（若適用）\n",
      "academic-fail":
        "\n- 僅重複「高效」而無 Big-O 或資料結構論證\n- 安全主張無 CVE、PoC 或威脅模型出處\n",
      "source-keywords":
        "\n- 例：Big-O | 資料結構 | 並行 | 測試覆蓋率\n- CVE、OWASP、RFC 請查原文或官方文件\n",
    },
    ja: {
      "academic-rubric":
        "\n9. **アルゴリズム・計算量** — 時間・空間計算量とエッジケース\n10. **セキュリティ・倫理** — 脅威モデル、個人情報、脆弱性（該当時）\n",
      "academic-fail":
        "\n- Big-O・データ構造なしで「効率的」のみ\n- CVE・脆弱性の主張に PoC・出典なし\n",
      "source-keywords":
        "\n- 例：Big-O | データ構造 | 並行処理 | テストカバレッジ\n- CVE・OWASP・RFC は原典・公式文書で確認\n",
    },
    fr: {
      "academic-rubric":
        "\n9. **Algorithme & complexité** — bornes asymptotiques et cas limites\n10. **Sécurité & éthique** — modèle de menace ou données sensibles si pertinent\n",
      "academic-fail":
        "\n- « Efficace » sans Big-O ni structure de données\n- Affirmations sécurité sans CVE, PoC ou modèle de menace\n",
      "source-keywords":
        "\n- ex. Big-O | structures de données | concurrence | couverture de tests\n- Vérifier CVE, OWASP et RFC dans les sources primaires\n",
    },
    es: {
      "academic-rubric":
        "\n9. **Algoritmo y complejidad** — cotas asintóticas y casos límite\n10. **Seguridad y ética** — modelo de amenaza o datos sensibles si aplica\n",
      "academic-fail":
        "\n- « Eficiente » sin Big-O ni estructuras de datos\n- Afirmaciones de seguridad sin CVE, PoC o modelo de amenaza\n",
      "source-keywords":
        "\n- p. ej. Big-O | estructuras de datos | concurrencia | cobertura de tests\n- Verificar CVE, OWASP y RFC en fuentes primarias\n",
    },
  },
  law: {
    "zh-TW": {
      "academic-rubric":
        "\n9. **法院與法條** — 判例、法條與主張對應\n10. **論證結構** — 事實、法律、結論分離（IRAC 等）\n",
      "academic-fail":
        "\n- 無法條或判例即下「違法」結論\n- 僅判例摘要而無套用本案事實\n",
      "source-keywords": "\n- 法條 | ratio decidendi | 舉證責任 | 救濟 | 先例\n",
    },
    ja: {
      "academic-rubric":
        "\n9. **裁判例・法令** — 判例・条文が主張と対応\n10. **論証構造** — 事実・法・結論の分離（IRAC 等）\n",
      "academic-fail":
        "\n- 法令・判例なしで「違法」のみ\n- 判例要約のみで本人の当てはめ論証なし\n",
      "source-keywords": "\n- 法令 | ratio decidendi | 立証責任 | 救済 | 先例\n",
    },
    fr: {
      "academic-rubric":
        "\n9. **Autorité** — jurisprudence et textes liés à chaque prétention\n10. **Structure IRAC** — faits, droit et conclusion séparés\n",
      "academic-fail":
        "\n- Conclusion juridique sans texte ni jurisprudence\n- Résumé de jurisprudence sans application aux faits\n",
      "source-keywords": "\n- texte | ratio decidendi | charge de la preuve | recours\n",
    },
    es: {
      "academic-rubric":
        "\n9. **Autoridad** — jurisprudencia y leyes ligadas a cada afirmación\n10. **Estructura IRAC** — hechos, derecho y conclusión separados\n",
      "academic-fail":
        "\n- Conclusión legal sin estatuto ni jurisprudencia\n- Solo resumen de caso sin aplicación a los hechos\n",
      "source-keywords": "\n- estatuto | ratio decidendi | carga de la prueba | remedio\n",
    },
  },
  medicine: {
    "zh-TW": {
      "academic-rubric":
        "\n9. **病理生理與證據等級** — RCT、指引、專家意見之區分\n10. **安全** — 禁忌、不良反應、鑑別（若適用）\n",
      "academic-fail":
        "\n- 診斷或處方語氣過於確定\n- 未提及樣本數、研究設計或外推限制\n",
      "source-keywords":
        "\n- 病理生理 | RCT | NNT | 禁忌 | 不良事件\n",
    },
    ja: {
      "academic-rubric":
        "\n9. **病態生理・エビデンス** — RCT・ガイドライン・専門家見解の区別\n10. **安全** — 禁忌・副作用・鑑別（該当時）\n",
      "academic-fail":
        "\n- 診断・処方を確定調で記述\n- n 数・研究デザイン・一般化限界の欠如\n",
      "source-keywords":
        "\n- 病態生理 | RCT | NNT | 禁忌 | 有害事象\n",
    },
    fr: {
      "academic-rubric":
        "\n9. **Physiopathologie & niveau de preuve** — ECR vs recommandations vs avis d'expert\n10. **Sécurité** — contre-indications, effets indésirables, diagnostics différentiels\n",
      "academic-fail":
        "\n- Ton diagnostique ou prescriptif trop catégorique\n- Pas de n, de design d'étude ni de limites de généralisation\n",
      "source-keywords":
        "\n- physiopathologie | ECR | NNT | contre-indication | effet indésirable\n",
    },
    es: {
      "academic-rubric":
        "\n9. **Fisiopatología y nivel de evidencia** — ECA vs guías vs opinión experta\n10. **Seguridad** — contraindicaciones, efectos adversos, diagnósticos diferenciales\n",
      "academic-fail":
        "\n- Tono diagnóstico o prescriptivo demasiado categórico\n- Sin n, diseño del estudio ni límites de generalización\n",
      "source-keywords":
        "\n- fisiopatología | ECA | NNT | contraindicación | evento adverso\n",
    },
  },
  "chemical-engineering": {
    "zh-TW": {
      "academic-rubric":
        "\n9. **物質與能量平衡** — 單位、平衡、守恆\n10. **製程與安全** — 反應器設計、HAZOP、放大限制\n",
      "source-keywords":
        "\n- 物料平衡 | 熱負荷 | Reynolds | 產率 | 分離\n",
      "presentation-context":
        "\n- 例：製程設計報告、實驗室安全與 PFD 審查\n- 投影片：問題 → PFD／實驗 → 數值 → 限制\n",
    },
    ja: {
      "academic-rubric":
        "\n9. **物質・エネルギー収支** — 単位、平衡、保存則\n10. **プロセス・安全** — 反応器設計、HAZOP、スケールアップ限界\n",
      "source-keywords":
        "\n- 物質収支 | 熱 duty | Reynolds | 収率 | 分離\n",
      "presentation-context":
        "\n- 例：プロセス設計発表、ラボ安全・PFD レビュー\n",
    },
    fr: {
      "academic-rubric":
        "\n9. **Bilan matière & énergie** — unités, équilibre, conservation\n10. **Procédé & sécurité** — réacteur, HAZOP, limites de scale-up\n",
      "source-keywords":
        "\n- bilan matière | duty thermique | Reynolds | rendement | séparation\n",
      "presentation-context":
        "\n- ex. présentation procédé, revue PFD et sécurité labo\n",
    },
    es: {
      "academic-rubric":
        "\n9. **Balance material y energético** — unidades, equilibrio, conservación\n10. **Proceso y seguridad** — diseño de reactor, HAZOP, límites de escala\n",
      "source-keywords":
        "\n- balance de masa | duty térmico | Reynolds | rendimiento | separación\n",
      "presentation-context":
        "\n- p. ej. presentación de diseño de proceso, revisión PFD\n",
    },
  },
  veterinary: {
    "zh-TW": {
      "academic-rubric":
        "\n9. **物種・體重・給藥途徑** — 獸醫脈絡明確\n10. **殘留・食用動物** — MRL、停藥期、標外使用限制\n",
      "academic-fail":
        "\n- 僅以人類劑量與用藥標準敘述\n- 忽略物種間藥動學差異\n",
      "source-keywords":
        "\n- 物種 | 劑量 mg/kg | 停藥期 | 藥動學 | 人畜共通傳染\n",
    },
    ja: {
      "academic-rubric":
        "\n9. **種・体重・投与経路** — 獣医学的文脈を明示\n10. **残留・食用動物** — MRL、休薬期間、オフラベル限界\n",
      "academic-fail":
        "\n- 人間基準の薬・用量のみ\n- 種間薬物動態の差異を無視\n",
      "source-keywords":
        "\n- 種 | 用量 mg/kg | 休薬 | 薬物動態 | 人獣共通感染\n",
    },
    fr: {
      "academic-rubric":
        "\n9. **Espèce & voie** — contexte vétérinaire explicite\n10. **Résidus & animaux alimentaires** — LMR, délai d'attente, hors AMM\n",
      "academic-fail":
        "\n- Posologie humaine seule sans espèce\n- Différences pharmacocinétiques inter-espèces ignorées\n",
      "source-keywords":
        "\n- espèce | dose mg/kg | délai d'attente | pharmacocinétique | zoonose\n",
    },
    es: {
      "academic-rubric":
        "\n9. **Especie y vía** — contexto veterinario explícito\n10. **Residuos y animales de consumo** — LMR, período de retiro, uso off-label\n",
      "academic-fail":
        "\n- Solo dosis humana sin contexto de especie\n- Ignora diferencias farmacocinéticas entre especies\n",
      "source-keywords":
        "\n- especie | dosis mg/kg | retiro | farmacocinética | zoonosis\n",
    },
  },
  linguistics: {
    "zh-TW": {
      "academic-rubric":
        "\n9. **資料與例句** — 自然語例、語料庫、統計依據\n10. **理論契合** — 框架與分析單位一致\n",
      "source-keywords":
        "\n- 音位 | 詞素 | 句法 | 語用 | 語料庫 | gloss\n",
    },
    ja: {
      "academic-rubric":
        "\n9. **データ・例** — 自然言語例、コーパス、統計的根拠\n10. **理論適合** — フレームワークと分析単位の一致\n",
      "source-keywords":
        "\n- 音素 | 形態素 | 統語 | 談話 | コーパス | gloss\n",
    },
    fr: {
      "academic-rubric":
        "\n9. **Données & exemples** — exemples naturels, corpus ou statistiques\n10. **Adéquation théorique** — cadre et unité d'analyse alignés\n",
      "source-keywords":
        "\n- phonème | morphème | syntaxe | pragmatique | corpus | gloss\n",
    },
    es: {
      "academic-rubric":
        "\n9. **Datos y ejemplos** — ejemplos naturales, corpus o estadísticas\n10. **Ajuste teórico** — marco y unidad de análisis alineados\n",
      "source-keywords":
        "\n- fonema | morfema | sintaxis | pragmática | corpus | gloss\n",
    },
  },
  design: {
    "zh-TW": {
      "presentation-context":
        "\n- 例：作品集評審、使用者旅程、評圖\n- 投影片：問題 → 研究 → 方案 → 回饋迭代\n",
      "academic-rubric":
        "\n9. **使用者與脈絡** — 人物誌、旅程、限制連結設計決策\n10. **評圖回應** — 替代方案、權衡、限制\n",
    },
    ja: {
      "presentation-context":
        "\n- 例：ポートフォリオ批評、ユーザージャーニー\n- スライド：問題 → リサーチ → 案 → フィードバック\n",
      "academic-rubric":
        "\n9. **ユーザー・文脈** — ペルソナ、ジャーニー、制約と設計判断\n10. **批評への応答** — 代替案、トレードオフ、限界\n",
    },
    fr: {
      "presentation-context":
        "\n- ex. critique portfolio, parcours utilisateur\n- Slides : problème → recherche → concepts → itération\n",
      "academic-rubric":
        "\n9. **Utilisateur & contexte** — persona, parcours, contraintes liées aux choix\n10. **Réponse à la critique** — alternatives, compromis, limites\n",
    },
    es: {
      "presentation-context":
        "\n- p. ej. crítica de portfolio, recorrido de usuario\n- Diapositivas: problema → investigación → conceptos → iteración\n",
      "academic-rubric":
        "\n9. **Usuario y contexto** — persona, journey, restricciones ligadas a decisiones\n10. **Respuesta a la crítica** — alternativas, trade-offs, límites\n",
    },
  },
  "cultural-arts": {
    "zh-TW": {
      "academic-rubric":
        "\n9. **脈絡與時代** — 作品、演出、政策的歷史社會脈絡\n10. **評論與詮釋** — 一手資料、評論、理論框架之區分\n",
      "source-keywords":
        "\n- 策展 | 接受史 | 經典 | 政策 | 檔案 | 演出\n",
      "presentation-context": "\n- 例：作品分析報告、展覽計畫、演出評論\n",
    },
    ja: {
      "academic-rubric":
        "\n9. **文脈・時代** — 作品・公演・政策の歴史社会背景\n10. **批評・解釈** — 一次資料、レビュー、理論枠の区別\n",
      "source-keywords":
        "\n- キュレーション | 受容 | カノン | 政策 | アーカイブ | 公演\n",
      "presentation-context": "\n- 例：作品分析発表、展覧会企画、公演レビュー\n",
    },
    fr: {
      "academic-rubric":
        "\n9. **Contexte & période** — cadrage historique et social\n10. **Critique & interprétation** — sources primaires vs critiques vs théorie\n",
      "source-keywords":
        "\n- curatorial | réception | canon | politique | archive | performance\n",
      "presentation-context": "\n- ex. analyse d'œuvre, projet d'exposition, critique de spectacle\n",
    },
    es: {
      "academic-rubric":
        "\n9. **Contexto y periodo** — marco histórico y social\n10. **Crítica e interpretación** — fuentes primarias vs reseñas vs teoría\n",
      "source-keywords":
        "\n- curaduría | recepción | canon | política | archivo | performance\n",
      "presentation-context": "\n- p. ej. análisis de obra, proyecto de exposición, reseña escénica\n",
    },
  },
  philosophy: {
    "zh-TW": {
      "academic-rubric":
        "\n9. **論證結構** — 前提、結論、反例、再反駁\n10. **文本依據** — 引用支持詮釋\n",
      "academic-fail":
        "\n- 僅列引用而無作者論旨\n- 稻草人式反駁；核心反例未回應\n",
    },
    ja: {
      "academic-rubric":
        "\n9. **論証構造** — 前提、結論、反論、再反駁\n10. **テキスト根拠** — 引用が解釈を実際に支持\n",
      "academic-fail":
        "\n- 引用の羅列のみで本人の論旨なし\n- ストローマンのみ；核心の反論に未応答\n",
    },
    fr: {
      "academic-rubric":
        "\n9. **Structure argumentative** — prémisses, conclusion, objection, réplique\n10. **Appui textuel** — citations soutenant l'interprétation\n",
      "academic-fail":
        "\n- Empilement de citations sans thèse auteur\n- Homme de paille seule ; objection centrale esquivée\n",
    },
    es: {
      "academic-rubric":
        "\n9. **Estructura argumentativa** — premisas, conclusión, objeción, réplica\n10. **Soporte textual** — citas que respaldan la interpretación\n",
      "academic-fail":
        "\n- Solo citas sin tesis propia\n- Hombre de paja únicamente; objeción central sin responder\n",
    },
  },
  sports: {
    "zh-TW": {
      "academic-rubric":
        "\n9. **生理與負荷** — 訓練、比賽負荷與適應依據\n10. **測量與統計** — 樣本、效果量、限制\n",
      "source-keywords":
        "\n- VO2max | 週期化 | 傷害 | 生物力學 | 負荷 | 恢復\n",
    },
    ja: {
      "academic-rubric":
        "\n9. **生理・負荷** — トレーニング負荷と適応の根拠\n10. **測定・統計** — サンプル、効果量、限界\n",
      "source-keywords":
        "\n- VO2max | ピリオダイゼーション | 傷害 | バイオメカニクス | 負荷 | 回復\n",
    },
    fr: {
      "academic-rubric":
        "\n9. **Physiologie & charge** — charge d'entraînement et preuves d'adaptation\n10. **Mesure & stats** — échantillon, taille d'effet, limites\n",
      "source-keywords":
        "\n- VO2max | périodisation | blessure | biomécanique | charge | récupération\n",
    },
    es: {
      "academic-rubric":
        "\n9. **Fisiología y carga** — carga de entrenamiento y evidencia de adaptación\n10. **Medición y estadística** — muestra, tamaño del efecto, límites\n",
      "source-keywords":
        "\n- VO2max | periodización | lesión | biomecánica | carga | recuperación\n",
    },
  },
  economics: {
    "zh-TW": {
      "academic-rubric":
        "\n9. **模型與假設** — 假設明示與限制\n10. **資料與識別** — 內生性、樣本、單位\n",
      "source-keywords": "\n- 彈性 | 識別 | 福利 | 外部性 | IV | DiD\n",
    },
    ja: {
      "academic-rubric":
        "\n9. **モデル・仮定** — 仮定の明示と限界\n10. **データ・識別** — 内生性、サンプル、単位\n",
      "source-keywords": "\n- 弾力性 | 識別 | 厚生 | 外部性 | IV | DiD\n",
    },
    fr: {
      "academic-rubric":
        "\n9. **Modèle & hypothèses** — hypothèses énoncées et limites\n10. **Données & identification** — endogénéité, échantillon, unités\n",
      "source-keywords": "\n- élasticité | identification | bien-être | externalité | IV | DiD\n",
    },
    es: {
      "academic-rubric":
        "\n9. **Modelo y supuestos** — supuestos declarados y límites\n10. **Datos e identificación** — endogeneidad, muestra, unidades\n",
      "source-keywords": "\n- elasticidad | identificación | bienestar | externalidad | IV | DiD\n",
    },
  },
  architecture: {
    "zh-TW": {
      "presentation-context":
        "\n- 例：工作室評圖、結構與環境整合發表\n- 每張投影片：比例、材料、理由一行\n",
      "academic-rubric":
        "\n9. **空間與結構** — 尺度、動線、結構邏輯\n10. **環境與法規** — 日照、能源、法規、脈絡\n",
    },
    ja: {
      "presentation-context":
        "\n- 例：スタジオピンアップ、構造・環境統合発表\n- 各スライド：縮尺・材料・根拠を1行\n",
      "academic-rubric":
        "\n9. **空間・構造** — スケール、動線、構造論理\n10. **環境・法規** — 日照、エネルギー、法規、文脈\n",
    },
    fr: {
      "presentation-context":
        "\n- ex. pin-up studio, intégration structure/environnement\n- Une ligne par slide : échelle, matériau, justification\n",
      "academic-rubric":
        "\n9. **Espace & structure** — échelle, circulation, logique structurelle\n10. **Environnement & normes** — lumière, énergie, réglementation, contexte\n",
    },
    es: {
      "presentation-context":
        "\n- p. ej. pin-up de estudio, integración estructura/entorno\n- Una línea por diapositiva: escala, material, justificación\n",
      "academic-rubric":
        "\n9. **Espacio y estructura** — escala, circulación, lógica estructural\n10. **Entorno y normativa** — luz, energía, regulación, contexto\n",
    },
  },
  "electrical-engineering": {
    "zh-TW": {
      "academic-rubric":
        "\n9. **電路與訊號** — 單位、頻寬、雜訊、安全裕度\n10. **實驗與模擬** — 量測條件、誤差\n",
      "source-keywords": "\n- 頻寬 | SNR | 轉移函數 | EMC | 取樣\n",
    },
    ja: {
      "academic-rubric":
        "\n9. **回路・信号** — 単位、帯域、ノイズ、安全マージン\n10. **実験・シミュレーション** — 測定条件、誤差\n",
      "source-keywords": "\n- 帯域 | SNR | 伝達関数 | EMC | サンプリング\n",
    },
    fr: {
      "academic-rubric":
        "\n9. **Circuits & signaux** — unités, bande passante, bruit, marges de sécurité\n10. **Labo & simulation** — conditions de mesure et erreur\n",
      "source-keywords": "\n- bande passante | SNR | fonction de transfert | CEM | échantillonnage\n",
    },
    es: {
      "academic-rubric":
        "\n9. **Circuitos y señales** — unidades, ancho de banda, ruido, márgenes de seguridad\n10. **Laboratorio y simulación** — condiciones de medición y error\n",
      "source-keywords": "\n- ancho de banda | SNR | función de transferencia | EMC | muestreo\n",
    },
  },
  "home-economics": {
    "zh-TW": {
      "academic-rubric":
        "\n9. **家庭與消費科學** — 營養、食品、家庭、福利脈絡\n10. **實證與政策** — 樣本、指標、限制\n",
      "source-keywords":
        "\n- 營養 | 食品安全 | 家庭 | 消費者 | 政策 | RCT\n",
    },
    ja: {
      "academic-rubric":
        "\n9. **家庭・消費科学** — 栄養、食品、家庭、福祉の文脈\n10. **実証・政策** — サンプル、指標、限界\n",
      "source-keywords":
        "\n- 栄養 | 食品安全 | 家庭 | 消費者 | 政策 | RCT\n",
    },
    fr: {
      "academic-rubric":
        "\n9. **Sciences du foyer & consommation** — nutrition, alimentation, foyer ou bien-être\n10. **Preuves & politique** — échantillon, indicateurs, limites\n",
      "source-keywords":
        "\n- nutrition | sécurité alimentaire | foyer | consommateur | politique | ECR\n",
    },
    es: {
      "academic-rubric":
        "\n9. **Ciencias del hogar y consumo** — nutrición, alimentos, hogar o bienestar\n10. **Evidencia y política** — muestra, indicadores, límites\n",
      "source-keywords":
        "\n- nutrición | seguridad alimentaria | hogar | consumidor | política | ECA\n",
    },
  },
};

const STUDY_PRESENTATION_I18N = {
  cs: {
    "zh-TW": {
      "study-examples":
        "\n- 「資料結構考試 D-2」→ 20 分鐘複習 + 5 要點\n- 「除錯卡住」→ 2 個假設 + 下一步實驗\n",
      "presentation-context":
        "\n- 例：演算法·系統設計報告、資安專題展示\n- 投影片：問題 → 設計·複雜度 → 示範 → 限制\n",
    },
    ja: {
      "study-examples":
        "\n- 「データ構造試験 D-2」→ 20分復習 + 要点5つ\n- 「デバッグで詰まった」→ 仮説2つ + 次の実験\n",
      "presentation-context":
        "\n- 例：アルゴリズム・システム設計発表、セキュリティ capstone\n- スライド：問題 → 設計・計算量 → デモ → 限界\n",
    },
    fr: {
      "study-examples":
        "\n- 「Examen structures D-2」→ plan 20 min + 5 points clés\n- 「Débogage bloqué」→ 2 hypothèses + 1 expérience\n",
      "presentation-context":
        "\n- ex. soutenance algo/système, démo sécurité capstone\n- Slides : problème → conception/complexité → démo → limites\n",
    },
    es: {
      "study-examples":
        "\n- 「Examen estructuras D-2」→ repaso 20 min + 5 puntos clave\n- 「Depuración atascada」→ 2 hipótesis + 1 experimento\n",
      "presentation-context":
        "\n- p. ej. defensa algoritmos/sistemas, demo capstone seguridad\n- Diapositivas: problema → diseño/complejidad → demo → límites\n",
    },
  },
  law: {
    "zh-TW": {
      "study-examples":
        "\n- 「法學考試 D-3」→ 3 則 IRAC 骨架 + 5 個法條\n- 「論文卡住」→ 1 爭點 + 2 則判例\n",
      "presentation-context":
        "\n- 例：模擬法庭、判例簡報、政策提案\n- 投影片：事實 → 爭點 → 法理 → 結論\n",
    },
    ja: {
      "study-examples":
        "\n- 「法学試験 D-3」→ 判例3件 IRAC + 法令5項目\n- 「論文で詰まった」→ 争点1つ + 判例2件\n",
      "presentation-context":
        "\n- 例：模擬裁判、判例ブリーフィング、政策提案\n- スライド：事実 → 争点 → 法 → 結論\n",
    },
    fr: {
      "study-examples":
        "\n- 「Examen droit D-3」→ 3 IRAC + 5 textes\n- 「Mémoire bloqué」→ 1 question + 2 autorités\n",
      "presentation-context":
        "\n- ex. plaidoirie, briefing jurisprudence, pitch politique\n- Slides : faits → question → règle → conclusion\n",
    },
    es: {
      "study-examples":
        "\n- 「Examen derecho D-3」→ 3 IRAC + 5 normas\n- 「Ensayo atascado」→ 1 cuestión + 2 precedentes\n",
      "presentation-context":
        "\n- p. ej. juicio simulado, briefing, propuesta política\n- Diapositivas: hechos → cuestión → norma → conclusión\n",
    },
  },
  medicine: {
    "zh-TW": {
      "study-examples":
        "\n- 「OSCE D-3」→ 檢核表 10 項 + 模擬 1 次\n- 「病理複習」→ 機轉 3 步 + 限制 1 句\n",
      "presentation-context":
        "\n- 例：病例報告、OSCE 簡報、期刊俱樂部\n- 投影片：病例 → 鑑別 → 證據等級 → 治療·限制\n",
    },
    ja: {
      "study-examples":
        "\n- 「OSCE D-3」→ チェックリスト10 + 模擬1回\n- 「病態暗記」→ 機序3段 + 限界1行\n",
      "presentation-context":
        "\n- 例：ケースプレゼン、OSCE、ジャーナルクラブ\n- スライド：症例 → 鑑別 → エビデンス → 治療・限界\n",
    },
    fr: {
      "study-examples":
        "\n- 「OSCE J-3」→ liste 10 items + 1 simulation\n- 「Physiopatho」→ 3 étapes + 1 limite\n",
      "presentation-context":
        "\n- ex. présentation de cas, OSCE, journal club\n- Slides : cas → différentiel → niveau de preuve → plan et limites\n",
    },
    es: {
      "study-examples":
        "\n- 「OSCE D-3」→ lista 10 ítems + 1 simulación\n- 「Fisiopatología」→ 3 pasos + 1 límite\n",
      "presentation-context":
        "\n- p. ej. caso clínico, OSCE, club de revistas\n- Diapositivas: caso → diferencial → evidencia → plan y límites\n",
    },
  },
  "chemical-engineering": {
    "zh-TW": {
      "study-examples":
        "\n- 「反應工程考試 D-4」→ 物料平衡檢核 + 單位一致\n- 「實驗設計」→ 2 變數 + 1 項 HAZOP·安全\n",
      "presentation-context":
        "\n- 例：製程設計報告、實驗室安全與 PFD 審查\n- 投影片：問題 → PFD／實驗 → 數值 → 限制\n",
    },
    ja: {
      "study-examples":
        "\n- 「反応工学試験 D-4」→ 収支チェック + 単位確認\n- 「実験設計」→ 変数2つ + HAZOP・安全1項目\n",
      "presentation-context":
        "\n- 例：プロセス設計発表、ラボ安全・PFD レビュー\n- スライド：問題 → PFD／実験 → 数値 → 限界\n",
    },
    fr: {
      "study-examples":
        "\n- 「Examen réaction J-4」→ bilan + unités\n- 「Design labo」→ 2 variables + 1 HAZOP\n",
      "presentation-context":
        "\n- ex. présentation procédé, revue PFD et sécurité labo\n- Slides : problème → PFD/expérience → chiffres → limites\n",
    },
    es: {
      "study-examples":
        "\n- 「Examen reacción D-4」→ balance + unidades\n- 「Diseño lab」→ 2 variables + 1 HAZOP\n",
      "presentation-context":
        "\n- p. ej. diseño de proceso, revisión PFD y seguridad\n- Diapositivas: problema → PFD/experimento → datos → límites\n",
    },
  },
  veterinary: {
    "zh-TW": {
      "study-examples":
        "\n- 「獸醫藥理考試」→ 5 種劑量表 + 2 禁忌\n- 「臨床實習」→ 物種檢核 + MRL·停藥 3 項\n",
      "presentation-context":
        "\n- 例：臨床病例、食用動物藥物·MRL 簡報\n- 投影片：物種·體重 → 診斷 → 劑量 → 殘留·限制\n",
    },
    ja: {
      "study-examples":
        "\n- 「獣医薬理試験」→ 種別用量表5 + 禁忌2\n- 「臨床実習」→ 種チェック + MRL・休薬3項目\n",
      "presentation-context":
        "\n- 例：臨床ケース、食用動物・MRL 発表\n- スライド：種・体重 → 診断 → 用量 → 残留・限界\n",
    },
    fr: {
      "study-examples":
        "\n- 「Examen pharma véto」→ 5 lignes dose/espèce + 2 CI\n- 「Stage clinique」→ checklist + 3 MRL\n",
      "presentation-context":
        "\n- ex. cas clinique, briefing MRL animaux alimentaires\n- Slides : espèce/poids → diagnostic → dose → résidus/limites\n",
    },
    es: {
      "study-examples":
        "\n- 「Examen farmaco vet」→ 5 dosis/especie + 2 contraindicaciones\n- 「Rotación clínica」→ checklist + 3 MRL\n",
      "presentation-context":
        "\n- p. ej. caso clínico, briefing MRL animales de consumo\n- Diapositivas: especie/peso → diagnóstico → dosis → residuos/límites\n",
    },
  },
  linguistics: {
    "zh-TW": {
      "study-examples":
        "\n- 「音韻·句法考試 D-5」→ 8 則 gloss 例句 + 1 框架\n- 「語料庫作業」→ 1 檢索式 + 1 頻率表\n",
      "presentation-context":
        "\n- 例：分析報告、語料·田野結果分享\n- 投影片：問題 → 資料 → 分析 → 限制\n",
    },
    ja: {
      "study-examples":
        "\n- 「音韻・統語試験 D-5」→ gloss 例8 + 枠組み1\n- 「コーパス課題」→ 検索式1 + 頻度表1\n",
      "presentation-context":
        "\n- 例：分析発表、コーパス・フィールドワーク\n- スライド：問い → データ → 分析 → 限界\n",
    },
    fr: {
      "study-examples":
        "\n- 「Examen phonéo/syntaxe J-5」→ 8 exemples glossés + 1 cadre\n- 「Corpus」→ 1 requête + 1 tableau\n",
      "presentation-context":
        "\n- ex. exposé d'analyse, corpus ou terrain\n- Slides : question → données → analyse → limites\n",
    },
    es: {
      "study-examples":
        "\n- 「Examen fonética/sintaxis D-5」→ 8 ejemplos con gloss + 1 marco\n- 「Corpus」→ 1 consulta + 1 tabla\n",
      "presentation-context":
        "\n- p. ej. análisis, corpus o trabajo de campo\n- Diapositivas: pregunta → datos → análisis → límites\n",
    },
  },
  design: {
    "zh-TW": {
      "study-examples":
        "\n- 「UX·研究考試」→ 人物誌·旅程各 1 張 + 驗證 2 項\n- 「原型卡住」→ 1 假設 + 1 次測試設計\n",
    },
    ja: {
      "study-examples":
        "\n- 「UX・リサーチ試験」→ ペルソナ・ジャーニー各1 + 検証2項目\n- 「プロトタイプで詰まった」→ 仮説1 + テスト1回\n",
    },
    fr: {
      "study-examples":
        "\n- 「Examen UX/recherche」→ 1 persona + 1 parcours + 2 validations\n- 「Prototype bloqué」→ 1 hypothèse + 1 test\n",
    },
    es: {
      "study-examples":
        "\n- 「Examen UX/investigación」→ 1 persona + 1 journey + 2 validaciones\n- 「Prototipo atascado」→ 1 hipótesis + 1 prueba\n",
    },
  },
  "cultural-arts": {
    "zh-TW": {
      "study-examples":
        "\n- 「藝術史·評論考試」→ 3 作品 + 各 1 一手資料\n- 「展覽企劃」→ 概念 1 句 + 檔案·政策 2 則\n",
      "presentation-context":
        "\n- 例：作品分析報告、展覽計畫、演出評論\n- 投影片：脈絡 → 作品·一手資料 → 詮釋 → 評論\n",
    },
    ja: {
      "study-examples":
        "\n- 「美術史・批評試験」→ 作品3 + 一次資料各1\n- 「展覧会企画」→ コンセプト1行 + 資料2件\n",
      "presentation-context":
        "\n- 例：作品分析発表、展覧会企画、公演レビュー\n- スライド：文脈 → 作品・一次資料 → 解釈 → 批評\n",
    },
    fr: {
      "study-examples":
        "\n- 「Examen histoire/critique」→ 3 œuvres + 1 source primaire chacune\n- 「Projet expo」→ 1 ligne concept + 2 sources\n",
      "presentation-context":
        "\n- ex. analyse d'œuvre, projet d'exposition, critique de spectacle\n- Slides : contexte → œuvre/source → interprétation → critique\n",
    },
    es: {
      "study-examples":
        "\n- 「Examen historia/crítica」→ 3 obras + 1 fuente primaria c/u\n- 「Proyecto expo」→ 1 línea concepto + 2 fuentes\n",
      "presentation-context":
        "\n- p. ej. análisis de obra, proyecto de exposición, reseña escénica\n- Diapositivas: contexto → obra/fuente → interpretación → crítica\n",
    },
  },
  philosophy: {
    "zh-TW": {
      "study-examples":
        "\n- 「哲學考試 D-4」→ 論證圖 1 張 + 反例·再駁各 1\n- 「文本閱讀」→ 引用 3 則 + 作者論旨 1 句\n",
      "presentation-context":
        "\n- 例：論文報告、思想·文本研討\n- 投影片：論旨 → 前提 → 反例 → 再駁 → 結論\n",
    },
    ja: {
      "study-examples":
        "\n- 「哲学試験 D-4」→ 論証マップ1 + 反論・再反駁\n- 「テキスト読解」→ 引用3 + 論旨1文\n",
      "presentation-context":
        "\n- 例：論文発表、思想・テキストゼミ\n- スライド：論旨 → 前提 → 反論 → 再反駁 → 結論\n",
    },
    fr: {
      "study-examples":
        "\n- 「Examen philo J-4」→ 1 carte d'argument + objection/réplique\n- 「Lecture」→ 3 citations + 1 thèse\n",
      "presentation-context":
        "\n- ex. exposé, séminaire texte ou idée\n- Slides : thèse → prémisses → objection → réplique → conclusion\n",
    },
    es: {
      "study-examples":
        "\n- 「Examen filosofía D-4」→ 1 mapa argumental + objeción/réplica\n- 「Lectura」→ 3 citas + 1 tesis\n",
      "presentation-context":
        "\n- p. ej. exposición, seminario de texto o idea\n- Diapositivas: tesis → premisas → objeción → réplica → conclusión\n",
    },
  },
  sports: {
    "zh-TW": {
      "study-examples":
        "\n- 「體能考試 D-5」→ 每週負荷 + 恢復 3 原則\n- 「生物力學作業」→ 2 種測量 + 詮釋·限制 1 句\n",
      "presentation-context":
        "\n- 例：訓練·比賽分析、研究或計畫提案\n- 投影片：目標 → 負荷·測量 → 結果 → 應用·限制\n",
    },
    ja: {
      "study-examples":
        "\n- 「体力試験 D-5」→ 週負荷 + 回復3原則\n- 「バイオメカ課題」→ 測定2種 + 解釈・限界1行\n",
      "presentation-context":
        "\n- 例：トレーニング・試合分析、研究・プログラム提案\n- スライド：目標 → 負荷・測定 → 結果 → 応用・限界\n",
    },
    fr: {
      "study-examples":
        "\n- 「Examen fitness J-5」→ charge hebdo + 3 règles récup\n- 「Bioméca」→ 2 mesures + 1 limite\n",
      "presentation-context":
        "\n- ex. analyse entraînement/match, pitch recherche ou programme\n- Slides : objectif → charge/mesure → résultats → limites\n",
    },
    es: {
      "study-examples":
        "\n- 「Examen fitness D-5」→ carga semanal + 3 reglas recuperación\n- 「Biomecánica」→ 2 medidas + 1 límite\n",
      "presentation-context":
        "\n- p. ej. análisis entreno/partido, pitch investigación o programa\n- Diapositivas: objetivo → carga/medición → resultados → límites\n",
    },
  },
  economics: {
    "zh-TW": {
      "study-examples":
        "\n- 「計量·個體考試」→ 5 假設 + 1 識別策略\n- 「資料作業」→ 變數表 + 內生性·限制 2 句\n",
      "presentation-context":
        "\n- 例：政策·實證結果、DiD·模型簡報\n- 投影片：問題 → 資料·識別 → 結果 → 含義·限制\n",
    },
    ja: {
      "study-examples":
        "\n- 「計量・ミクロ試験」→ 仮定5 + 識別1\n- 「データ課題」→ 変数表 + 内生性・限界2行\n",
      "presentation-context":
        "\n- 例：政策・実証、DiD・モデル発表\n- スライド：問い → データ・識別 → 結果 → 含意・限界\n",
    },
    fr: {
      "study-examples":
        "\n- 「Examen économétrie J」→ 5 hypothèses + 1 identification\n- 「Données」→ tableau + 2 lignes endogénéité\n",
      "presentation-context":
        "\n- ex. résultats politique/empirique, briefing DiD/modèle\n- Slides : question → données/identification → résultats → limites\n",
    },
    es: {
      "study-examples":
        "\n- 「Examen econometría」→ 5 supuestos + 1 identificación\n- 「Datos」→ tabla + 2 líneas endogeneidad\n",
      "presentation-context":
        "\n- p. ej. resultados política/empíricos, briefing DiD/modelo\n- Diapositivas: pregunta → datos/identificación → resultados → límites\n",
    },
  },
  architecture: {
    "zh-TW": {
      "study-examples":
        "\n- 「工作室期中」→ 3 張圖 + 比例·材料各 1 句\n- 「環境分析」→ 日照·能源 3 指標 + 法規 1 項\n",
    },
    ja: {
      "study-examples":
        "\n- 「スタジオ中間」→ 図面3 + スケール・材料各1行\n- 「環境分析」→ 日照・エネルギー3 + 法規1\n",
    },
    fr: {
      "study-examples":
        "\n- 「Mi-parcours studio」→ 3 plans + échelle/matériau\n- 「Étude environnement」→ 3 indicateurs + 1 norme\n",
    },
    es: {
      "study-examples":
        "\n- 「Revisión estudio」→ 3 láminas + escala/material\n- 「Estudio ambiental」→ 3 métricas + 1 norma\n",
    },
  },
  "electrical-engineering": {
    "zh-TW": {
      "study-examples":
        "\n- 「電路·訊號考試」→ 2 轉移函數 + 單位·頻寬檢核\n- 「實驗報告」→ 量測條件·誤差·SNR 各 1 句\n",
      "presentation-context":
        "\n- 例：電路·PCB·訊號處理報告、實驗·模擬結果\n- 投影片：規格 → 設計 → 量測·波形 → 限制\n",
    },
    ja: {
      "study-examples":
        "\n- 「回路・信号試験」→ 伝達関数2 + 単位・帯域\n- 「実験報告」→ 測定条件・誤差・SNR 各1行\n",
      "presentation-context":
        "\n- 例：回路・PCB・信号処理発表、実験・シミュ結果\n- スライド：仕様 → 設計 → 測定・波形 → 限界\n",
    },
    fr: {
      "study-examples":
        "\n- 「Examen circuits/signaux」→ 2 fonctions + unités/bande\n- 「Rapport labo」→ conditions, erreur, SNR\n",
      "presentation-context":
        "\n- ex. circuits/PCB/traitement signal, résultats labo/simu\n- Slides : spec → conception → mesure/forme → limites\n",
    },
    es: {
      "study-examples":
        "\n- 「Examen circuitos/señales」→ 2 funciones + unidades/banda\n- 「Informe lab」→ condiciones, error, SNR\n",
      "presentation-context":
        "\n- p. ej. circuitos/PCB/procesado señal, resultados lab/sim\n- Diapositivas: spec → diseño → medición/forma → límites\n",
    },
  },
  "home-economics": {
    "zh-TW": {
      "study-examples":
        "\n- 「營養·食品考試」→ 5 指標 + 2 迷思\n- 「家庭·消費調查」→ 樣本·指標 + RCT·調查限制 2 句\n",
      "presentation-context":
        "\n- 例：營養·食安、家庭·福利政策報告\n- 投影片：問題 → 資料·指標 → 結果 → 政策·限制\n",
    },
    ja: {
      "study-examples":
        "\n- 「栄養・食品試験」→ 指標5 + 誤解2\n- 「家庭・消費調査」→ サンプル・指標 + RCT・調査限界2行\n",
      "presentation-context":
        "\n- 例：栄養・食品安全、家庭・福祉政策発表\n- スライド：問題 → データ・指標 → 結果 → 政策・限界\n",
    },
    fr: {
      "study-examples":
        "\n- 「Examen nutrition」→ 5 indicateurs + 2 idées reçues\n- 「Enquête foyer」→ échantillon + limites ECR/enquête\n",
      "presentation-context":
        "\n- ex. nutrition/sécurité alimentaire, politique foyer/bien-être\n- Slides : problème → données/indicateurs → résultats → politique/limites\n",
    },
    es: {
      "study-examples":
        "\n- 「Examen nutrición」→ 5 indicadores + 2 conceptos erróneos\n- 「Encuesta hogar」→ muestra + límites ECA/encuesta\n",
      "presentation-context":
        "\n- p. ej. nutrición/seguridad alimentaria, política hogar/bienestar\n- Diapositivas: problema → datos/indicadores → resultados → política/límites\n",
    },
  },
};

const FAIL_I18N = {
  "chemical-engineering": {
    "zh-TW":
      "\n- 無物料／能量平衡或單位，只重複「高效製程」\n- 無 HAZOP 或放大限制的安全主張\n",
    ja: "\n- 物質・エネルギー収支・単位なしで「効率的プロセス」のみ\n- HAZOP・スケールアップ限界なしの安全主張\n",
    fr: "\n- Affirmations procédé sans bilan matière/énergie ni unités\n- Sécurité sans HAZOP ni limites de scale-up\n",
    es: "\n- Proceso sin balance material/energético ni unidades\n- Seguridad sin HAZOP ni límites de escala\n",
  },
  linguistics: {
    "zh-TW":
      "\n- 無 gloss、出處的例句卻做句法／音韻主張\n- 理論框架與分析單位不一致\n",
    ja: "\n- gloss・出典なし例文で統語・音韻を主張\n- 理論と分析単位の不一致\n",
    fr: "\n- Syntaxe/phonologie sans exemples glossés et sourcés\n- Cadre théorique incompatible avec l'unité d'analyse\n",
    es: "\n- Sintaxis/fonología sin ejemplos con gloss y fuente\n- Marco teórico incompatible con la unidad de análisis\n",
  },
  design: {
    "zh-TW":
      "\n- 無訪談／測試依據的 UX、人物誌主張\n- 無替代方案與權衡，只推單一方案\n",
    ja: "\n- リサーチ根拠なしの UX・ペルソナ主張\n- 代替案・トレードオフなしの単一案押し\n",
    fr: "\n- UX/persona sans preuves de recherche\n- Concept unique sans alternatives ni compromis\n",
    es: "\n- UX/persona sin evidencia de investigación\n- Concepto único sin alternativas ni compensaciones\n",
  },
  "cultural-arts": {
    "zh-TW":
      "\n- 無一手資料或檔案卻反覆詮釋\n- 無時代、社會脈絡的作品／政策說明\n",
    ja: "\n- 一次資料・アーカイブなしの解釈のみ\n- 時代・社会文脈なしの作品・政策説明\n",
    fr: "\n- Interprétation sans sources primaires ou archives\n- Œuvre/politique sans contexte historique\n",
    es: "\n- Interpretación sin fuentes primarias o archivo\n- Obra/política sin contexto histórico\n",
  },
  sports: {
    "zh-TW":
      "\n- 無 n、效果量卻稱「顯著改善」\n- 無訓練負荷、恢復依據的計畫建議\n",
    ja: "\n- n・効果量なしの「有意な改善」\n- 負荷・回復根拠なしのプログラム助言\n",
    fr: "\n- « Amélioration significative » sans n ni taille d'effet\n- Programme sans charge ou récupération justifiées\n",
    es: "\n- « Mejora significativa » sin n ni tamaño del efecto\n- Programa sin carga o recuperación justificadas\n",
  },
  economics: {
    "zh-TW":
      "\n- 未明示假設與限制卻下模型結論\n- 未提識別策略、內生性\n",
    ja: "\n- 仮定・限界なしのモデル結論\n- 識別戦略・内生性への言及なし\n",
    fr: "\n- Conclusions de modèle sans hypothèses ni limites\n- Pas de stratégie d'identification ni d'endogénéité\n",
    es: "\n- Conclusiones del modelo sin supuestos ni límites\n- Sin estrategia de identificación ni endogeneidad\n",
  },
  architecture: {
    "zh-TW":
      "\n- 無比例、材料、結構依據的設計主張\n- 無日照、能源、法規分析\n",
    ja: "\n- スケール・材料・構造根拠なしの設計主張\n- 日照・エネルギー・法規分析なし\n",
    fr: "\n- Design sans échelle, matériaux ou logique structurelle\n- Pas d'analyse lumière, énergie ou normes\n",
    es: "\n- Diseño sin escala, materiales o lógica estructural\n- Sin análisis de luz, energía o normativa\n",
  },
  "electrical-engineering": {
    "zh-TW":
      "\n- 無單位、頻寬、SNR 卻談「訊號處理」\n- 實驗／模擬數值無量測條件、誤差\n",
    ja: "\n- 単位・帯域・SNR なしの「信号処理」\n- 測定条件・誤差なしの実験・シミュ数値\n",
    fr: "\n- Traitement du signal sans unités, bande passante ou SNR\n- Mesures/simulation sans conditions ni erreur\n",
    es: "\n- Procesado de señal sin unidades, ancho de banda o SNR\n- Lab/simulación sin condiciones de medición ni error\n",
  },
  "home-economics": {
    "zh-TW":
      "\n- 無樣本、指標的營養／政策主張\n- 未提 RCT、調查的限制與外推範圍\n",
    ja: "\n- サンプル・指標なしの栄養・政策主張\n- RCT・調査の限界・一般化範囲の未言及\n",
    fr: "\n- Nutrition/politique sans échantillon ni indicateurs\n- ECR/enquête sans limites ni généralisation\n",
    es: "\n- Nutrición/política sin muestra ni indicadores\n- ECA/encuesta sin límites ni generalización\n",
  },
};

for (const [trackId, locales] of Object.entries(FAIL_I18N)) {
  for (const [locale, fail] of Object.entries(locales)) {
    if (LOCALE_DEPTH[trackId]?.[locale]) {
      LOCALE_DEPTH[trackId][locale]["academic-fail"] = fail;
    }
  }
}

for (const [trackId, locales] of Object.entries(LOCALE_EXAMPLES)) {
  if (!LOCALE_DEPTH[trackId]) LOCALE_DEPTH[trackId] = {};
  for (const [locale, patch] of Object.entries(locales)) {
    if (!LOCALE_DEPTH[trackId][locale]) LOCALE_DEPTH[trackId][locale] = {};
    Object.assign(LOCALE_DEPTH[trackId][locale], patch);
  }
}

for (const [trackId, locales] of Object.entries(STUDY_PRESENTATION_I18N)) {
  if (!LOCALE_DEPTH[trackId]) LOCALE_DEPTH[trackId] = {};
  for (const [locale, patch] of Object.entries(locales)) {
    if (!LOCALE_DEPTH[trackId][locale]) LOCALE_DEPTH[trackId][locale] = {};
    Object.assign(LOCALE_DEPTH[trackId][locale], patch);
  }
}

for (const [trackId, locales] of Object.entries(FIVE_TRACK_DEPTH_I18N)) {
  if (!LOCALE_DEPTH[trackId]) LOCALE_DEPTH[trackId] = {};
  for (const [locale, patch] of Object.entries(locales)) {
    if (!LOCALE_DEPTH[trackId][locale]) LOCALE_DEPTH[trackId][locale] = {};
    Object.assign(LOCALE_DEPTH[trackId][locale], patch);
  }
}
