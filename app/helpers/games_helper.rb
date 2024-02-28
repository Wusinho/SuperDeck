module GamesHelper
  def resource_path(resource)
    if resource.persisted?
      send("#{resource.class.name.underscore}_path", resource)
    else
      send("#{resource.class.name.underscore.pluralize}_path")
    end
  end
end
