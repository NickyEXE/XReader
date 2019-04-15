class EssaysController < ApplicationController
    def new
      url = params["user_input"]
      new_essay = User.find_or_create_by(username: params["username"]).essays.create(url: url)
      @response = new_essay.parse_in_human
      render :json => {"response": @response}
    end
end
