class Essay < ApplicationRecord
    has_many :scores
    has_many :users, through: :scores

  def get_content
    uri = URI.parse("#{self.url}")
    response = Net::HTTP.get_response(uri).body
  end

  def pull_p_tags
    @doc = Nokogiri::XML(File.read(self.url))
    byebug
    @doc.xpath("//p")
  end


end
