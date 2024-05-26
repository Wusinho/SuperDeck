class GameActionsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "game_actions_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def change_zone(data)
    pc = PlayerCard.find_by(id: data['player_card_id'])
    pc.update(zone: data['zone'])
    information = {
      player_id: pc.player_id,
      new_zone: data['new_zone'],
    }
    ActionCable.server.broadcast("game_actions_channel", information)
  end

  def to_mana_pool(data)
    player_card = PlayerCard.find(data['card_id'])
    from = player_card.zone
    player_card.update(zone: 0)
    ActionCable.server.broadcast("game_actions_channel", data_recollected(player_card, from))
  end

  def to_playzone(data)
    ActionCable.server.broadcast("game_actions_channel", 'THIS IS A TEST TO Playzone')
  end

  def to_graveyard(data)

    ActionCable.server.broadcast("game_actions_channel", 'THIS IS A TEST TO Graveyard')
  end

  def to_exile(data)

    ActionCable.server.broadcast("game_actions_channel", 'THIS IS A TEST TO Exile')
  end

  def to_hand(data)

    ActionCable.server.broadcast("game_actions_channel", 'THIS IS A TEST TO Hand')
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
