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
    # game = current_user.current_game
    # card = game.draw_card
    # player = current_user.player
    # pc = PlayerCard.create(player_id: player.id, card_id: card.id)
    ActionCable.server.broadcast("game_channel", [current_user.player.id, 'card'])
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
