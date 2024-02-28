module ApplicationHelper
  def input_field(form, attribute, label, placeholder = '', input_type = '')
    input_type = attribute.to_s if input_type.blank?
    attribute_refactor = attribute.to_s
    content_tag(:div, class: 'form-group mb-3') do
      concat form.label attribute_refactor, label, class: 'mb-1'
      concat form.send("#{input_type}_field", attribute, class: 'form-control', placeholder:)
    end
  end

  def full_screen_div(custom_classes = '', &block)
    combined_classes = "full_screen #{custom_classes}".strip
    content_tag(:div, class: combined_classes) do
      capture(&block)
    end
  end

  def card_format_plus(model, list = [], &block)
    content_tag(:div, class: 'full_screen mb-4') do
      concat(content_tag(:div, class: 'card mx-4 mt-4 shadow-sm') do
        concat(render_header(model))
        concat(content_tag(:div, class: 'card-body', &block))
      end)
    end
  end


  def render_header(model)
    content_tag(:div, class: 'card-header bg-white d-flex justify-content-between center') do
      content_tag(:h3, t("sidebar.#{model.pluralize}"), class: 'ms-2') +
        new_item_circle_btn(model)
    end
  end

  def new_item_circle_btn(model_name)
    link_to '+', send("new_#{model_name}_path"), class: 'circle_btn center'
  end

  def primary_btn
    'btn btn-primary'
  end

  def model_panel(id, &block)
    refactor_id = id.to_s
    content_tag(:div) do
      content_tag(:div, class: 'tab-panel fade show active rounded-1 p-1 bg-white overflow-x-auto',
                  id: refactor_id,
                  role: 'tabpanel',
                  aria_labelledby: "#{refactor_id}-tab") do
        capture(&block)
      end
    end
  end

end
