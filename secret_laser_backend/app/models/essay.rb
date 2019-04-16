class Essay < ApplicationRecord
    has_many :scores
    has_many :users, through: :scores

  def get_content
    uri = URI.parse("#{self.url}")
    response = Net::HTTP.get_response(uri).body
  end

  def pull_p_tags
    @doc = Nokogiri::HTML(self.get_content)
    @doc.xpath("//p")
  end

  def parse_in_human
    self.pull_p_tags.map do |p_tag|
      p_tag.text
    end.flatten
  end

  def high_score
    high_score = self.scores.max_by do |score|
      score.score
    end
    high_score ? high_score : nil
  end

end
