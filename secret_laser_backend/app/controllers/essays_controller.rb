class EssaysController < ApplicationController

    def index
      @essays = Essay.all
      render json: @essays
    end

    def new
      url = params["user_input"]
      new_essay = Essay.find_or_create_by(url: url, title: params["title"])
      @response = new_essay.content
      render :json => {"response": @response}
    end
    
    def show
      @essay = Essay.find(params[:id])
      render json: @essay
    end

    def title
      @essay = Essay.find_by(url: params["url"])
      render json: @essay
    end
end
