class PlayerCardsController < ApplicationController
  before_action :set_player_card, only: [:show]
  def show
    url = @player_card.morphed? ? 'https://res.cloudinary.com/wusinho1/image/upload/v1716614018/back_card_0_zx41zw.png' : @player_card.card.image_url

    render turbo_stream: turbo_stream.replace('read',
                                              partial: 'player_cards/modal',
                                              locals: { url: url })
  end

  private

  def set_player_card
    @player_card = PlayerCard.find(params[:id])
  end

end