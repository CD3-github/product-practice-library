# AI Product System Audit

这是一个与具体产品、功能和仓库无关的双语审查 prompt，用于审查已经存在的 AI 产品、agent workflow、generation pipeline 或 orchestration harness。

它关注的不是单次 PR 的代码风格，也不是只评估最终文案好不好，而是回答一组更根本的问题：系统现在到底有什么、哪些只写了但没有接入、每个环节是否能独立验证、删除一种策略或能力是否会留下残骸、schema 与 contract 是否足以支持长期迭代，以及 deterministic testing 和 probabilistic evaluation 是否共同覆盖了系统质量。

## 何时使用

- 已有一个 AI 功能、agent、copilot、generation pipeline 或多阶段 workflow，需要在扩展或重构前全面盘点。
- 怀疑 repo 中存在「文档写了、代码有了、但没有真正接入」的能力。
- 想确认 prompt、model、tool、retrieval、memory、event、guardrail、post-processing、delivery 和 telemetry 是否形成可验证的完整链路。
- 希望后续可以替换模型、移除一种 content approach、关闭一个 event consumer 或重做某一阶段，而不牵动整个系统。
- 需要重新设计 testing suite 与 eval matrix，使 E2E 和分阶段质量都能持续回归。

## 不适合替代

- 单个 PR 的常规 code review。
- 只针对页面信息架构和交互的 UX 重新构想。
- 还没有任何实现的新功能从零规划。

这些任务可以分别使用 feature review、Product & UX Rethinking，或新功能规划 prompt。若一个项目同时需要产品重构与系统审查，建议先用产品重构 prompt 定义用户结果与产品责任，再用本 prompt 验证实现架构能否可靠支持它。

## 文件

- `ai-product-system-audit.zh-CN.md`：简体中文版。
- `ai-product-system-audit.en.md`：英文版。

## 推荐用法

1. 填写 prompt 开头的最少背景；未知项保留为 `unknown`。
2. 第一次运行使用 `read-only audit + proposal`，不要直接授权大改。
3. 要求 agent 运行可以安全执行的测试、最小 runtime 和 trace 验证。
4. 先审阅 capability lifecycle matrix、removal drill 和 test/eval design。
5. 若决定实施，只批准一个有明确 proposal ID 的 structural slice。

## 未来转为 skill 的条件

当这个 prompt 在多个不同架构的项目中都跑过，并且其触发条件、证据标签、输出结构、工具依赖和验证步骤已经稳定，再考虑转成 skill。现在保留为 prompt package，方便继续修改判断框架。
