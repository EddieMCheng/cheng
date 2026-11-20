param(
    [string]$Repo = (Get-Location).Path
)

$root = (Resolve-Path -LiteralPath $Repo).Path
$docs = Get-ChildItem -LiteralPath $root -Recurse -File -Filter *.txt
$issues = New-Object System.Collections.Generic.List[object]

function Resolve-ChengRef {
    param([string]$Root, [string]$RefName)

    $name = $RefName.Trim()
    if ($name -eq "") { return $null }

    $candidates = @(
        (Join-Path $Root ($name + ".txt")),
        (Join-Path $Root ("eddie\" + $name + ".txt")),
        (Join-Path $Root ("eddie\" + ($name -replace "_", "\") + ".txt"))
    )

    foreach ($candidate in $candidates) {
        if (Test-Path -LiteralPath $candidate -PathType Leaf) {
            return $candidate
        }
    }

    return $null
}

foreach ($doc in $docs) {
    $text = Get-Content -Raw -LiteralPath $doc.FullName
    $flat = $text -replace "`r", "" -replace "`n", ""
    $relative = $doc.FullName.Substring($root.Length).TrimStart("\")
    $fileName = [System.IO.Path]::GetFileName($doc.FullName)
    $hasF = $flat -match "(^|;)F:"
    $hasG = $flat -match "(^|;)G:"
    $looksFullDocument = $fileName -like "D_*.txt" -or $flat -match "(^D_[^;]*;)|(^[^;]+;[^;]*(G:|F:))"

    if ($looksFullDocument -and -not $hasG -and -not $hasF) {
        $issues.Add([pscustomobject]@{ File = $doc.FullName; Kind = "thin-document"; Detail = "Looks like a document but has no G: or F:" })
    }

    $matches = [regex]::Matches($flat, "(^|[;,])\s*([FG]_[A-Za-z0-9_]+)(?=[,;=])")
    foreach ($match in $matches) {
        $ref = $match.Groups[2].Value
        if (-not (Resolve-ChengRef -Root $root -RefName $ref)) {
            $issues.Add([pscustomobject]@{ File = $doc.FullName; Kind = "unresolved-ref"; Detail = $ref })
        }
    }
}

if ($issues.Count -eq 0) {
    Write-Output "OK: $($docs.Count) text documents scanned; no basic structure issues found."
} else {
    $issues | Sort-Object File, Kind, Detail | Format-Table -AutoSize
    exit 1
}
