module GamesHelper
  def resource_path(resource)
    if resource.persisted?
      send("#{resource.class.name.underscore}_path", resource)
    else
      send("#{resource.class.name.underscore.pluralize}_path")
    end
  end

  def edit_path(resource, sti)
    link_to send(edit_path_generator(resource, sti), resource.id), class: 'grey_link' do
      content_tag(:i, '', class: 'fa-solid fa-pen-to-square p-1 text-warning')
    end
  end

  def edit_path_generator(resource, sti)
    path = path(resource, sti)
    "edit_#{path}_path"
  end

  def path(resource, sti)
    resource_name = sti ? resource.class.base_class : resource.class
    camel_to_snake(resource_name.to_s)
  end

  def camel_to_snake(str)
    str.gsub(/([a-z\d])([A-Z])/, '\1_\2').downcase.to_s
  end
end
