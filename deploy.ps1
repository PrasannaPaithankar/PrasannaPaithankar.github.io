if (!(Test-Path -Path "pkg")) {
    New-Item -ItemType Directory -Path "pkg"
}

Copy-Item -Path "Main/_site/*" -Destination "pkg" -Recurse -Force
Copy-Item -Path "Main/Assets" -Destination "pkg" -Recurse -Force
Copy-Item -Path "AT60205" -Destination "pkg" -Recurse -Force

$envFilePath = ".env"
if (Test-Path $envFilePath) {
    Get-Content $envFilePath | ForEach-Object {
        if ($_ -match "^\s*([^=]+)=(.*)\s*$") {
            $name = $matches[1]
            $value = $matches[2]
            [System.Environment]::SetEnvironmentVariable($name, $value)
        }
    }
} else {
    Write-Host "Environment file not found: $envFilePath"
    exit
}

# Import WinSCP .NET assembly
Add-Type -Path $env:WINSCP_DLL_PATH

# Setup session options
$sessionOptions = New-Object WinSCP.SessionOptions
$sessionOptions.Protocol = [WinSCP.Protocol]::Sftp
$sessionOptions.HostName = $env:SFTP_HOST
$sessionOptions.UserName = $env:SFTP_USER
$sessionOptions.Password = $env:SFTP_PASSWORD
$sessionOptions.PortNumber = [int]$env:SFTP_PORT
$sessionoptions.GiveUpSecurityAndAcceptAnySshHostKey = $true

# Set up the session and connect
$session = New-Object WinSCP.Session
try {
    $session.Open($sessionOptions)

    # Define the local folder to upload and the remote path
    $localFolderPath = $env:LOCAL_PATH
    $remoteFolderPath = $env:SFTP_REMOTE_PATH

    # Upload the folder contents to the remote path and set permissions to 755
    $transferOptions = New-Object WinSCP.TransferOptions
    $transferOptions.TransferMode = [WinSCP.TransferMode]::Binary
    $transferOptions.FilePermissions = New-Object WinSCP.FilePermissions
    $transferOptions.FilePermissions.Octal = "755"

    foreach ($file in Get-ChildItem $localFolderPath) {
        $transferResult = $session.PutFiles($file.FullName, $remoteFolderPath + "/" + $file.Name, $False, $transferOptions)
        $transferResult.Check()
    }

    Write-Host "Upload succeeded for all files."
} catch {
    Write-Host "Error: $($_.Exception.Message)"
} finally {
    # Close the session
    $session.Dispose()
}