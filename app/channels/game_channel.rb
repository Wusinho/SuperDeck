class GameChannel < ApplicationCable::Channel
  def subscribed
    return unless current_user && params[:game_id]

    stream_from "#{params[:game_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
