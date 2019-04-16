class Essay < ApplicationRecord
    has_many :scores
    has_many :users, through: :scores


  def initialize(url)
    super(url)
    self.content = self.parse_in_human.inject{|sum, n| sum + " " + n}
  end

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
    if self.scores.length >1
      high_score = self.scores.max_by do |score|
        score.score
      end
    elsif self.scores == 1
      high_score = self.score
    end
    high_score ? high_score : nil
  end

  def high_score_user
    self.high_score.user
  end
end
