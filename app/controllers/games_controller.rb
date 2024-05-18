class GamesController < ApplicationController
  include Crudatable
  include ActionView::RecordIdentifier

  def show
    unless @resource.use_in_game?(current_user)
      Player.create(user_id: current_user.id, game_id: @resource.id)
    end
    ActionCable.server.broadcast("game_#{@resource.id}", @resource.players )
  end

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