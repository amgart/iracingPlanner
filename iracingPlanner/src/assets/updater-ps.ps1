# Insert your credentials here (username in lowercase)
$EMAIL = "clunky@iracing.com"
$PASSWORD = "MyPassWord"

# Generate hash
$hasher = [System.Security.Cryptography.HashAlgorithm]::Create('sha256')
$sha256hash = $hasher.ComputeHash([System.Text.Encoding]::UTF8.GetBytes($PASSWORD+$EMAIL))
$base64hash = [Convert]::ToBase64String($sha256hash)

# Login
$data = @{}
$data.email = $EMAIL
$data.password = $base64hash
$call = Invoke-WebRequest -Method POST -ContentType 'application/json' -Body (ConvertTo-Json $data) -SessionVariable session -UseBasicParsing -Uri "https://members-ng.iracing.com/auth"
if ($call.Content.authcode -ne 0) {
  echo "Obtaining series..."
  $call = Invoke-WebRequest -Uri 'https://members-ng.iracing.com/data/series/seasons?include_series=true' -WebSession $session
  $result = $call.Content | convertFrom-Json
  $result = Invoke-WebRequest -Uri $result.link -WebSession $session
  $result.Content > series.json

  echo "Obtaining cars..."
  $call = Invoke-WebRequest -Uri 'https://members-ng.iracing.com/data/car/get' -WebSession $session
  $result = $call.Content | convertFrom-Json
  $result = Invoke-WebRequest -Uri $result.link -WebSession $session
  $result.Content > cars.json

  echo "Obtaining car classes..."
  $call = Invoke-WebRequest -Uri 'https://members-ng.iracing.com/data/carclass/get' -WebSession $session
  $result = $call.Content | convertFrom-Json
  $result = Invoke-WebRequest -Uri $result.link -WebSession $session
  $result.Content > carClasses.json

  echo "Obtaining tracks..."
  $call = Invoke-WebRequest -Uri 'https://members-ng.iracing.com/data/track/get' -WebSession $session
  $result = $call.Content | convertFrom-Json
  $result = Invoke-WebRequest -Uri $result.link -WebSession $session
  $result.Content > tracks.json

  echo "Obtaining car assets..."
  $call = Invoke-WebRequest -Uri 'https://members-ng.iracing.com/data/car/assets' -WebSession $session
  $result = $call.Content | convertFrom-Json
  $result = Invoke-WebRequest -Uri $result.link -WebSession $session
  $result.Content > carAssets.json

  echo "Obtaining track assets..."
  $call = Invoke-WebRequest -Uri 'https://members-ng.iracing.com/data/track/assets' -WebSession $session
  $result = $call.Content | convertFrom-Json
  $result = Invoke-WebRequest -Uri $result.link -WebSession $session
  $result.Content > trackAssets.json

  echo "Everything is up to date!"
} else {
  echo "Login failed. Please check your credentials"
}
