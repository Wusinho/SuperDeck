class CardsController < ApplicationController
  def index
    cards = current_user.current_game.deck.cards.select(:id, :image_url)
    render json: cards
  end
end