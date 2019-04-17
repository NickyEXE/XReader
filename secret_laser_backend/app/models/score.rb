class Score < ApplicationRecord
    belongs_to :user
    belongs_to :essay

    def self.highscore
        sorted_highscore = self.all.sort_by do |score|
            -score.score
        end
        top_five_highscores = sorted_highscore[0 ... 4]
        top_five_highscores.map do |score|
            {username: score.user.username, title: score.essay.title, score: score.score}
        end
    end
end


