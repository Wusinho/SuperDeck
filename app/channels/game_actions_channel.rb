class GameActionsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "game_actions_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def change_zone(data)
    pc = PlayerCard.find_by(id: data['player_card_id'])
    pc.update(zone: PlayerCard.zones[data['new_zone'].to_sym])
    information = {
      player_id: pc.player_id,
      new_zone: data['new_zone'],
    }
    ActionCable.server.broadcast("game_actions_channel", information)
  end

  def data_recollected(player_card, from)
    {
      player_id: player_card.player_id,
      from: from,
      to: player_card.zone,
    }
  end


  def update(data)
    p '*'*100
    p data
    p '*'*100
  end
end
