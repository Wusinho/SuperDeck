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
    player_card = current_user.draw_card_from_game

    information = {
      id: player_card.player_id,
      card: {
        zone: player_card.zone,
        action: player_card.action,
        image_url: player_card.card.image_url,
        card_id: player_card.id
      }
    }

    ActionCable.server.broadcast("game_channel", information)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
