namespace VisionFlow.SDK;

[Flags]
public enum ExtensionCapabilities { None = 0, Capture = 1, Input = 2 }

/// <summary>API1 metadata required by the explicit trusted in-process host.</summary>
public interface IExtensionCompatibility
{
    int ApiVersion { get; }
    ExtensionCapabilities Capabilities { get; }
}
