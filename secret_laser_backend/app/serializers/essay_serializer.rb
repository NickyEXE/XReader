class EssaySerializer < ActiveModel::Serializer
  attributes :title, :url, :high_score, :high_score_user, :content, :id
end
