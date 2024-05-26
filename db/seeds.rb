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
  urls =[
    'https://res.cloudinary.com/wusinho1/image/upload/v1716764959/Image_r4w7f4.jpg',
    'https://res.cloudinary.com/wusinho1/image/upload/v1716765060/Image_ld0oec.jpg',
    'https://res.cloudinary.com/wusinho1/image/upload/v1716765116/Image_1_e9f3jo.jpg',
    'https://res.cloudinary.com/wusinho1/image/upload/v1716765163/Image_2_nysinz.jpg',
    'https://res.cloudinary.com/wusinho1/image/upload/v1716765213/Image_3_trsztt.jpg',
    'https://res.cloudinary.com/wusinho1/image/upload/v1716765261/Image_4_mztppk.jpg',
    'https://res.cloudinary.com/wusinho1/image/upload/v1716765637/Image_5_bwmaiz.jpg',
    'https://res.cloudinary.com/wusinho1/image/upload/v1716765637/Image_6_ymrkcx.jpg',
    'https://res.cloudinary.com/wusinho1/image/upload/v1716765636/Image_7_g2cvbz.jpg',
    'https://res.cloudinary.com/wusinho1/image/upload/v1716765636/Image_8_didex2.jpg',
    'https://res.cloudinary.com/wusinho1/image/upload/v1716765636/Image_9_wbxobo.jpg',
    'https://res.cloudinary.com/wusinho1/image/upload/v1716765636/Image_10_c8eihu.jpg',
    'https://res.cloudinary.com/wusinho1/image/upload/v1716765636/Image_11_hqv8fl.jpg',
    'https://res.cloudinary.com/wusinho1/image/upload/v1716765524/Image_20_ghf2u3.jpg',
    'https://res.cloudinary.com/wusinho1/image/upload/v1716765525/Image_19_av8exa.jpg',
    'https://res.cloudinary.com/wusinho1/image/upload/v1716765525/Image_18_fbw8dh.jpg',
    'https://res.cloudinary.com/wusinho1/image/upload/v1716765525/Image_17_liwgqb.jpg',
    'https://res.cloudinary.com/wusinho1/image/upload/v1716765525/Image_16_pfhzhe.jpg',
    'https://res.cloudinary.com/wusinho1/image/upload/v1716765525/Image_15_cap0jo.jpg',
    'https://res.cloudinary.com/wusinho1/image/upload/v1716765527/Image_14_syh5mp.jpg',
    'https://res.cloudinary.com/wusinho1/image/upload/v1716765639/Image_13_cgujs4.jpg',
    'https://res.cloudinary.com/wusinho1/image/upload/v1716765662/Image_12_mddwey.jpg'
  ]

  size_of_urls = urls.length

  size_of_urls.times do |i|
    Card.create(name: "Card #{i}",
                mana_cost: 3,
                colors: 'W',
                types: 'Creature',
                text: 'fdsfasff',
                image_url: urls[i]
                )
  end
end