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
      current_holder_id: player_card.current_holder_id,
      card: {
        zone: player_card.zone,
        morphed: player_card.morphed,
        tapped: player_card.tapped,
        image_url: player_card.card.image_url,
        player_card_id: player_card.id
      }
    }

    ActionCable.server.broadcast("draw_card_channel", information)
  end
end
