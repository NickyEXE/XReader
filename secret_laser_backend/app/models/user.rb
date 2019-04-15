class User < ApplicationRecord
    has_many :scores
    has_many :essays, through: :scores
end
