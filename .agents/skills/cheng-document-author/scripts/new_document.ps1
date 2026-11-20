param(
    [Parameter(Mandatory = $true)]
    [string]$Title,

    [string]$OutDir = (Get-Location).Path,

    [switch]$Force
)

$safeTitle = ($Title -replace "\s+", "_") -replace "[^A-Za-z0-9_]", ""
if ($safeTitle -eq "") {
    throw "Title must contain at least one letter or digit."
}

$path = Join-Path $OutDir ("D_" + $safeTitle + ".txt")
if ((Test-Path -LiteralPath $path) -and -not $Force) {
    throw "File already exists: $path. Use -Force to overwrite."
}

$stamp = Get-Date -Format "yyyyMMddHHmmss"
$content = @"
D_$safeTitle.$stamp;
G:T='$safeTitle',
dT=0,
Vw=Vw-(lMx-Mx)/4,
Vo=Vo+(lMy-My)/4;
F:point;
http://localhost/eddie/V.html
"@

Set-Content -LiteralPath $path -Value $content -Encoding UTF8
Write-Output $path
