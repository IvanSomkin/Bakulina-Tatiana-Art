Get-ChildItem -Directory | ForEach-Object { Write-Output $_.FullName, $($_ | Get-ChildItem).Count }
Read-Host 'Done?'