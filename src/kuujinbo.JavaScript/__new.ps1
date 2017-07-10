param([string]$jsFilePath=$(throw "JavaScript file path is mandatory, exiting script!`n`r$("-" * 40)`n`r"))

$jsFileWithoutExtension = [System.IO.Path]::GetFileNameWithoutExtension($jsFilePath);
$jsFileWithoutExtensionL = $jsFileWithoutExtension.Substring(0,1).ToLower() + `
    $jsFileWithoutExtension.Substring(1);
$jsFileName = [System.IO.Path]::GetFileNameWithoutExtension($jsFilePath);

$currentDir = (Split-Path -Parent $MyInvocation.MyCommand.Definition);
$path = Join-Path $currentDir '__template.html';
write-host $path;
$template = [System.IO.File]::ReadAllText($path);
$expanded = Invoke-Expression "`"$template`"";
#$expanded = $ExecutionContext.InvokeCommand.ExpandString($template)
# $expanded;
$htmlPath = Join-Path $currentDir "$jsFileWithoutExtension.html";
$expanded |  Out-File -Encoding ASCII $htmlPath;