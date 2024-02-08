$sourceFolder = ".\extension"
$destinationZip = ".\extension.zip"

if (Test-Path $destinationZip) {
    Remove-Item $destinationZip
}

$winrarPath = "C:\Program Files\WinRAR\WinRAR.exe"
$command = "& `"$winrarPath`" a -ep1 -r `"$destinationZip`" `"$sourceFolder\*`""
Invoke-Expression -Command $command
