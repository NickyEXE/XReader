class EssaysController < ApplicationController
    def new
      url = params["user_input"]
      new_essay = User.find_or_create_by(username: params["username"]).essays.create(url: url)
      @response = new_essay.get_content.to_s
      render :json => {"response": @response}
    end
end
