class EssaysController < ApplicationController
    def new
        byebug
        render :json => {"content": "hi"}
    end
end
