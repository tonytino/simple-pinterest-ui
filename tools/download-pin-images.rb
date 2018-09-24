=begin
  ## Downloading All Photos for a Pinterest Board

  1. Obtain the array of pin URLs
    These can be copied via the Copy to Clipboard button found in the web app.

  2. Paste the array of pin URLs as the only content in `simple-pinterest-ui/tools/pin-urls.json`

  3. Run the following script to download all the images:

    ```
    ruby ./download-pin-images.rb
    ```

  4. Check inside `./tools/` to find all the images that downloaded successfully.

  5. Clean-up: Select all the downloaded images, open the menu (right click), and select *New Folder with Selection*
=end

require 'json'

PIN_URLS_FILENAME = "#{File.dirname(__FILE__)}/pin-urls.json"
PIN_URLS_FILE = File.read PIN_URLS_FILENAME

# Retrieve the URLs from the file
urls = JSON.parse(PIN_URLS_FILE)

# Use this to track any downloads that fail
failed_to_download = []

puts "💾 💾 💾  D O W N L O A D I N G  💾 💾 💾"
puts "Attemping to download all files listed in #{PIN_URLS_FILENAME}."
puts

urls.each do |url|
  puts "Downloading file: #{url}"
  # -O to download
  # -s to silence requests
  unless system("curl -Os #{url}")
    # If we didn't get a successful exit code, mark the download as a failure
    failed_to_download << url
  end
end

# Notify of failed downloads with commands to reattemp requests
if failed_to_download.length > 0
  puts
  warn "‼️ ‼️ ‼️  W A R N I N G  ‼️ ‼️ ‼️"
  puts "Some items failed to download. Reattempt any of the downloads by running the commands below:"
  puts
  failed_to_download.map do |url|
    puts "curl -O #{url}"
  end
end
