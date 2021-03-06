Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post '/essays/title', to: 'essays#title'
  post '/new', to: 'essays#new'
  get '/essays', to: 'essays#index'
  get '/scores', to: 'scores#index'
  post '/scores/create', to: 'scores#create'
  get '/essays/:id', to: 'essays#show'
  get '/scores/highscore', to: 'scores#highscore'
end
