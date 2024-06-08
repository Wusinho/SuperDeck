class PlayerCardsController < ApplicationController
  before_action :set_player_card, only: [:show]
  def show
    url = if @player_card.morphed?
            my_card? ? @player_card.card.image_url : 'https://res.cloudinary.com/wusinho1/image/upload/v1716614018/back_card_0_zx41zw.png'
          else
            @player_card.card.image_url
          end

    render turbo_stream: turbo_stream.replace('read',
                                              partial: 'player_cards/modal',
                                              locals: { url: url })
  end

  private

  def my_card?
    @player_card.player.user.id == current_user.id
  end

  def set_player_card
    @player_card = PlayerCard.find(params[:id])
  end

end