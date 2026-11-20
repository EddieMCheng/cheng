param(
    [string]$Repo = (Get-Location).Path
)

$root = (Resolve-Path -LiteralPath $Repo).Path
Get-ChildItem -LiteralPath $root -Recurse -File -Filter *.txt |
    ForEach-Object {
        $text = Get-Content -Raw -LiteralPath $_.FullName
        [pscustomobject]@{
            File = $_.FullName.Substring($root.Length).TrimStart("\")
            Bytes = $_.Length
            HasG = [bool]($text -match "(^|;)G:")
            HasF = [bool]($text -match "(^|;)F:")
            Time = [bool]($text -match "time")
            Touch = [bool]($text -match "touch|Mx|My|click|drag")
            Range = [bool]($text -match "→")
            Spread = [bool]($text -match "±")
            Refs = ([regex]::Matches($text, "(?<![A-Za-z0-9])([FG]_[A-Za-z0-9_]+)") | Select-Object -ExpandProperty Value -Unique) -join ","
        }
    } |
    Sort-Object HasG, HasF, Bytes |
    Format-Table -AutoSize
