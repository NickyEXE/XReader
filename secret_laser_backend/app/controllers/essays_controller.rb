class EssaysController < ApplicationController

    def index
      @essays = Essay.all
      render json: @essays
    end

    def new
      url = params["user_input"]
      new_essay = User.find_or_create_by(username: params["username"]).essays.find_or_create_by(url: url, title: params["title"])
      @response = new_essay.content
      render :json => {"response": @response}
    end
    
    def show
      @essay = Essay.find(params[:id])
      render json: @essay
    end
end
