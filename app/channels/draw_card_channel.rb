class DrawCardChannel < ApplicationCable::Channel
  def subscribed
    stream_from "draw_card_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def draw_card(data)
    player_card = current_user.draw_card_from_game

    information = {
      player_id: player_card.player_id,
      card: {
        zone: player_card.zone,
        action: player_card.action,
        image_url: player_card.card.image_url,
        card_id: player_card.id
      }
    }

    ActionCable.server.broadcast("draw_card_channel", information)
  end
end
