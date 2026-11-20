param(
    [Parameter(Mandatory = $true)]
    [string]$Path
)

$resolved = (Resolve-Path -LiteralPath $Path).Path
$text = Get-Content -Raw -LiteralPath $resolved
$flat = $text -replace "`r", "" -replace "`n", ""

$gIndex = $flat.IndexOf("G:")
$fIndex = $flat.IndexOf("F:")

$headerEnd = @($gIndex, $fIndex) | Where-Object { $_ -ge 0 } | Measure-Object -Minimum | Select-Object -ExpandProperty Minimum
if ($null -eq $headerEnd) { $headerEnd = $flat.Length }

$header = $flat.Substring(0, $headerEnd).Trim(";")
$g = ""
$f = ""
$tail = ""

if ($gIndex -ge 0) {
    $gEnd = if ($fIndex -gt $gIndex) { $fIndex } else { $flat.Length }
    $g = $flat.Substring($gIndex + 2, $gEnd - $gIndex - 2).Trim(";")
}

if ($fIndex -ge 0) {
    $fRaw = $flat.Substring($fIndex + 2)
    $urlIndex = $fRaw.IndexOf("http")
    if ($urlIndex -ge 0) {
        $f = $fRaw.Substring(0, $urlIndex).Trim(";")
        $tail = $fRaw.Substring($urlIndex).Trim(";")
    } else {
        $f = $fRaw.Trim(";")
    }
}

[pscustomobject]@{
    File = $resolved
    Header = $header
    G = $g
    F = $f
    Tail = $tail
} | Format-List
