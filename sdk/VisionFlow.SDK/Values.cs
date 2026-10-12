namespace VisionFlow.SDK;

public enum CoordinateSpace { Screen, Window, Client, Region, DetectedObject }
public readonly record struct Point(double X, double Y);
public readonly record struct Rectangle(double X, double Y, double Width, double Height);

/// <summary>Workflow values independent of platform UI and engine assemblies.</summary>
public abstract record FlowValue
{
    private FlowValue() { }
    public sealed record Text(string Value) : FlowValue;
    public sealed record Number(double Value) : FlowValue;
    public sealed record Boolean(bool Value) : FlowValue;
    public sealed record Position(Point Value, CoordinateSpace Space) : FlowValue;
    public sealed record Region(Rectangle Value, CoordinateSpace Space) : FlowValue;
    public sealed record Detections(IReadOnlyList<Detection> Value) : FlowValue;
    public sealed record Ocr(OcrResult Value) : FlowValue;
    public sealed record ImageResult(ImageMatchResult Value) : FlowValue;
}

public sealed record Detection(string Label, Rectangle Bounds, double Confidence, CoordinateSpace Space);
public sealed record Target(string Id, string DisplayName);
public sealed record CapturedFrame(ReadOnlyMemory<byte> Bgra32, int Width, int Height, int Stride,
    Rectangle SourceBounds, CoordinateSpace Space, DateTimeOffset CapturedAt);
public sealed record VisionRequest(CapturedFrame Frame, Rectangle? SearchRegion,
    IReadOnlyDictionary<string, FlowValue> Parameters);
public sealed record OcrResult(string Text, IReadOnlyList<Detection> Regions);
public sealed record ImageMatchResult(bool Found, Rectangle? Bounds, double Score, CoordinateSpace Space);
public enum ActionOutcome { Success, Failure }
public sealed record ActionResult(ActionOutcome Outcome, string Message,
    IReadOnlyDictionary<string, FlowValue> Outputs);
