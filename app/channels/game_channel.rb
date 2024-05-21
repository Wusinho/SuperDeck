class GameChannel < ApplicationCable::Channel
  def subscribed
    stream_from "game_channel"
    # return unless current_user && params[:game_id]
    # stream_from "#{params[:game_id]}"
    # stream_from "GameChannel"
  end

  def receive(data)
    p '*'*100
    p data
    p 'RECEIVE FROM GAMECHANNEL'
    p '*'*100
    # ActionCable.server.broadcast("chat_#{params[:room]}", data)
    ActionCable.server.broadcast("game_channel", data)
  end

  def draw_card(data)
    # p '*'*100
    p 'DRAW_CARD'
    # game = current_user.current_game
    # game.draw_card
    # cards = current_user.player.cards
    cards = Card.all.limit(7)
    # card = Card.last
    ActionCable.server.broadcast("game_channel", cards)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
