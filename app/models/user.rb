class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :owned_games, class_name: 'Game', foreign_key: 'owner_id'
  has_many :players
  has_many :games, through: :players

  def current_game
    games.find_by(active: true)
  end

  def player
    current_game.players.find_by(user_id: self.id)
  end

  def self.ransackable_attributes(auth_object = nil)
    # List of all attributes you want to be searchable
    super - %w[encrypted_password reset_password_token password_reset_token owner]
  end

  def self.ransackable_associations(auth_object = nil)
    []
  end
end
