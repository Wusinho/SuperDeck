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
    player = current_user.player
    ActionCable.server.broadcast("board_channel", player)
  end

end
