class Game < ApplicationRecord
  belongs_to :owner, class_name: 'User', foreign_key: 'owner_id'
  has_many :players
  has_many :users, through: :players
  has_one :game_configuration, dependent: :destroy
  accepts_nested_attributes_for :game_configuration

  validates_presence_of :name
end
