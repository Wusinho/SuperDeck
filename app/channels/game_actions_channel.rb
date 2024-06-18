class GameActionsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "game_actions_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def player_actions(data)
    player_card_id = data['player_card_id']
    current_player_id = data['current_player_id']
    former_holder_id = data['current_holder_id']

    player_card = PlayerCard.find(player_card_id)

    player_card.update!(current_holder_id: current_player_id)

    information = {
      current_holder_id: player_card.current_holder_id,
      former_holder_id: former_holder_id,
      owner_id: player_card.owner_id,
      player_card_id: player_card.id,
      old_zone: data['old_zone'] || player_card.zone,
      new_zone: player_card.zone,
    }
    p '*' *100
    p information
    p '*' *100

    ActionCable.server.broadcast("game_actions_channel", ['across_player_zones', information])
  end

  def morphed_from_hand(data)
    pc = PlayerCard.find_by(id: data['card_id'])
    old_zone = pc.zone
    pc.update(morphed: data['morphed'], zone: PlayerCard.zones[data['new_zone'].to_sym] )
    pc = PlayerCard.find_by(id: data['card_id'])

    information = {
      current_holder_id: pc.current_holder_id,
      old_zone: old_zone,
      new_zone: pc.zone,
      player_card_id: pc.id,
      morphed: pc.morphed,
      tapped: pc.tapped,
    }
    ActionCable.server.broadcast("game_actions_channel", ['own_zone', information])
  end

  def change_state(data)
    pc = PlayerCard.find_by(id: data['player_card_id'])
    olc_zone = pc.zone
    pc.update(tapped: data['tapped'], morphed: data['morphed'] )

    pc = PlayerCard.find_by(id: data['player_card_id'])

    information = {
      current_holder_id: pc.current_holder_id,
      old_zone: olc_zone,
      new_zone: pc.zone,
      player_card_id: pc.id,
      morphed: pc.morphed,
      tapped: pc.tapped,
    }

    ActionCable.server.broadcast("game_actions_channel", ['own_zone', information])
  end

  def change_zone(data)
    pc = PlayerCard.find_by(id: data['player_card_id'])
    old_zone = pc.zone
    pc.update(zone: PlayerCard.zones[data['new_zone'].to_sym])
    pc = PlayerCard.find_by(id: data['player_card_id'])

    information = {
      current_holder_id: pc.current_holder_id,
      old_zone: old_zone,
      new_zone: pc.zone,
      player_card_id: pc.id,
      morphed: pc.morphed,
      tapped: pc.tapped,
    }

    ActionCable.server.broadcast("game_actions_channel", ['own_zone', information])
  end

end
