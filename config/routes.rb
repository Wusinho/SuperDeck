Rails.application.routes.draw do
  resources :posts
  get 'home_pages/index'
  devise_for :users
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  resources :games
  resources :players
  resources :phaser_games
  resources :cards, only: [:index]

  # Defines the root path route ("/")
  root "home_pages#index"
end
