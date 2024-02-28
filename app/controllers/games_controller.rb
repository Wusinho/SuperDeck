class GamesController < ApplicationController
  include Crudatable

  def new
    @resource = Game.new
    @resource.build_game_configuration
  end

  def resource_params
    permitted_params = params.require(:game).permit(*allowed_params)
    permitted_params[:owner_id] = current_user.id
    permitted_params
  end

  def allowed_params
    [
      :name,
      :owner_id,
      game_configuration_attributes: [:quantity_players, :deck_size]
    ]
  end
end
