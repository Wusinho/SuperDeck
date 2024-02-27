class Game < ApplicationRecord
  belongs_to :owner, class_name: 'User', foreign_key: 'owner_id'
  has_many :players
  has_many :users, through: :players
end
