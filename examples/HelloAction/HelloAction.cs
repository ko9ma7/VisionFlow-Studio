using VisionFlow.SDK;

namespace VisionFlow.Examples;

/// <summary>A pure example: no screen access or input injection.</summary>
public sealed class HelloAction : IVisionFlowAction
{
    public string Id => "example.hello";
    public string DisplayName => "인사 만들기";

    public ValueTask<ActionResult> ExecuteAsync(ActionContext context, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();
        string name = context.Variables.TryGetValue("name", out FlowValue? value)
            && value is FlowValue.Text text ? text.Value : "사용자";
        IReadOnlyDictionary<string, FlowValue> outputs = new Dictionary<string, FlowValue>
        {
            ["greeting"] = new FlowValue.Text($"안녕하세요, {name}님.")
        };
        return ValueTask.FromResult(new ActionResult(ActionOutcome.Success, "인사를 만들었습니다.", outputs));
    }
}
