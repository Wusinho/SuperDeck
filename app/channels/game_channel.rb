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
    current_user.draw_card_from_game

    current_player = current_user.player
    cards = current_player.hand_cards

    ActionCable.server.broadcast("game_channel", [current_player.id, cards])
    # ActionCable.server.broadcast("game_channel", 'THIS IS A TEST')
    #
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
