# This file is used by Rack-based servers to start the application.
Rack::Mime::MIME_TYPES.merge!({
  ".ogv"     => "video/ogg",
  ".ogg"     => "video/ogg",
  ".mp4"     => "video/mp4"
})

require ::File.expand_path('../config/environment', __FILE__)
run Rails.application
