class EssaysController < ApplicationController

    def index
      @essays = Essay.all
      render json: @essays
    end

    def new
      url = params["user_input"]
      new_essay = User.find_or_create_by(username: params["username"]).essays.create(url: url)
      new_essay.scores.first.score = 0
      @response = new_essay.parse_in_human
      render :json => {"response": @response}
    end
end
