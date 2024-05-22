class BoardChannel < ApplicationCable::Channel
  def subscribed
    stream_from "board_channel"
    # stream_from "some_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def connected
    p '*'*100
    p 'connected'
    current_player = current_user.player
    hand = current_player.hand_cards
    cementery = current_player.playzone_cards
    graveyard = current_player.graveyard_cards
    exile = current_player.exile_cards
    players = current_user.current_game_players
    obj = {
      id: current_player.id,
      username: current_player.username,
      order: current_player.order,
    }
    ActionCable.server.broadcast("board_channel", [obj, players, hand,cementery,graveyard,exile])
  end

end
