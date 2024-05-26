class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :owned_games, class_name: 'Game', foreign_key: 'owner_id'
  has_many :players
  has_many :games, through: :players

  def draw_card_from_game
    card = current_game.draw_card
    PlayerCard.create(player_id: player.id, card_id: card.id)
  end

  def current_game
    games.find_by(active: true)
  end

  def player
    current_game.players.find_by(user_id: self.id)
  end

  def current_game_players
    current_game.players.map do |player|
      {
        id: player.id,
        username: player.username,
        order: player.order,
        life: player.life,
        cards: player.card_collection
      }
    end
  end

  def player_card_information
    player_cards = player.player_cards

    player_cards.join(:cards)
  end

  def self.ransackable_attributes(auth_object = nil)
    # List of all attributes you want to be searchable
    super - %w[encrypted_password reset_password_token password_reset_token owner]
  end

  def self.ransackable_associations(auth_object = nil)
    []
  end
end
