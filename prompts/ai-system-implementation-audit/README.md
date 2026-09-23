# AI System Implementation Audit

这是一个与具体产品、功能和仓库无关的双语审查 prompt，用于从代码、配置、测试、trace 与 runtime 内部审查已经存在的 AI 产品、agent workflow、generation pipeline 或 orchestration harness。

它不同于 Product System Probing：Probing 从真实交互建立外部行为模型；本审查依赖实现证据，判断能力是否真正接入、契约是否成立，以及系统能否安全迭代和移除。

它审查 AI 产品的完整运行路径：哪些能力真正接入了、每个关键环节如何验证、移除策略是否能清理干净、schema 与 contract 是否支持迭代，以及如何组合测试 test 与评估 eval。每项标准选择适合的代码检查、人工评审或模型评分，分别保留必要约束与输出质量的证据。

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

- `ai-system-implementation-audit.zh-CN.md`：简体中文版。
- `ai-system-implementation-audit.en.md`：英文版。

## 推荐用法

1. 填写 prompt 开头的最少背景；未知项保留为 `unknown`。
2. 第一次运行使用 `read-only audit + proposal`，不要直接授权大改。
3. 按本轮授权选择证据深度：只读审查可基于代码与已有 trace；运行测试或最小 runtime 需在授权范围内。只需规划时，直接交付检查方案和未来执行前提。
4. 先审阅 capability lifecycle matrix、removal drill 和 test/eval design。
5. 若决定实施，只批准一个有明确 proposal ID 的 structural slice。

## 未来转为 skill 的条件

当这个 prompt 在多个不同架构的项目中都跑过，并且其触发条件、证据标签、输出结构、工具依赖和验证步骤已经稳定，再考虑转成 skill。现在保留为 prompt package，方便继续修改判断框架。
