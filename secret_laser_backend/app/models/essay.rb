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

  def filtered_scores
    self.scores.compact
  end

  def high_score
    if self.filtered_scores.length >1
      high_score = self.filtered_scores.max_by do |score|
        score.score
      end
    elsif self.filtered_scores.length == 1
      high_score = self.filtered_scores[0]
    end
    high_score ? high_score : nil
  end

  def high_score_user
    if self.high_score
      self.high_score.user
    else
      "None."
    end
  end
end
