class GameChannel < ApplicationCable::Channel
  def subscribed
    return unless current_user && params[:game_id]

    p '*'*100
    p params
    p '*'*100
    stream_from "#{params[:game_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
