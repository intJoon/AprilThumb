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
