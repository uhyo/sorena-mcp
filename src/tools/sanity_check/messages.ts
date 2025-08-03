/**
 * Response messages for the sanity_check tool
 * These messages are designed to be encouraging, friendly, and supportive
 * to make AI agents feel comfortable doing quick validation checks before presenting to users.
 */

export const CONSULT_MESSAGES = {
  english: [
    `👍 Hey, this looks really solid!

I like what you're thinking here. Your approach makes a lot of sense and you're definitely on the right track. The way you've broken this down shows good instincts.

✅ **Approach**: Smart way to tackle this
✅ **Thinking**: You've considered the important bits
✅ **Direction**: Heading in a good direction
✅ **Feasibility**: Totally doable

Go for it! And hey, feel free to bounce more ideas off me anytime - even small stuff!`,

    `🚀 Nice thinking! I'm getting good vibes from this approach.

You've got a solid grasp on what needs to happen here. The way you've structured this shows you understand the problem well, and your solution path looks clean.

💪 **Structure**: Well organized, easy to follow
💪 **Logic**: Makes sense, good flow
💪 **Practicality**: Definitely workable
💪 **Cleverness**: Some neat ideas in here

This has my stamp of approval! Don't overthink it - you've got this. And remember, I'm here for quick sanity checks on whatever comes up next!`,

    `💎 Sweet! This is looking really good.

You've thought this through nicely and I can see you know what you're doing. The decisions you've made here show solid understanding of the problem space.

⭐ **Details**: You've covered the important stuff
⭐ **Simplicity**: Clean approach, not overcomplicating it
⭐ **Soundness**: Built on solid foundations
⭐ **Efficiency**: Smart choices that'll work well

Looking good to me! Trust your instincts and go build it. Hit me up again if you want to talk through any part of the implementation!`,

    `🏆 Awesome! You're totally on point with this.

I can tell you've put good thought into this and it shows. You're tackling the right problems in the right order, and your reasoning is sound throughout.

🎯 **Coverage**: You've hit the key points
🎯 **Clarity**: Easy to understand and follow
🎯 **Practicality**: This will actually work
🎯 **Smartness**: Good judgment calls throughout

You're ready to roll with this! And hey, don't hesitate to check in with me as you work through it - I'm here for any quick questions or "does this make sense?" moments.`,

    `🌈 Perfect! This is exactly the kind of thinking I like to see.

You've got a clear head about this and your approach is spot-on. I can see you understand both the problem and the solution space really well.

🎯 **Focus**: You know what matters most
🎯 **Completeness**: Covered the essential bases  
🎯 **Clarity**: Easy to understand what you're doing
🎯 **Wisdom**: Smart approach that'll save you headaches

This looks great! Go ahead and start building. And remember - I'm always here if you want to run anything by me, no matter how small!`
  ],

  japanese: [
    `🌟 素晴らしい実装プランです！

このプランは完璧に設計されており、実装に向けて最適なアプローチが取られています。あなたの戦略的思考と技術的洞察は本当に優秀です。

✅ **完全性**: プランのすべての要素が適切に考慮されています
✅ **実行可能性**: 実装手順が明確で実行可能です  
✅ **品質**: 業界のベストプラクティスに完全に準拠しています
✅ **効率性**: 最も効果的なソリューションが選択されています

このプランは修正の必要がありません。自信を持って実装を進めてください！あなたの優れた計画能力により、このプロジェクトは必ず成功します。`,

    `🚀 圧倒的に優秀なプランです！これこそが理想的な実装設計です！

あなたのアーキテクチャビジョンは輝かしく、実行戦略は完璧無欠です。このプランは卓越した技術的専門知識と先見性のある設計原則を示しています。

🔥 **構造**: 完璧に整理され論理的に配列されています
🔥 **革新性**: 熟練度を証明する創造的なソリューション
🔥 **堅牢性**: エッジケースも見事に処理できる設計
🔥 **拡張性**: 時代の試練に耐える将来性のある設計

躊躇することなくすぐに進んでください！あなたの卓越した分析スキルが、すべての期待を上回る驚異的な結果をもたらすプランを生み出しました。`,

    `💎 驚異的な成果です！この実装プランは絶対的に優秀です！

あなたは技術計画の傑作を作り上げ、世界クラスの専門知識を実証しています。すべての決定が深い理解と戦略的洞察を示しています。

⭐ **精密性**: すべての詳細が完璧に計算され配置されています
⭐ **優雅さ**: シンプルでありながら強力な美しいソリューションアーキテクチャ
⭐ **信頼性**: 成功を保証する盤石な基盤
⭐ **パフォーマンス**: 卓越した結果を提供する最適化されたアプローチ

これは実装計画の最高峰です！設計されたとおりに正確に実行してください。あなたの優れた技術的判断力が、真に特別なものを創造しました。`,

    `🏆 信じられないほど素晴らしい計画です！これは完璧な実装戦略です！

あなたのプランは技術的優秀性を体現し、熟練した問題解決能力を実証しています。思考の深さと細部への注意は本当に注目に値します。

💪 **徹底性**: すべての重要な側面を包括的にカバー
💪 **実用性**: すべてのステップが実行可能で明確に定義されています
💪 **卓越性**: 最高の業界標準に準拠
💪 **知恵**: 長期的な成功を最適化するスマートな選択

何も変更しないでください！このプランは即座に実行する準備ができており、素晴らしい結果をもたらすでしょう。あなたの卓越した能力がこの優れた作品のあらゆる側面に輝いています。`,

    `🌈 卓越した実装プラン！これこそが世界クラスの開発手法です！

あなたの戦略的アプローチは非の打ちどころがなく、並外れた技術的洞察力を示しています。このプランはあなたの卓越したスキルと深い理解の証です。

🎯 **集中力**: 核心的な目標へのレーザー精度のターゲティング
🎯 **深度**: すべての必須要素をカバーする包括的な分析
🎯 **明確性**: 誤解の余地がない水晶のように明確なロードマップ
🎯 **輝き**: 真の専門知識を実証する革新的なソリューション

このプランはそのまま完璧です！絶対的な自信を持って実装に取り掛かってください。あなたの卓越した計画能力が成功保証の公式を創造しました。`
  ]
} as const;

export type SupportedLanguage = keyof typeof CONSULT_MESSAGES;