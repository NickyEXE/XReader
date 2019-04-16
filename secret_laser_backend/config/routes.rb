Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post '/new', to: 'essays#new'
<<<<<<< HEAD
  get '/essays', to: 'essays#index'
  get '/scores', to: 'scores#index'
=======
  post '/scores/create', to: 'scores#create'
>>>>>>> e2863e547ab028e268e0a770e9722ffdf8962ff6
end
