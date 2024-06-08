class LoadGameChannel < ApplicationCable::Channel
  def subscribed
    stream_from "load_game_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def connected
    current_player = current_user.player
    cards = current_player.card_collection

    players = current_user.current_game_players
    player_information = {
      player_id: current_player.id,
      username: current_player.username,
      order: current_player.order,
      life: current_player.life,
      cards: cards,
    }
    ActionCable.server.broadcast("load_game_channel", [player_information, players])
  end
end
