class ScoresController < ApplicationController

  def create
    essay = Essay.find_or_create_by(url: params["url"])
    user = User.find_or_create_by(username: params["username"])
    user.scores.create(score: params["score"], essay_id: essay.id)
    @user_scores_on_game = user.scores.where(essay_id: essay.id)
    render :json => @user_scores_on_game
  end

end
