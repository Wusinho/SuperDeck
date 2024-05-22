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
    players = current_user.current_game_players
    ActionCable.server.broadcast("board_channel", [current_player, players])
  end

end
