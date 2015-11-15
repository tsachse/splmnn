# https://blog.codelation.com/rails-restful-api-just-add-water/
#
module Api
  class MediaController < BaseController

    private

    def medium_params
      params.permit(:id,:name,:code,:path)
    end

  end
end
