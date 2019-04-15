require 'pry'
require 'net/http'
require 'uri'

uri = URI.parse("https://medium.com/@dovern42/progressively-dumber-ways-to-sort-ff59c676071f")
response = Net::HTTP.get_response(uri)


# open and write to a file with ruby
open('myfile.out', 'w') { |f|
  f.puts response.body
}

binding.pry
