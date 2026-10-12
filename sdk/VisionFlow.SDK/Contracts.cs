namespace VisionFlow.SDK;

/// <summary>Observe cancellation and release held input before returning.</summary>
public interface IVisionFlowAction
{
    string Id { get; }
    string DisplayName { get; }
    ValueTask<ActionResult> ExecuteAsync(ActionContext context, CancellationToken cancellationToken);
}

/// <summary>The host supplies only services authorized for the execution mode.</summary>
public sealed record ActionContext(IReadOnlyDictionary<string, FlowValue> Variables,
    IProgress<string> Progress, Target? Target, ICaptureProvider? Capture, IInputProvider? Input);

public interface ICaptureProvider
{
    string Id { get; }
    ValueTask<CapturedFrame> CaptureAsync(Target target, CancellationToken cancellationToken);
}

public interface IVisionProvider
{
    string Id { get; }
    ValueTask<IReadOnlyList<Detection>> FindAsync(VisionRequest request, CancellationToken cancellationToken);
}

public interface IOcrProvider
{
    string Id { get; }
    ValueTask<OcrResult> ReadAsync(VisionRequest request, CancellationToken cancellationToken);
}

public enum MouseButton { Left, Middle, Right }
public interface IInputProvider
{
    string Id { get; }
    ValueTask ClickAsync(Target target, Point position, CoordinateSpace space, MouseButton button,
        CancellationToken cancellationToken);
    ValueTask TypeTextAsync(Target target, string text, CancellationToken cancellationToken);
    /// <summary>Release only input held by this provider, including after cancellation.</summary>
    ValueTask ReleaseAsync();
}

/// <summary>Registration is explicit; these contracts do not load assemblies.</summary>
public interface IExtension
{
    string Id { get; }
    Version Version { get; }
    IEnumerable<IVisionFlowAction> Actions { get; }
    IEnumerable<IVisionProvider> VisionProviders { get; }
    IEnumerable<IOcrProvider> OcrProviders { get; }
}
