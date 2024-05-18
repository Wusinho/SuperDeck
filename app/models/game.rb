class Game < ApplicationRecord
  belongs_to :owner, class_name: 'User', foreign_key: 'owner_id'
  has_many :players
  has_many :users, through: :players
  has_one :game_configuration, dependent: :destroy
  has_one :deck, dependent: :destroy
  accepts_nested_attributes_for :deck
  accepts_nested_attributes_for :game_configuration

  validates_presence_of :name

  after_create :create_deck

  def use_in_game?(current_user)
    players.where("user_id = ?", current_user).present?
  end

  def create_deck
    Deck.create(game: self)
  end
end
