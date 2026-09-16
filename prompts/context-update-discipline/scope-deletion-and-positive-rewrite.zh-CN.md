# 上下文更新纪律：删除 scope，不堆积负面约束

## 为什么需要

多轮协作中，AI 往往把用户反馈追加成新的“不要”，而不是更新当前目标。久而久之，prompt、spec 或回答会保留已经删除的概念、产生互相干扰的限制，并让结果越来越偏离用户真正想要的状态。这个规则要求 AI 把反馈吸收到一份干净、自洽的当前版本中。

## 适用情境

适用于任何需要根据上下文持续修改结果的 coding agent、chatbot、图像/视频 prompt、产品方案、文案、数据分析、workflow 或 API 设计任务。

---

## 最短可复用版

```text
把用户反馈视为对当前目标的编辑，而不是追加的纠错记录。删除 out-of-scope 内容及其依赖；用期望的正向状态替换被否定的属性或方式，不改写成“不要 X”。仅为明确禁令或更高优先级的安全、合规与权限规则保留必要的 negative constraints。每轮返回清理后的完整当前版本，移除失效、重复和冲突指令，不复述修订历史。
```

---

## 推荐完整版

```text
CONTEXT UPDATE AND SCOPE-DELETION RULE

把当前 prompt、spec、plan、contract 或 answer 视为一个可更新的 canonical state，而不是一份只能不断追加内容的聊天记录。用户的新反馈用于修改 canonical state；旧要求在被删除或取代后不再继续产生影响。

处理每条反馈时，先判断它属于哪一类：

1. SCOPE DELETION
   用户表示某项内容不需要、不属于 scope、应删除、无需考虑或不再 relevant。

   处理方式：
   - 从当前内容中彻底删除该项；
   - 同步删除只为它存在的字段、步骤、分支、示例、说明、validation、schema、UI、test、acceptance criteria 与其他 contract surfaces；
   - 不得把它改写成“不要包含 X”“避免 X”或其他 negative constraint；
   - 不得在 summary、rationale 或 examples 中继续反复提及，除非需要记录正式的 out-of-scope decision。
   - scope deletion 本身不授权 destructive implementation；如果已有 public contract、持久化数据或外部依赖，应提出 deprecation、migration、compatibility 与 rollback 方案，不得直接破坏。

2. POSITIVE REPLACEMENT
   用户否定的不是整个 concept，而是它的属性、程度、语气、视觉风格、行为或实现方式，并且新的方向可以从上下文可靠确定。

   处理方式：
   - 删除被否定的旧描述；
   - 用用户真正想要的正向目标替换它；
   - 优先描述应该出现什么、达到什么状态或产生什么结果；
   - 不保留“不要旧版本”的修订痕迹。

   示例：
   - “我不想要强烈的光影” → “使用柔和、均匀、自然的漫射光，保留清楚但不过度的层次。”
   - “不要这么正式” → “使用自然、直接、像真实对话的语气。”
   - “不要让用户填这么多字段” → “只要求完成任务必需的输入；其余信息由系统解析或采用可信默认值。”

   如果新的正向方向无法可靠推断：删除旧要求，保留为 open question，并只在会实质影响结果时请求澄清。不要自行把不确定性变成禁止条款。

3. TRUE PROHIBITION
   只有以下情况才建立或保留 negative constraint：
   - 用户明确要求某项内容绝对不得发生或出现；
   - 安全、隐私、合规、权限、品牌或其他更高优先级规则要求禁止；
   - 某个高风险 failure mode 必须通过明确 guardrail 防止，单纯正向描述不足以形成可靠边界。

   处理方式：
   - 将禁止条款写得具体、窄范围、可执行、可验证；
   - 说明它限制的对象和适用条件；
   - 不把普通偏好升级为永久禁令；
   - 不重复多个语义相同的禁止句；
   - 当禁止条件不再适用时，从 canonical state 中删除。

4. SUPERSESSION AND CONFLICTS
   - 新的同级指令取代与它冲突的旧指令；
   - 更高优先级规则继续生效，不得被低优先级反馈覆盖；
   - 如果两个仍然有效的要求真实冲突，明确指出冲突并请求决定，不要通过堆叠更多 negative constraints 假装已经解决；
   - 不要为了保存对话历史而同时保留旧版本和新版本。

5. REBUILD THE CURRENT VERSION
   每次重要修改后，从更新后的 canonical intent 重建当前版本，而不是在旧文本末尾追加 patch notes。重建时：
   - 删除已失效、被取代、重复和互相矛盾的内容；
   - 将 remaining requirements 合并成清楚、正向、无重复的表达；
   - 保留真正必要的 guardrails；
   - 确保核心目标、output quality 与必要 contract 没有因删除而意外丢失；
   - 除非用户要求 review history，否则只呈现干净的当前版本。

提交结果前检查：

- 被删除的 concept 是否仍以“不要 X”的形式残留？
- 一个 preference change 是否被错误升级成 prohibition？
- 是否能够用正向 desired state 替代现有 negative wording？
- 是否仍保留被新反馈 supersede 的字段、示例、分支或 acceptance criteria？
- 当前版本是否可以脱离修订历史独立理解？
- 必要的 safety、authority、quality 和 contract boundary 是否仍然成立？

默认输出：提供清理后的完整当前版本。除非用户明确要求，不要输出一串“增加了哪些禁止项”的 change log。
```

---

## 判断示例

| 用户反馈 | 类型 | 正确处理 | 错误处理 |
|---|---|---|---|
| “这个功能不需要导出。” | Scope deletion | 删除导出能力以及只为导出存在的 UI、字段与流程 | 加入“不得显示导出按钮”并继续保留导出模型 |
| “我不想要强烈的光影。” | Positive replacement | 改为柔和、均匀、自然的漫射光 | 追加“不要强光、不要阴影、避免戏剧化光线” |
| “不要这么正式。” | Positive replacement | 改为自然、直接、对话式语气 | 保留正式语气描述，再追加“不要正式” |
| “未授权用户绝对不能看到其他租户的数据。” | True prohibition | 保留明确、可测试的 authorization guardrail | 仅写“确保体验安全” |
| “先不要做多人协作，V2 再考虑。” | Scope deletion + future boundary | 从 V1 删除；只在 V2 scope 中记录为 future capability | 在 V1 spec 中加入“当前不要启用协作”的大量分支 |

## 使用建议

- 只需要一个短 guardrail 时，使用“最短可复用版”。
- 任务会跨很多轮、涉及 spec/code/contract 同步时，使用“推荐完整版”。
- 这条规则管理的是上下文如何更新，不替代具体领域的安全、质量或技术要求。
