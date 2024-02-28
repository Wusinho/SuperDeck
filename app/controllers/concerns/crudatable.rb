module Crudatable
  extend ActiveSupport::Concern
  include Pagy::Backend

  included do
    before_action :set_resource, only: %i[show edit update destroy]

    def index
      @resources = resource_class.all
      @model = resource_class.to_s.downcase
    end

    def show; end

    def new
      @resource = resource_class.new
    end

    def create
      @resource = resource_class.new(resource_params)
      if @resource.save
        redirect_to send(admin_model_path), alert: t('alerts.messages.created')
      else
        turbo_error_message(@resource)
      end
    end

    def edit; end

    def update
      if @resource.update(resource_params)
        redirect_to send(admin_model_path), alert: t('alerts.messages.edited')
      else
        turbo_error_message(@resource)
      end
    end

    def destroy
      @resource.destroy
      redirect_to send(admin_model_path), alert: t('alerts.messages.deleted')
    end

    protected

    def admin_model_path
      refactored_name = camel_to_snake(resource_class.to_s)
      "#{refactored_name.pluralize}_path"
    end

    def camel_to_snake(str)
      str.gsub(/([a-z\d])([A-Z])/, '\1_\2').downcase.to_s
    end

    def set_resource
      @resource = resource_class.find(params[:id])
    end

    def resource_class
      resource_name.classify.split('::').last.constantize
    end

    def resource_name
      self.class.name.gsub(/Controller$/, '').underscore
    end
  end
end
