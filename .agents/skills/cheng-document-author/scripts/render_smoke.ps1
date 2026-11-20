param(
    [string]$Repo = (Get-Location).Path,

    [string]$Document = "D_New"
)

$root = (Resolve-Path -LiteralPath $Repo).Path
$port = 8080

$listener = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
if ($listener) {
    $port = 8081
}

$python = Get-Command python -ErrorAction SilentlyContinue
if (-not $python) {
    throw "python was not found on PATH; start any static server in $root manually."
}

Start-Process -FilePath $python.Source -ArgumentList @("-m", "http.server", "$port") -WorkingDirectory $root -WindowStyle Hidden
Start-Sleep -Milliseconds 500

$docArg = $Document
if ($docArg.EndsWith(".txt")) {
    $docArg = $docArg.Substring(0, $docArg.Length - 4)
}

$url = "http://localhost:$port/eddie/V.html?$docArg"
Write-Output $url
