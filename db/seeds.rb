# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
if Rails.env.development?
  password = '123456'
  AdminUser.create!(email: 'heber@gmail.com', password: password, password_confirmation: password)
  User.create!(email: 'heber@gmail.com', password: password, password_confirmation: password, username: 'Wu')
  User.create!(email: 'player0@gmail.com', password: password, password_confirmation: password, username: 'Zambo')
  User.create!(email: 'player1@gmail.com', password: password, password_confirmation: password, username: 'Vash')
  User.create!(email: 'player2@gmail.com', password: password, password_confirmation: password, username: 'Tigre')
end