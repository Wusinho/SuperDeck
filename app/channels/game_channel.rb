class GameChannel < ApplicationCable::Channel
  def subscribed
    return unless current_user && params[:game_id]
    p '*'*100
    p params
    p '*'*100


    stream_from "#{params[:game_id]}"
  end

  def receive(data)
    p '*'*100
    p data
    p '*'*100
    # ActionCable.server.broadcast("chat_#{params[:room]}", data)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
