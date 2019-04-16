class EssaysController < ApplicationController

    def index
      @essays = Essay.all
      render json: @essays
    end

    def new
      url = params["user_input"]
      new_essay = User.find_or_create_by(username: params["username"]).essays.create(url: url)
      @response = new_essay.content
      render :json => {"response": @response}
    end
end
